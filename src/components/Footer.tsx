import React from 'react';
import { Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer style={{
      background: 'var(--bg-sidebar)',
      borderTop: '2px solid var(--bg-sidebar-dark)',
      padding: '24px 0 18px',
      position: 'relative'
    }}>
      <div className="container">

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '18px', marginBottom: '16px' }}>

          {/* Logo */}
          <div style={{ textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
              <span className="logo-dot"></span>
              <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '1.4rem', color: 'var(--text-light)', letterSpacing: '0.02em' }}>
                {t('logo')}
              </span>
            </div>
            <p style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.95rem', color: 'rgba(245, 240, 225, 0.6)' }}>
              {t('footerTagline')}
            </p>
          </div>

          {/* Quick links (taskbar-style) */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <button onClick={() => handleScrollTo('terminal')} className="footer-link-btn" data-interactive>{t('console')}</button>
            <button onClick={() => handleScrollTo('projects')} className="footer-link-btn" data-interactive>{t('projects')}</button>
            <button onClick={() => handleScrollTo('skills')} className="footer-link-btn" data-interactive>{t('skills')}</button>
            <button onClick={() => handleScrollTo('contact')} className="footer-link-btn" data-interactive>{t('contact')}</button>
          </div>

        </div>

        <hr style={{ border: 'none', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', marginBottom: '14px' }} />

        {/* Lower row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', fontSize: '0.88rem', color: 'rgba(245, 240, 225, 0.5)' }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontFamily: 'var(--font-pixel)' }}>
            <span>{t('footerCopyright', { year: currentYear })}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a href="https://github.com/atharvmantri" target="_blank" rel="noreferrer" className="footer-social" data-interactive title="GitHub">
              <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/atharvmantr_i" target="_blank" rel="noreferrer" className="footer-social" data-interactive title="Instagram">
              <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            <a href="mailto:work@atharv.me" className="footer-social" data-interactive title="Email">
              <Mail size={17} />
            </a>
          </div>

        </div>

      </div>

      <style>{`
        .footer-link-btn {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: rgba(245, 240, 225, 0.7);
          font-family: var(--font-pixel);
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.15s;
          padding: 6px 14px;
          border-radius: 4px;
        }

        .footer-link-btn:hover {
          background: rgba(255, 255, 255, 0.15);
          color: var(--text-light);
        }

        .footer-social {
          color: rgba(245, 240, 225, 0.5);
          transition: color 0.2s;
          display: flex;
          align-items: center;
        }

        .footer-social:hover {
          color: var(--text-light);
        }
      `}</style>

    </footer>
  );
};
