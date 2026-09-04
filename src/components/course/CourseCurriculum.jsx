import Icon from '../common/Icon'

const numberFormatter = new Intl.NumberFormat('ar-SA')

function getSectionMinutes(section) {
  return section.lessons.reduce((total, lesson) => {
    const minutes = Number.parseInt(lesson.duration, 10)
    return total + (Number.isNaN(minutes) ? 0 : minutes)
  }, 0)
}

function formatMinutes(minutes) {
  if (minutes < 60) return `${numberFormatter.format(minutes)} دقيقة`

  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return remainingMinutes
    ? `${numberFormatter.format(hours)} س و${numberFormatter.format(remainingMinutes)} د`
    : `${numberFormatter.format(hours)} ساعة`
}

function CourseCurriculum({ course }) {
  return (
    <section className="course-curriculum" aria-labelledby="curriculum-title">
      <div className="course-curriculum__heading">
        <div>
          <span className="course-section-kicker">محتوى منظم خطوة بخطوة</span>
          <h2 id="curriculum-title">منهج الدورة</h2>
        </div>
        <p>
          {numberFormatter.format(course.sections.length)} أقسام ·{' '}
          {numberFormatter.format(course.lessonsCount)} درسًا · {course.duration}
        </p>
      </div>

      <div className="curriculum-accordion">
        {course.sections.map((section, sectionIndex) => (
          <details className="curriculum-section" key={section.id} open={sectionIndex === 0}>
            <summary>
              <span className="curriculum-section__number" aria-hidden="true">
                {numberFormatter.format(sectionIndex + 1)}
              </span>
              <span className="curriculum-section__title">
                <strong>{section.title}</strong>
                <small>
                  {numberFormatter.format(section.lessons.length)} دروس ·{' '}
                  {formatMinutes(getSectionMinutes(section))}
                </small>
              </span>
              <Icon className="curriculum-section__chevron" name="chevronDown" size={20} />
            </summary>

            <ol className="lesson-list">
              {section.lessons.map((lesson, lessonIndex) => (
                <li key={lesson.id}>
                  <span className="lesson-list__icon" aria-hidden="true">
                    <Icon name={lesson.type === 'فيديو' ? 'play' : 'check'} size={17} />
                  </span>
                  <span className="lesson-list__content">
                    <strong>{lesson.title}</strong>
                    <small>{lesson.type}</small>
                  </span>
                  {lesson.isPreview && <span className="preview-badge">معاينة</span>}
                  <time>{lesson.duration}</time>
                  <span className="sr-only">الدرس {numberFormatter.format(lessonIndex + 1)}</span>
                </li>
              ))}
            </ol>
          </details>
        ))}
      </div>
    </section>
  )
}

export default CourseCurriculum
