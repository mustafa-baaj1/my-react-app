export const categoryOptions = [
  { value: 'all', label: 'جميع الدورات' },
  { value: 'development', label: 'البرمجة والتطوير' },
  { value: 'data-ai', label: 'البيانات والذكاء الاصطناعي' },
  { value: 'design', label: 'التصميم والإبداع' },
  { value: 'marketing', label: 'التسويق والأعمال' },
  { value: 'professional', label: 'المهارات المهنية' },
  { value: 'personal', label: 'تطوير الذات' },
]

export const levelOptions = [
  { value: 'all', label: 'جميع المستويات' },
  { value: 'beginner', label: 'مبتدئ' },
  { value: 'intermediate', label: 'متوسط' },
  { value: 'advanced', label: 'متقدم' },
]

export const sortOptions = [
  { value: 'rating', label: 'الأكثر تقييماً' },
  { value: 'popular', label: 'الأكثر شعبية' },
  { value: 'price-asc', label: 'السعر: من الأقل إلى الأعلى' },
  { value: 'price-desc', label: 'السعر: من الأعلى إلى الأقل' },
  { value: 'title', label: 'أبجدياً' },
]

export const defaultCatalogState = {
  query: '',
  category: 'all',
  level: 'all',
  sort: 'rating',
}

export function normalizeSearchText(value) {
  return String(value)
    .trim()
    .toLocaleLowerCase('ar')
    .replace(/[\u064B-\u065F\u0670]/g, '')
    .replace(/[أإآ]/g, 'ا')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
}

export function filterAndSortCourses(courseList, catalogState) {
  const normalizedQuery = normalizeSearchText(catalogState.query)

  const filteredCourses = courseList.filter((course) => {
    const matchesCategory =
      catalogState.category === 'all' || course.categoryId === catalogState.category
    const matchesLevel =
      catalogState.level === 'all' || course.levelId === catalogState.level
    const searchableContent = normalizeSearchText([
      course.title,
      course.shortDescription,
      course.category,
      course.instructor.name,
      course.instructor.title,
      ...course.keywords,
    ].join(' '))
    const matchesQuery = !normalizedQuery || searchableContent.includes(normalizedQuery)

    return matchesCategory && matchesLevel && matchesQuery
  })

  return [...filteredCourses].sort((firstCourse, secondCourse) => {
    switch (catalogState.sort) {
      case 'popular':
        return secondCourse.studentsCount - firstCourse.studentsCount
      case 'price-asc':
        return firstCourse.price - secondCourse.price
      case 'price-desc':
        return secondCourse.price - firstCourse.price
      case 'title':
        return firstCourse.title.localeCompare(secondCourse.title, 'ar')
      case 'rating':
      default:
        return secondCourse.rating - firstCourse.rating || secondCourse.reviewsCount - firstCourse.reviewsCount
    }
  })
}

export function isOptionValue(options, value) {
  return options.some((option) => option.value === value)
}
