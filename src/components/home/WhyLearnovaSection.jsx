import Icon from '../common/Icon'
import SectionHeader from '../common/SectionHeader'

const features = [
  {
    icon: 'target',
    title: 'تعلّم موجّه نحو الهدف',
    description: 'مسارات مرتبة تنقلك من الأساسيات إلى التطبيق بثبات ومن دون تشتّت.',
  },
  {
    icon: 'briefcase',
    title: 'خبرة من واقع السوق',
    description: 'محتوى يقدّمه خبراء يمارسون ما يعلّمونه ويعرفون ما تحتاجه فعليًا.',
  },
  {
    icon: 'play',
    title: 'مرونة تناسب يومك',
    description: 'تعلّم بالسرعة التي تناسبك، وارجع إلى دروسك من أي جهاز وفي أي وقت.',
  },
  {
    icon: 'message',
    title: 'مجتمع يدعم تقدّمك',
    description: 'كن جزءًا من بيئة عربية إيجابية تشارك المعرفة وتحتفي بكل خطوة.',
  },
]

function WhyLearnovaSection() {
  return (
    <section id="why-learnova" className="section why-section" aria-labelledby="why-title">
      <div className="container why-grid">
        <div className="why-intro">
          <SectionHeader
            eyebrow="تجربة مصممة لنجاحك"
            title="لأن التعلّم الجيد يغيّر أكثر من سيرتك الذاتية"
            description="في Learnova لا نكدّس المعلومات؛ نبني تجربة واضحة تمنحك الثقة لتطبّق، وتجرّب، وتتقدم."
            align="start"
          />
          <div className="why-note">
            <span><Icon name="shield" size={23} /></span>
            <p><strong>تعلّم بثقة</strong> محتوى عربي عالي الجودة، منظم بعناية ومحدّث باستمرار.</p>
          </div>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <article className="feature-card" key={feature.title}>
              <span className="feature-card__number">0{index + 1}</span>
              <span className="feature-card__icon"><Icon name={feature.icon} size={25} /></span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyLearnovaSection
