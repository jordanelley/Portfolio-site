import { useEffect, useRef, useState } from 'react'
import './MatrixIntro.css'

const CHARSET =
  'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789'
const LOCK_CHANCE = 0.4
const RESET_CHANCE = 0.02
const HOLD_MS = 900
const FADE_MS = 600 // keep in sync with .matrix-intro-fade transition duration

function randomChar() {
  return CHARSET[Math.floor(Math.random() * CHARSET.length)]
}

function MatrixIntro({ name, onComplete }) {
  const canvasRef = useRef(null)
  const [fadingOut, setFadingOut] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete()
      return
    }

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const word = name.toUpperCase()

    let squareSize
    let columnCount
    let dropRows
    let filledLetters
    let wordStartCol
    let wordRow
    let frameId
    let holdTimeout
    let fadeTimeout
    let finished = false

    const setup = () => {
      const dpr = window.devicePixelRatio || 1
      const { innerWidth: w, innerHeight: h } = window
      squareSize = w < 500 ? 16 : 24

      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.textBaseline = 'top'

      columnCount = Math.ceil(w / squareSize)
      dropRows = Array.from({ length: columnCount }, () =>
        -Math.floor(Math.random() * 40)
      )

      filledLetters = word.split('').map((char) => char === ' ')
      wordStartCol = Math.max(
        0,
        Math.round((columnCount - word.length) / 2)
      )
      wordRow = Math.round(h / squareSize / 2)
    }

    setup()

    const handleResize = () => {
      if (!finished) setup()
    }
    window.addEventListener('resize', handleResize)

    const draw = () => {
      const { innerWidth: w, innerHeight: h } = window

      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)'
      ctx.fillRect(0, 0, w, h)
      ctx.font = `${squareSize}px monospace`
      ctx.fillStyle = '#9fffb0'

      for (let col = 0; col < columnCount; col++) {
        const row = dropRows[col]
        const y = row * squareSize
        const wordIndex = col - wordStartCol
        const onWordRow =
          row === wordRow && wordIndex >= 0 && wordIndex < word.length

        if (onWordRow && !filledLetters[wordIndex] && Math.random() < LOCK_CHANCE) {
          filledLetters[wordIndex] = true
        }

        if (y > -squareSize && y < h) {
          ctx.fillText(randomChar(), col * squareSize, y)
        }

        dropRows[col] = row + 1
        if (y > h && Math.random() < RESET_CHANCE) {
          dropRows[col] = -Math.floor(Math.random() * 20)
        }
      }

      ctx.font = `bold ${squareSize}px monospace`
      ctx.fillStyle = '#39ff14'
      word.split('').forEach((char, i) => {
        if (filledLetters[i]) {
          ctx.fillText(char, (wordStartCol + i) * squareSize, wordRow * squareSize)
        }
      })

      if (!finished && filledLetters.every(Boolean)) {
        finished = true
        holdTimeout = setTimeout(() => {
          setFadingOut(true)
          fadeTimeout = setTimeout(onComplete, FADE_MS)
        }, HOLD_MS)
      }

      frameId = requestAnimationFrame(draw)
    }

    document.body.style.overflow = 'hidden'
    frameId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(frameId)
      clearTimeout(holdTimeout)
      clearTimeout(fadeTimeout)
      window.removeEventListener('resize', handleResize)
      document.body.style.overflow = ''
    }
  }, [name, onComplete])

  return (
    <div className={`matrix-intro${fadingOut ? ' matrix-intro-fade' : ''}`}>
      <canvas ref={canvasRef} />
    </div>
  )
}

export default MatrixIntro
