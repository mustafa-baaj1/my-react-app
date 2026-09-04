import { Link } from 'react-router-dom'
import Icon from '../common/Icon'

function DetailsLoadingState() {
  return (
    <div className="details-state details-state--loading" aria-busy="true">
      <div className="container details-loading-grid" aria-hidden="true">
        <div>
          <span className="details-skeleton details-skeleton--label" />
          <span className="details-skeleton details-skeleton--title" />
          <span className="details-skeleton details-skeleton--title-short" />
          <span className="details-skeleton details-skeleton--text" />
        </div>
        <span className="details-skeleton details-skeleton--visual" />
      </div>
      <span className="sr-only">جارٍ تحميل تفاصيل الدورة.</span>
    </div>
  )
}

function DetailsMessage({ type, onRetry }) {
  const isNotFound = type === 'not-found'

  return (
    <section className="details-state">
      <div className="details-state__message" role={isNotFound ? 'status' : 'alert'}>
        <span className="details-state__icon">
          <Icon name={isNotFound ? 'search' : 'alert'} size={30} />
        </span>
        <p className="eyebrow">{isNotFound ? 'الدورة غير موجودة' : 'تعذّر تحميل الدورة'}</p>
        <h1>{isNotFound ? 'لم نعثر على الدورة التي تبحث عنها' : 'حدث خطأ غير متوقع'}</h1>
        <p>
          {isNotFound
            ? 'ربما تغيّر الرابط أو لم تعد هذه الدورة متاحة. يمكنك العودة إلى الكتالوج واستكشاف بقية الدورات.'
            : 'لم نتمكن من تجهيز تفاصيل الدورة حاليًا. حاول إعادة التحميل.'}
        </p>
        <div className="details-state__actions">
          {!isNotFound && (
            <button className="button button--primary" type="button" onClick={onRetry}>
              <Icon name="refresh" size={18} /> إعادة المحاولة
            </button>
          )}
          <Link className={`button ${isNotFound ? 'button--primary' : 'button--secondary'}`} to="/courses">
            العودة إلى الدورات
          </Link>
        </div>
      </div>
    </section>
  )
}

function CourseDetailsState({ status, onRetry }) {
  if (status === 'loading') return <DetailsLoadingState />
  if (status === 'not-found') return <DetailsMessage type="not-found" />
  if (status === 'error') return <DetailsMessage type="error" onRetry={onRetry} />
  return null
}

export default CourseDetailsState
