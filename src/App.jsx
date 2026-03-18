import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import './App.css'
import phpImg from './Images/php.png'
import javaImg from './Images/java.png'
import sqlImg from './Images/sql.png'
import pythonImg from './Images/python.png'
import symfonyImg from './Images/symfony.png'
import htmlImg from './Images/html.png'
import cssImg from './Images/css.png'
import jsImg from './Images/javascript.png'
import profileImage from './Images/photo_profil.jpg'
import allperf from './Images/atol-logo.png'
import elitTechnologie from './Images/netvincennesLogo.png'
import immoSync from './Images/immo-sync.png'

const TYPING_TEXTS = [
  "Développeur d'applications web",
  "Étudiant BTS SIO — option SLAM",
  "Passionné de code propre et efficace",
]

function Typing({ texts = TYPING_TEXTS, speed = 80, pause = 1800 }) {
  const [idx, setIdx] = useState(0)
  const [display, setDisplay] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const text = texts[idx]
    let timeout
    if (!isDeleting && display.length < text.length) {
      timeout = setTimeout(() => setDisplay(text.slice(0, display.length + 1)), speed)
    } else if (!isDeleting && display.length === text.length) {
      timeout = setTimeout(() => setIsDeleting(true), pause)
    } else if (isDeleting && display.length > 0) {
      timeout = setTimeout(() => setDisplay(text.slice(0, display.length - 1)), Math.round(speed / 1.8))
    } else {
      timeout = setTimeout(() => {
        setIsDeleting(false)
        setIdx((i) => (i + 1) % texts.length)
      }, speed)
    }
    return () => clearTimeout(timeout)
  }, [display, isDeleting, idx, texts, speed, pause])

  return (
    <span className="typing" aria-live="polite">
      {display}
      <span className="caret" aria-hidden />
    </span>
  )
}

function FadeUp({ children, delay = 0, className }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

const skillVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

const skillItem = {
  hidden: { opacity: 0, y: 18, scale: 0.88 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.38, ease: 'easeOut' } },
}

function TerminalCard() {
  return (
    <div className="terminal-card">
      <div className="terminal-header">
        <span className="terminal-dot dot-red" />
        <span className="terminal-dot dot-yellow" />
        <span className="terminal-dot dot-green" />
        <span className="terminal-filename">jonas.js</span>
      </div>
      <pre className="terminal-body">
        <code>
          <span className="code-keyword">const</span>{' '}
          <span className="code-property">dev</span>{' = {\n'}
          {'  '}<span className="code-property">name</span>{': '}
          <span className="code-string">"Jonas Touati"</span>{',\n'}
          {'  '}<span className="code-property">skills</span>{': ['}
          <span className="code-string">"PHP"</span>{', '}
          <span className="code-string">"Java"</span>{', '}
          <span className="code-string">"JS"</span>{']}' + ',\n'}
          {'  '}<span className="code-property">formation</span>{': '}
          <span className="code-string">"BTS SIO SLAM"</span>{',\n'}
          {'  '}<span className="code-property">statut</span>{': '}
          <span className="code-string">"Disponible"</span>{'\n}'}
        </code>
      </pre>
    </div>
  )
}

const TECH_STACK = [
  { label: 'langages',    values: ['HTML', 'CSS', 'JavaScript', 'PHP', 'DQL'] },
  { label: 'frameworks',  values: ['EduFrame', 'Symfony', 'Bootstrap'] },
  { label: 'database',    values: ['MySQL'] },
  { label: 'outils',      values: ['Git', 'Docker', 'PhpStorm', 'Composer', 'Doctrine'] },
  { label: 'apis',        values: ['OpenWeatherMap', 'OpenStreetMap'] },
]

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') || 'light')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) setScrolled(isScrolled)
    }
    document.addEventListener('scroll', handleScroll, { passive: true })
    return () => document.removeEventListener('scroll', handleScroll)
  }, [scrolled])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMobileMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <div className="site-root">
      <div
        className="mobile-overlay"
        data-visible={mobileMenuOpen}
        onClick={closeMobileMenu}
        aria-hidden={!mobileMenuOpen}
      />

      {/* Navigation */}
      <nav className={`topnav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <a href="/" className="nav-brand" aria-label="Accueil">
            <span className="nav-brand-icon">&lt;/&gt;</span>
            <span className="nav-brand-name">JT</span>
          </a>

          <div className="nav-links" data-visible={mobileMenuOpen} onClick={closeMobileMenu}>
            <a href="/" className="nav-link active" onClick={() => { localStorage.removeItem('portfolio-theme'); setTheme('light') }}>Accueil</a>
            <a href="/allperf.html" className="nav-link">Stage Atol</a>
            <a href="/elit-technologie.html" className="nav-link">Stage Netvincennes</a>
            <a href="/immo-sync.html" className="nav-link">ImmoSync</a>
          </div>

          <div className="nav-actions">
            <button
              className="theme-toggle"
              onClick={() => setTheme(t => {
                const next = t === 'dark' ? 'light' : 'dark'
                localStorage.setItem('portfolio-theme', next)
                return next
              })}
              aria-label="Changer le thème"
              title={theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <button
              className="menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Menu"
            >
              <span className="hamburger" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="hero">
        <div className="hero-bg-grid" aria-hidden />
        <div className="hero-inner">
          <motion.div
            className="presentation"
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1>
              Salut, je suis <span className="name">Jonas Touati</span>
            </h1>
            <section aria-label="Présentation courte">
              <div style={{ marginBottom: '0.75rem' }}>
                <Typing />
              </div>
              <div className="presentation-inner">
                <p>
                  Actuellement étudiant en deuxième année de{' '}
                  <strong>BTS Services Informatiques aux Organisations (SIO)</strong>, option{' '}
                  <strong>SLAM</strong> (Solutions Logicielles et Applications Métier).
                </p>
                <p>
                  Cette formation m'a permis d'acquérir des compétences en
                  développement informatique, notamment en{' '}
                  <strong>Java, PHP, JavaScript, HTML</strong> et <strong>CSS</strong>{' '}
                  à travers des projets pédagogiques concrets.
                </p>
                <p>
                  Le BTS SIO m'a également apporté une méthodologie rigoureuse :
                  analyse des besoins, documentation et respect des contraintes techniques.
                </p>
              </div>
              <div className="hero-cta">
                <a className="btn" href="/CV-BTS-SIO.pdf" download>
                  Télécharger mon CV
                </a>
                <a className="btn ghost" href="/CV-BTS-SIO.pdf" target="_blank" rel="noopener noreferrer">
                  Consulter mon CV
                </a>
              </div>
              <TerminalCard />
            </section>
          </motion.div>

          <motion.div
            className="profile-image-container"
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={profileImage}
              alt="Jonas Touati — Développeur d'applications"
              className="profile-image"
              loading="lazy"
            />
          </motion.div>
        </div>
      </header>

      {/* Parcours */}
      <section id="parcours" className="parcours section">
        <FadeUp>
          <h2 className="bts-title">MON PARCOURS</h2>
        </FadeUp>
        <div className="parcours-grid">
          <FadeUp delay={0.1}>
            <article className="parcours-card">
              <h3>2023–2024</h3>
              <p>
                En 2022–2023, j'ai obtenu un baccalauréat général avec les spécialités
                Mathématiques et Sciences Économiques et Sociales, au lycée Chné-Or.
                Cette formation m'a permis de développer des compétences en raisonnement
                logique, en analyse de problèmes et en méthode de travail.
              </p>
            </article>
          </FadeUp>
          <FadeUp delay={0.2}>
            <article className="parcours-card">
              <h3>2024–2026 (en cours)</h3>
              <p>
                Depuis 2024, je suis étudiant en BTS SIO option SLAM. Cette formation me
                permet d'acquérir des compétences en développement logiciel et web à travers
                plusieurs langages de programmation et des projets pédagogiques concrets.
              </p>
            </article>
          </FadeUp>
        </div>
      </section>

      {/* BTS SIO */}
      <section id="bts" className="bts-section section">
        <FadeUp>
          <h2 className="bts-title">PRÉSENTATION DU BTS SIO</h2>
          <p className="bts-intro">
            Le BTS Services Informatiques aux Organisations (SIO) est un tremplin dynamique
            pour ceux qui souhaitent façonner l'avenir numérique. Ce programme plonge les
            étudiants dans deux spécialités complémentaires : le développement d'applications
            (SLAM) et l'administration des infrastructures (SISR).
          </p>
        </FadeUp>

        <div className="bts-cards">
          <FadeUp delay={0.1}>
            <article className="bts-card">
              <h3>Option SLAM (Solutions Logicielles et Applications Métier)</h3>
              <p>
                Cette option couvre la conception, le développement et la gestion
                d'applications logicielles : logiciels, sites web et applications mobiles.
              </p>
              <ul>
                <li>Compétences : programmation, conception, bases de données</li>
                <li>Technos fréquentes : Java, PHP, JavaScript, frameworks web</li>
                <li>Objectif : produire des applications fiables et maintenables</li>
              </ul>
            </article>
          </FadeUp>
          <FadeUp delay={0.2}>
            <article className="bts-card">
              <h3>Option SISR (Solutions d'Infrastructure, Systèmes et Réseaux)</h3>
              <p>
                Cette spécialisation porte sur l'administration et la gestion des
                infrastructures informatiques.
              </p>
              <ul>
                <li>Compétences : réseaux, administration système, sécurité</li>
                <li>Technos fréquentes : serveurs, virtualisation, outils réseau</li>
                <li>Objectif : maintenir des infrastructures robustes et sûres</li>
              </ul>
            </article>
          </FadeUp>
        </div>
        <div className="bts-cta-wrap">
          <a className="btn bts-cta" href="#synthese">Consulter le tableau de synthèse</a>
        </div>
      </section>

      {/* Compétences */}
      <section id="skills" className="section skills">
        <FadeUp>
          <h2 className="bts-title">COMPÉTENCES</h2>
        </FadeUp>
        <motion.div
          className="skills-grid"
          variants={skillVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {[
            { key: 'PHP',        src: phpImg },
            { key: 'JAVA',       src: javaImg },
            { key: 'SQL',        src: sqlImg },
            { key: 'PYTHON',     src: pythonImg },
            { key: 'SYMFONY',    src: symfonyImg },
            { key: 'HTML',       src: htmlImg },
            { key: 'CSS',        src: cssImg },
            { key: 'JAVASCRIPT', src: jsImg },
          ].map((s) => (
            <motion.div key={s.key} className="skill-card" variants={skillItem}>
              <div className="skill-logo">
                <img className="skill-logo-img" src={s.src} alt={s.key} />
              </div>
              <div className="skill-name">{s.key}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Technologies */}
      <section id="technologies" className="section technologies-section">
        <FadeUp>
          <h2 className="bts-title">TECHNOLOGIES UTILISÉES</h2>
          <div className="tech-terminal">
            <div className="terminal-header">
              <span className="terminal-dot dot-red" />
              <span className="terminal-dot dot-yellow" />
              <span className="terminal-dot dot-green" />
              <span className="terminal-filename">stack.json</span>
            </div>
            <div className="tech-terminal-body">
              <span className="code-bracket">{'{'}</span>
              {TECH_STACK.map((cat, ci) => (
                <div key={cat.label} className="tech-row">
                  <span className="tech-key">&nbsp;&nbsp;"{cat.label}"</span>
                  <span className="tech-colon">: [</span>
                  {cat.values.map((v, vi) => (
                    <span key={v}>
                      <span className="tech-value">"{v}"</span>
                      {vi < cat.values.length - 1 && <span className="tech-comma">, </span>}
                    </span>
                  ))}
                  <span className="tech-colon">]{ci < TECH_STACK.length - 1 ? ',' : ''}</span>
                </div>
              ))}
              <span className="code-bracket">{'}'}</span>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* Stages */}
      <section id="stages" className="section">
        <FadeUp>
          <h2 className="bts-title">STAGES</h2>
        </FadeUp>
        <div className="projects-grid">
          <FadeUp delay={0.1}>
            <a href="/allperf.html" id="allperf-project" className="project-card project-link" aria-label="Ouvrir la page Allperf">
              <div className="project-image">
                <img src={allperf} alt="Stage Allperf" loading="lazy" style={{ objectPosition: 'center center' }} />
              </div>
              <div className="project-content">
                <h3>Stage de première année chez Atol Rueil-Malmaison</h3>
              </div>
            </a>
          </FadeUp>

          <FadeUp delay={0.2}>
            <a href="/elit-technologie.html" id="elittechnologie-project" className="project-card project-link" aria-label="Ouvrir la page ElitTechnologie">
              <div className="project-image">
                <img src={elitTechnologie} alt="Stage ElitTechnologie" loading="lazy" style={{ objectPosition: 'center center' }} />
              </div>
              <div className="project-content">
                <h3>Stage réalisé chez Netvincennes</h3>
              </div>
            </a>
          </FadeUp>

          <FadeUp>
            <h2 className="bts-title" style={{ marginTop: '2rem' }}>PROJETS</h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <a href="/immo-sync.html" id="immosync-project" className="project-card project-link" aria-label="Ouvrir la page ImmoSync">
              <div className="project-image">
                <img src={immoSync} alt="ImmoSync" loading="lazy" style={{ objectPosition: 'center center' }} />
              </div>
              <div className="project-content">
                <p>
                  Application web dédiée à la gestion et au suivi de travaux, permettant de
                  centraliser les projets, de planifier les interventions, de suivre l'avancement
                  des tâches et de faciliter la coordination entre les différents acteurs.
                </p>
              </div>
            </a>
          </FadeUp>

          <footer className="site-footer">
            <p>
              Me contacter :{' '}
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=jonas.touati1@ortmontreuil.fr"
                target="_blank"
                rel="noopener noreferrer"
              >
                jonas.touati1@ortmontreuil.fr
              </a>
            </p>
          </footer>
        </div>
      </section>
    </div>
  )
}

export default App

