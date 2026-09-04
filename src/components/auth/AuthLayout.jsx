import Icon from '../common/Icon'

const benefits = [
  'احفظ رحلتك التعليمية في مكان واحد',
  'تابع تقدّمك وعد إلى آخر درس بسهولة',
  'اكتشف مسارات تناسب أهدافك المهنية',
]

function AuthLayout({ eyebrow, title, description, children, footer }) {
  return (
    <section className="auth-page">
      <div className="auth-page__orb auth-page__orb--one" aria-hidden="true" />
      <div className="auth-page__orb auth-page__orb--two" aria-hidden="true" />
      <div className="container auth-layout">
        <aside className="auth-showcase" aria-label="مزايا حساب Learnova">
          <span className="auth-showcase__badge"><Icon name="sparkles" size={17} /> تعلّم بلا حدود</span>
          <h2>مساحتك الشخصية لبناء مهارة تدوم</h2>
          <p>حساب واحد يجمع دوراتك وإنجازاتك، ويمنحك تجربة تعلّم أكثر وضوحًا وتركيزًا.</p>
          <ul>
            {benefits.map((benefit) => (
              <li key={benefit}><span><Icon name="check" size={17} /></span>{benefit}</li>
            ))}
          </ul>
          <div className="auth-showcase__proof">
            <div><strong>+25 ألف</strong><span>متعلّم</span></div>
            <div><strong>4.9</strong><span>متوسط التقييم</span></div>
          </div>
        </aside>

        <div className="auth-card">
          <header className="auth-card__header">
            <span className="eyebrow">{eyebrow}</span>
            <h1>{title}</h1>
            <p>{description}</p>
          </header>
          {children}
          <footer className="auth-card__footer">{footer}</footer>
        </div>
      </div>
    </section>
  )
}

export default AuthLayout
