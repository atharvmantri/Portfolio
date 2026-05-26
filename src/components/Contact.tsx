import React, { useState } from 'react';
import { Mail, Copy, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('work@atharv.me');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="retro-section">
      <div className="container" style={{ maxWidth: '700px' }}>

        {/* Toast Notification */}
        <div className={`toast-notification ${copied ? 'show' : ''}`}>
          <Check size={18} />
          <span>{t('contactCopiedToast')}</span>
        </div>

        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h3 className="section-header">
            {t('contactHeader')}
          </h3>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 700, fontFamily: 'var(--font-serif)' }}>
            {t('contactTitle')} <span className="text-gradient">{t('contactTitleAccent')}</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0.5rem auto 0', fontSize: '1.05rem', lineHeight: 1.6 }}>
            {t('contactDescription')}
          </p>
        </div>

        {/* Contact Window — Email Only */}
        <div className="retro-window" style={{ maxWidth: '520px', margin: '0 auto' }}>
          <div className="retro-titlebar">
            <span className="retro-titlebar-path">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="3" width="14" height="11" rx="1" fill="var(--border-medium)" stroke="var(--border-dark)" strokeWidth="1"/>
                <rect x="2" y="1" width="6" height="4" rx="1" fill="var(--accent-folder-yellow)" stroke="#c4a830" strokeWidth="0.5"/>
              </svg>
              C:\ATHARV\contact
            </span>
            <div className="retro-close-btn">×</div>
          </div>
          <div className="retro-window-content" style={{ padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: '18px', textAlign: 'center' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'var(--bg-grid)',
              border: '2px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 4px'
            }}>
              <Mail size={26} style={{ color: 'var(--accent-blue)' }} />
            </div>

            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, fontFamily: 'var(--font-serif)', color: 'var(--text-heading)' }}>
              {t('directEndpoint')}
            </h3>

            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              {t('smtpNotice')}
            </p>

            {/* Email Copier */}
            <div
              onClick={handleCopyEmail}
              className="email-copier-widget"
              data-interactive
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: '#ffffff',
                border: '2px solid var(--border-dark)',
                borderRadius: '6px',
                padding: '14px 16px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: 'var(--shadow-inset)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
                <Mail size={18} style={{ color: 'var(--accent-blue)', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', color: 'var(--text-dark)', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {t('emailAddress')}
                </span>
              </div>
              <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                {copied ? (
                  <>
                    <Check size={16} style={{ color: 'var(--accent-green)' }} />
                    <span style={{ fontSize: '0.85rem', fontFamily: 'var(--font-pixel)', color: 'var(--accent-green)' }}>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} style={{ color: 'var(--text-muted)' }} />
                    <span style={{ fontSize: '0.85rem', fontFamily: 'var(--font-pixel)', color: 'var(--text-muted)' }}>Copy</span>
                  </>
                )}
              </div>
            </div>

            {/* Social Links Row */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '8px' }}>
              <a
                href="https://github.com/atharvmantri"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '10px 18px', borderRadius: '6px',
                  background: 'var(--bg-grid)', border: '1.5px solid var(--border-light)',
                  color: 'var(--text-dark)', textDecoration: 'none',
                  fontFamily: 'var(--font-pixel)', fontSize: '1rem',
                  transition: 'all 0.2s'
                }}
                data-interactive
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
              <a
                href="https://www.instagram.com/atharvmantr_i"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '10px 18px', borderRadius: '6px',
                  background: 'var(--bg-grid)', border: '1.5px solid var(--border-light)',
                  color: 'var(--text-dark)', textDecoration: 'none',
                  fontFamily: 'var(--font-pixel)', fontSize: '1rem',
                  transition: 'all 0.2s'
                }}
                data-interactive
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
                Instagram
              </a>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        .email-copier-widget:hover {
          border-color: var(--bg-titlebar-active) !important;
          box-shadow: 0 0 0 2px rgba(58, 58, 110, 0.15) !important;
        }

        .toast-notification {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          background: var(--bg-window);
          border: 2px solid var(--accent-green);
          border-radius: 6px;
          padding: 10px 18px;
          color: var(--accent-green);
          font-family: var(--font-pixel);
          font-size: 1rem;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 3px 3px 0 rgba(0,0,0,0.15);
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.3s ease;
          pointer-events: none;
          z-index: 10001;
        }

        .toast-notification.show {
          opacity: 1;
          transform: translateY(0);
        }

        #contact a:hover {
          border-color: var(--bg-titlebar-active) !important;
          transform: translateY(-2px);
          box-shadow: 2px 2px 0 rgba(0,0,0,0.1);
        }

        @media (max-width: 480px) {
          #contact .retro-window-content > div:last-child {
            flex-direction: column !important;
          }
        }
      `}</style>
    </section>
  );
};
