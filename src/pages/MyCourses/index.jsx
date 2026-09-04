import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import EnrolledCourseCard from '../../components/course/EnrolledCourseCard'
import MyCoursesState from '../../components/course/MyCoursesState'
import Icon from '../../components/common/Icon'
import useAuth from '../../hooks/useAuth'
import { getEnrolledCourses } from '../../services/enrollmentService'
import { getCourseProgress, getResumeLearningPath } from '../../services/learningProgressService'
import './MyCourses.css'

const numberFormatter = new Intl.NumberFormat('ar-SA')

function MyCourses() {
  const { user } = useAuth()
  const [requestAttempt, setRequestAttempt] = useState(0)
  const [result, setResult] = useState({ userId: null, status: 'loading', items: [] })

  useEffect(() => {
    let ignoreResult = false

    getEnrolledCourses(user)
      .then((items) => {
        if (!ignoreResult) setResult({ userId: user.id, status: 'success', items })
      })
      .catch(() => {
        if (!ignoreResult) setResult({ userId: user.id, status: 'error', items: [] })
      })

    return () => {
      ignoreResult = true
    }
  }, [requestAttempt, user])

  const pageStatus = result.userId === user.id ? result.status : 'loading'
  const totalLearningHours = result.items.reduce((sum, item) => {
    const hours = Number.parseFloat(item.course.duration)
    return sum + (Number.isNaN(hours) ? 0 : hours)
  }, 0)
  const courseItems = result.items.map((item) => ({
    ...item,
    progress: getCourseProgress(user, item.course),
    learningPath: getResumeLearningPath(user, item.course),
  }))
  const averageProgress = courseItems.length
    ? Math.round(courseItems.reduce((sum, item) => sum + item.progress.percentage, 0) / courseItems.length)
    : 0

  return (
    <div className="my-courses-page">
      <header className="my-courses-hero">
        <span className="my-courses-hero__glow" aria-hidden="true" />
        <div className="container my-courses-hero__content">
          <nav className="breadcrumb" aria-label="مسار التنقل">
            <Link to="/">الرئيسية</Link><span aria-hidden="true">/</span><span>دوراتي</span>
          </nav>
          <div className="my-courses-hero__grid">
            <div>
              <p className="eyebrow">مساحتك التعليمية</p>
              <h1>دوراتي</h1>
              <p>كل ما اخترت تعلّمه في مكان واحد، لتبدأ رحلتك وتنظّم خطواتك القادمة بسهولة.</p>
            </div>
            <div className="my-courses-hero__visual" aria-hidden="true">
              <span><Icon name="book" size={34} /></span>
              <div><small>رحلة تعلمك</small><strong>ابدأ اليوم، وتقدّم بثبات</strong></div>
            </div>
          </div>
        </div>
      </header>

      <div className="my-courses-main">
        <div className="container">
          {pageStatus === 'success' && result.items.length > 0 && (
            <section className="my-courses-summary" aria-label="ملخص دوراتك">
              <div><span className="my-courses-summary__icon"><Icon name="layers" size={20} /></span><p><strong>{numberFormatter.format(result.items.length)}</strong><span>دورات مسجّلة</span></p></div>
              <div><span className="my-courses-summary__icon my-courses-summary__icon--teal"><Icon name="clock" size={20} /></span><p><strong>{numberFormatter.format(totalLearningHours)}</strong><span>ساعة تعليمية</span></p></div>
              <div><span className="my-courses-summary__icon my-courses-summary__icon--gold"><Icon name="target" size={20} /></span><p><strong>{numberFormatter.format(averageProgress)}٪</strong><span>متوسط التقدم</span></p></div>
              <Link to="/courses">اكتشف دورة جديدة <Icon name="arrowLeft" size={17} /></Link>
            </section>
          )}

          {pageStatus === 'loading' && <MyCoursesState status="loading" />}
          {pageStatus === 'error' && (
            <MyCoursesState status="error" onRetry={() => setRequestAttempt((attempt) => attempt + 1)} />
          )}
          {pageStatus === 'success' && result.items.length === 0 && <MyCoursesState status="empty" />}

          {pageStatus === 'success' && result.items.length > 0 && (
            <section className="my-courses-results" aria-labelledby="enrolled-courses-title">
              <div className="my-courses-results__heading">
                <div><p className="eyebrow">مكتبتك الخاصة</p><h2 id="enrolled-courses-title">تابع رحلة تعلمك</h2></div>
                <p>اختر دورة وابدأ من الدرس الأول.</p>
              </div>
              <div className="my-courses-grid">
                {courseItems.map(({ course, enrollment, progress, learningPath }) => (
                  <EnrolledCourseCard course={course} enrollment={enrollment} progress={progress} learningPath={learningPath} key={course.id} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

export default MyCourses
