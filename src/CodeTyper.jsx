import { useEffect, useState } from 'react'
import './CodeTyper.css'

const EVEN_CHECK_COUNT = 16

const CODE_LINES = [
  { indent: 0, tokens: [{ t: 'function', c: 'kw' }, { t: ' isEven(' }, { t: 'n', c: 'var' }, { t: ') {' }] },
  ...Array.from({ length: EVEN_CHECK_COUNT }, (_, n) => ({
    indent: 1,
    tokens: [
      { t: 'if', c: 'kw' },
      { t: ' (' },
      { t: 'n', c: 'var' },
      { t: ' === ' },
      { t: String(n), c: 'num' },
      { t: ') ' },
      { t: 'return', c: 'kw' },
      { t: n % 2 === 0 ? ' true' : ' false', c: 'kw' },
    ],
  })),
]

const FULL_TEXT = CODE_LINES.map((line) => '  '.repeat(line.indent) + line.tokens.map((tok) => tok.t).join('')).join('\n')

const TYPE_MS = 35

function renderRevealed(revealedLength) {
  let remaining = revealedLength
  const out = []

  for (const line of CODE_LINES) {
    const indentStr = '  '.repeat(line.indent)
    if (remaining <= 0) break

    if (remaining < indentStr.length) {
      remaining = 0
      break
    }
    remaining -= indentStr.length

    const lineNodes = []
    for (const tok of line.tokens) {
      if (remaining <= 0) break
      const slice = tok.t.slice(0, remaining)
      lineNodes.push(
        tok.c ? <span key={lineNodes.length} className={`code-${tok.c}`}>{slice}</span> : slice
      )
      remaining -= slice.length
    }
    out.push(<div key={out.length} className="code-line">{indentStr}{lineNodes}</div>)
    remaining -= 1 // account for the newline between lines
  }

  return out
}

function CodeTyper() {
  const [revealedLength, setRevealedLength] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRevealedLength(FULL_TEXT.length)
      return
    }

    let timeoutId
    let length = 0

    const tick = () => {
      length += 1
      setRevealedLength(length)
      if (length < FULL_TEXT.length) {
        timeoutId = setTimeout(tick, TYPE_MS)
      }
    }

    timeoutId = setTimeout(tick, TYPE_MS)
    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <div className="code-typer" aria-hidden="true">
      <div className="code-typer-bar">
        <span className="code-typer-dot code-typer-dot-red" />
        <span className="code-typer-dot code-typer-dot-yellow" />
        <span className="code-typer-dot code-typer-dot-green" />
        <span className="code-typer-filename">isEven.js</span>
      </div>
      <pre className="code-typer-body">
        <code>
          {renderRevealed(revealedLength)}
          <span className={`code-typer-cursor${revealedLength >= FULL_TEXT.length ? ' code-typer-cursor-done' : ''}`} />
        </code>
      </pre>
    </div>
  )
}

export default CodeTyper
