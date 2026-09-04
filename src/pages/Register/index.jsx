import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import AuthField from '../../components/auth/AuthField'
import AuthLayout from '../../components/auth/AuthLayout'
import Icon from '../../components/common/Icon'
import useAuth from '../../hooks/useAuth'
import { getRequestedPath } from '../../utils/authNavigation'
import { validateRegistration } from '../../utils/authValidation'
import '../../styles/auth.css'

const initialValues = { name: '', email: '', password: '', confirmPassword: '' }

function Register() {
  const location = useLocation()
  const navigate = useNavigate()
  const { register, isAuthenticated, isInitializing } = useAuth()
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

  async function handleSubmit(event) {
    event.preventDefault()
    const validationErrors = validateRegistration(values)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)
    setSubmitError('')

    try {
      await register({ name: values.name, email: values.email, password: values.password })
      navigate(requestedPath, { replace: true })
    } catch (error) {
      setSubmitError(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout
      eyebrow="ابدأ رحلتك"
      title="أنشئ حسابك في Learnova"
      description="خطوة واحدة تفصلك عن تجربة تعلّم عربية صُممت حول أهدافك."
      footer={
        <p>
          لديك حساب بالفعل؟{' '}
          <Link to="/login" state={location.state}>سجّل الدخول</Link>
        </p>
      }
    >
      {submitError && (
        <div className="auth-alert" role="alert">
          <Icon name="alert" size={20} />
          <p>{submitError}</p>
        </div>
      )}

      <form className="auth-form" noValidate onSubmit={handleSubmit}>
        <AuthField
          id="register-name"
          name="name"
          label="الاسم الكامل"
          icon="user"
          value={values.name}
          error={errors.name}
          placeholder="اكتب اسمك الكامل"
          autoComplete="name"
          onChange={updateField}
        />
        <AuthField
          id="register-email"
          name="email"
          label="البريد الإلكتروني"
          icon="mail"
          type="email"
          value={values.email}
          error={errors.email}
          placeholder="name@example.com"
          autoComplete="email"
          inputMode="email"
          dir="ltr"
          onChange={updateField}
        />
        <div className="auth-form__columns">
          <AuthField
            id="register-password"
            name="password"
            label="كلمة المرور"
            icon="lock"
            type="password"
            value={values.password}
            error={errors.password}
            placeholder="8 أحرف على الأقل"
            autoComplete="new-password"
            onChange={updateField}
          />
          <AuthField
            id="register-confirm-password"
            name="confirmPassword"
            label="تأكيد كلمة المرور"
            icon="lock"
            type="password"
            value={values.confirmPassword}
            error={errors.confirmPassword}
            placeholder="أعد كتابة كلمة المرور"
            autoComplete="new-password"
            onChange={updateField}
          />
        </div>
        <p className="password-hint">استخدم 8 أحرف على الأقل، تتضمن حرفًا ورقمًا.</p>

        <button className="button button--primary auth-submit" type="submit" disabled={isSubmitting || isInitializing}>
          {isSubmitting ? <><span className="auth-spinner" aria-hidden="true" /> جارٍ إنشاء الحساب...</> : <>إنشاء الحساب <Icon name="arrowLeft" size={19} /></>}
        </button>
      </form>
      <p className="local-registration-note">
        <Icon name="shield" size={17} /> حساب تجريبي محفوظ على هذا الجهاز، ولا تُخزّن كلمة المرور كنص مقروء.
      </p>
    </AuthLayout>
  )
}

export default Register
