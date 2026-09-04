import { getCourseById } from './courseService.js'
import { getStoredEnrollments, saveStoredEnrollments } from './enrollmentStorage.js'

export class EnrollmentServiceError extends Error {
  constructor(message, code = 'ENROLLMENT_ERROR') {
    super(message)
    this.name = 'EnrollmentServiceError'
    this.code = code
  }
}

function getUserKey(user) {
  if (user?.id == null) {
    throw new EnrollmentServiceError('يجب تسجيل الدخول لإدارة دوراتك.', 'AUTH_REQUIRED')
  }

  return `user:${String(user.id)}`
}

export function getUserEnrollments(user) {
  if (user?.id == null) return []
  return getStoredEnrollments(getUserKey(user))
}

export function isUserEnrolled(user, courseId) {
  return getUserEnrollments(user).some((enrollment) => enrollment.courseId === courseId)
}

export function enrollUserInCourse(user, courseId) {
  const userKey = getUserKey(user)
  const course = getCourseById(courseId)

  if (!course) {
    throw new EnrollmentServiceError('تعذّر العثور على الدورة المطلوبة.', 'COURSE_NOT_FOUND')
  }

  const enrollments = getStoredEnrollments(userKey)
  const existingEnrollment = enrollments.find((enrollment) => enrollment.courseId === course.id)
  if (existingEnrollment) return { enrollment: existingEnrollment, created: false }

  const enrollment = {
    courseId: course.id,
    enrolledAt: new Date().toISOString(),
  }

  try {
    saveStoredEnrollments(userKey, [...enrollments, enrollment])
    return { enrollment, created: true }
  } catch {
    throw new EnrollmentServiceError(
      'تعذّر حفظ التسجيل على هذا الجهاز. تحقق من إعدادات التخزين وحاول مجددًا.',
      'STORAGE_ERROR',
    )
  }
}

export async function getEnrolledCourses(user) {
  await Promise.resolve()

  return getUserEnrollments(user)
    .map((enrollment) => {
      const course = getCourseById(enrollment.courseId)
      return course ? { course, enrollment } : null
    })
    .filter(Boolean)
    .sort((first, second) =>
      new Date(second.enrollment.enrolledAt) - new Date(first.enrollment.enrolledAt),
    )
}
