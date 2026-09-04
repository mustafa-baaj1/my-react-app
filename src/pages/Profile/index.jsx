import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AccountInformation from '../../components/profile/AccountInformation'
import LearningJourney from '../../components/profile/LearningJourney'
import ProfileHeader from '../../components/profile/ProfileHeader'
import ProfileStats from '../../components/profile/ProfileStats'
import RecentActivity from '../../components/profile/RecentActivity'
import Icon from '../../components/common/Icon'
import useAuth from '../../hooks/useAuth'
import { getProfileDashboard } from '../../services/profileService'
import './Profile.css'

function Profile() {
  const navigate = useNavigate()
  const { user, logout, updateDisplayName } = useAuth()
  const [requestAttempt, setRequestAttempt] = useState(0)
  const [result, setResult] = useState({ userId: null, status: 'loading', dashboard: null })

  useEffect(() => {
    let ignoreResult = false

    getProfileDashboard(user)
      .then((dashboard) => {
        if (!ignoreResult) setResult({ userId: user.id, status: 'success', dashboard })
      })
      .catch(() => {
        if (!ignoreResult) setResult({ userId: user.id, status: 'error', dashboard: null })
      })

    return () => {
      ignoreResult = true
    }
  }, [requestAttempt, user])

  const pageStatus = result.userId === user.id ? result.status : 'loading'

  function handleLogout() {
    logout()
    navigate('/', { replace: true })
  }

  return (
    <div className="profile-page">
      <ProfileHeader user={user} onLogout={handleLogout} />

      <div className="profile-main">
        <div className="container">
          {pageStatus === 'loading' && (
            <div className="profile-loading" aria-label="جارٍ تحميل لوحة الملف الشخصي" aria-busy="true">
              <div className="profile-loading__stats" aria-hidden="true">{[1, 2, 3, 4, 5].map((item) => <span key={item} />)}</div>
              <div className="profile-loading__content" aria-hidden="true"><span /><span /></div>
            </div>
          )}

          {pageStatus === 'error' && (
            <section className="profile-error" aria-labelledby="profile-error-title">
              <span aria-hidden="true"><Icon name="alert" size={29} /></span>
              <h2 id="profile-error-title">تعذّر تحميل لوحة حسابك</h2>
              <p>لم نتمكن من قراءة بيانات رحلتك التعليمية. حاول مرة أخرى.</p>
              <button className="button button--primary" type="button" onClick={() => setRequestAttempt((attempt) => attempt + 1)}><Icon name="refresh" size={18} /> إعادة المحاولة</button>
            </section>
          )}

          {pageStatus === 'success' && (
            <>
              <ProfileStats stats={result.dashboard.stats} />
              <div className="profile-dashboard-grid">
                <LearningJourney items={result.dashboard.journey} />
                <div className="profile-dashboard-side">
                  <RecentActivity activities={result.dashboard.activities} />
                  <AccountInformation user={user} onUpdateDisplayName={updateDisplayName} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
