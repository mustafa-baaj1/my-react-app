import { Link } from 'react-router-dom'
import Icon from '../common/Icon'

function LearningJourney({ items }) {
  return (
    <section className="profile-card profile-journey" aria-labelledby="journey-title">
      <div className="profile-section-heading">
        <div><p>مسارك الشخصي</p><h2 id="journey-title">رحلتي التعليمية</h2></div>
        {items.length > 0 && <Link to="/my-courses">عرض كل دوراتي <Icon name="arrowLeft" size={17} /></Link>}
      </div>

      {items.length === 0 ? (
        <div className="profile-empty">
          <span><Icon name="book" size={27} /></span>
          <h3>لم تبدأ رحلتك بعد</h3>
          <p>اختر دورة تناسب هدفك وستظهر هنا مع تقدمك وآخر درس وصلت إليه.</p>
          <Link className="button button--primary" to="/courses">استكشف الدورات <Icon name="arrowLeft" size={18} /></Link>
        </div>
      ) : (
        <div className="journey-list">
          {items.slice(0, 4).map(({ course, progress, lastLesson, learningPath }) => (
            <article className="journey-item" key={course.id}>
              <span className={`journey-item__visual course-card__cover--${course.coverTheme}`} aria-hidden="true">{course.coverLabel}</span>
              <div className="journey-item__content">
                <div className="journey-item__title"><span>{course.category}</span><h3>{course.title}</h3></div>
                <div className="journey-item__progress-copy">
                  <span>{progress.isComplete ? 'الدورة مكتملة' : lastLesson ? `آخر درس: ${lastLesson.title}` : 'جاهزة للبدء'}</span>
                  <strong>{progress.percentage}٪</strong>
                </div>
                <div className="journey-progress" role="progressbar" aria-label={`التقدم في ${course.title}`} aria-valuemin="0" aria-valuemax="100" aria-valuenow={progress.percentage}>
                  <span style={{ width: `${progress.percentage}%` }} />
                </div>
                <div className="journey-item__footer">
                  <span><Icon name="check" size={15} /> {progress.completedCount} من {progress.totalLessons} درسًا</span>
                  <Link to={learningPath}>{progress.isComplete ? 'مراجعة الدورة' : progress.percentage > 0 ? 'متابعة التعلم' : 'ابدأ التعلم'} <Icon name="arrowLeft" size={16} /></Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default LearningJourney
