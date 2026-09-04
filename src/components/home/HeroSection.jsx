import { Link } from 'react-router-dom'
import Icon from '../common/Icon'

function HeroSection() {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="hero-orb hero-orb--one" aria-hidden="true" />
      <div className="hero-orb hero-orb--two" aria-hidden="true" />

      <div className="container hero-grid">
        <div className="hero-content">
          <span className="hero-badge">
            <Icon name="sparkles" size={17} />
            تعلّم اليوم، واصنع فرص الغد
          </span>
          <h1 id="hero-title">
            مهارات حقيقية تقودك إلى
            <span> مستقبل تستحقه</span>
          </h1>
          <p className="hero-description">
            دورات عربية متقنة يقودها خبراء، ومسارات واضحة تساعدك على تحويل
            فضولك إلى معرفة، ومعرفتك إلى أثر مهني ملموس.
          </p>

          <div className="hero-actions">
            <Link className="button button--primary button--large" to="/courses">
              استكشف الدورات
              <Icon name="arrowLeft" size={19} />
            </Link>
            <a className="button button--secondary button--large" href="#how-it-works">
              <Icon name="play" size={20} />
              كيف تعمل المنصة؟
            </a>
          </div>

          <div className="hero-trust" aria-label="تقييم المتعلمين">
            <div className="avatar-stack" aria-hidden="true">
              <span className="avatar avatar--violet">أم</span>
              <span className="avatar avatar--gold">رن</span>
              <span className="avatar avatar--teal">سي</span>
              <span className="avatar avatar--navy">+٤</span>
            </div>
            <div>
              <div className="hero-rating">
                <Icon name="star" size={16} />
                <Icon name="star" size={16} />
                <Icon name="star" size={16} />
                <Icon name="star" size={16} />
                <Icon name="star" size={16} />
                <strong>4.9</strong>
              </div>
              <p>يثق بنا أكثر من 25 ألف متعلّم</p>
            </div>
          </div>
        </div>

        <div className="hero-visual" aria-label="نموذج من تجربة التعلّم في Learnova">
          <div className="hero-dashboard">
            <div className="hero-dashboard__top">
              <span className="hero-dashboard__dots" aria-hidden="true">
                <i /><i /><i />
              </span>
              <span>لوحة التعلّم</span>
              <span className="status-dot">مباشر</span>
            </div>

            <div className="hero-video-card">
              <div className="hero-video-card__pattern" aria-hidden="true" />
              <span className="hero-video-card__tag">الدورة الأكثر طلبًا</span>
              <span className="hero-play" aria-hidden="true">
                <Icon name="play" size={24} />
              </span>
              <div className="hero-video-card__copy">
                <small>تطوير الويب</small>
                <strong>ابنِ أول تجربة رقمية احترافية</strong>
              </div>
            </div>

            <div className="hero-progress-card">
              <div className="hero-progress-card__header">
                <div>
                  <small>تقدّمك هذا الأسبوع</small>
                  <strong>أداء رائع، واصل التقدّم!</strong>
                </div>
                <span>78%</span>
              </div>
              <div className="progress-track" aria-label="نسبة التقدم 78 بالمئة">
                <span style={{ width: '78%' }} />
              </div>
              <div className="hero-progress-card__meta">
                <span><Icon name="check" size={16} /> 18 درسًا مكتملًا</span>
                <span><Icon name="clock" size={16} /> 6 ساعات</span>
              </div>
            </div>
          </div>

          <div className="floating-card floating-card--students">
            <span className="floating-card__icon"><Icon name="users" size={21} /></span>
            <div><strong>+25 ألف</strong><small>متعلّم نشط</small></div>
          </div>
          <div className="floating-card floating-card--certificate">
            <span className="floating-card__icon floating-card__icon--gold">
              <Icon name="shield" size={21} />
            </span>
            <div><strong>شهادة إنجاز</strong><small>تعزّز ملفك المهني</small></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
