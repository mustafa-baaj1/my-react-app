import axios from 'axios'
import api from './api.js'
import {
  clearSession,
  findLocalUserByEmail,
  findLocalUserById,
  getStoredSession,
  saveLocalUser,
  saveSession,
} from './authStorage.js'

const LOCAL_TOKEN_PREFIX = 'local-demo.'

export class AuthServiceError extends Error {
  constructor(message, code = 'AUTH_ERROR') {
    super(message)
    this.name = 'AuthServiceError'
    this.code = code
  }
}

function getPublicUser(user) {
  const publicUser = { ...user }
  delete publicUser.password
  delete publicUser.passwordHash
  delete publicUser.passwordSalt
  delete publicUser.accessToken
  delete publicUser.refreshToken

  return publicUser
}

function mapRegistrationError(error) {
  if (error instanceof AuthServiceError) return error

  if (!axios.isAxiosError(error) || !error.response) {
    return new AuthServiceError(
      'تعذّر الاتصال بخدمة التسجيل. تحقق من اتصالك بالإنترنت وحاول مجددًا.',
      'NETWORK_ERROR',
    )
  }

  return new AuthServiceError(
    'لم نتمكن من إنشاء الحساب بهذه البيانات. راجع الحقول وحاول مرة أخرى.',
    'REGISTRATION_ERROR',
  )
}

function createLocalToken() {
  return `${LOCAL_TOKEN_PREFIX}${crypto.randomUUID()}`
}

function createSalt() {
  return crypto.randomUUID()
}

async function hashPassword(password, salt) {
  const payload = new TextEncoder().encode(`${salt}:${password}`)
  const digest = await crypto.subtle.digest('SHA-256', payload)
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('')
}

function persistAuthentication(user, accessToken) {
  const session = { user: getPublicUser(user), accessToken }
  saveSession(session)
  return { user: session.user, token: accessToken }
}

function mapApiError(error) {
  if (error instanceof AuthServiceError) return error

  if (!axios.isAxiosError(error) || !error.response) {
    return new AuthServiceError(
      'تعذّر الاتصال بخدمة المصادقة. تحقق من اتصالك بالإنترنت وحاول مجددًا.',
      'NETWORK_ERROR',
    )
  }

  if (error.response.status === 400 || error.response.status === 401) {
    return new AuthServiceError(
      'بيانات الدخول غير صحيحة. تحقق من اسم المستخدم أو البريد الإلكتروني وكلمة المرور.',
      'INVALID_CREDENTIALS',
    )
  }

  return new AuthServiceError(
    'حدث خطأ غير متوقع أثناء المصادقة. يرجى المحاولة بعد قليل.',
    'API_ERROR',
  )
}

async function resolveRemoteUsername(identifier) {
  if (!identifier.includes('@')) return identifier

  const response = await api.get('/users/filter', {
    params: { key: 'email', value: identifier.trim() },
  })
  const matchingUser = response.data.users?.find(
    (user) => user.email.toLocaleLowerCase('en') === identifier.trim().toLocaleLowerCase('en'),
  )

  if (!matchingUser) {
    throw new AuthServiceError(
      'لا يوجد حساب تجريبي مرتبط بهذا البريد الإلكتروني.',
      'INVALID_CREDENTIALS',
    )
  }

  return matchingUser.username
}

async function loginLocalUser(localUser, password) {
  const passwordHash = await hashPassword(password, localUser.passwordSalt)

  if (passwordHash !== localUser.passwordHash) {
    throw new AuthServiceError(
      'بيانات الدخول غير صحيحة. تحقق من البريد الإلكتروني وكلمة المرور.',
      'INVALID_CREDENTIALS',
    )
  }

  return persistAuthentication(localUser, createLocalToken())
}

export async function loginUser({ identifier, password }) {
  const normalizedIdentifier = identifier.trim()
  const localUser = normalizedIdentifier.includes('@')
    ? findLocalUserByEmail(normalizedIdentifier)
    : null

  if (localUser) return loginLocalUser(localUser, password)

  try {
    const username = await resolveRemoteUsername(normalizedIdentifier)
    const response = await api.post('/auth/login', {
      username,
      password,
      expiresInMins: 60,
    })
    const { accessToken, ...user } = response.data

    if (!accessToken) throw new AuthServiceError('لم تُرجع خدمة المصادقة جلسة صالحة.')
    return persistAuthentication(user, accessToken)
  } catch (error) {
    throw mapApiError(error)
  }
}

export async function registerUser({ name, email, password }) {
  if (findLocalUserByEmail(email)) {
    throw new AuthServiceError('يوجد حساب مسجّل بهذا البريد الإلكتروني بالفعل.', 'EMAIL_EXISTS')
  }

  const trimmedName = name.trim()
  const nameParts = trimmedName.split(/\s+/)
  const firstName = nameParts[0]
  const lastName = nameParts.slice(1).join(' ')

  try {
    await api.post('/users/add', {
      firstName,
      lastName,
      email: email.trim(),
      username: email.trim().split('@')[0],
      password,
    })

    const passwordSalt = createSalt()
    const localUser = {
      id: `local-${crypto.randomUUID()}`,
      firstName,
      lastName,
      name: trimmedName,
      email: email.trim().toLocaleLowerCase('en'),
      username: email.trim().toLocaleLowerCase('en'),
      image: null,
      isLocalDemo: true,
      passwordSalt,
      passwordHash: await hashPassword(password, passwordSalt),
    }

    saveLocalUser(localUser)
    return persistAuthentication(localUser, createLocalToken())
  } catch (error) {
    throw mapRegistrationError(error)
  }
}

export async function restoreAuthentication() {
  const storedSession = getStoredSession()
  if (!storedSession) return null

  if (storedSession.accessToken.startsWith(LOCAL_TOKEN_PREFIX)) {
    const localUser = findLocalUserById(storedSession.user.id)

    if (!localUser) {
      clearSession()
      return null
    }

    return persistAuthentication(localUser, storedSession.accessToken)
  }

  try {
    const response = await api.get('/auth/me', {
      headers: { Authorization: `Bearer ${storedSession.accessToken}` },
    })
    return persistAuthentication(response.data, storedSession.accessToken)
  } catch (error) {
    if (axios.isAxiosError(error) && !error.response) {
      return { user: storedSession.user, token: storedSession.accessToken }
    }

    clearSession()
    return null
  }
}

export function logoutUser() {
  clearSession()
}

export function updateLocalDisplayName(displayName) {
  const storedSession = getStoredSession()
  if (!storedSession?.user?.isLocalDemo) {
    throw new AuthServiceError('تعديل الاسم متاح للحسابات المحلية التجريبية فقط.', 'EDIT_NOT_ALLOWED')
  }

  const trimmedName = displayName.trim().replace(/\s+/g, ' ')
  if (trimmedName.length < 2 || trimmedName.length > 60) {
    throw new AuthServiceError('يجب أن يتكون الاسم من حرفين إلى 60 حرفًا.', 'INVALID_DISPLAY_NAME')
  }

  const localUser = findLocalUserById(storedSession.user.id)
  if (!localUser) throw new AuthServiceError('تعذّر العثور على الحساب المحلي.', 'LOCAL_USER_NOT_FOUND')

  const nameParts = trimmedName.split(' ')
  const updatedUser = {
    ...localUser,
    name: trimmedName,
    firstName: nameParts[0],
    lastName: nameParts.slice(1).join(' '),
  }
  saveLocalUser(updatedUser)
  return persistAuthentication(updatedUser, storedSession.accessToken)
}
