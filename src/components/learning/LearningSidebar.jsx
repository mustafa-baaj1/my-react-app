import { Link } from 'react-router-dom'
import Icon from '../common/Icon'

function LearningSidebar({ course, activeLessonId, completedLessonIds }) {
  const completedSet = new Set(completedLessonIds)

  return (
    <aside className="learning-sidebar" aria-labelledby="curriculum-title">
      <div className="learning-sidebar__heading">
        <div><p>محتوى الدورة</p><h2 id="curriculum-title">المنهج الدراسي</h2></div>
        <span>{course.lessonsCount} درسًا</span>
      </div>
      <nav className="learning-sidebar__sections" aria-label="دروس الدورة">
        {course.sections.map((section, sectionIndex) => {
          const containsActiveLesson = section.lessons.some((lesson) => lesson.id === activeLessonId)
          const sectionCompleted = section.lessons.filter((lesson) => completedSet.has(lesson.id)).length

          return (
            <details className="learning-section" key={section.id} open={containsActiveLesson || sectionIndex === 0}>
              <summary>
                <span><strong>{section.title}</strong><small>{sectionCompleted}/{section.lessons.length} مكتمل</small></span>
                <Icon name="chevronDown" size={18} />
              </summary>
              <ol>
                {section.lessons.map((lesson) => {
                  const isActive = lesson.id === activeLessonId
                  const isCompleted = completedSet.has(lesson.id)
                  return (
                    <li key={lesson.id}>
                      <Link
                        className={`${isActive ? 'learning-lesson--active' : ''}${isCompleted ? ' learning-lesson--completed' : ''}`}
                        to={`/learn/${course.id}/${lesson.id}`}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        <span className="learning-lesson__status" aria-hidden="true">
                          <Icon name={isCompleted ? 'check' : lesson.type === 'فيديو' ? 'play' : 'book'} size={15} />
                        </span>
                        <span className="learning-lesson__copy"><strong>{lesson.title}</strong><small>{lesson.type} · {lesson.duration}</small></span>
                      </Link>
                    </li>
                  )
                })}
              </ol>
            </details>
          )
        })}
      </nav>
    </aside>
  )
}

export default LearningSidebar
