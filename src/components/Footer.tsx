import React from 'react';
import { Mail, ShieldAlert } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer style={{ background: 'rgba(5, 3, 10, 0.9)', borderTop: '1px solid rgba(255, 255, 255, 0.04)', padding: '3rem 0 2rem', position: 'relative' }}>
      <div className="container">
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem', marginBottom: '2rem' }}>
          
          {/* Logo brand */}
          <div style={{ textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="logo-dot"></span>
              <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: '1.25rem', color: '#ffffff', letterSpacing: '-0.02em' }}>
                Atharv Mantri
              </span>
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              &gt; Building things most won't understand.
            </p>
          </div>

          {/* Quick links */}
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <button onClick={() => handleScrollTo('terminal')} className="footer-link-btn" data-interactive>Console</button>
            <button onClick={() => handleScrollTo('projects')} className="footer-link-btn" data-interactive>Projects</button>
            <button onClick={() => handleScrollTo('skills')} className="footer-link-btn" data-interactive>Skills</button>
            <button onClick={() => handleScrollTo('experience')} className="footer-link-btn" data-interactive>Ledger</button>
            <button onClick={() => handleScrollTo('contact')} className="footer-link-btn" data-interactive>Link</button>
          </div>

        </div>

        <hr style={{ border: 'none', borderBottom: '1px solid rgba(255, 255, 255, 0.04)', marginBottom: '1.5rem' }} />

        {/* Lower row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span>© {currentYear} Atharv Mantri. All rights reserved.</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
            <a href="https://github.com/atharvmantri" target="_blank" rel="noreferrer" className="footer-social" data-interactive>
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
            <a href="mailto:work@atharv.me" className="footer-social" data-interactive>
              <Mail size={16} />
            </a>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>
              <ShieldAlert size={12} style={{ color: 'var(--accent-cyan)' }} />
              SECURE_SOCKET_OK
            </span>
          </div>

        </div>

      </div>

      <style>{`
        .footer-link-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-family: var(--font-sans);
          font-size: 0.88rem;
          font-weight: 500;
          cursor: pointer;
          transition: color 0.3s;
        }

        .footer-link-btn:hover {
          color: #ffffff;
        }

        .footer-social {
          color: var(--text-muted);
          transition: color 0.3s;
        }

        .footer-social:hover {
          color: #ffffff;
        }
      `}</style>

    </footer>
  );
};
