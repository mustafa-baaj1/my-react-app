import { readStorage, removeStorage, writeStorage } from './storageService.js'

const AUTH_STORAGE_KEY = 'coursePlatform.auth'
const LOCAL_USERS_STORAGE_KEY = 'coursePlatform.localUsers'

export function getStoredSession() {
  const session = readStorage(AUTH_STORAGE_KEY, null)

  if (!session?.user || !session?.accessToken) return null
  return session
}

export function saveSession(session) {
  writeStorage(AUTH_STORAGE_KEY, session)
  return session
}

export function clearSession() {
  removeStorage(AUTH_STORAGE_KEY)
}

export function getLocalUsers() {
  const users = readStorage(LOCAL_USERS_STORAGE_KEY, [])
  return Array.isArray(users) ? users : []
}

export function findLocalUserByEmail(email) {
  const normalizedEmail = email.trim().toLocaleLowerCase('en')
  return getLocalUsers().find((user) => user.email.toLocaleLowerCase('en') === normalizedEmail) ?? null
}

export function findLocalUserById(userId) {
  return getLocalUsers().find((user) => user.id === userId) ?? null
}

export function saveLocalUser(user) {
  const users = getLocalUsers().filter((storedUser) => storedUser.id !== user.id)
  writeStorage(LOCAL_USERS_STORAGE_KEY, [...users, user])
  return user
}
