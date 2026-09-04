import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import AuthField from '../../components/auth/AuthField'
import AuthLayout from '../../components/auth/AuthLayout'
import Icon from '../../components/common/Icon'
import useAuth from '../../hooks/useAuth'
import { getRequestedPath } from '../../utils/authNavigation'
import { validateLogin } from '../../utils/authValidation'
import '../../styles/auth.css'

const initialValues = { identifier: '', password: '' }

function Login() {
  const location = useLocation()
  const navigate = useNavigate()
  const { login, isAuthenticated, isInitializing } = useAuth()
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const requestedPath = getRequestedPath(location.state)

  if (!isInitializing && isAuthenticated) {
    return <Navigate to={requestedPath} replace />
  }

  function updateField(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
    setSubmitError('')
  }

  function fillDemoCredentials() {
    setValues({ identifier: 'emilys', password: 'emilyspass' })
    setErrors({})
    setSubmitError('')
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const validationErrors = validateLogin(values)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)
    setSubmitError('')

    try {
      await login(values)
      navigate(requestedPath, { replace: true })
    } catch (error) {
      setSubmitError(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout
      eyebrow="مرحبًا بعودتك"
      title="سجّل الدخول وتابع تقدّمك"
      description="ادخل إلى مساحتك التعليمية واستكمل رحلتك من حيث توقفت."
      footer={
        <p>
          ليس لديك حساب؟{' '}
          <Link to="/register" state={location.state}>أنشئ حسابًا جديدًا</Link>
        </p>
      }
    >
      <div className="demo-credentials">
        <div>
          <span><Icon name="sparkles" size={17} /></span>
          <p><strong>جرّب الحساب التجريبي</strong><small>اسم المستخدم: emilys · كلمة المرور: emilyspass</small></p>
        </div>
        <button type="button" onClick={fillDemoCredentials}>تعبئة البيانات</button>
      </div>

      {submitError && (
        <div className="auth-alert" role="alert">
          <Icon name="alert" size={20} />
          <p>{submitError}</p>
        </div>
      )}

      <form className="auth-form" noValidate onSubmit={handleSubmit}>
        <AuthField
          id="login-identifier"
          name="identifier"
          label="اسم المستخدم أو البريد الإلكتروني"
          icon="user"
          value={values.identifier}
          error={errors.identifier}
          placeholder="أدخل اسم المستخدم أو البريد"
          autoComplete="username"
          onChange={updateField}
        />
        <AuthField
          id="login-password"
          name="password"
          label="كلمة المرور"
          icon="lock"
          type="password"
          value={values.password}
          error={errors.password}
          placeholder="أدخل كلمة المرور"
          autoComplete="current-password"
          onChange={updateField}
        />

        <button className="button button--primary auth-submit" type="submit" disabled={isSubmitting || isInitializing}>
          {isSubmitting ? <><span className="auth-spinner" aria-hidden="true" /> جارٍ تسجيل الدخول...</> : <>تسجيل الدخول <Icon name="arrowLeft" size={19} /></>}
        </button>
      </form>
    </AuthLayout>
  )
}

export default Login
