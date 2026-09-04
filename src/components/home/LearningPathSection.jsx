import { Link } from 'react-router-dom'
import Icon from '../common/Icon'
import SectionHeader from '../common/SectionHeader'

const steps = [
  {
    number: '01',
    title: 'حدّد وجهتك',
    description: 'اختر المجال والمهارة التي تريد تطويرها وفق هدفك المهني.',
    icon: 'compass',
  },
  {
    number: '02',
    title: 'تعلّم وطبّق',
    description: 'تابع دروسًا واضحة، ونفّذ تطبيقات تساعدك على تثبيت المعرفة.',
    icon: 'play',
  },
  {
    number: '03',
    title: 'قِس تقدّمك',
    description: 'تابع إنجازك خطوة بخطوة، وأكمل مسارك حتى تحقق هدفك.',
    icon: 'chart',
  },
]

function LearningPathSection() {
  return (
    <section id="how-it-works" className="section learning-path" aria-labelledby="path-title">
      <div className="container">
        <SectionHeader
          eyebrow="رحلة بسيطة، أثر مستمر"
          title="من أول درس إلى أول إنجاز"
          description="ثلاث خطوات واضحة تفصل بين رغبتك في التعلّم والمهارة التي تبحث عنها."
        />

        <ol className="steps-grid">
          {steps.map((step) => (
            <li className="step-card" key={step.number}>
              <span className="step-card__number">{step.number}</span>
              <span className="step-card__icon"><Icon name={step.icon} size={27} /></span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>

        <div className="learning-path__action">
          <Link className="button button--primary" to="/courses">
            اختر مسارك الآن <Icon name="arrowLeft" size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default LearningPathSection
