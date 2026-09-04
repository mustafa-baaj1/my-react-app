import CourseCard from './CourseCard'

function CourseGrid({ courses }) {
  return (
    <div className="catalog-grid">
      {courses.map((course) => (
        <CourseCard course={course} key={course.id} />
      ))}
    </div>
  )
}

export default CourseGrid
