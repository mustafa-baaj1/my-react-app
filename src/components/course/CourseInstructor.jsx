import Icon from '../common/Icon'

function CourseInstructor({ instructor, category }) {
  return (
    <section className="course-instructor-card" aria-labelledby="instructor-title">
      <div className="course-instructor-card__avatar" aria-hidden="true">
        <span>{instructor.initials}</span>
      </div>
      <div className="course-instructor-card__content">
        <span className="course-section-kicker">تعلّم على يد خبير</span>
        <h2 id="instructor-title">{instructor.name}</h2>
        <p className="course-instructor-card__role">{instructor.title}</p>
        <p>
          يقدّم محتوى عمليًا في مجال {category}، ويحوّل الخبرة المهنية إلى خطوات
          واضحة وأمثلة قابلة للتطبيق تساعدك على بناء فهم راسخ.
        </p>
        <div className="course-instructor-card__badges">
          <span><Icon name="briefcase" size={17} /> خبرة عملية</span>
          <span><Icon name="message" size={17} /> شرح عربي واضح</span>
          <span><Icon name="target" size={17} /> تطبيقات موجّهة</span>
        </div>
      </div>
    </section>
  )
}

export default CourseInstructor
