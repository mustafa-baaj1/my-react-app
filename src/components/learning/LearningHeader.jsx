import { Link } from 'react-router-dom'
import Icon from '../common/Icon'

function LearningHeader({ course, progress }) {
  return (
    <header className="learning-header">
      <div className="container learning-header__inner">
        <div className="learning-header__course">
          <Link to="/my-courses"><Icon name="arrowLeft" size={18} /> دوراتي</Link>
          <div>
            <span>{course.category}</span>
            <h1>{course.title}</h1>
          </div>
        </div>
        <div className="learning-header__progress">
          <div><span>تقدم الدورة</span><strong>{progress.percentage}٪</strong></div>
          <div className="learning-progress-track" role="progressbar" aria-label="نسبة إكمال الدورة" aria-valuemin="0" aria-valuemax="100" aria-valuenow={progress.percentage}>
            <span style={{ width: `${progress.percentage}%` }} />
          </div>
          <small>{progress.completedCount} من {progress.totalLessons} درسًا مكتملًا</small>
        </div>
      </div>
    </header>
  )
}

export default LearningHeader
