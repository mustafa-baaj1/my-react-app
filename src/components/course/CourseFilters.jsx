import Icon from '../common/Icon'
import { categoryOptions, levelOptions, sortOptions } from '../../utils/courseCatalog'

function CourseFilters({ catalogState, hasActiveFilters, onChange, onClear }) {
  return (
    <section className="catalog-controls" aria-label="البحث وتصفية الدورات">
      <div className="catalog-search-row">
        <label className="search-field" htmlFor="course-search">
          <span className="sr-only">ابحث في الدورات</span>
          <Icon name="search" size={20} />
          <input
            id="course-search"
            type="search"
            value={catalogState.query}
            placeholder="ابحث باسم الدورة أو المدرّب أو المهارة..."
            autoComplete="off"
            aria-controls="course-results"
            onChange={(event) => onChange('query', event.target.value, true)}
          />
          {catalogState.query && (
            <button
              className="search-field__clear"
              type="button"
              aria-label="مسح عبارة البحث"
              onClick={() => onChange('query', '', true)}
            >
              <Icon name="close" size={17} />
            </button>
          )}
        </label>

        <button
          className="clear-filters"
          type="button"
          disabled={!hasActiveFilters}
          onClick={onClear}
        >
          <Icon name="refresh" size={18} />
          مسح عوامل التصفية
        </button>
      </div>

      <fieldset className="category-filter">
        <legend>تصفية حسب المجال</legend>
        <div className="category-filter__options">
          {categoryOptions.map((category) => (
            <label className="filter-chip" key={category.value}>
              <input
                type="radio"
                name="course-category"
                value={category.value}
                checked={catalogState.category === category.value}
                onChange={(event) => onChange('category', event.target.value)}
              />
              <span>{category.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="select-filters">
        <label className="select-field" htmlFor="course-level">
          <span>المستوى</span>
          <select
            id="course-level"
            value={catalogState.level}
            onChange={(event) => onChange('level', event.target.value)}
          >
            {levelOptions.map((level) => (
              <option value={level.value} key={level.value}>{level.label}</option>
            ))}
          </select>
        </label>

        <label className="select-field" htmlFor="course-sort">
          <span>ترتيب النتائج</span>
          <select
            id="course-sort"
            value={catalogState.sort}
            onChange={(event) => onChange('sort', event.target.value)}
          >
            {sortOptions.map((sortOption) => (
              <option value={sortOption.value} key={sortOption.value}>{sortOption.label}</option>
            ))}
          </select>
        </label>
      </div>
    </section>
  )
}

export default CourseFilters
