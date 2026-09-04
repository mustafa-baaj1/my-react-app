import Icon from '../common/Icon'

function LearningVideo({ lesson, course }) {
  return (
    <section className={`learning-video learning-video--${course.coverTheme}`} aria-label="مشغل محتوى الدرس">
      <span className="learning-video__grid" aria-hidden="true" />
      <div className="learning-video__center">
        <span className="learning-video__play" aria-hidden="true"><Icon name="play" size={34} /></span>
        <p>محتوى تعليمي تجريبي</p>
        <strong>{lesson.title}</strong>
      </div>
      <div className="learning-video__bar" aria-hidden="true">
        <Icon name="play" size={17} />
        <span><i /></span>
        <time>{lesson.duration}</time>
      </div>
    </section>
  )
}

export default LearningVideo
