import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Hero } from './components/Hero';
import { Terminal } from './components/Terminal';
import { Stats } from './components/Stats';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

/* ── Retro Folder Icon Component ── */
interface FolderIconProps {
  label: string;
  colorClass?: string;
  onClick: () => void;
}

const FolderIcon: React.FC<FolderIconProps> = ({ label, colorClass = '', onClick }) => (
  <button className="folder-icon" onClick={onClick} data-interactive>
    <div className="folder-icon-img">
      <div className={`folder-shape ${colorClass}`}>
        <div className="folder-tab"></div>
        <div className="folder-body"></div>
      </div>
    </div>
    <span className="folder-label">{label}</span>
  </button>
);

/* ── Social Dock Bar (GitHub, Instagram, Email) ── */
const SocialDock: React.FC = () => (
  <div className="social-dock">
    <a
      href="https://github.com/atharvmantri"
      target="_blank"
      rel="noreferrer"
      className="social-dock-icon github"
      data-interactive
      title="GitHub"
    >
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    </a>
    <a
      href="https://www.instagram.com/atharvmantr_i"
      target="_blank"
      rel="noreferrer"
      className="social-dock-icon instagram"
      data-interactive
      title="Instagram"
    >
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    </a>
    <a
      href="mailto:work@atharv.me"
      className="social-dock-icon email"
      data-interactive
      title="Email"
    >
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    </a>
  </div>
);

function App() {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('hero');

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
      {/* Graph Paper Background */}
      <div className="graph-paper-bg"></div>

      {/* Desktop Layout */}
      <div className="desktop-layout">

        {/* Left Sidebar — Folder Icons */}
        <aside className="sidebar sidebar-left">
          <FolderIcon
            label="profile"
            onClick={() => handleScrollTo('hero')}
          />
          <FolderIcon
            label="works"
            colorClass="folder-blue"
            onClick={() => handleScrollTo('projects')}
          />
        </aside>

        {/* Right Sidebar — Folder Icons */}
        <aside className="sidebar sidebar-right">
          <FolderIcon
            label="contact"
            colorClass="folder-pink"
            onClick={() => handleScrollTo('contact')}
          />
          <FolderIcon
            label="resume"
            colorClass="folder-green"
            onClick={() => handleScrollTo('skills')}
          />
        </aside>

        {/* Main Content Area */}
        <div className="main-content">

          {/* Top Nav Bar */}
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

          {/* Main Sections */}
          <main style={{ width: '100%', paddingTop: '56px' }}>
            <div id="hero">
              <Hero />
            </div>
            <SocialDock />
            <Terminal />
            <Stats />
            <Projects />
            <Skills />
            <Contact />
          </main>

          <Footer />
        </div>
      </div>

      {/* Inline styles for nav buttons */}
      <style>{`
        .nav-link-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-family: var(--font-pixel);
          font-size: 1.15rem;
          cursor: pointer;
          transition: color 0.2s, background 0.15s;
          padding: 8px 14px;
          border-radius: 4px;
          position: relative;
        }

        .nav-link-btn:hover {
          color: var(--text-dark);
          background: rgba(0,0,0,0.06);
        }

        .nav-link-btn.active {
          color: var(--text-dark);
          background: var(--bg-window);
          border: 1px solid var(--border-medium);
          box-shadow: inset 1px 1px 0 rgba(255,255,255,0.5);
        }
      `}</style>
    </>
  );
}

export default App;
