import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="not-found">
      <div className="container not-found__content">
        <span className="not-found__code" aria-hidden="true">404</span>
        <p className="eyebrow">الصفحة غير موجودة</p>
        <h1>يبدو أنك وصلت إلى مكان غير متاح</h1>
        <p>تحقق من الرابط أو عد إلى الصفحة الرئيسية لمواصلة التصفح.</p>
        <Link className="button button--primary" to="/">
          العودة إلى الرئيسية
        </Link>
      </div>
    </section>
  )
}

export default NotFound
