import Icon from '../common/Icon'

function getDisplayName(user) {
  return user.name || [user.firstName, user.lastName].filter(Boolean).join(' ') || user.username || 'متعلّم'
}

function ProfileHeader({ user, onLogout }) {
  const displayName = getDisplayName(user)
  const initial = displayName.trim().charAt(0).toLocaleUpperCase('ar')

  return (
    <header className="profile-hero">
      <span className="profile-hero__glow" aria-hidden="true" />
      <div className="container profile-hero__content">
        <p className="profile-hero__eyebrow">لوحة المتعلّم</p>
        <div className="profile-identity">
          <span className="profile-avatar" aria-hidden="true">{initial}</span>
          <div className="profile-identity__copy">
            <span>{user.isLocalDemo ? 'حساب Learnova تجريبي' : 'حساب متصل عبر DummyJSON'}</span>
            <h1>{displayName}</h1>
            <p>{user.email}</p>
          </div>
          <button className="profile-logout" type="button" onClick={onLogout}>
            <Icon name="logout" size={18} /> تسجيل الخروج
          </button>
        </div>
      </div>
    </header>
  )
}

export default ProfileHeader
