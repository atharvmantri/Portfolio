import React, { useEffect, useState } from 'react';
import { Terminal as TerminalIcon, Shield, Search, ArrowRight, Mail } from 'lucide-react';

export const Hero: React.FC = () => {
  const taglines = [
    "Building things most won't understand.",
    "Building systems, not side projects.",
    "I don't just write code. I build leverage."
  ];

  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer: number;
    const fullText = taglines[currentTaglineIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        setDisplayText(fullText.substring(0, displayText.length + 1));
        setTypingSpeed(80); // Speed up typing slightly
        
        if (displayText === fullText) {
          // Pause at the end of the tagline
          timer = setTimeout(() => setIsDeleting(true), 2500) as unknown as number;
          return;
        }
      } else {
        setDisplayText(fullText.substring(0, displayText.length - 1));
        setTypingSpeed(30); // Erase faster
        
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

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '80px', position: 'relative' }}>
      
      {/* CSS-Only Floating Glass Elements in Hero */}
      <div className="hero-floating-decor">
        <div className="glow-orb" style={{ top: '20%', right: '15%', background: 'rgba(0, 242, 254, 0.08)' }}></div>
        <div className="glow-orb" style={{ bottom: '15%', left: '10%', background: 'rgba(168, 85, 247, 0.08)' }}></div>
      </div>

      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem', alignItems: 'center' }}>
        
        {/* Left Side: Brand & Text */}
        <div style={{ textAlign: 'left' }}>
          
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '50px', padding: '0.4rem 1rem', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
            <span style={{ display: 'inline-block', width: '8px', height: '8px', background: 'var(--accent-cyan)', borderRadius: '50%', boxShadow: '0 0 8px var(--accent-cyan)' }}></span>
            <span style={{ fontWeight: 600, color: 'var(--text-heading)', letterSpacing: '0.05em' }}>OPEN FOR COLLABORATION &amp; CONTRACTS</span>
          </div>

          <h1 style={{ fontSize: '4.5rem', fontWeight: 900, lineHeight: 1.05, marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>
            Atharv <span className="text-gradient">Mantri</span>
          </h1>

          <h2 style={{ fontSize: '1.8rem', fontWeight: 500, color: 'var(--text-main)', marginBottom: '1.5rem', letterSpacing: '-0.01em' }}>
            Full-Stack Developer &amp; <span className="text-gradient-purple-pink">AI Systems Architect</span>
          </h2>

          <div style={{ minHeight: '50px', marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', fontSize: '1.1rem', letterSpacing: '-0.01em' }}>
              &gt; {displayText}
              <span className="cursor-blink" style={{ animation: 'blink 1s step-end infinite', fontWeight: 'bold' }}>|</span>
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }}>
            <button 
              onClick={() => handleScrollTo('terminal')}
              className="btn btn-primary"
              data-interactive
            >
              <TerminalIcon size={18} />
              Launch Terminal
            </button>
            
            <button 
              onClick={() => handleScrollTo('projects')}
              className="btn btn-secondary"
              data-interactive
            >
              Explore Systems
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Social Badges */}
          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '3.5rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>CONNECT //</span>
            <a href="https://github.com/atharvmantri" target="_blank" rel="noreferrer" className="social-icon-link" data-interactive style={{ color: 'var(--text-muted)', transition: 'color 0.3s', display: 'flex', alignItems: 'center' }}>
              <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
            <a href="mailto:work@atharv.me" className="social-icon-link" data-interactive style={{ color: 'var(--text-muted)', transition: 'color 0.3s' }}>
              <Mail size={22} />
            </a>
          </div>

        </div>

        {/* Right Side: High-tech Visual System (CSS & SVG) */}
        <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
          
          {/* Cybernetic Geometric Avatar */}
          <div className="cyber-avatar-container">
            {/* Spinning Neon Rings */}
            <div className="cyber-ring ring-1"></div>
            <div className="cyber-ring ring-2"></div>
            <div className="cyber-ring ring-3"></div>
            
            {/* Inner Core Glass Sphere */}
            <div className="cyber-core glass-panel">
              <svg width="180" height="180" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Outer grid */}
                <circle cx="100" cy="100" r="90" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" strokeDasharray="5 5" />
                <circle cx="100" cy="100" r="70" stroke="rgba(0, 242, 254, 0.15)" strokeWidth="1.5" />
                <circle cx="100" cy="100" r="50" stroke="rgba(168, 85, 247, 0.15)" strokeWidth="1.5" strokeDasharray="10 5" />
                
                {/* Glowing Nodes & Connections */}
                <line x1="100" y1="30" x2="50" y2="100" stroke="rgba(0, 242, 254, 0.3)" strokeWidth="1.5" />
                <line x1="100" y1="30" x2="150" y2="100" stroke="rgba(0, 242, 254, 0.3)" strokeWidth="1.5" />
                <line x1="50" y1="100" x2="100" y2="170" stroke="rgba(168, 85, 247, 0.3)" strokeWidth="1.5" />
                <line x1="150" y1="100" x2="100" y2="170" stroke="rgba(168, 85, 247, 0.3)" strokeWidth="1.5" />
                <line x1="50" y1="100" x2="150" y2="100" stroke="rgba(236, 72, 153, 0.2)" strokeWidth="1" />
                <line x1="100" y1="30" x2="100" y2="170" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" strokeDasharray="3 3" />

                {/* Animated Pulsing Core Node */}
                <circle cx="100" cy="100" r="16" fill="url(#coreGradient)" style={{ filter: 'drop-shadow(0 0 15px rgba(0, 242, 254, 0.8))' }} />
                
                {/* Orbiting nodes */}
                <circle cx="100" cy="30" r="6" fill="var(--accent-cyan)" />
                <circle cx="50" cy="100" r="5" fill="var(--accent-purple)" />
                <circle cx="150" cy="100" r="5" fill="var(--accent-pink)" />
                <circle cx="100" cy="170" r="6" fill="var(--accent-blue)" />

                <defs>
                  <linearGradient id="coreGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="var(--accent-cyan)" />
                    <stop offset="100%" stopColor="var(--accent-purple)" />
                  </linearGradient>
                </defs>
              </svg>
              
              <div className="cyber-core-text">
                <span className="c-text">SYS_INIT</span>
                <span className="c-sub">v2.5.8</span>
              </div>
            </div>

            {/* Float details */}
            <div className="cyber-label tag-top">
              <Shield size={12} style={{ color: 'var(--accent-cyan)' }} />
              <span>SECURE_SHELL</span>
            </div>
            <div className="cyber-label tag-bottom">
              <Search size={12} style={{ color: 'var(--accent-purple)' }} />
              <span>AGENT_NET</span>
            </div>
          </div>

        </div>

      </div>

      {/* Styled inline-css just for these animations to keep file encapsulated */}
      <style>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
        
        .hero-section {
          background-image: 
            radial-gradient(circle at 10% 20%, rgba(168, 85, 247, 0.03) 0%, transparent 40%),
            radial-gradient(circle at 90% 80%, rgba(0, 242, 254, 0.03) 0%, transparent 40%);
        }

        .glow-orb {
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          filter: blur(100px);
          pointer-events: none;
          z-index: 0;
        }

        /* Avatar Container & Core animations */
        .cyber-avatar-container {
          position: relative;
          width: 350px;
          height: 350px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cyber-ring {
          position: absolute;
          border: 1px solid transparent;
          border-radius: 50%;
          animation: spin 20s linear infinite;
        }

        .ring-1 {
          width: 310px;
          height: 310px;
          border-color: rgba(0, 242, 254, 0.08);
          border-top-color: var(--accent-cyan);
          border-bottom-color: var(--accent-cyan);
          animation-duration: 15s;
        }

        .ring-2 {
          width: 270px;
          height: 270px;
          border-color: rgba(168, 85, 247, 0.05);
          border-left-color: var(--accent-purple);
          border-right-color: var(--accent-purple);
          animation-duration: 25s;
          animation-direction: reverse;
        }

        .ring-3 {
          width: 340px;
          height: 340px;
          border: 1px dashed rgba(236, 72, 153, 0.15);
          animation-duration: 35s;
        }

        .cyber-core {
          width: 220px;
          height: 220px;
          border-radius: 50% !important;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0 !important;
          background: rgba(8, 6, 16, 0.7) !important;
          border-color: rgba(255, 255, 255, 0.1) !important;
          box-shadow: 0 0 30px rgba(0, 0, 0, 0.6) !important;
          z-index: 2;
          position: relative;
        }

        .cyber-core-text {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: var(--font-mono);
          margin-top: 10px;
        }

        .c-text {
          font-size: 0.75rem;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.1em;
        }

        .c-sub {
          font-size: 0.55rem;
          color: var(--text-muted);
          margin-top: 2px;
        }

        .cyber-label {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          font-weight: 600;
          color: #fff;
          background: rgba(13, 10, 25, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 4px;
          padding: 0.3rem 0.6rem;
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
          z-index: 5;
          animation: floatLabel 6s ease-in-out infinite alternate;
        }

        .tag-top {
          top: 15%;
          left: 5%;
        }

        .tag-bottom {
          bottom: 15%;
          right: 5%;
          animation-delay: -3s;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes floatLabel {
          0% { transform: translateY(0); }
          100% { transform: translateY(-10px); }
        }

        .social-icon-link:hover {
          color: var(--text-heading) !important;
          transform: translateY(-2px);
        }

        @media (max-width: 992px) {
          .container {
            grid-template-columns: 1fr !important;
            gap: 4rem !important;
          }
          .hero-section {
            padding-top: 120px !important;
            padding-bottom: 50px !important;
          }
          h1 {
            font-size: 3.5rem !important;
          }
          .cyber-avatar-container {
            width: 280px;
            height: 280px;
            margin: 0 auto;
          }
          .ring-1 { width: 250px; height: 250px; }
          .ring-2 { width: 210px; height: 210px; }
          .ring-3 { width: 280px; height: 280px; }
          .cyber-core { width: 170px; height: 170px; }
        }
      `}</style>
    </section>
  );
};
