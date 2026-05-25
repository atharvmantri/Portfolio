import React, { useState } from 'react';
import { Shield, Layers, Brain, Database } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface SkillItem {
  name: string;
  level: string; // e.g. "Expert", "Advanced"
  detail: string; // Real-world use detail
}

interface SkillCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  skills: SkillItem[];
}

// Local helper to provide beautiful vector SVG icons for every technology
const getSkillIcon = (name: string): React.ReactNode => {
  switch (name) {
    case 'Node.js':
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#689F63" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L3.5 7v10L12 22l8.5-5V7L12 2z" fill="rgba(104, 159, 99, 0.1)" />
          <path d="M12 22V12m0 0L3.5 7M12 12l8.5-5" />
        </svg>
      );
    case 'Python':
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2c-2.8 0-5 2.2-5 5h5v2h-5c-2.8 0-5 2.2-5 5s2.2 5 5 5h3v-2H7c-1.7 0-3-1.3-3-3s1.3-3 3-3h5v-2H7c0-1.7 1.3-3 3-3h2V2z" fill="#3776AB" />
          <path d="M12 22c2.8 0 5-2.2 5-5h-5v-2h5c2.8 0 5-2.2 5-5s-2.2-5-5-5h-3v2h3c1.7 0 3 1.3 3 3s-1.3 3-3 3h-5v2h5c0 1.7-1.3 3-3 3h-2v2z" fill="#FFD43B" />
        </svg>
      );
    case 'Redis':
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#DC382D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3" fill="rgba(220, 56, 45, 0.15)" />
          <path d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          <path d="M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6" />
        </svg>
      );
    case 'Docker':
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#2496ED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10.5c0 3.5-3 5.5-8 5.5H7.5C4 16 2 14.5 2 12c0-1.5.5-2.5 1-3.5C4.5 9 6.5 11 8.5 11h9.5c.5-.5 1-1.5 1.5-2.5.5-.5 1-.5 1.5 0 .5.5 1 1 1 2z" fill="rgba(36, 150, 237, 0.1)" />
          <rect x="8" y="5" width="2" height="2" rx="0.5" fill="#2496ED" />
          <rect x="11" y="5" width="2" height="2" rx="0.5" fill="#2496ED" />
          <rect x="14" y="5" width="2" height="2" rx="0.5" fill="#2496ED" />
          <rect x="8" y="8" width="2" height="2" rx="0.5" fill="#2496ED" />
          <rect x="11" y="8" width="2" height="2" rx="0.5" fill="#2496ED" />
          <rect x="14" y="8" width="2" height="2" rx="0.5" fill="#2496ED" />
        </svg>
      );
    case 'System Architectures':
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="var(--accent-purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="6" height="5" rx="1" fill="rgba(168, 85, 247, 0.1)" />
          <rect x="16" y="3" width="6" height="5" rx="1" fill="rgba(168, 85, 247, 0.1)" />
          <rect x="9" y="16" width="6" height="5" rx="1" fill="rgba(168, 85, 247, 0.1)" />
          <path d="M5 8v4h9v4M19 8v4h-5" />
        </svg>
      );
    case 'React':
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#61DAFB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(30 12 12)" />
          <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(90 12 12)" />
          <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(150 12 12)" />
          <circle cx="12" cy="12" r="1.8" fill="#61DAFB" />
        </svg>
      );
    case 'TypeScript':
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="#3178C6" style={{ borderRadius: '4px' }}>
          <rect width="24" height="24" rx="3" fill="#3178C6" />
          <text x="12" y="16" fill="#FFFFFF" fontSize="10" fontFamily="var(--font-mono)" fontWeight="bold" textAnchor="middle">TS</text>
        </svg>
      );
    case 'Next.js':
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" fill="rgba(255,255,255,0.05)" />
          <path d="M9 17V7l7.5 10M15 7v5" />
        </svg>
      );
    case 'Tailwind CSS':
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#06B6D4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 6.5c-2.7 0-4 1.3-4 4s1.3 3.5 4 3.5 4-1.3 4-4-1.3-3.5-4-3.5zm-6 6c-2.7 0-4 1.3-4 4s1.3 3.5 4 3.5 4-1.3 4-4-1.3-3.5-4-3.5z" fill="rgba(6, 182, 212, 0.15)" />
        </svg>
      );
    case 'HTML5 & CSS3':
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#E34F26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 3h15l-1.5 15.5-6 2.5-6-2.5L4.5 3z" fill="rgba(227, 79, 38, 0.1)" />
          <path d="M9 7.5h6.5l-.5 5H9.5l.2 2 2.3.8 2.3-.8.2-2.5" />
        </svg>
      );
    case 'Autonomous Agents':
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="var(--accent-cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a9 9 0 00-9 9c0 2.2 1.3 4.2 3 5v4a2 2 0 002 2h8a2 2 0 002-2v-4c1.7-.8 3-2.8 3-5a9 9 0 00-9-9z" fill="rgba(0, 242, 254, 0.05)" />
          <line x1="8" y1="11" x2="16" y2="11" strokeDasharray="2 2" />
          <circle cx="12" cy="11" r="2" fill="var(--accent-cyan)" />
        </svg>
      );
    case 'Agentic Workflows':
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="var(--accent-purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12a9 9 0 0115-6.7M21 12a9 9 0 01-15 6.7" />
          <polygon points="18 4 18 8 14 8" fill="var(--accent-purple)" />
          <polygon points="6 20 6 16 10 16" fill="var(--accent-purple)" />
          <circle cx="12" cy="12" r="3" fill="rgba(168, 85, 247, 0.1)" />
        </svg>
      );
    case 'PyTorch':
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#EE4C2C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l7.5 5.5-2.5 10-5 4.5-5-4.5-2.5-10L12 2z" fill="rgba(238, 76, 44, 0.1)" />
          <circle cx="12" cy="12" r="2.5" fill="#EE4C2C" />
        </svg>
      );
    case 'Model Training':
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="var(--accent-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="5" width="14" height="14" rx="2" fill="rgba(79, 172, 254, 0.1)" />
          <path d="M9 1H7v4h2V1zm8 0h-2v4h2V1zM9 19H7v4h2v-4zm8 0h-2v4h2v-4zM1 9v2h4V9H1zm0 4v2h4v-2H1zm18-4v2h4V9h-4zm0 4v2h4v-2h-4z" />
          <circle cx="12" cy="12" r="2" fill="var(--accent-blue)" />
        </svg>
      );
    case 'Model Fine-Tuning':
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="var(--accent-pink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 8h16M4 16h16" />
          <circle cx="9" cy="8" r="2.5" fill="var(--accent-pink)" />
          <circle cx="15" cy="16" r="2.5" fill="var(--accent-pink)" />
        </svg>
      );
    case 'Compact (ZK)':
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="var(--accent-purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="rgba(168, 85, 247, 0.1)" />
          <circle cx="12" cy="11" r="2" fill="var(--accent-purple)" />
          <path d="M12 13v3" />
        </svg>
      );
    case 'Linux System Ops':
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" fill="rgba(255, 255, 255, 0.05)" />
          <path d="M7 8l4 4-4 4M13 15h4" />
        </svg>
      );
    case 'Network Security':
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="var(--accent-cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="11" width="14" height="10" rx="2" fill="rgba(0, 242, 254, 0.1)" />
          <path d="M8 11V7a4 4 0 018 0v4" />
        </svg>
      );
    case 'CI/CD Pipelines':
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="var(--accent-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 12c2.5-3.5 6-3.5 6 0s-3.5 3.5-6 0c-2.5-3.5-6-3.5-6 0s3.5 3.5 6 0z" />
          <circle cx="6" cy="12" r="1.5" fill="var(--accent-blue)" />
          <circle cx="18" cy="12" r="1.5" fill="var(--accent-blue)" />
        </svg>
      );
    case 'Cryptography':
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="var(--accent-purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3m-3-3l-2-2" fill="rgba(168, 85, 247, 0.1)" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="var(--accent-cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      );
  }
};

export const Skills: React.FC = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<string>('backend');
  const [hoveredSkill, setHoveredSkill] = useState<SkillItem | null>(null);

  const categories: SkillCategory[] = [
    {
      id: 'backend',
      name: t('cat_backend'),
      icon: <Database size={18} />,
      skills: [
        { name: 'Node.js', level: 'Expert', detail: t('skill_nodejs_detail') },
        { name: 'Python', level: 'Advanced', detail: t('skill_python_detail') },
        { name: 'Redis', level: 'Advanced', detail: t('skill_redis_detail') },
        { name: 'Docker', level: 'Advanced', detail: t('skill_docker_detail') },
        { name: 'System Architectures', level: 'Expert', detail: t('skill_sysarch_detail') }
      ]
    },
    {
      id: 'frontend',
      name: t('cat_frontend'),
      icon: <Layers size={18} />,
      skills: [
        { name: 'React', level: 'Expert', detail: t('skill_react_detail') },
        { name: 'TypeScript', level: 'Expert', detail: t('skill_typescript_detail') },
        { name: 'Next.js', level: 'Advanced', detail: t('skill_nextjs_detail') },
        { name: 'Tailwind CSS', level: 'Expert', detail: t('skill_tailwind_detail') },
        { name: 'HTML5 & CSS3', level: 'Expert', detail: t('skill_htmlcss_detail') }
      ]
    },
    {
      id: 'aiml',
      name: t('cat_aiml'),
      icon: <Brain size={18} />,
      skills: [
        { name: 'Autonomous Agents', level: 'Advanced', detail: t('skill_autoagents_detail') },
        { name: 'Agentic Workflows', level: 'Expert', detail: t('skill_workflows_detail') },
        { name: 'PyTorch', level: 'Intermediate', detail: t('skill_pytorch_detail') },
        { name: 'Model Training', level: 'Intermediate', detail: t('skill_modeltraining_detail') },
        { name: 'Model Fine-Tuning', level: 'Advanced', detail: t('skill_finetuning_detail') }
      ]
    },
    {
      id: 'infra',
      name: t('cat_infra'),
      icon: <Shield size={18} />,
      skills: [
        { name: 'Compact (ZK)', level: 'Advanced', detail: t('skill_compactzk_detail') },
        { name: 'Linux System Ops', level: 'Advanced', detail: t('skill_linux_detail') },
        { name: 'Network Security', level: 'Advanced', detail: t('skill_netsec_detail') },
        { name: 'CI/CD Pipelines', level: 'Advanced', detail: t('skill_cicd_detail') },
        { name: 'Cryptography', level: 'Advanced', detail: t('skill_crypto_detail') }
      ]
    }
  ];

  const activeSkills = categories.find(c => c.id === activeCategory)?.skills || [];

  return (
    <section id="skills" style={{ padding: '80px 0', position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'left', marginBottom: '3.5rem' }}>
          <h3 style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>
            {t('skillsHeader')}
          </h3>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>
            {t('skillsTitle')} <span className="text-gradient">{t('skillsTitleAccent')}</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', marginTop: '0.5rem' }}>
            {t('skillsDescription')}
          </p>
        </div>

        {/* Skills Main Container */}
        <div style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: '3rem', alignItems: 'start' }}>
          
          {/* Left Column: Categories List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {categories.map((cat) => {
              const isActive = cat.id === activeCategory;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setHoveredSkill(null);
                  }}
                  className={`btn ${isActive ? 'btn-primary' : 'btn-secondary'}`}
                  data-interactive
                  style={{
                    justifyContent: 'flex-start',
                    padding: '1rem 1.5rem',
                    borderRadius: '12px',
                    width: '100%',
                    boxShadow: isActive ? '0 4px 15px rgba(0, 242, 254, 0.15)' : 'none',
                    border: isActive ? 'none' : '1px solid rgba(255,255,255,0.05)',
                    background: isActive ? undefined : 'rgba(255, 255, 255, 0.02)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', opacity: 0.8 }}>
                      {cat.icon}
                    </div>
                    <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{cat.name}</span>
                  </div>
                </button>
              );
            })}

            {/* Info Diagnostics card */}
            <div className="glass-panel" style={{ marginTop: '1.5rem', padding: '1.5rem', textAlign: 'left', background: 'rgba(255, 255, 255, 0.01)', borderColor: 'rgba(255,255,255,0.04)' }}>
              {hoveredSkill ? (
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.4rem' }}>
                    {hoveredSkill.name}
                  </h4>
                  <span style={{ display: 'inline-block', fontSize: '0.65rem', fontFamily: 'var(--font-mono)', padding: '0.2rem 0.5rem', background: 'rgba(168, 85, 247, 0.15)', borderRadius: '4px', color: 'var(--accent-purple)', marginBottom: '0.8rem', textTransform: 'uppercase', fontWeight: 600 }}>
                    {hoveredSkill.level}
                  </span>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: '1.5' }}>
                    {hoveredSkill.detail}
                  </p>
                </div>
              ) : (
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                    {t('skillTelemetry')}
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                    {t('skillHoverHint')}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Skills Grid */}
          <div 
            className="glass-panel" 
            style={{ 
              padding: '2.5rem 2rem', 
              background: 'rgba(8, 6, 16, 0.4)', 
              borderColor: 'rgba(255, 255, 255, 0.05)',
              minHeight: '280px'
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '1rem' }}>
              {activeSkills.map((skill) => {
                const isHovered = hoveredSkill?.name === skill.name;
                return (
                  <div
                    key={skill.name}
                    onMouseEnter={() => setHoveredSkill(skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    style={{
                      background: isHovered ? 'rgba(0, 242, 254, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                      border: isHovered ? '1px solid var(--accent-cyan)' : '1px solid rgba(255, 255, 255, 0.06)',
                      borderRadius: '10px',
                      padding: '1.25rem 0.75rem',
                      textAlign: 'center',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      boxShadow: isHovered ? '0 0 15px rgba(0, 242, 254, 0.15)' : 'none',
                      transform: isHovered ? 'translateY(-2px)' : 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.6rem'
                    }}
                    data-interactive
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '32px' }}>
                      {getSkillIcon(skill.name)}
                    </div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#ffffff', lineHeight: 1.2 }}>
                      {skill.name}
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                      {skill.level}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
