import { Link } from 'react-router-dom'
import Icon from '../common/Icon'

function MyCoursesState({ status, onRetry }) {
  if (status === 'loading') {
    return (
      <div className="my-courses-skeleton" aria-label="جارٍ تحميل دوراتك" aria-busy="true">
        {[1, 2, 3].map((item) => (
          <div className="my-courses-skeleton__card" key={item} aria-hidden="true">
            <span className="my-courses-skeleton__cover" />
            <span className="my-courses-skeleton__line my-courses-skeleton__line--short" />
            <span className="my-courses-skeleton__line" />
            <span className="my-courses-skeleton__line my-courses-skeleton__line--medium" />
          </div>
        ))}
      </div>
    )
  }

  const isError = status === 'error'

  return (
    <section className="my-courses-state" aria-labelledby="my-courses-state-title">
      <span className={`my-courses-state__icon${isError ? ' my-courses-state__icon--error' : ''}`} aria-hidden="true">
        <Icon name={isError ? 'alert' : 'book'} size={30} />
      </span>
      <p className="eyebrow">{isError ? 'تعذّر التحميل' : 'ابدأ رحلتك'}</p>
      <h2 id="my-courses-state-title">
        {isError ? 'لم نتمكن من تحميل دوراتك' : 'مساحتك التعليمية جاهزة لك'}
      </h2>
      <p>
        {isError
          ? 'حدث خطأ أثناء قراءة دوراتك المسجّلة. حاول مرة أخرى.'
          : 'لم تسجّل في أي دورة بعد. استكشف الدورات واختر ما يساعدك على الوصول إلى هدفك التالي.'}
      </p>
      {isError ? (
        <button className="button button--secondary" type="button" onClick={onRetry}>
          <Icon name="refresh" size={18} /> إعادة المحاولة
        </button>
      ) : (
        <Link className="button button--primary" to="/courses">
          استكشف الدورات <Icon name="arrowLeft" size={18} />
        </Link>
      )}
    </section>
  )
}

export default MyCoursesState
