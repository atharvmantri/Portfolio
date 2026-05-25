import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Hero } from './components/Hero';
import { Terminal } from './components/Terminal';
import { Stats } from './components/Stats';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

function App() {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('hero');

  // Track active section on scroll to update navigation items
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'terminal', 'stats', 'projects', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Background Glowing Web Effect */}
      <div className="grid-bg"></div>
      <div className="bg-glow-container">
        <div className="bg-glow-blob blob-1"></div>
        <div className="bg-glow-blob blob-2"></div>
        <div className="bg-glow-blob blob-3"></div>
      </div>

      {/* Floating Glass Navbar */}
      <nav className="navbar">
        <div className="nav-container">
          <a href="#hero" className="logo" onClick={(e) => { e.preventDefault(); handleScrollTo('hero'); }} data-interactive>
            <span className="logo-dot"></span>
            Atharv Mantri
          </a>

          <div className="nav-links">
            <button 
              onClick={() => handleScrollTo('terminal')} 
              className={`nav-link-btn ${activeSection === 'terminal' ? 'active' : ''}`}
              data-interactive
            >
              {t('console')}
            </button>
            <button 
              onClick={() => handleScrollTo('stats')} 
              className={`nav-link-btn ${activeSection === 'stats' ? 'active' : ''}`}
              data-interactive
            >
              {t('stats')}
            </button>
            <button 
              onClick={() => handleScrollTo('projects')} 
              className={`nav-link-btn ${activeSection === 'projects' ? 'active' : ''}`}
              data-interactive
            >
              {t('projects')}
            </button>
            <button 
              onClick={() => handleScrollTo('skills')} 
              className={`nav-link-btn ${activeSection === 'skills' ? 'active' : ''}`}
              data-interactive
            >
              {t('skills')}
            </button>
            <button 
              onClick={() => handleScrollTo('contact')} 
              className={`nav-link-btn ${activeSection === 'contact' ? 'active' : ''}`}
              data-interactive
            >
              {t('contact')}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Page Layout Sections */}
      <main style={{ width: '100%' }}>
        <div id="hero">
          <Hero />
        </div>
        <Terminal />
        <Stats />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <Footer />

      {/* Inner style overrides specifically for navbar buttons */}
      <style>{`
        .nav-link-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-family: var(--font-sans);
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          transition: color 0.3s;
          padding: 0.5rem 0.25rem;
          position: relative;
        }

        .nav-link-btn:hover, .nav-link-btn.active {
          color: var(--text-heading);
        }

        .nav-link-btn.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: var(--gradient-primary);
          border-radius: 2px;
        }
      `}</style>
    </>
  );
}

export default App;
