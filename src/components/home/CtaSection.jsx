import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import Icon from '../common/Icon'

function CtaSection() {
  const { isAuthenticated } = useAuth()
  return (
    <section className="section cta-section" aria-labelledby="cta-title">
      <div className="container">
        <div className="cta-card">
          <span className="cta-card__shape cta-card__shape--one" aria-hidden="true" />
          <span className="cta-card__shape cta-card__shape--two" aria-hidden="true" />
          <div className="cta-card__content">
            <span className="cta-card__eyebrow"><Icon name="sparkles" size={17} /> مكانك القادم يبدأ من هنا</span>
            <h2 id="cta-title">لا تنتظر الفرصة المناسبة، ابنِها بمهارة جديدة</h2>
            <p>انضم إلى مجتمع عربي يتعلّم بشغف، ويتقدّم كل يوم بخطوة واضحة.</p>
            <div className="cta-card__actions">
              <Link className="button button--light button--large" to="/courses">
                استكشف الدورات <Icon name="arrowLeft" size={19} />
              </Link>
              <Link className="button button--outline-light button--large" to={isAuthenticated ? '/my-courses' : '/register'}>
                {isAuthenticated ? 'انتقل إلى دوراتك' : 'أنشئ حسابك مجانًا'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CtaSection
