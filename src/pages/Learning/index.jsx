import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import LearningHeader from '../../components/learning/LearningHeader'
import LearningSidebar from '../../components/learning/LearningSidebar'
import LearningState from '../../components/learning/LearningState'
import LearningVideo from '../../components/learning/LearningVideo'
import LessonControls from '../../components/learning/LessonControls'
import useAuth from '../../hooks/useAuth'
import { getCourseDetails } from '../../services/courseService'
import { isUserEnrolled } from '../../services/enrollmentService'
import { completeLesson, flattenCourseLessons, getCourseProgress, setLastLesson } from '../../services/learningProgressService'
import './Learning.css'

function Learning() {
  const { courseId, lessonId } = useParams()
  const { user } = useAuth()
  const [requestAttempt, setRequestAttempt] = useState(0)
  const [, setProgressRevision] = useState(0)
  const [completionError, setCompletionError] = useState('')
  const [result, setResult] = useState({ requestKey: null, status: 'loading', course: null })
  const requestKey = `${courseId}:${lessonId ?? ''}:${user.id}`

  useEffect(() => {
    let ignoreResult = false

    getCourseDetails(courseId)
      .then((course) => {
        if (ignoreResult) return
        if (!course) {
          setResult({ requestKey, status: 'not-found', course: null })
          return
        }
        if (!isUserEnrolled(user, course.id)) {
          setResult({ requestKey, status: 'not-enrolled', course })
          return
        }

        const lessons = flattenCourseLessons(course)
        if (lessonId && !lessons.some((lesson) => lesson.id === lessonId)) {
          setResult({ requestKey, status: 'lesson-not-found', course })
          return
        }

        try {
          if (lessonId) setLastLesson(user, course, lessonId)
          setResult({ requestKey, status: 'success', course })
        } catch {
          setResult({ requestKey, status: 'error', course })
        }
      })
      .catch(() => {
        if (!ignoreResult) setResult({ requestKey, status: 'error', course: null })
      })

    return () => {
      ignoreResult = true
    }
  }, [courseId, lessonId, requestAttempt, requestKey, user])

  const pageStatus = result.requestKey === requestKey ? result.status : 'loading'

  if (pageStatus !== 'success') {
    return <LearningState status={pageStatus} course={result.course} onRetry={() => setRequestAttempt((attempt) => attempt + 1)} />
  }

  const { course } = result
  const lessons = flattenCourseLessons(course)
  if (!lessonId && lessons[0]) {
    return <Navigate to={`/learn/${course.id}/${lessons[0].id}`} replace />
  }

  const currentIndex = lessons.findIndex((lesson) => lesson.id === lessonId)
  const currentLesson = lessons[currentIndex]
  const previousLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null
  const progress = getCourseProgress(user, course)
  const isCompleted = progress.completedLessonIds.includes(currentLesson.id)

  function handleCompleteLesson() {
    setCompletionError('')
    try {
      completeLesson(user, course, currentLesson.id)
      setProgressRevision((revision) => revision + 1)
    } catch (error) {
      setCompletionError(error.message)
    }
  }

  return (
    <div className="learning-page">
      <LearningHeader course={course} progress={progress} />
      <div className="learning-main">
        <div className="container learning-layout">
          <LearningSidebar course={course} activeLessonId={currentLesson.id} completedLessonIds={progress.completedLessonIds} />

          <article className="learning-content">
            <LearningVideo lesson={currentLesson} course={course} />
            <div className="learning-lesson-heading">
              <div><p>{currentLesson.sectionTitle}</p><h2>{currentLesson.title}</h2></div>
              <div className="learning-lesson-meta">
                <span>{currentLesson.type}</span><span>{currentLesson.duration}</span><span>الدرس {currentIndex + 1} من {lessons.length}</span>
              </div>
            </div>
            <div className="learning-lesson-note">
              <h3>عن هذا الدرس</h3>
              <p>تابع المحتوى التعليمي وطبّق الأفكار الواردة فيه، ثم علّم الدرس كمكتمل لحفظ تقدمك والانتقال بثقة إلى الخطوة التالية.</p>
            </div>
            <LessonControls
              course={course}
              previousLesson={previousLesson}
              nextLesson={nextLesson}
              isCompleted={isCompleted}
              courseCompleted={progress.isComplete}
              onComplete={handleCompleteLesson}
              error={completionError}
            />
          </article>
        </div>
      </div>
    </div>
  )
}

export default Learning
