import { useEffect, useRef, useState } from 'react'
import './App.css'
import MatrixIntro from './MatrixIntro.jsx'
import CodeTyper from './CodeTyper.jsx'
import Lightbox from './Lightbox.jsx'
import meImage from './images/me.png'
import aboutPhoto1 from './images/about/2F519E8F-FA1A-483A-B309-621A4864C63F.JPG'
import aboutPhoto2 from './images/about/IMG_7277.jpg'
import aboutPhoto3 from './images/about/IMG_6771.jpg'
import experiencePhoto1 from './images/experience/experience-1.png'
import experiencePhoto2 from './images/experience/experience-2.png'
import zipLogo from './images/zip-logo.avif'
import pokeordleImage from './images/pokeordle.png'
import vertigoImage from './images/Vertigo.png'
import badUiImage from './images/bad-ui.PNG'

const aboutPhotos = [
  { src: aboutPhoto1, alt: 'Mountain biking at the top of a trail', label: 'Hard Working', labelSize: 40 },
  { src: aboutPhoto2, alt: 'Jumping a mountain bike off a rock drop', label: 'Detail-Oriented', labelSize: 30 },
  { src: aboutPhoto3, alt: 'Snowboarding down a mountain', label: 'Punctual', labelSize: 48 },
]

// Replace the placeholder content below with your own.
const name = 'Jordan'
const role = 'Software Engineer'
const currentYear = new Date().getFullYear()

const experience = [
  {
    role: 'Software Engineer',
    company: 'Zip Co',
    duration: '1 yr 3 mos',
    logo: zipLogo,
    points: [
      'Worked in .NET Core using event-driven architecture',
      'Unit tested in NUnit',
      'Used EventStoreDB for event sourcing',
      'Maintained the front end in AngularJS',
    ],
  },
  {
    role: 'Volunteer Instructor',
    company: 'Code First Girls',
    duration: '2 yrs',
    points: [
      'Teach 8-week courses online in Python and web development',
      'Assisted teaching in-person courses at Girl Code',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'MYOB',
    duration: '3 yrs',
    points: [
      'Worked in React and .NET Core',
      'Unit tested with Jest & Enzyme on the front end and xUnit on the back end',
      'Upkept automation tests in Selenium and Cucumber.io',
      'Conducted interviews, started the company football team, and ran the brown bags club',
    ],
  },
  {
    role: 'Computer Science Tutor',
    company: 'University of Auckland',
    duration: '9 mos',
    points: [
      'Assisted students with problems in the general help room',
      'Set up study sessions on the most-requested exam topics',
    ],
  },
]

const projects = [
  {
    title: 'Vertigo',
    description: 'Competitive app for Skyline that tracks your rides, tells you how many laps youve done and gives you challenges',
    tags: ['React', 'dotnet core', 'Auth0', 'FlyIO', "SQLlite"],
    href: 'https://jordanelley.github.io/Vertigo/',
    image: vertigoImage,
    imagePosition: 'side',
  },
  {
    title: 'Pokeordle',
    description: 'Made it around the time wordle came out.  Its a daily guess the pokemon using the public free PokeAPI. The colour scheme is terrible so please use it in a browser that forces a dark theme',
    tags: ['React'],
    href: 'https://jordanelley.github.io/pokeordle-rewrite/',
    image: pokeordleImage,
  },
  {
    title: 'Bad UI battles',
    description: 'I got really into making \'difficult to use\' websites and sign up pages over lockdown and ended up with some popular social medias.  Received many awards on Reddit in r/badUIbattles' ,
    tags: ['React', 'Angular'],
    href: '#',
    image: badUiImage,
    imagePosition: 'side',
  },
]

function ExperienceItem({ job }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`experience-item${visible ? ' experience-item-visible' : ''}${job.logo ? ' experience-item-with-logo' : ''}`}
    >
      <div className="experience-content">
        <div className="experience-header">
          <h3>
            {job.role} <span className="experience-company">@ {job.company}</span>
          </h3>
          <span className="experience-period">{job.duration}</span>
        </div>
        <ul className="experience-points">
          {job.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
      {job.logo && <img src={job.logo} alt={`${job.company} logo`} className="experience-logo" />}
    </div>
  )
}

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
      <p className={`fizzbuzz-result ${resultClass}`}>{result ?? ' '}</p>
    </div>
  )
}

function App() {
  const [showIntro, setShowIntro] = useState(true)
  const [lightboxImage, setLightboxImage] = useState(null)

  return (
    <>
      {showIntro && (
        <MatrixIntro name={name} onComplete={() => setShowIntro(false)} />
      )}

      {lightboxImage && (
        <Lightbox
          src={lightboxImage.src}
          alt={lightboxImage.alt}
          onClose={() => setLightboxImage(null)}
        />
      )}

      <header className="nav">
        <a href="#top" className="nav-logo">
          {name}
        </a>
        <nav className="nav-links">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#work">Work</a>
        </nav>
      </header>

      <main>
        <section id="top" className="hero">
          <div className="hero-content">
            <p className="eyebrow">Hi, I&rsquo;m</p>
            <h1>{name}</h1>
            <p className="role">{role}</p>
            <FizzBuzzBox />
          </div>
          <CodeTyper />
          <img src={meImage} alt={name} className="avatar" />
        </section>

        <section id="about" className="about">
          <WordArtTitle text="About" />
          <div className="about-photos">
            {aboutPhotos.map((photo) => (
              <div className="about-photo" key={photo.src}>
                <img src={photo.src} alt={photo.alt} />
                <span
                  className="about-photo-label"
                  style={{ fontSize: photo.labelSize }}
                >
                  {photo.label}
                </span>
              </div>
            ))}
          </div>
          <p className="bio">
            I taught myself to code in school so I could make games on my calculator.  In my free time, I
            enjoy mountain biking, snowboarding, hiking, football, chess, board games and video games. I have
            a Computer Science degree from the University of Auckland
          </p>
        </section>

        <section id="experience" className="experience">
          <div className="experience-title-row">
            <WordArtTitle text="Experience" />
            <img
              src={experiencePhoto1}
              alt="At my desk at work"
              className="experience-photo experience-photo-first"
            />
            <img src={experiencePhoto2} alt="At my desk at work" className="experience-photo" />
          </div>
          <div className="experience-list">
            {experience.map((job) => (
              <ExperienceItem key={job.role + job.company} job={job} />
            ))}
          </div>
        </section>

        <section id="work" className="work">
          <WordArtTitle text="Fun Things" />
          <div className="project-grid">
            {projects.map((project) => {
              const imageOnSide = project.imagePosition === 'side'
              const content = (
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <ul className="tags">
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
              )
              const alt = `${project.title} banner`
              const openLightbox = (e) => {
                e.preventDefault()
                e.stopPropagation()
                setLightboxImage({ src: project.image, alt })
              }
              const image = project.image && (
                <img
                  src={project.image}
                  alt={alt}
                  className={`project-image${imageOnSide ? ' project-image-side' : ''}`}
                  role="button"
                  tabIndex={0}
                  onClick={openLightbox}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') openLightbox(e)
                  }}
                />
              )

              return (
                <a
                  key={project.title}
                  className={`project-card${imageOnSide ? ' project-card-side' : ''}`}
                  href={project.href}
                  target={project.href.startsWith('http') ? '_blank' : undefined}
                  rel={project.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {imageOnSide ? (
                    <>
                      {content}
                      {image}
                    </>
                  ) : (
                    <>
                      {image}
                      {content}
                    </>
                  )}
                </a>
              )
            })}
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>
          &copy; {currentYear} {name}. Built with React &amp; Vite.
        </p>
      </footer>
    </>
  )
}

export default App
