const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateLogin(values) {
  const errors = {}

  if (!values.identifier.trim()) {
    errors.identifier = 'أدخل اسم المستخدم أو البريد الإلكتروني.'
  } else if (values.identifier.trim().length < 3) {
    errors.identifier = 'يجب أن يتكون اسم المستخدم من 3 أحرف على الأقل.'
  }

  if (!values.password) {
    errors.password = 'أدخل كلمة المرور.'
  } else if (values.password.length < 6) {
    errors.password = 'يجب أن تتكون كلمة المرور من 6 أحرف على الأقل.'
  }

  return errors
}

export function validateRegistration(values) {
  const errors = {}

  if (!values.name.trim()) {
    errors.name = 'أدخل اسمك الكامل.'
  } else if (values.name.trim().length < 3) {
    errors.name = 'يجب أن يتكون الاسم من 3 أحرف على الأقل.'
  }

  if (!values.email.trim()) {
    errors.email = 'أدخل بريدك الإلكتروني.'
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = 'أدخل بريدًا إلكترونيًا صحيحًا.'
  }

  if (!values.password) {
    errors.password = 'أنشئ كلمة مرور.'
  } else if (values.password.length < 8) {
    errors.password = 'يجب أن تتكون كلمة المرور من 8 أحرف على الأقل.'
  } else if (!/\p{L}/u.test(values.password) || !/\d/.test(values.password)) {
    errors.password = 'يجب أن تحتوي كلمة المرور على حرف ورقم واحد على الأقل.'
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'أعد كتابة كلمة المرور.'
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'كلمتا المرور غير متطابقتين.'
  }

  return errors
}
