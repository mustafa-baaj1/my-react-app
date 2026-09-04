import Icon from '../common/Icon'
import SectionHeader from '../common/SectionHeader'

const testimonials = [
  {
    quote: 'وضوح الشرح وترتيب المسار اختصرا عليّ شهورًا من التشتّت. أنهيت الدورة وأنا أمتلك مشروعًا أضيفه بثقة إلى ملف أعمالي.',
    name: 'ريم القحطاني',
    role: 'مطوّرة واجهات أمامية',
    initials: 'رق',
    tone: 'violet',
  },
  {
    quote: 'أحببت أن المحتوى عربي واحترافي في الوقت نفسه. الأمثلة واقعية، وكل درس يمنحك شيئًا تستطيع تطبيقه مباشرة في عملك.',
    name: 'مازن الشمري',
    role: 'مسوّق رقمي',
    initials: 'مش',
    tone: 'teal',
  },
  {
    quote: 'تجربة هادئة ومنظمة جعلت الالتزام أسهل. كنت أتابع تقدّمي أسبوعيًا، وبعد إكمال المسار انتقلت إلى دور جديد في فريقي.',
    name: 'نورة السالم',
    role: 'مصممة منتجات',
    initials: 'نس',
    tone: 'coral',
  },
]

function TestimonialsSection() {
  return (
    <section className="section testimonials-section" aria-labelledby="testimonials-title">
      <div className="container">
        <SectionHeader
          eyebrow="أصوات من مجتمعنا"
          title="قصص بدأت بقرار صغير"
          description="تجارب حقيقية لمتعلّمين حوّلوا وقتهم إلى مهارة، ومهارتهم إلى فرصة."
        />

        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <figure className="testimonial-card" key={testimonial.name}>
              <Icon className="testimonial-card__quote" name="quote" size={32} />
              <div className="testimonial-card__stars" aria-label="تقييم خمس نجوم">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Icon key={star} name="star" size={15} />
                ))}
              </div>
              <blockquote>«{testimonial.quote}»</blockquote>
              <figcaption>
                <span className={`avatar avatar--${testimonial.tone}`} aria-hidden="true">
                  {testimonial.initials}
                </span>
                <span><strong>{testimonial.name}</strong><small>{testimonial.role}</small></span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
