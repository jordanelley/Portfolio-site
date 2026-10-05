import { useEffect, useRef, useState } from 'react'
import './App.css'
import MatrixIntro from './MatrixIntro.jsx'
import CodeTyper from './CodeTyper.jsx'
import Lightbox from './Lightbox.jsx'
import FizzBuzzBox from './FizzBuzzBox.jsx'
import WordArtTitle from './WordArtTitle.jsx'
import meImage from './images/me.png'
import aboutPhoto1 from './images/about/2F519E8F-FA1A-483A-B309-621A4864C63F.JPG'
import aboutPhoto2 from './images/about/IMG_7277.jpg'
import aboutPhoto3 from './images/about/IMG_6771.jpg'
import experiencePhoto1 from './images/experience/experience-1.png'
import experiencePhoto2 from './images/experience/experience-2.png'
import zipLogo from './images/zip-logo.avif'
import pokeordleImage from './images/pokeordle.png'
import vertigoImage from './images/Vertigo.png'
import garminImage from './images/Garmin-audit.png'
import badUiImage from './images/bad-ui.PNG'
import badUiImage2 from './images/bad-ui-2.jpg'

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
    company: 'Queenstown Community Tech Lab',
    duration: 'Currently working on',
    points: [
      'Collaborating with the Queenstown MTB club to make a software to make auditing the trails less manual',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Zip Co',
    duration: '1 yr 3 mos',
    logo: zipLogo,
    points: [
      'Digital Finacial Services Software',
      'Maintained and built services on a .NET core system designed with event-driven architecture',
      'Unit tested in NUnit',
      'Used EventStoreDB for event sourcing',
      'Built features on the web app using Angular and Typescript',
      'Maintained the mobile app in Flutter'
    ],
  },
  {
    role: 'Volunteer Instructor',
    company: 'Code First Girls',
    duration: '2 yrs',
    points: [
      'Charity offering free online courses for Tech',
      'Taught 8-week courses online in Python, Web Development and SQL',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'MYOB',
    duration: '3 yrs',
    points: [
      'Cloud Platform for accountants and book keepers to interact with businesses',
      'Fullstack using React and .NET Core',
      'Unit tested with Jest & Enzyme on the front end and xUnit on the back end',
      'Upkept automation tests in Selenium and Cucumber.io',
      'Conducted interviews, started the company football team, and ran the brown bag talks',
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
    title: 'Audit Tracks',
    description: 'Side project to see if mountain bike tracks in Queenstown can be audited off Garmin data alone',
    tags: ['React'],
    href: 'https://jordanelley.github.io/mtb-garmin-data-demo/',
    image: garminImage,
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
    image: [badUiImage, badUiImage2],
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
              const images = Array.isArray(project.image)
                ? project.image
                : project.image
                  ? [project.image]
                  : []
              const image = images.length > 0 && (
                <div className={`project-images${imageOnSide ? ' project-images-side' : ''}`}>
                  {images.map((src, i) => {
                    const alt = `${project.title} banner${images.length > 1 ? ` ${i + 1}` : ''}`
                    const openLightbox = (e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setLightboxImage({ src, alt })
                    }
                    return (
                      <img
                        key={src}
                        src={src}
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
                  })}
                </div>
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
