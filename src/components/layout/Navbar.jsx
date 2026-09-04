import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import Icon from '../common/Icon'

const navigationItems = [
  { to: '/', label: 'الرئيسية', end: true },
  { to: '/courses', label: 'الدورات' },
  { to: '/my-courses', label: 'دوراتي' },
  { to: '/profile', label: 'الملف الشخصي' },
]

function Navbar() {
  const navigate = useNavigate()
  const { user, isAuthenticated, isInitializing, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const closeMenu = () => setIsOpen(false)
  const displayName = user?.firstName || user?.name || 'متعلّم'
  const userInitial = displayName.trim().charAt(0).toLocaleUpperCase('ar')

  function handleLogout() {
    logout()
    closeMenu()
    navigate('/', { replace: true })
  }

  function renderAuthActions(isMobile = false) {
    const containerClass = `nav-actions nav-actions--${isMobile ? 'mobile' : 'desktop'}`

    if (isInitializing) {
      return (
        <div className={containerClass} aria-label="جارٍ تحميل بيانات الحساب">
          <span className="nav-account-skeleton" aria-hidden="true" />
        </div>
      )
    }

    if (!isAuthenticated) {
      return (
        <div className={containerClass}>
          <Link className="button button--ghost button--small" to="/login" onClick={closeMenu}>
            تسجيل الدخول
          </Link>
          <Link className="button button--primary button--small" to="/register" onClick={closeMenu}>
            إنشاء حساب
          </Link>
        </div>
      )
    }

    return (
      <div className={`${containerClass} nav-actions--authenticated`}>
        <Link className="nav-user" to="/profile" onClick={closeMenu} aria-label={`الملف الشخصي لـ ${displayName}`}>
          <span className="nav-user__avatar" aria-hidden="true">{userInitial}</span>
          <span className="nav-user__copy"><small>مرحبًا بك</small><strong>{displayName}</strong></span>
        </Link>
        <button className="nav-logout" type="button" onClick={handleLogout} aria-label="تسجيل الخروج">
          <Icon name="logout" size={18} />
          <span>{isMobile ? 'تسجيل الخروج' : ''}</span>
        </button>
      </div>
    )
  }

  return (
    <header className="site-header">
      <div className="container navbar">
        <Link className="brand" to="/" onClick={closeMenu} aria-label="Learnova - الصفحة الرئيسية">
          <span className="brand-mark" aria-hidden="true">ل</span>
          <span className="brand-copy">Learnova<small>تعلّم بلا حدود</small></span>
        </Link>

        <button
          className={`menu-toggle${isOpen ? ' menu-toggle--open' : ''}`}
          type="button"
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
          aria-label={isOpen ? 'إغلاق قائمة التنقل' : 'فتح قائمة التنقل'}
          onClick={() => setIsOpen((current) => !current)}
        >
          <span /><span /><span />
        </button>

        <nav
          id="primary-navigation"
          className={`nav-links${isOpen ? ' nav-links--open' : ''}`}
          aria-label="روابط الموقع"
        >
          {navigationItems.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => `nav-link${isActive ? ' nav-link--active' : ''}`}
              onClick={closeMenu}
            >
              {label}
            </NavLink>
          ))}
          {renderAuthActions(true)}
        </nav>

        {renderAuthActions()}
      </div>
    </header>
  )
}

export default Navbar
