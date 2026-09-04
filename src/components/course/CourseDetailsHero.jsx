import { Link } from 'react-router-dom'
import Icon from '../common/Icon'

const numberFormatter = new Intl.NumberFormat('ar-SA')

function CourseDetailsHero({ course }) {
  return (
    <header className="course-details-hero">
      <div className="course-details-hero__glow" aria-hidden="true" />
      <div className="container">
        <nav className="breadcrumb breadcrumb--course" aria-label="مسار التنقل">
          <Link to="/">الرئيسية</Link>
          <Icon name="arrowLeft" size={15} />
          <Link to="/courses">الدورات</Link>
          <Icon name="arrowLeft" size={15} />
          <span aria-current="page">{course.title}</span>
        </nav>

        <div className="course-details-hero__grid">
          <div className="course-details-hero__content">
            <div className="course-details-hero__badges">
              <span>{course.category}</span>
              <span>{course.level}</span>
            </div>
            <h1>{course.title}</h1>
            <p>{course.shortDescription}</p>

            <div className="course-details-hero__social-proof">
              <span className="course-rating" aria-label={`تقييم الدورة ${course.rating} من 5`}>
                <Icon name="star" size={18} />
                <strong>{course.rating}</strong>
                <u>({numberFormatter.format(course.reviewsCount)} مراجعة)</u>
              </span>
              <span><Icon name="users" size={18} /> {numberFormatter.format(course.studentsCount)} متعلّمًا</span>
            </div>

            <div className="course-details-hero__instructor">
              <span className="avatar avatar--instructor" aria-hidden="true">
                {course.instructor.initials}
              </span>
              <div>
                <small>يقدّمها</small>
                <strong>{course.instructor.name}</strong>
                <span>{course.instructor.title}</span>
              </div>
            </div>
          </div>

          <div
            className={`course-details-visual course-card__cover--${course.coverTheme}`}
            role="img"
            aria-label={`غلاف دورة ${course.title}`}
          >
            <span className="course-card__cover-grid" aria-hidden="true" />
            <span className="course-details-visual__ring" aria-hidden="true" />
            <span className="course-details-visual__label" aria-hidden="true">{course.coverLabel}</span>
            <span className="course-details-visual__caption">مسار تطبيقي من Learnova</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default CourseDetailsHero
