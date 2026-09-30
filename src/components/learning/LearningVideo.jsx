import { useState } from 'react'
import Icon from '../common/Icon'

function isSupportedVideoUrl(videoUrl) {
  if (typeof videoUrl !== 'string' || !videoUrl.trim()) return false

  try {
    const parsedUrl = new URL(videoUrl)
    return ['http:', 'https:'].includes(parsedUrl.protocol) && /\.(mp4|webm|ogg)$/i.test(parsedUrl.pathname)
  } catch {
    return false
  }
}

function LearningVideo({ lesson, course }) {
  const [failedSource, setFailedSource] = useState('')
  const [playerRevision, setPlayerRevision] = useState(0)
  const sourceKey = `${lesson.id}:${lesson.videoUrl ?? ''}`
  const hasSupportedSource = isSupportedVideoUrl(lesson.videoUrl)
  const hasPlaybackError = failedSource === sourceKey

  function handleRetry() {
    setFailedSource('')
    setPlayerRevision((revision) => revision + 1)
  }

  return (
    <section className={`learning-video learning-video--${course.coverTheme}`} aria-labelledby="lesson-video-title">
      <header className="learning-video__header">
        <span className="learning-video__header-icon" aria-hidden="true"><Icon name="play" size={18} /></span>
        <div>
          <p>فيديو الدرس</p>
          <strong id="lesson-video-title">{lesson.title}</strong>
        </div>
        <span className="learning-video__duration">{lesson.duration}</span>
      </header>

      <div className="learning-video__viewport">
        {hasSupportedSource && !hasPlaybackError ? (
          <video
            key={`${sourceKey}:${playerRevision}`}
            className="learning-video__player"
            controls
            playsInline
            preload="metadata"
            src={lesson.videoUrl}
            onError={() => setFailedSource(sourceKey)}
            aria-label={`تشغيل فيديو درس: ${lesson.title}`}
          >
            متصفحك لا يدعم تشغيل الفيديو.
          </video>
        ) : (
          <div className="learning-video__fallback" role="status">
            <span aria-hidden="true"><Icon name="alert" size={30} /></span>
            <h3>الفيديو غير متاح حاليًا</h3>
            <p>تعذّر تحميل فيديو هذا الدرس. تحقق من اتصالك بالإنترنت ثم حاول مرة أخرى.</p>
            {hasPlaybackError && (
              <button className="button button--secondary" type="button" onClick={handleRetry}>
                <Icon name="refresh" size={17} />
                إعادة المحاولة
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default LearningVideo
