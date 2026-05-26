import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import heroImg from '../assets/profile.jpeg';

export const Hero: React.FC = () => {
  const { t } = useTranslation();

  const taglines = [
    t('tagline0'),
    t('tagline1'),
    t('tagline2')
  ];

  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer: number;
    const fullText = taglines.at(currentTaglineIndex) ?? '';

    const handleTyping = () => {
      if (!isDeleting) {
        setDisplayText(fullText.substring(0, displayText.length + 1));
        setTypingSpeed(80);

        if (displayText === fullText) {
          timer = setTimeout(() => setIsDeleting(true), 2500) as unknown as number;
          return;
        }
      } else {
        setDisplayText(fullText.substring(0, displayText.length - 1));
        setTypingSpeed(30);

        if (displayText === '') {
          setIsDeleting(false);
          setCurrentTaglineIndex((prev) => (prev + 1) % taglines.length);
          return;
        }
      }

      timer = setTimeout(handleTyping, typingSpeed) as unknown as number;
    };

    timer = setTimeout(handleTyping, typingSpeed) as unknown as number;
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentTaglineIndex, typingSpeed]);

  return (
    <section className="hero-section" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '100px 2.5rem 50px',
      position: 'relative',
      textAlign: 'center'
    }}>

      {/* Large PORTFOLIO Title */}
      <h1 style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 'clamp(3.5rem, 9vw, 7rem)',
        fontWeight: 400,
        color: 'var(--text-heading)',
        letterSpacing: '0.15em',
        marginBottom: '3rem',
        textTransform: 'uppercase',
        lineHeight: 1.1
      }}>
        PORTFOLIO
      </h1>

      {/* Profile Window */}
      <div className="retro-window" style={{ maxWidth: '480px', width: '100%', marginBottom: '2.5rem' }}>
        <div className="retro-titlebar">
          <span className="retro-titlebar-path">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="3" width="14" height="11" rx="1" fill="var(--border-medium)" stroke="var(--border-dark)" strokeWidth="1" />
              <rect x="2" y="1" width="6" height="4" rx="1" fill="var(--accent-folder-yellow)" stroke="#c4a830" strokeWidth="0.5" />
            </svg>
            C:\ATHARV\portfolio
          </span>
          <div className="retro-close-btn">×</div>
        </div>
        <div className="retro-window-content" style={{ textAlign: 'center', padding: '32px 28px' }}>
          {/* Profile Picture */}
          <div style={{
            width: '130px',
            height: '130px',
            borderRadius: '50%',
            overflow: 'hidden',
            margin: '0 auto 16px',
            border: '3px solid var(--border-medium)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
          }}>
            <img
              src={heroImg}
              alt="Atharv Mantri"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Name & Title */}
          <p style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: '1.15rem',
            color: 'var(--text-muted)',
            marginBottom: '6px'
          }}>
            hi! i'm
          </p>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '2.1rem',
            fontWeight: 700,
            color: 'var(--text-heading)',
            marginBottom: '6px',
            letterSpacing: '0.01em',
            lineHeight: 1.2
          }}>
            {t('firstName')} {t('lastName')}
          </h2>
          <p style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: '1.1rem',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '12px'
          }}>
            {t('titleDev')} & {t('titleArchitect')}
          </p>

          {/* Typewriter Tagline */}
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: '1.05rem',
            color: 'var(--text-body)',
            minHeight: '28px',
            lineHeight: 1.4
          }}>
            "{displayText}<span style={{ animation: 'blink 1s step-end infinite', fontWeight: 'bold' }}>|</span>"
          </p>
        </div>
      </div>

      {/* Open for Collaboration Badge */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        background: 'var(--bg-window)',
        border: '1.5px solid var(--accent-green)',
        borderRadius: '20px',
        padding: '6px 16px',
        fontSize: '0.8rem',
        fontFamily: 'var(--font-pixel)',
        color: 'var(--text-body)'
      }}>
        <span style={{
          width: '8px',
          height: '8px',
          background: 'var(--accent-green)',
          borderRadius: '50%',
          display: 'inline-block',
          boxShadow: '0 0 4px var(--accent-green)'
        }}></span>
        {t('openForCollab')}
      </div>

      <style>{`
        @keyframes blink {
          50% { opacity: 0; }
        }

        @media (max-width: 768px) {
          .hero-section h1 {
            font-size: 2.5rem !important;
            letter-spacing: 0.08em !important;
          }
        }
      `}</style>
    </section>
  );
};
