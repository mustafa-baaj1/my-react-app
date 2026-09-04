import { getCourseById } from './courseService.js'
import { getStoredCourseProgress, saveStoredCourseProgress } from './learningStorage.js'

export class LearningProgressError extends Error {
  constructor(message, code = 'LEARNING_PROGRESS_ERROR') {
    super(message)
    this.name = 'LearningProgressError'
    this.code = code
  }
}

function getUserKey(user) {
  if (user?.id == null) throw new LearningProgressError('يجب تسجيل الدخول لحفظ تقدمك.', 'AUTH_REQUIRED')
  return `user:${String(user.id)}`
}

function resolveCourse(courseOrId) {
  const course = typeof courseOrId === 'string' ? getCourseById(courseOrId) : courseOrId
  if (!course) throw new LearningProgressError('تعذّر العثور على الدورة المطلوبة.', 'COURSE_NOT_FOUND')
  return course
}

export function flattenCourseLessons(course) {
  return course.sections.flatMap((section) =>
    section.lessons.map((lesson) => ({ ...lesson, sectionId: section.id, sectionTitle: section.title })),
  )
}

export function getCourseProgress(user, courseOrId) {
  const course = resolveCourse(courseOrId)
  const lessons = flattenCourseLessons(course)
  const lessonIds = new Set(lessons.map((lesson) => lesson.id))
  const storedProgress = user?.id != null
    ? getStoredCourseProgress(getUserKey(user), course.id)
    : null
  const completedLessonIds = Array.isArray(storedProgress?.completedLessonIds)
    ? [...new Set(storedProgress.completedLessonIds.filter((id) => lessonIds.has(id)))]
    : []
  const lastLessonId = lessonIds.has(storedProgress?.lastLessonId)
    ? storedProgress.lastLessonId
    : lessons[0]?.id ?? null
  const totalLessons = lessons.length
  const completedCount = completedLessonIds.length
  const percentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0

  return {
    completedLessonIds,
    lastLessonId,
    completedCount,
    totalLessons,
    percentage,
    isComplete: totalLessons > 0 && completedCount === totalLessons,
    updatedAt: storedProgress?.updatedAt ?? null,
  }
}

function persistProgress(user, course, progress) {
  try {
    saveStoredCourseProgress(getUserKey(user), course.id, {
      completedLessonIds: progress.completedLessonIds,
      lastLessonId: progress.lastLessonId,
      updatedAt: new Date().toISOString(),
    })
  } catch {
    throw new LearningProgressError(
      'تعذّر حفظ تقدمك على هذا الجهاز. تحقق من إعدادات التخزين وحاول مجددًا.',
      'STORAGE_ERROR',
    )
  }

  return getCourseProgress(user, course)
}

export function setLastLesson(user, courseOrId, lessonId) {
  const course = resolveCourse(courseOrId)
  const lessons = flattenCourseLessons(course)
  if (!lessons.some((lesson) => lesson.id === lessonId)) {
    throw new LearningProgressError('الدرس المطلوب غير موجود.', 'LESSON_NOT_FOUND')
  }

  const current = getCourseProgress(user, course)
  return persistProgress(user, course, { ...current, lastLessonId: lessonId })
}

export function completeLesson(user, courseOrId, lessonId) {
  const course = resolveCourse(courseOrId)
  const lessons = flattenCourseLessons(course)
  if (!lessons.some((lesson) => lesson.id === lessonId)) {
    throw new LearningProgressError('الدرس المطلوب غير موجود.', 'LESSON_NOT_FOUND')
  }

  const current = getCourseProgress(user, course)
  const completedLessonIds = current.completedLessonIds.includes(lessonId)
    ? current.completedLessonIds
    : [...current.completedLessonIds, lessonId]

  return persistProgress(user, course, { ...current, completedLessonIds, lastLessonId: lessonId })
}

export function getResumeLearningPath(user, courseOrId) {
  const course = resolveCourse(courseOrId)
  const progress = getCourseProgress(user, course)
  return progress.lastLessonId
    ? `/learn/${course.id}/${progress.lastLessonId}`
    : `/learn/${course.id}`
}
