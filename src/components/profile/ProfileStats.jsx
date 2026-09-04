import Icon from '../common/Icon'

const numberFormatter = new Intl.NumberFormat('ar-SA')

function ProfileStats({ stats }) {
  const items = [
    { label: 'الدورات المسجّلة', value: stats.enrolledCount, icon: 'layers', theme: 'violet' },
    { label: 'الدورات المكتملة', value: stats.completedCount, icon: 'check', theme: 'teal' },
    { label: 'قيد التعلّم', value: stats.inProgressCount, icon: 'play', theme: 'blue' },
    { label: 'متوسط التقدم', value: `${numberFormatter.format(stats.averageProgress)}٪`, icon: 'chart', theme: 'gold' },
    { label: 'الدروس المكتملة', value: stats.completedLessonsCount, icon: 'book', theme: 'coral' },
  ]

  return (
    <section className="profile-stats" aria-labelledby="profile-stats-title">
      <h2 id="profile-stats-title" className="sr-only">إحصاءات التعلم</h2>
      {items.map((item) => (
        <article className="profile-stat" key={item.label}>
          <span className={`profile-stat__icon profile-stat__icon--${item.theme}`} aria-hidden="true"><Icon name={item.icon} size={21} /></span>
          <div><strong>{typeof item.value === 'number' ? numberFormatter.format(item.value) : item.value}</strong><span>{item.label}</span></div>
        </article>
      ))}
    </section>
  )
}

export default ProfileStats
