import { useEffect, useRef, useState } from 'react'
import './MatrixIntro.css'

const CHARSET =
  'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789'
const REVEAL_MS = 1500
const HOLD_MS = 200
const FADE_MS = 300 // keep in sync with .matrix-intro-fade transition duration
// REVEAL_MS + HOLD_MS + FADE_MS should total the desired intro length (2000ms)

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
    const word = name
    const startTime = performance.now()
    const bgColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--bg')
      .trim()
    const heroH1 = document.querySelector('.hero h1')

    // rank of each non-space character in reveal order; -1 for spaces
    let rank = 0
    const letterRanks = word.split('').map((char) => (char === ' ' ? -1 : rank++))
    const totalLetters = rank

    let squareSize
    let columnCount
    let dropRows
    let frameId

    // Position/size the revealed name to exactly match the real <h1> on the page,
    // which is already mounted (just hidden behind this overlay).
    let target = { x: 32, y: 32, font: 'bold 56px sans-serif', letterSpacing: 0, color: '#00ff99' }
    let letterX = []

    const measureTarget = () => {
      if (!heroH1) return
      const rect = heroH1.getBoundingClientRect()
      const cs = getComputedStyle(heroH1)
      target = {
        x: rect.left,
        y: rect.top + rect.height / 2,
        font: `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`,
        letterSpacing: parseFloat(cs.letterSpacing) || 0,
        color: cs.color,
      }
      ctx.font = target.font
      let cx = target.x
      letterX = word.split('').map((char) => {
        const x = cx
        cx += ctx.measureText(char).width + target.letterSpacing
        return x
      })
    }

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

      measureTarget()
    }

    setup()

    let resizeTimer
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(setup, 200)
    }
    window.addEventListener('resize', handleResize)

    const draw = () => {
      const { innerWidth: w, innerHeight: h } = window
      const elapsed = performance.now() - startTime
      const revealedCount = Math.min(
        totalLetters,
        Math.ceil((elapsed / REVEAL_MS) * totalLetters)
      )

      ctx.globalAlpha = 0.2
      ctx.fillStyle = bgColor
      ctx.fillRect(0, 0, w, h)
      ctx.globalAlpha = 1
      ctx.font = `${squareSize}px monospace`
      ctx.fillStyle = '#9fffb0'
      ctx.textBaseline = 'top'

      for (let col = 0; col < columnCount; col++) {
        const row = dropRows[col]
        const y = row * squareSize
        if (y > -squareSize && y < h) {
          ctx.fillText(randomChar(), col * squareSize, y)
        }
        dropRows[col] = row + 1
      }

      ctx.font = target.font
      ctx.fillStyle = target.color
      ctx.textBaseline = 'middle'
      word.split('').forEach((char, i) => {
        if (letterRanks[i] >= 0 && letterRanks[i] < revealedCount) {
          ctx.fillText(char, letterX[i], target.y)
        }
      })

      frameId = requestAnimationFrame(draw)
    }

    document.body.style.overflow = 'hidden'
    frameId = requestAnimationFrame(draw)

    // Scheduled on a wall-clock timer rather than gated by frame/animation state,
    // so the intro always finishes in REVEAL_MS + HOLD_MS + FADE_MS even if rAF is throttled.
    const holdTimeout = setTimeout(() => {
      setFadingOut(true)
    }, REVEAL_MS + HOLD_MS)
    const fadeTimeout = setTimeout(onComplete, REVEAL_MS + HOLD_MS + FADE_MS)

    return () => {
      cancelAnimationFrame(frameId)
      clearTimeout(holdTimeout)
      clearTimeout(fadeTimeout)
      clearTimeout(resizeTimer)
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
