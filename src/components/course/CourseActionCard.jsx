import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { enrollUserInCourse, isUserEnrolled } from '../../services/enrollmentService'
import { getResumeLearningPath } from '../../services/learningProgressService'
import Icon from '../common/Icon'

const numberFormatter = new Intl.NumberFormat('ar-SA')

function CourseActionCard({ course }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, isAuthenticated, isInitializing } = useAuth()
  const [isFavorite, setIsFavorite] = useState(false)
  const [enrollmentOverride, setEnrollmentOverride] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const discount = course.originalPrice
    ? Math.round((1 - course.price / course.originalPrice) * 100)
    : 0
  const enrollmentKey = `${user?.id ?? 'guest'}:${course.id}`
  const isEnrolled = enrollmentOverride?.key === enrollmentKey
    ? enrollmentOverride.value
    : isUserEnrolled(user, course.id)

  function handleEnrollment() {
    if (isInitializing) return

    if (!isAuthenticated) {
      navigate('/login', {
        state: {
          from: {
            pathname: location.pathname,
            search: location.search,
            hash: location.hash,
          },
        },
      })
      return
    }

    if (isEnrolled) {
      navigate(getResumeLearningPath(user, course))
      return
    }

    setIsSubmitting(true)
    setFeedback(null)

    try {
      const { created } = enrollUserInCourse(user, course.id)
      setEnrollmentOverride({ key: enrollmentKey, value: true })
      setFeedback({
        type: 'success',
        text: created
          ? 'تم تسجيلك في الدورة بنجاح. يمكنك بدء التعلم الآن.'
          : 'أنت مسجّل في هذه الدورة بالفعل.',
      })
    } catch (error) {
      setFeedback({ type: 'error', text: error.message })
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleShare() {
    try {
      if (navigator.share) {
        await navigator.share({
          title: course.title,
          text: course.shortDescription,
          url: window.location.href,
        })
        setFeedback({ type: 'success', text: 'تمت مشاركة الدورة بنجاح.' })
      } else {
        await navigator.clipboard.writeText(window.location.href)
        setFeedback({ type: 'success', text: 'تم نسخ رابط الدورة.' })
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        setFeedback({ type: 'error', text: 'تعذّرت مشاركة الرابط في الوقت الحالي.' })
      }
    }
  }

  function toggleFavorite() {
    setIsFavorite((current) => !current)
    setFeedback({
      type: 'success',
      text: isFavorite ? 'تمت إزالة الدورة من المفضلة.' : 'تمت إضافة الدورة إلى المفضلة مؤقتًا.',
    })
  }

  const metadata = [
    { icon: 'clock', label: 'المدة', value: course.duration },
    { icon: 'book', label: 'الدروس', value: `${numberFormatter.format(course.lessonsCount)} درسًا` },
    { icon: 'target', label: 'المستوى', value: course.level },
    { icon: 'users', label: 'المتعلمون', value: numberFormatter.format(course.studentsCount) },
    { icon: 'globe', label: 'اللغة', value: 'العربية' },
    { icon: 'star', label: 'التقييم', value: `${course.rating} من 5` },
  ]

  return (
    <aside className="course-action-card" aria-label="التسجيل ومعلومات الدورة">
      <div className="course-action-card__price-row">
        <div className="course-action-card__price">
          <strong><bdi>{course.price} USD</bdi></strong>
          {course.originalPrice && <del><bdi>{course.originalPrice} USD</bdi></del>}
        </div>
        {discount > 0 && <span className="discount-badge">خصم {numberFormatter.format(discount)}٪</span>}
      </div>

      <button
        className="button button--primary course-enroll-button"
        type="button"
        onClick={handleEnrollment}
        disabled={isInitializing || isSubmitting}
        aria-describedby={feedback ? 'course-enrollment-feedback' : undefined}
      >
        {isSubmitting ? 'جارٍ التسجيل...' : isEnrolled ? 'متابعة التعلم' : 'التسجيل في الدورة'}
        <Icon name="arrowLeft" size={19} />
      </button>

      <div className="course-secondary-actions">
        <button
          type="button"
          className={`course-secondary-action${isFavorite ? ' course-secondary-action--active' : ''}`}
          aria-pressed={isFavorite}
          onClick={toggleFavorite}
        >
          <Icon name="heart" size={18} />
          {isFavorite ? 'في المفضلة' : 'إضافة للمفضلة'}
        </button>
        <button type="button" className="course-secondary-action" onClick={handleShare}>
          <Icon name="share" size={18} />
          مشاركة
        </button>
      </div>

      <p className="course-action-card__note">
        {isEnrolled ? 'الدورة مضافة إلى مساحتك التعليمية.' : 'وصول كامل إلى محتوى الدورة بعد التسجيل.'}
      </p>
      <div
        id="course-enrollment-feedback"
        className={`course-action-card__feedback${feedback ? ` course-action-card__feedback--${feedback.type}` : ''}`}
        role={feedback?.type === 'error' ? 'alert' : 'status'}
        aria-live="polite"
      >
        {feedback && <><Icon name={feedback.type === 'error' ? 'alert' : 'check'} size={17} /><span>{feedback.text}</span></>}
      </div>

      <dl className="course-metadata">
        {metadata.map((item) => (
          <div key={item.label}>
            <dt><Icon name={item.icon} size={18} /> {item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  )
}

export default CourseActionCard
