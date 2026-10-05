import './WordArtTitle.css'

function WordArtTitle({ text }) {
  const fontSize = 90
  const vbWidth = Math.max(420, text.length * fontSize * 0.62 + 60)
  const vbHeight = 170
  const cx = vbWidth / 2
  const cy = 85
  const gradientId = `wordart-gradient-${text.replace(/\s+/g, '-')}`

  return (
    <svg
      className="wordart-title"
      viewBox={`0 0 ${vbWidth} ${vbHeight}`}
      overflow="visible"
      role="img"
      aria-label={text}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffe066" />
          <stop offset="45%" stopColor="#ffb627" />
          <stop offset="100%" stopColor="#ff7a1a" />
        </linearGradient>
      </defs>
      <g transform={`rotate(-10 ${cx} ${cy})`}>
        <text
          x={cx + 7}
          y="107"
          textAnchor="middle"
          fontFamily="Impact, 'Arial Black', sans-serif"
          fontSize={fontSize}
          fontWeight="900"
          fill="#5c1f0d"
        >
          {text}
        </text>
        <text
          x={cx}
          y="100"
          textAnchor="middle"
          fontFamily="Impact, 'Arial Black', sans-serif"
          fontSize={fontSize}
          fontWeight="900"
          fill={`url(#${gradientId})`}
        >
          {text}
        </text>
      </g>
    </svg>
  )
}

export default WordArtTitle
