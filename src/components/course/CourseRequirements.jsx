import Icon from '../common/Icon'

function CourseRequirements({ requirements }) {
  return (
    <section className="course-content-card course-requirements" aria-labelledby="requirements-title">
      <header className="course-section-heading">
        <span><Icon name="check" size={22} /></span>
        <div>
          <p>قبل أن تبدأ</p>
          <h2 id="requirements-title">متطلبات الدورة</h2>
        </div>
      </header>
      <ul>
        {requirements.map((requirement) => (
          <li key={requirement}><span aria-hidden="true" />{requirement}</li>
        ))}
      </ul>
    </section>
  )
}

export default CourseRequirements
