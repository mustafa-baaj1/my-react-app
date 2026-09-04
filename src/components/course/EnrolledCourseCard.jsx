import { Link } from 'react-router-dom'
import Icon from '../common/Icon'
import './CourseCard.css'

const dateFormatter = new Intl.DateTimeFormat('ar-SA', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

function EnrolledCourseCard({ course, enrollment, progress, learningPath }) {
  const enrollmentDate = dateFormatter.format(new Date(enrollment.enrolledAt))

  return (
    <article className="course-card enrolled-course-card">
      <Link
        className={`course-card__cover course-card__cover--${course.coverTheme}`}
        to={`/courses/${course.id}`}
        aria-label={`عرض تفاصيل دورة ${course.title}`}
      >
        <span className="course-card__cover-grid" aria-hidden="true" />
        <span className="course-card__cover-label" aria-hidden="true">{course.coverLabel}</span>
        <span className="course-card__level">{course.level}</span>
        <span className="enrolled-course-card__badge"><Icon name="check" size={14} /> مسجّل</span>
      </Link>

      <div className="course-card__body">
        <p className="course-card__category">{course.category}</p>
        <h3><Link to={`/courses/${course.id}`}>{course.title}</Link></h3>

        <div className="course-card__instructor">
          <span className="avatar avatar--small" aria-hidden="true">{course.instructor.initials}</span>
          <div><strong>{course.instructor.name}</strong><span>{course.instructor.title}</span></div>
        </div>

        <div className="enrolled-course-card__facts" aria-label="معلومات الدورة">
          <span><Icon name="clock" size={16} /> {course.duration}</span>
          <span><Icon name="book" size={16} /> {course.lessonsCount} درسًا</span>
          <span><Icon name="target" size={16} /> {course.level}</span>
        </div>

        <div className="enrolled-course-card__progress">
          <div className="enrolled-course-card__progress-heading">
            <span>تقدّمك في الدورة</span>
            <strong>{progress.percentage}٪</strong>
          </div>
          <div
            className="enrolled-course-card__progress-track"
            role="progressbar"
            aria-label={`التقدم في دورة ${course.title}`}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={progress.percentage}
          >
            <span style={{ width: `${progress.percentage}%` }} />
          </div>
          <small>{progress.isComplete ? 'أكملت جميع دروس الدورة.' : `${progress.completedCount} من ${progress.totalLessons} درسًا مكتملًا`}</small>
        </div>

        <div className="enrolled-course-card__footer">
          <span className="enrolled-course-card__date">
            <Icon name="calendar" size={16} /> سُجّلت في {enrollmentDate}
          </span>
          <Link className="button button--primary" to={learningPath}>
            {progress.percentage > 0 ? 'متابعة التعلم' : 'ابدأ التعلم'}
            <Icon name="arrowLeft" size={18} />
          </Link>
        </div>
      </div>
    </article>
  )
}

export default EnrolledCourseCard
