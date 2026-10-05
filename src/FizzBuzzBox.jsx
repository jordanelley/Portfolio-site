import { useState } from 'react'
import './FizzBuzzBox.css'

function getFizzBuzzResult(rawValue) {
  const trimmed = rawValue.trim()
  if (trimmed === '') return null
  const num = Number(trimmed)
  if (!Number.isFinite(num)) return 'Invalid'
  if (num % 15 === 0) return 'FizzBuzz'
  if (num % 3 === 0) return 'Fizz'
  if (num % 5 === 0) return 'Buzz'
  return String(num)
}

function FizzBuzzBox() {
  const [value, setValue] = useState('')
  const result = getFizzBuzzResult(value)
  const resultClass =
    result === 'Invalid'
      ? 'fizzbuzz-invalid'
      : result === 'Fizz' || result === 'Buzz' || result === 'FizzBuzz'
        ? 'fizzbuzz-hit'
        : 'fizzbuzz-number'

  return (
    <div className="fizzbuzz">
      <input
        type="text"
        inputMode="numeric"
        placeholder="Enter a number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="fizzbuzz-input"
        aria-label="Enter a number for FizzBuzz"
      />
      <p className={`fizzbuzz-result ${resultClass}`}>{result ?? ' '}</p>
    </div>
  )
}

export default FizzBuzzBox
