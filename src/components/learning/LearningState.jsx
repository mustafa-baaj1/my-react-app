import { Link } from 'react-router-dom'
import Icon from '../common/Icon'

const stateContent = {
  error: ['تعذّر تحميل مساحة التعلم', 'حدث خطأ غير متوقع. حاول تحميل الدورة مرة أخرى.'],
  'not-found': ['الدورة غير موجودة', 'قد يكون رابط الدورة غير صحيح أو لم تعد الدورة متاحة.'],
  'lesson-not-found': ['الدرس غير موجود', 'الدرس المطلوب غير موجود ضمن منهج هذه الدورة.'],
  'not-enrolled': ['هذه الدورة ليست ضمن دوراتك', 'سجّل في الدورة أولًا لتتمكن من مشاهدة الدروس وحفظ تقدمك.'],
}

function LearningState({ status, course, onRetry }) {
  if (status === 'loading') {
    return (
      <div className="learning-state learning-state--loading" aria-label="جارٍ تحميل مساحة التعلم" aria-busy="true">
        <div className="container learning-state__skeleton" aria-hidden="true">
          <span /><div><i /><i /><i /></div>
        </div>
      </div>
    )
  }

  const [title, description] = stateContent[status] ?? stateContent.error
  return (
    <section className="learning-state">
      <div className="learning-state__card">
        <span className={`learning-state__icon${status === 'not-enrolled' ? '' : ' learning-state__icon--error'}`} aria-hidden="true">
          <Icon name={status === 'not-enrolled' ? 'lock' : 'alert'} size={31} />
        </span>
        <p className="eyebrow">مساحة التعلم</p>
        <h1>{title}</h1>
        <p>{description}</p>
        <div className="learning-state__actions">
          {status === 'error' && <button className="button button--primary" type="button" onClick={onRetry}><Icon name="refresh" size={18} /> إعادة المحاولة</button>}
          {status === 'not-enrolled' && course && <Link className="button button--primary" to={`/courses/${course.id}`}>عرض الدورة <Icon name="arrowLeft" size={18} /></Link>}
          {status === 'lesson-not-found' && course && <Link className="button button--primary" to={`/learn/${course.id}`}>الدرس الأول <Icon name="arrowLeft" size={18} /></Link>}
          <Link className="button button--secondary" to="/my-courses">العودة إلى دوراتي</Link>
        </div>
      </div>
    </section>
  )
}

export default LearningState
