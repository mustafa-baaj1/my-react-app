import { Link } from 'react-router-dom'
import Icon from '../common/Icon'
import './CourseCard.css'

const numberFormatter = new Intl.NumberFormat('ar-SA')

function CourseCard({ course }) {
  return (
    <article className="course-card">
      <Link
        className={`course-card__cover course-card__cover--${course.coverTheme}`}
        to={`/courses/${course.id}`}
        aria-label={`عرض دورة ${course.title}`}
      >
        <span className="course-card__cover-grid" aria-hidden="true" />
        <span className="course-card__cover-label" aria-hidden="true">
          {course.coverLabel}
        </span>
        <span className="course-card__level">{course.level}</span>
      </Link>

      <div className="course-card__body">
        <p className="course-card__category">{course.category}</p>
        <h3>
          <Link to={`/courses/${course.id}`}>{course.title}</Link>
        </h3>

        <div className="course-card__instructor">
          <span className="avatar avatar--small" aria-hidden="true">
            {course.instructor.initials}
          </span>
          <div>
            <strong>{course.instructor.name}</strong>
            <span>{course.instructor.title}</span>
          </div>
        </div>

        <div className="course-card__meta" aria-label="معلومات الدورة">
          <span aria-label={`التقييم ${course.rating} من 5 بناء على ${course.reviewsCount} مراجعة`}>
            <Icon name="star" size={16} /> {course.rating}
            <small>({numberFormatter.format(course.reviewsCount)})</small>
          </span>
          <span><Icon name="clock" size={16} /> {course.duration}</span>
          <span><Icon name="book" size={16} /> {course.lessonsCount} درسًا</span>
        </div>

        <div className="course-card__footer">
          <div className="course-card__prices">
            <strong className="course-card__price"><bdi>{course.price} USD</bdi></strong>
            {course.originalPrice && <del><bdi>{course.originalPrice} USD</bdi></del>}
          </div>
          <Link className="course-card__link" to={`/courses/${course.id}`}>
            عرض التفاصيل <Icon name="arrowLeft" size={17} />
          </Link>
        </div>
      </div>
    </article>
  )
}

export default CourseCard
