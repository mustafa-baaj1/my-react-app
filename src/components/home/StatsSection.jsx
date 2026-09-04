import Icon from '../common/Icon'
import { getPlatformStats } from '../../services/courseService'

const numberFormatter = new Intl.NumberFormat('ar-SA')

function StatsSection() {
  const platformStats = getPlatformStats()
  const stats = [
    { value: numberFormatter.format(platformStats.coursesCount), label: 'دورة احترافية', icon: 'book' },
    { value: `+${numberFormatter.format(platformStats.learnersCount)}`, label: 'تسجيل في الدورات', icon: 'users' },
    { value: numberFormatter.format(platformStats.instructorsCount), label: 'مدرّب خبير', icon: 'briefcase' },
    { value: numberFormatter.format(platformStats.learningHours), label: 'ساعة تعليمية', icon: 'clock' },
  ]

  return (
    <section className="stats-section" aria-label="إحصاءات منصة Learnova">
      <div className="container stats-grid">
        {stats.map((stat) => (
          <div className="stat-item" key={stat.label}>
            <span className="stat-item__icon"><Icon name={stat.icon} size={22} /></span>
            <div>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default StatsSection
