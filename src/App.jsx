import { useState } from 'react'
import './App.css'
import MatrixIntro from './MatrixIntro.jsx'

// Replace the placeholder content below with your own.
const name = 'Jordan Elley'
const role = 'Software Engineer'
const tagline =
  "I build things for the web. Short, punchy line about what you do and who it's for."
const email = 'you@example.com'
const currentYear = new Date().getFullYear()

const socials = [
  { label: 'GitHub', href: 'https://github.com/yourhandle', icon: 'github-icon' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/yourhandle', icon: 'linkedin-icon' },
  { label: 'X', href: 'https://x.com/yourhandle', icon: 'x-icon' },
]

const skills = [
  'JavaScript / TypeScript',
  'Dotnet core',
  'AI',
  'React',
  'Node.js',
  'CSS / Design systems',
  'API design',
  'Testing',
]

const projects = [
  {
    title: 'Project One',
    description: 'One or two sentences describing the problem and what you built.',
    tags: ['React', 'Node'],
    href: '#',
  },
  {
    title: 'Project Two',
    description: 'One or two sentences describing the problem and what you built.',
    tags: ['TypeScript', 'API'],
    href: '#',
  },
  {
    title: 'Project Three',
    description: 'One or two sentences describing the problem and what you built.',
    tags: ['Design', 'CSS'],
    href: '#',
  },
]

function Icon({ id, dark }) {
  return (
    <svg
      className={dark ? 'icon icon-dark' : 'icon'}
      role="presentation"
      aria-hidden="true"
    >
      <use href={`/icons.svg#${id}`}></use>
    </svg>
  )
}

function App() {
  const [showIntro, setShowIntro] = useState(true)

  return (
    <>
      {showIntro && (
        <MatrixIntro name={name} onComplete={() => setShowIntro(false)} />
      )}

      <header className="nav">
        <a href="#top" className="nav-logo">
          {name}
        </a>
        <nav className="nav-links">
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section id="top" className="hero">
          <p className="eyebrow">Hi, I&rsquo;m</p>
          <h1>{name}</h1>
          <p className="role">{role}</p>
          <p className="tagline">{tagline}</p>
          <div className="cta-row">
            <a className="button primary" href="#work">
              View my work
            </a>
            <a className="button" href="#contact">
              Get in touch
            </a>
          </div>
        </section>

        <section id="about" className="about">
          <h2>About</h2>
          <div className="about-grid">
            <p className="bio">
              Write a few sentences here about your background, what you&rsquo;re
              working on now, and what kind of opportunities or projects you&rsquo;re
              looking for.
            </p>
            <ul className="skills">
              {skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="work" className="work">
          <h2>Selected work</h2>
          <div className="project-grid">
            {projects.map((project) => (
              <a key={project.title} className="project-card" href={project.href}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <ul className="tags">
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </a>
            ))}
          </div>
        </section>

        <section id="contact" className="contact">
          <h2>Get in touch</h2>
          <p>
            The best way to reach me is email — I try to reply within a couple of
            days.
          </p>
          <a className="button primary" href={`mailto:${email}`}>
            <Icon id="mail-icon" />
            {email}
          </a>
          <ul className="social-links">
            {socials.map((social) => (
              <li key={social.label}>
                <a href={social.href} target="_blank" rel="noreferrer">
                  <Icon id={social.icon} dark />
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
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
