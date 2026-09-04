import { Link } from 'react-router-dom'
import { getFeaturedCourses } from '../../services/courseService'
import CourseCard from '../course/CourseCard'
import Icon from '../common/Icon'
import SectionHeader from '../common/SectionHeader'

function FeaturedCoursesSection() {
  const featuredCourses = getFeaturedCourses()

  return (
    <section className="section featured-section" aria-labelledby="featured-title">
      <div className="container">
        <div className="featured-heading-row">
          <SectionHeader
            eyebrow="مختارات المتعلّمين"
            title="دورات تبدأ معها خطوات واثقة"
            description="برامج منتقاة تجمع بين الشرح الواضح والتطبيق العملي والخبرة الواقعية."
            align="start"
          />
          <Link className="text-link" to="/courses">
            عرض جميع الدورات <Icon name="arrowLeft" size={18} />
          </Link>
        </div>

        <div className="courses-grid">
          {featuredCourses.map((course) => (
            <CourseCard course={course} key={course.id} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedCoursesSection
