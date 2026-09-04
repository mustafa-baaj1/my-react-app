import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import CourseCatalogState from '../../components/course/CourseCatalogState'
import CourseFilters from '../../components/course/CourseFilters'
import CourseGrid from '../../components/course/CourseGrid'
import Icon from '../../components/common/Icon'
import { getCourses } from '../../services/courseService'
import {
  categoryOptions,
  defaultCatalogState,
  filterAndSortCourses,
  isOptionValue,
  levelOptions,
  sortOptions,
} from '../../utils/courseCatalog'
import './Courses.css'

const numberFormatter = new Intl.NumberFormat('ar-SA')

function Courses() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [courseList, setCourseList] = useState([])
  const [status, setStatus] = useState('loading')
  const [loadAttempt, setLoadAttempt] = useState(0)

  useEffect(() => {
    let ignoreResult = false

    getCourses()
      .then((courses) => {
        if (!ignoreResult) {
          setCourseList(courses)
          setStatus('success')
        }
      })
      .catch(() => {
        if (!ignoreResult) setStatus('error')
      })

    return () => {
      ignoreResult = true
    }
  }, [loadAttempt])

  const catalogState = {
    query: searchParams.get('q') ?? defaultCatalogState.query,
    category: isOptionValue(categoryOptions, searchParams.get('category'))
      ? searchParams.get('category')
      : defaultCatalogState.category,
    level: isOptionValue(levelOptions, searchParams.get('level'))
      ? searchParams.get('level')
      : defaultCatalogState.level,
    sort: isOptionValue(sortOptions, searchParams.get('sort'))
      ? searchParams.get('sort')
      : defaultCatalogState.sort,
  }

  const visibleCourses = filterAndSortCourses(courseList, catalogState)

  const hasActiveFilters =
    catalogState.query !== defaultCatalogState.query ||
    catalogState.category !== defaultCatalogState.category ||
    catalogState.level !== defaultCatalogState.level ||
    catalogState.sort !== defaultCatalogState.sort

  function updateCatalogState(field, value, replace = false) {
    const parameterNames = { query: 'q', category: 'category', level: 'level', sort: 'sort' }
    const parameterName = parameterNames[field]
    const nextSearchParams = new URLSearchParams(searchParams)

    if (value === defaultCatalogState[field]) nextSearchParams.delete(parameterName)
    else nextSearchParams.set(parameterName, value)

    setSearchParams(nextSearchParams, { replace })
  }

  function clearFilters() {
    setSearchParams({})
  }

  function retryLoading() {
    setStatus('loading')
    setLoadAttempt((attempt) => attempt + 1)
  }

  return (
    <>
      <header className="catalog-hero">
        <div className="catalog-hero__glow" aria-hidden="true" />
        <div className="container catalog-hero__content">
          <nav className="breadcrumb" aria-label="مسار التنقل">
            <Link to="/">الرئيسية</Link>
            <Icon name="arrowLeft" size={15} />
            <span aria-current="page">الدورات</span>
          </nav>
          <div className="catalog-hero__heading">
            <div>
              <span className="eyebrow">مكتبة Learnova التعليمية</span>
              <h1>المهارة التي تبحث عنها تبدأ من هنا</h1>
              <p>
                استكشف دورات عربية عملية صمّمها خبراء لتمنحك معرفة واضحة،
                وتطبيقًا حقيقيًا، وخطوة أقرب إلى هدفك.
              </p>
            </div>
            <div className="catalog-count" aria-label={`${courseList.length} دورة متاحة`}>
              <strong>{numberFormatter.format(courseList.length)}</strong>
              <span>دورة احترافية</span>
            </div>
          </div>
        </div>
      </header>

      <div className="catalog-main">
        <div className="container">
          <CourseFilters
            catalogState={catalogState}
            hasActiveFilters={hasActiveFilters}
            onChange={updateCatalogState}
            onClear={clearFilters}
          />

          <div className="catalog-results-heading">
            <div>
              <h2>الدورات المتاحة</h2>
              <output aria-live="polite" aria-atomic="true">
                {status === 'success'
                  ? `${numberFormatter.format(visibleCourses.length)} نتيجة من أصل ${numberFormatter.format(courseList.length)}`
                  : 'جارٍ تجهيز النتائج...'}
              </output>
            </div>
            {hasActiveFilters && (
              <span className="active-filter-indicator">
                <i aria-hidden="true" /> تم تطبيق عوامل تصفية
              </span>
            )}
          </div>

          <div id="course-results">
            <CourseCatalogState
              status={status}
              isEmpty={visibleCourses.length === 0}
              onRetry={retryLoading}
              onClear={clearFilters}
            >
              <CourseGrid courses={visibleCourses} />
            </CourseCatalogState>
          </div>
        </div>
      </div>
    </>
  )
}

export default Courses
