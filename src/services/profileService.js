import { getEnrolledCourses } from './enrollmentService.js'
import { flattenCourseLessons, getCourseProgress, getResumeLearningPath } from './learningProgressService.js'

function buildActivities(journey) {
  return journey
    .flatMap((item) => {
      const enrollmentActivity = {
        id: `enrollment:${item.course.id}`,
        type: 'enrollment',
        title: `سجّلت في دورة «${item.course.title}»`,
        description: `أضيفت الدورة إلى رحلتك التعليمية مع ${item.progress.totalLessons} درسًا.`,
        date: item.enrollment.enrolledAt,
        path: item.learningPath,
      }

      if (!item.progress.updatedAt) return [enrollmentActivity]

      const progressActivity = {
        id: `progress:${item.course.id}`,
        type: item.progress.isComplete ? 'completion' : 'learning',
        title: item.progress.isComplete
          ? `أكملت دورة «${item.course.title}»`
          : `تابعت التعلم في «${item.course.title}»`,
        description: item.progress.isComplete
          ? `أنجزت جميع الدروس وعددها ${item.progress.totalLessons}.`
          : item.progress.completedCount > 0
            ? `أنجزت ${item.progress.completedCount} من ${item.progress.totalLessons} درسًا.`
            : `آخر درس زرته: ${item.lastLesson?.title ?? 'الدرس الأول'}.`,
        date: item.progress.updatedAt,
        path: item.learningPath,
      }

      return [progressActivity, enrollmentActivity]
    })
    .sort((first, second) => new Date(second.date) - new Date(first.date))
    .slice(0, 8)
}

export async function getProfileDashboard(user) {
  const enrolledCourses = await getEnrolledCourses(user)
  const journey = enrolledCourses.map(({ course, enrollment }) => {
    const progress = getCourseProgress(user, course)
    const lastLesson = flattenCourseLessons(course).find((lesson) => lesson.id === progress.lastLessonId) ?? null

    return {
      course,
      enrollment,
      progress,
      lastLesson,
      learningPath: getResumeLearningPath(user, course),
    }
  }).sort((first, second) => {
    const firstDate = first.progress.updatedAt ?? first.enrollment.enrolledAt
    const secondDate = second.progress.updatedAt ?? second.enrollment.enrolledAt
    return new Date(secondDate) - new Date(firstDate)
  })

  const enrolledCount = journey.length
  const completedCount = journey.filter((item) => item.progress.isComplete).length
  const inProgressCount = journey.filter((item) => item.progress.percentage > 0 && !item.progress.isComplete).length
  const completedLessonsCount = journey.reduce((sum, item) => sum + item.progress.completedCount, 0)
  const averageProgress = enrolledCount
    ? Math.round(journey.reduce((sum, item) => sum + item.progress.percentage, 0) / enrolledCount)
    : 0

  return {
    stats: { enrolledCount, completedCount, inProgressCount, averageProgress, completedLessonsCount },
    journey,
    activities: buildActivities(journey),
  }
}
