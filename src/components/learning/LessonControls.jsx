import { Link } from 'react-router-dom'
import Icon from '../common/Icon'

function LessonControls({ course, previousLesson, nextLesson, isCompleted, courseCompleted, onComplete, error }) {
  return (
    <div className="lesson-controls">
      {courseCompleted && (
        <div className="course-complete-banner" role="status">
          <span><Icon name="check" size={23} /></span>
          <div><strong>أحسنت! أكملت الدورة بنجاح</strong><p>أنهيت جميع دروس الدورة، ويمكنك مراجعتها في أي وقت.</p></div>
        </div>
      )}

      {error && <div className="learning-inline-error" role="alert"><Icon name="alert" size={18} /> {error}</div>}

      <div className="lesson-controls__row">
        {previousLesson ? (
          <Link className="button button--secondary lesson-nav lesson-nav--previous" to={`/learn/${course.id}/${previousLesson.id}`}>
            <Icon name="arrowLeft" size={18} /> <span><small>الدرس السابق</small><strong>{previousLesson.title}</strong></span>
          </Link>
        ) : <span className="lesson-nav-placeholder" />}

        <button className={`button lesson-complete${isCompleted ? ' lesson-complete--done' : ''}`} type="button" onClick={onComplete} disabled={isCompleted}>
          <Icon name="check" size={19} /> {isCompleted ? 'تم إكمال الدرس' : 'إكمال الدرس'}
        </button>

        {nextLesson ? (
          <Link className="button button--secondary lesson-nav lesson-nav--next" to={`/learn/${course.id}/${nextLesson.id}`}>
            <span><small>الدرس التالي</small><strong>{nextLesson.title}</strong></span><Icon name="arrowLeft" size={18} />
          </Link>
        ) : <span className="lesson-nav-placeholder" />}
      </div>
      <p className="lesson-controls__hint">يُحفظ تقدمك تلقائيًا على هذا الجهاز.</p>
    </div>
  )
}

export default LessonControls
