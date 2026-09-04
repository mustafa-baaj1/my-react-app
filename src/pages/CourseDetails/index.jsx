import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CourseActionCard from '../../components/course/CourseActionCard'
import CourseCurriculum from '../../components/course/CourseCurriculum'
import CourseDetailsHero from '../../components/course/CourseDetailsHero'
import CourseDetailsState from '../../components/course/CourseDetailsState'
import CourseInstructor from '../../components/course/CourseInstructor'
import CourseOverview from '../../components/course/CourseOverview'
import CourseRequirements from '../../components/course/CourseRequirements'
import RelatedCourses from '../../components/course/RelatedCourses'
import { getCourseDetails, getRelatedCourses } from '../../services/courseService'
import './CourseDetails.css'

function CourseDetails() {
  const { id } = useParams()
  const [requestAttempt, setRequestAttempt] = useState(0)
  const [result, setResult] = useState({ identifier: null, status: 'loading', course: null })

  useEffect(() => {
    let ignoreResult = false

    getCourseDetails(id)
      .then((course) => {
        if (!ignoreResult) {
          setResult({
            identifier: id,
            status: course ? 'success' : 'not-found',
            course,
          })
        }
      })
      .catch(() => {
        if (!ignoreResult) {
          setResult({ identifier: id, status: 'error', course: null })
        }
      })

    return () => {
      ignoreResult = true
    }
  }, [id, requestAttempt])

  const pageStatus = result.identifier === id ? result.status : 'loading'

  if (pageStatus !== 'success') {
    return (
      <CourseDetailsState
        status={pageStatus}
        onRetry={() => setRequestAttempt((attempt) => attempt + 1)}
      />
    )
  }

  const { course } = result
  const relatedCourses = getRelatedCourses(course)

  return (
    <div className="course-details-page">
      <CourseDetailsHero course={course} />

      <div className="container course-details-layout">
        <article className="course-details-content">
          <CourseOverview course={course} />
          <CourseCurriculum course={course} />
          <CourseRequirements requirements={course.requirements} />
          <CourseInstructor instructor={course.instructor} category={course.category} />
        </article>

        <div className="course-details-sidebar">
          <CourseActionCard course={course} key={course.id} />
        </div>
      </div>

      <RelatedCourses courses={relatedCourses} />
    </div>
  )
}

export default CourseDetails
