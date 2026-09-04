import Icon from '../common/Icon'

function LoadingState() {
  return (
    <div className="catalog-skeleton" aria-label="جارٍ تحميل الدورات" aria-busy="true">
      {Array.from({ length: 6 }, (_, index) => (
        <div className="skeleton-card" key={index} aria-hidden="true">
          <span className="skeleton-card__cover" />
          <span className="skeleton-line skeleton-line--short" />
          <span className="skeleton-line" />
          <span className="skeleton-line skeleton-line--medium" />
          <span className="skeleton-line" />
        </div>
      ))}
      <span className="sr-only">جارٍ تحميل قائمة الدورات، يرجى الانتظار.</span>
    </div>
  )
}

function ErrorState({ onRetry }) {
  return (
    <div className="catalog-message" role="alert">
      <span className="catalog-message__icon catalog-message__icon--error">
        <Icon name="alert" size={28} />
      </span>
      <h2>تعذّر تحميل الدورات</h2>
      <p>حدث خطأ غير متوقع أثناء تجهيز الكتالوج. حاول مرة أخرى بعد قليل.</p>
      <button className="button button--primary" type="button" onClick={onRetry}>
        <Icon name="refresh" size={18} />
        إعادة المحاولة
      </button>
    </div>
  )
}

function EmptyState({ onClear }) {
  return (
    <div className="catalog-message" role="status">
      <span className="catalog-message__icon">
        <Icon name="search" size={28} />
      </span>
      <h2>لم نجد دورات مطابقة</h2>
      <p>جرّب كلمة بحث مختلفة أو وسّع اختيارات المجال والمستوى.</p>
      <button className="button button--secondary" type="button" onClick={onClear}>
        مسح عوامل التصفية
      </button>
    </div>
  )
}

function CourseCatalogState({ status, isEmpty, onRetry, onClear, children }) {
  if (status === 'loading') return <LoadingState />
  if (status === 'error') return <ErrorState onRetry={onRetry} />
  if (isEmpty) return <EmptyState onClear={onClear} />
  return children
}

export default CourseCatalogState
