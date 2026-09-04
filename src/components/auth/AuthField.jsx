import { useState } from 'react'
import Icon from '../common/Icon'

function AuthField({ id, label, icon, type = 'text', error, ...inputProps }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const isPassword = type === 'password'
  const resolvedType = isPassword && isPasswordVisible ? 'text' : type
  const errorId = `${id}-error`

  return (
    <div className="auth-field">
      <label htmlFor={id}>{label}</label>
      <div className={`auth-input${error ? ' auth-input--error' : ''}`}>
        <Icon name={icon} size={19} />
        <input
          id={id}
          type={resolvedType}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          {...inputProps}
        />
        {isPassword && (
          <button
            type="button"
            className="password-toggle"
            aria-label={isPasswordVisible ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
            aria-pressed={isPasswordVisible}
            onClick={() => setIsPasswordVisible((visible) => !visible)}
          >
            <Icon name={isPasswordVisible ? 'eyeOff' : 'eye'} size={19} />
          </button>
        )}
      </div>
      {error && <p className="auth-field__error" id={errorId}>{error}</p>}
    </div>
  )
}

export default AuthField
