import { Link } from 'react-router-dom'
import CourseCard from './CourseCard'
import Icon from '../common/Icon'

function RelatedCourses({ courses }) {
  if (courses.length === 0) return null

  return (
    <section className="related-courses" aria-labelledby="related-courses-title">
      <div className="container">
        <div className="related-courses__heading">
          <div>
            <span className="course-section-kicker">تابع استكشافك</span>
            <h2 id="related-courses-title">دورات قد تهمك</h2>
            <p>اختيارات قريبة من موضوع الدورة ومستواها لتوسيع مهاراتك.</p>
          </div>
          <Link className="text-link" to="/courses">
            عرض جميع الدورات <Icon name="arrowLeft" size={18} />
          </Link>
        </div>
        <div className="related-courses__grid">
          {courses.map((course) => <CourseCard course={course} key={course.id} />)}
        </div>
      </div>
    </section>
  )
}

export default RelatedCourses
