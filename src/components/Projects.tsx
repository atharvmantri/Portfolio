import React, { useState } from 'react';
import { Shield, Globe, Terminal as TermIcon, Cpu, Layers } from 'lucide-react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState<'gallery' | 'architecture'>('gallery');

  const projectList: ProjectItem[] = [
    {
      id: 'shadowkey',
      name: 'ShadowKey',
      tagline: t('project_shadowkey_tagline'),
      description: t('project_shadowkey_desc'),
      features: [
        t('project_shadowkey_feature0'),
        t('project_shadowkey_feature1'),
        t('project_shadowkey_feature2'),
        t('project_shadowkey_feature3')
      ],
      tech: ['Midnight Network', 'Compact', 'Cardano', 'React 19', 'Framer Motion', 'Lace Wallet SDK'],
      github: 'https://github.com/atharvmantri/ShadowKey',
      live: '#',
      icon: <Shield size={28} style={{ color: 'var(--bg-titlebar-active)' }} />
    },
    {
      id: 'guardnet',
      name: 'GuardNet',
      tagline: t('project_guardnet_tagline'),
      description: t('project_guardnet_desc'),
      features: [
        t('project_guardnet_feature0'),
        t('project_guardnet_feature1'),
        t('project_guardnet_feature2'),
        t('project_guardnet_feature3')
      ],
      tech: ['React 19', 'TypeScript', 'Firebase', 'React Leaflet', 'NASA EONET', 'Workbox PWA'],
      github: 'https://github.com/atharvmantri/Guardnet',
      live: '#',
      icon: <Globe size={28} style={{ color: 'var(--accent-green)' }} />
    },
    {
      id: 'websniper',
      name: 'WebSniper',
      tagline: t('project_websniper_tagline'),
      description: t('project_websniper_desc'),
      features: [
        t('project_websniper_feature0'),
        t('project_websniper_feature1'),
        t('project_websniper_feature2'),
        t('project_websniper_feature3')
      ],
      tech: ['FastAPI', 'Python', 'Playwright', 'Chrome Extension', 'React', 'Vite'],
      github: 'https://github.com/atharvmantri/Websniper',
      live: '#',
      icon: <TermIcon size={28} style={{ color: 'var(--accent-orange)' }} />
    }
  ];

  return (
    <section id="projects" className="retro-section">
      <div className="container">

        {/* Section Header & Toggle */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ textAlign: 'left' }}>
            <h3 className="section-header">
              {t('projectsHeader')}
            </h3>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 700, fontFamily: 'var(--font-serif)', marginBottom: 0 }}>
              {t('projectsTitle')} <span className="text-gradient">{t('projectsTitleAccent')}</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '600px', marginTop: '0.5rem', fontSize: '1.05rem' }}>
              {t('projectsDescription')}
            </p>
          </div>

          {/* Toggle buttons */}
          <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-titlebar)', border: '2px solid var(--border-dark)', borderRadius: '4px', padding: '2px' }}>
            <button
              onClick={() => setViewMode('gallery')}
              className="btn"
              data-interactive
              style={{
                padding: '6px 14px',
                fontSize: '0.78rem',
                borderRadius: '2px',
                background: viewMode === 'gallery' ? 'var(--bg-titlebar-active)' : 'transparent',
                color: viewMode === 'gallery' ? 'white' : 'var(--text-body)',
                border: viewMode === 'gallery' ? '1px solid #2a2a5e' : '1px solid transparent',
                boxShadow: 'none'
              }}
            >
              <Layers size={13} />
              {t('galleryGrid')}
            </button>
            <button
              onClick={() => setViewMode('architecture')}
              className="btn"
              data-interactive
              style={{
                padding: '6px 14px',
                fontSize: '0.78rem',
                borderRadius: '2px',
                background: viewMode === 'architecture' ? 'var(--bg-titlebar-active)' : 'transparent',
                color: viewMode === 'architecture' ? 'white' : 'var(--text-body)',
                border: viewMode === 'architecture' ? '1px solid #2a2a5e' : '1px solid transparent',
                boxShadow: 'none'
              }}
            >
              <Cpu size={13} />
              {t('blueprints')}
            </button>
          </div>
        </div>

        {/* Dynamic Display */}
        {viewMode === 'gallery' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
            {projectList.map((project) => (
              <div
                key={project.id}
                className="retro-window"
                data-interactive
              >
                {/* Title bar */}
                <div className="retro-titlebar">
                  <span className="retro-titlebar-path">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                      <rect x="1" y="3" width="14" height="11" rx="1" fill="var(--border-medium)" stroke="var(--border-dark)" strokeWidth="1"/>
                      <rect x="2" y="1" width="6" height="4" rx="1" fill="var(--accent-folder-yellow)" stroke="#c4a830" strokeWidth="0.5"/>
                    </svg>
                    C:\ATHARV\{project.id}
                  </span>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <a href={project.github} target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', transition: 'color 0.2s', display: 'flex', alignItems: 'center' }} title="View Source">
                      <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                        <path d="M9 18c-4.51 2-5-2-7-2" />
                      </svg>
                    </a>
                    <div className="retro-close-btn">×</div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="retro-progress-bar" style={{ margin: '0', borderRadius: 0, border: 'none', borderBottom: '1px solid var(--border-light)' }}>
                  <div className="retro-progress-fill" style={{ width: '100%' }}></div>
                </div>

                {/* Content */}
                <div className="retro-window-content" style={{ padding: '24px', textAlign: 'left' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <div style={{
                      background: 'var(--bg-grid)',
                      border: '1px solid var(--border-light)',
                      borderRadius: '6px',
                      padding: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {project.icon}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--font-serif)', marginBottom: '3px', color: 'var(--text-heading)' }}>
                        {project.name}
                      </h3>
                      <p style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                        {project.tagline}
                      </p>
                    </div>
                  </div>

                  <p style={{ fontSize: '1rem', color: 'var(--text-body)', marginBottom: '16px', lineHeight: '1.6' }}>
                    {project.description}
                  </p>

                  {/* Feature bullets */}
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '16px' }}>
                    {project.features.map((feature, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.95rem', color: 'var(--text-body)' }}>
                        <span style={{ color: 'var(--accent-orange)', fontWeight: 'bold', marginTop: '1px', fontFamily: 'var(--font-pixel)' }}>▸</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Tech badges */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    {project.tech.map((tag) => (
                      <span key={tag} className="retro-tech-badge">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ArchitectureDiagram />
        )}

      </div>
    </section>
  );
};
