import { Link } from 'react-router-dom'
import Icon from '../common/Icon'
import SectionHeader from '../common/SectionHeader'
import { getCourseCountByCategory } from '../../services/courseService'

const categories = [
  { id: 'development', name: 'البرمجة والتطوير', icon: 'code', tone: 'violet' },
  { id: 'design', name: 'التصميم والإبداع', icon: 'palette', tone: 'coral' },
  { id: 'marketing', name: 'التسويق والأعمال', icon: 'chart', tone: 'teal' },
  { id: 'data-ai', name: 'البيانات والذكاء الاصطناعي', icon: 'layers', tone: 'blue' },
  { id: 'professional', name: 'المهارات المهنية', icon: 'briefcase', tone: 'gold' },
  { id: 'personal', name: 'تطوير الذات', icon: 'compass', tone: 'rose' },
]

function CategoriesSection() {
  return (
    <section id="categories" className="section categories-section" aria-labelledby="categories-title">
      <div className="container">
        <SectionHeader
          eyebrow="مجالات تتطور معك"
          title="اختر المهارة التي تفتح بابك القادم"
          description="محتوى عملي في أكثر المجالات طلبًا، منظّم ليناسب مستواك ووقتك وطموحك."
        />
        <div className="categories-grid">
          {categories.map((category) => (
            <Link
              className="category-card"
              to={`/courses?category=${category.id}`}
              key={category.name}
              aria-label={`استكشف دورات ${category.name}`}
            >
              <span className={`category-card__icon category-card__icon--${category.tone}`}>
                <Icon name={category.icon} size={26} />
              </span>
              <div>
                <h3>{category.name}</h3>
                <p>{getCourseCountByCategory(category.id)} دورة متاحة</p>
              </div>
              <Icon className="category-card__arrow" name="arrowLeft" size={20} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoriesSection
