import React, { useState } from 'react';
import { Shield, Layers, Brain, Database } from 'lucide-react';

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

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('backend');
  const [hoveredSkill, setHoveredSkill] = useState<SkillItem | null>(null);

  const categories: SkillCategory[] = [
    {
      id: 'backend',
      name: 'Backend & Systems',
      icon: <Database size={18} />,
      skills: [
        { name: 'Go', level: 'Advanced', detail: 'Built WebSniper concurrent scraping orchestrators, custom thread schedulers, and socket proxies.' },
        { name: 'Node.js', level: 'Expert', detail: 'Created web APIs, real-time WebSockets gateways, and multi-tenant tooling platforms.' },
        { name: 'Python', level: 'Advanced', detail: 'Scripted threat detection anomaly models, database ingestion jobs, and LLM orchestration.' },
        { name: 'PostgreSQL', level: 'Expert', detail: 'Optimized index strategies, complex subqueries, JSONB datastores, and relation schemas.' },
        { name: 'Redis', level: 'Advanced', detail: 'Used as shared locking state for distributed scrapers, session caching, and message queues.' },
        { name: 'Docker', level: 'Advanced', detail: 'Containerized systems with multi-stage builds, isolated networks, and system redundancies.' },
        { name: 'System Architectures', level: 'Expert', detail: 'Designed high-throughput data streams, microservices, and fault-tolerant structures.' }
      ]
    },
    {
      id: 'frontend',
      name: 'Frontend Engineering',
      icon: <Layers size={18} />,
      skills: [
        { name: 'React', level: 'Expert', detail: 'Built modular component systems, interactive terminal consoles, and complex SPA dashboards.' },
        { name: 'TypeScript', level: 'Expert', detail: 'Enforced static typings, custom generic types, and robust API contracts across front/back.' },
        { name: 'Next.js', level: 'Advanced', detail: 'Implemented static site generation, server components, and SEO-optimized routes.' },
        { name: 'Tailwind CSS', level: 'Expert', detail: 'Created responsive layouts, flexbox utilities, and theme variables.' },
        { name: 'HTML5 & CSS3', level: 'Expert', detail: 'Crafted semantic document node maps, complex keyframe animations, and HSL grids.' }
      ]
    },
    {
      id: 'aiml',
      name: 'AI & Intelligence',
      icon: <Brain size={18} />,
      skills: [
        { name: 'Autonomous Agents', level: 'Advanced', detail: 'Created self-correcting agent chains executing code sandboxes and web lookups.' },
        { name: 'Agentic Workflows', level: 'Expert', detail: 'Structured DAG graphs defining agent collaboration pipelines (planner, worker, critic).' },
        { name: 'PyTorch', level: 'Intermediate', detail: 'Created neural networks, tabular classification layers, and regression model trials.' },
        { name: 'Model Training', level: 'Intermediate', detail: 'Pre-processed datasets, custom feature extraction, and isolated test/train sets.' },
        { name: 'Model Fine-Tuning', level: 'Advanced', detail: 'Finetuned LLMs on custom instructions via LoRA/QLoRA for domain task adapters.' }
      ]
    },
    {
      id: 'infra',
      name: 'Infrastructure & Security',
      icon: <Shield size={18} />,
      skills: [
        { name: 'Linux System Ops', level: 'Advanced', detail: 'Configured systemd service daemons, cron schedulers, bash setups, and security permissions.' },
        { name: 'Network Security', level: 'Advanced', detail: 'Monitored ports, analyzed packet headers, and blocked malicious connections using iptables.' },
        { name: 'CI/CD Pipelines', level: 'Advanced', detail: 'Automated test suite execution and continuous deployment via GitHub Actions.' },
        { name: 'Cryptography', level: 'Advanced', detail: 'Implemented AES-GCM envelope encryption, RSA keys, and cryptographically secure hashes.' }
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
            Capabilities Matrix
          </h3>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>
            Technical <span className="text-gradient">Skill Stack</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', marginTop: '0.5rem' }}>
            Classified capability vectors across computer science disciplines. Hover over any skill badge to query real-world implementations.
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
                    Skill Telemetry
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                    Hover over any skill chip in the grid to display specific execution diagnostics and system history.
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
                      padding: '1rem 0.75rem',
                      textAlign: 'center',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      boxShadow: isHovered ? '0 0 15px rgba(0, 242, 254, 0.15)' : 'none',
                      transform: isHovered ? 'translateY(-2px)' : 'none'
                    }}
                    data-interactive
                  >
                    <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#ffffff', marginBottom: '0.25rem' }}>
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
