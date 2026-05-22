import React, { useState } from 'react';
import { Shield, Globe, Terminal as TermIcon, Cpu, Layers } from 'lucide-react';
import { ArchitectureDiagram } from './ArchitectureDiagram';

interface ProjectItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  tech: string[];
  github: string;
  live: string;
  icon: React.ReactNode;
}

export const Projects: React.FC = () => {
  const [viewMode, setViewMode] = useState<'gallery' | 'architecture'>('gallery');

  const projectList: ProjectItem[] = [
    {
      id: 'shadowkey',
      name: 'ShadowKey',
      tagline: 'Zero-Knowledge Identity Verification on Midnight Network.',
      description: 'A privacy-preserving identity protocol implementing a complete identity lifecycle. Generates Groth16 zero-knowledge proofs locally in-browser so that personal data is never transmitted or stored on centralized servers.',
      features: [
        'Nine Groth16 zero-knowledge circuits compiled using Compact 0.31.0 for the identity lifecycle.',
        'In-browser SHA256 hashing of five identity fields, storing only commitments on-chain.',
        'Oracle verification workflow approving or rejecting identities via dedicated ZK circuits.',
        'Privacy-erasure circuit with cryptographic tombstone placement preventing re-registration.'
      ],
      tech: ['Midnight Network', 'Compact', 'Cardano', 'React 19', 'Framer Motion', 'Lace Wallet SDK'],
      github: 'https://github.com/atharvmantri/ShadowKey',
      live: '#',
      icon: <Shield size={32} style={{ color: 'var(--accent-cyan)' }} />
    },
    {
      id: 'guardnet',
      name: 'GuardNet',
      tagline: 'Community-powered disaster intelligence, delivered in real time.',
      description: 'Fuses live weather data, NASA/USGS/GDACS disaster feeds, terrain analysis, and community-submitted reports into a unified 0-100 risk score with AI-generated safety guidance and volunteer dispatch systems.',
      features: [
        'Live 0-100 risk gauge fusing weather, NASA EONET, USGS, and GDACS event streams.',
        'Interactive Leaflet map showing disasters, shelters, and real-time risk heat grids.',
        'Guardian Mode with registry for vulnerable citizens and real-time volunteer dispatch tracking.',
        'Offline-first PWA architecture utilizing Workbox service workers and IndexedDB storage.'
      ],
      tech: ['React 19', 'TypeScript', 'Firebase', 'React Leaflet', 'NASA EONET', 'Workbox PWA'],
      github: 'https://github.com/atharvmantri/Guardnet',
      live: '#',
      icon: <Globe size={32} style={{ color: 'var(--accent-purple)' }} />
    },
    {
      id: 'websniper',
      name: 'WebSniper',
      tagline: 'Turn any website into a REST API with one click. Local-first. BYOK.',
      description: 'Replaces brittle scrapers with visual action timelines, LLM-generated Playwright code, and autonomous self-healing capability. Combines a React Chrome Extension UI with a local Python FastAPI runner.',
      features: [
        'Visual Action Sequence builder to construct and debug data extractions step-by-step.',
        'Local Python FastAPI backend executing headless Chromium browser sessions via Playwright.',
        'Auto-healing selector engine resolving broken CSS/XPath patterns dynamically using AI.',
        'Instant 1-click local REST API endpoint deployment for successful scrapers.'
      ],
      tech: ['FastAPI', 'Python', 'Playwright', 'Chrome Extension', 'React', 'Vite'],
      github: 'https://github.com/atharvmantri/Websniper',
      live: '#',
      icon: <TermIcon size={32} style={{ color: 'var(--accent-pink)' }} />
    }
  ];

  // 3D Tilt Card handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    
    // Rotate max 8 degrees on hover
    const rotateX = -(y / (box.height / 2)) * 8;
    const rotateY = (x / (box.width / 2)) * 8;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    
    // Move glow highlights
    const glow = card.querySelector('.card-glow') as HTMLDivElement;
    if (glow) {
      const glowX = ((e.clientX - box.left) / box.width) * 100;
      const glowY = ((e.clientY - box.top) / box.height) * 100;
      glow.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(168, 85, 247, 0.12) 0%, transparent 60%)`;
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    const glow = card.querySelector('.card-glow') as HTMLDivElement;
    if (glow) {
      glow.style.background = 'transparent';
    }
  };

  return (
    <section id="projects" style={{ padding: '80px 0', position: 'relative' }}>
      <div className="container">
        
        {/* Section Header & Toggle */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div style={{ textAlign: 'left' }}>
            <h3 style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>
              System Repository
            </h3>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: 0 }}>
              Highlighted <span className="text-gradient">Open Source Systems</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '550px', marginTop: '0.5rem' }}>
              Real-world software architectures designed for security, analysis, and concurrency. I build pipelines, not side projects.
            </p>
          </div>

          {/* Toggle buttons */}
          <div style={{ display: 'flex', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '50px', padding: '0.3rem' }}>
            <button 
              onClick={() => setViewMode('gallery')}
              className={`btn ${viewMode === 'gallery' ? 'btn-primary' : ''}`}
              data-interactive
              style={{ padding: '0.5rem 1.2rem', fontSize: '0.8rem', borderRadius: '50px', boxShadow: viewMode === 'gallery' ? '0 4px 15px rgba(0, 242, 254, 0.2)' : 'none', background: viewMode !== 'gallery' ? 'transparent' : undefined, color: viewMode !== 'gallery' ? 'var(--text-muted)' : undefined }}
            >
              <Layers size={14} />
              Gallery Grid
            </button>
            <button 
              onClick={() => setViewMode('architecture')}
              className={`btn ${viewMode === 'architecture' ? 'btn-primary' : ''}`}
              data-interactive
              style={{ padding: '0.5rem 1.2rem', fontSize: '0.8rem', borderRadius: '50px', boxShadow: viewMode === 'architecture' ? '0 4px 15px rgba(0, 242, 254, 0.2)' : 'none', background: viewMode !== 'architecture' ? 'transparent' : undefined, color: viewMode !== 'architecture' ? 'var(--text-muted)' : undefined }}
            >
              <Cpu size={14} />
              Blueprints
            </button>
          </div>
        </div>

        {/* Dynamic Display Area */}
        {viewMode === 'gallery' ? (
          /* Cards Grid */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {projectList.map((project) => (
              <div 
                key={project.id}
                className="glass-panel project-card-3d"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ 
                  padding: '2.5rem 2rem', 
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'transform 0.1s ease-out, border-color 0.3s'
                }}
                data-interactive
              >
                {/* Visual Radial Overlay inside cards */}
                <div className="card-glow" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', transition: 'background 0.2s', zIndex: 0 }}></div>

                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.8rem' }}>
                    <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '12px', padding: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {project.icon}
                    </div>
                    
                    <div style={{ display: 'flex', gap: '0.8rem' }}>
                      <a href={project.github} target="_blank" rel="noreferrer" className="project-link" style={{ color: 'var(--text-muted)', transition: 'color 0.3s', display: 'flex', alignItems: 'center' }} title="View Source">
                        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                          <path d="M9 18c-4.51 2-5-2-7-2" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '-0.01em' }}>
                    {project.name}
                  </h3>
                  
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--accent-cyan)', marginBottom: '1rem', fontWeight: 500 }}>
                    {project.tagline}
                  </p>

                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                    {project.description}
                  </p>

                  {/* Bullet features */}
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
                    {project.features.map((feature, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-main)' }}>
                        <span style={{ color: 'var(--accent-purple)', fontWeight: 'bold', marginTop: '1px' }}>↳</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', position: 'relative', zIndex: 1 }}>
                  {project.tech.map((tag) => (
                    <span 
                      key={tag}
                      style={{ 
                        fontFamily: 'var(--font-mono)', 
                        fontSize: '0.7rem', 
                        padding: '0.2rem 0.6rem', 
                        background: 'rgba(255, 255, 255, 0.04)', 
                        border: '1px solid rgba(255, 255, 255, 0.06)', 
                        borderRadius: '4px',
                        color: 'var(--text-main)'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

              </div>
            ))}
          </div>
        ) : (
          /* Architecture blueprints interactive chart */
          <ArchitectureDiagram />
        )}

      </div>
      
      <style>{`
        .project-link:hover {
          color: #ffffff !important;
        }
        .project-card-3d:hover {
          border-color: var(--accent-purple);
          box-shadow: 0 15px 45px rgba(168, 85, 247, 0.08);
        }
      `}</style>
    </section>
  );
};
