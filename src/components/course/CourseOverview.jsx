import Icon from '../common/Icon'

function CourseOverview({ course }) {
  return (
    <>
      <section className="course-content-card course-outcomes" aria-labelledby="outcomes-title">
        <header className="course-section-heading">
          <span><Icon name="target" size={22} /></span>
          <div>
            <p>نتائج واضحة وقابلة للتطبيق</p>
            <h2 id="outcomes-title">ماذا ستتعلّم؟</h2>
          </div>
        </header>
        <ul>
          {course.outcomes.map((outcome) => (
            <li key={outcome}><Icon name="check" size={19} /> <span>{outcome}</span></li>
          ))}
        </ul>
      </section>

      <section className="course-text-section" aria-labelledby="about-course-title">
        <span className="course-section-kicker">نظرة شاملة</span>
        <h2 id="about-course-title">عن هذه الدورة</h2>
        <p>{course.fullDescription}</p>
      </section>
    </>
  )
}

export default CourseOverview
