import { Link } from 'react-router-dom'
import Icon from '../common/Icon'

const dateFormatter = new Intl.DateTimeFormat('ar-SA', { day: 'numeric', month: 'short', year: 'numeric' })

function RecentActivity({ activities }) {
  const iconNames = { enrollment: 'layers', learning: 'play', completion: 'check' }

  return (
    <section className="profile-card activity-card" aria-labelledby="activity-title">
      <div className="profile-section-heading"><div><p>آخر المستجدات</p><h2 id="activity-title">النشاط الأخير</h2></div></div>
      {activities.length === 0 ? (
        <div className="activity-empty"><span><Icon name="clock" size={25} /></span><h3>لا يوجد نشاط بعد</h3><p>سيظهر هنا تسجيلك في الدورات وتقدمك في التعلم.</p></div>
      ) : (
        <ol className="activity-list">
          {activities.map((activity) => (
            <li key={activity.id}>
              <span className={`activity-icon activity-icon--${activity.type}`} aria-hidden="true"><Icon name={iconNames[activity.type]} size={17} /></span>
              <div><Link to={activity.path}>{activity.title}</Link><p>{activity.description}</p><time dateTime={activity.date}>{dateFormatter.format(new Date(activity.date))}</time></div>
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}

export default RecentActivity
