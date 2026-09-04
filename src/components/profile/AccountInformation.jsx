import { useState } from 'react'
import Icon from '../common/Icon'

function AccountInformation({ user, onUpdateDisplayName }) {
  const currentName = user.name || [user.firstName, user.lastName].filter(Boolean).join(' ')
  const [displayName, setDisplayName] = useState(currentName)
  const [feedback, setFeedback] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setFeedback(null)
    try {
      onUpdateDisplayName(displayName)
      setFeedback({ type: 'success', text: 'تم تحديث الاسم بنجاح.' })
      setIsEditing(false)
    } catch (error) {
      setFeedback({ type: 'error', text: error.message })
    }
  }

  return (
    <section className="profile-card account-card" aria-labelledby="account-title">
      <div className="profile-section-heading">
        <div><p>بيانات الحساب</p><h2 id="account-title">معلومات الحساب</h2></div>
        {user.isLocalDemo && !isEditing && <button type="button" onClick={() => setIsEditing(true)}>تعديل الاسم</button>}
      </div>

      <dl className="account-details">
        <div><dt>الاسم</dt><dd>{currentName || 'غير متوفر'}</dd></div>
        <div><dt>البريد الإلكتروني</dt><dd><bdi>{user.email || 'غير متوفر'}</bdi></dd></div>
        <div><dt>اسم المستخدم</dt><dd><bdi>{user.username || 'غير متوفر'}</bdi></dd></div>
        <div><dt>نوع الحساب</dt><dd>{user.isLocalDemo ? 'محلي تجريبي' : 'DummyJSON تجريبي'}</dd></div>
      </dl>

      {user.isLocalDemo && isEditing && (
        <form className="account-edit" onSubmit={handleSubmit} noValidate>
          <label htmlFor="profile-display-name">اسم العرض</label>
          <div><input id="profile-display-name" value={displayName} onChange={(event) => setDisplayName(event.target.value)} minLength="2" maxLength="60" autoComplete="name" /><button className="button button--primary button--small" type="submit">حفظ</button><button className="button button--secondary button--small" type="button" onClick={() => { setDisplayName(currentName); setIsEditing(false); setFeedback(null) }}>إلغاء</button></div>
        </form>
      )}

      {feedback && <div className={`account-feedback account-feedback--${feedback.type}`} role={feedback.type === 'error' ? 'alert' : 'status'}><Icon name={feedback.type === 'error' ? 'alert' : 'check'} size={17} /> {feedback.text}</div>}
      {!user.isLocalDemo && <p className="account-note"><Icon name="shield" size={17} /> بيانات حساب DummyJSON للعرض فقط ولا يتم تعديلها محليًا.</p>}
    </section>
  )
}

export default AccountInformation
