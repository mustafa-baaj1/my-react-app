import courses from '../data/courses.js'

export async function getCourses() {
  await Promise.resolve()
  return [...courses]
}

export async function getCourseDetails(identifier) {
  await Promise.resolve()
  return getCourseById(identifier)
}

export function getFeaturedCourses(limit = 3) {
  return courses.filter((course) => course.featured).slice(0, limit)
}

export function getCourseCountByCategory(categoryId) {
  return courses.filter((course) => course.categoryId === categoryId).length
}

export function getPlatformStats() {
  return {
    coursesCount: courses.length,
    learnersCount: courses.reduce((sum, course) => sum + course.studentsCount, 0),
    instructorsCount: new Set(courses.map((course) => course.instructor.name)).size,
    learningHours: courses.reduce((sum, course) => sum + Number.parseFloat(course.duration), 0),
  }
}

export function getCourseById(courseId) {
  return courses.find((course) => course.id === courseId || course.slug === courseId) ?? null
}

export function getRelatedCourses(currentCourse, limit = 3) {
  if (!currentCourse) return []

  return courses
    .filter((course) => course.id !== currentCourse.id)
    .map((course) => ({
      course,
      relevance:
        Number(course.categoryId === currentCourse.categoryId) * 4 +
        Number(course.levelId === currentCourse.levelId) * 2 +
        Number(course.featured) +
        course.rating / 10,
    }))
    .sort((first, second) =>
      second.relevance - first.relevance ||
      second.course.studentsCount - first.course.studentsCount,
    )
    .slice(0, limit)
    .map(({ course }) => course)
}
