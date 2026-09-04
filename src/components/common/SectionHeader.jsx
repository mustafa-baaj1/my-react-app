function SectionHeader({ eyebrow, title, description, align = 'center' }) {
  return (
    <header className={`section-header section-header--${align}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </header>
  )
}

export default SectionHeader
