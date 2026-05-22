import React from 'react';
import { Briefcase, Award, Code, MapPin } from 'lucide-react';

interface TimelineItem {
  id: string;
  year: string;
  role: string;
  organization: string;
  location: string;
  description: string;
  details: string[];
  icon: React.ReactNode;
  accent: string;
}

export const Timeline: React.FC = () => {
  const items: TimelineItem[] = [
    {
      id: 'active-rd',
      year: '2025 - Present',
      role: 'Autonomous Systems & AI Researcher',
      organization: 'Independent R&D / Open Source',
      location: 'Indore, India (Remote)',
      description: 'Researching multi-agent coordination architectures, LLM code execution sandboxes, and high-performance developer tooling.',
      details: [
        'Developing self-healing agent pipelines that execute code loops, catch runtime errors, and rewrite patches autonomously.',
        'Contributing to systems security open-source codebases, implementing custom encryption hooks and CLI helpers.',
        'Experimenting with local small language models (SLMs) fine-tuned for high-speed local agent tasks.'
      ],
      icon: <BrainIcon />,
      accent: 'var(--accent-cyan)'
    },
    {
      id: 'internship',
      year: '2025 (3 Mos)',
      role: 'Full-Stack Software Engineer Intern',
      organization: 'Yash Technologies Subsidiary',
      location: 'Indore, India',
      description: 'Contracted to architect and implement internally-used database telemetry assets and responsive system dashboards.',
      details: [
        'Engineered responsive web administration consoles, resulting in a 35% reduction in internal operations latency.',
        'Refactored legacy relational tables, optimizing query routes and configuring Redis session synchronization caches.',
        'Wrote robust TypeScript interfaces mapping payload structures cleanly between React and backend API endpoints.'
      ],
      icon: <Briefcase size={18} style={{ color: '#ffffff' }} />,
      accent: 'var(--accent-purple)'
    },
    {
      id: 'hackathons',
      year: '2024 - 2025',
      role: 'Competitive Software Architect',
      organization: 'Global Hackathon Competitor',
      location: 'International / Remote',
      description: 'Competed in high-profile hackathons, winning over $12,000 USD in prizes by building next-generation developer tooling.',
      details: [
        'Designed and presented highly interactive security platforms, low-level compilers, and server configurations to industry judges.',
        'Coordinated backend streaming engines and data pipelines under strict 36-to-48-hour time limits.',
        'Earned multiple top-3 finishes and track wins for security innovations and technical complexity.'
      ],
      icon: <Award size={18} style={{ color: '#ffffff' }} />,
      accent: 'var(--accent-pink)'
    },
    {
      id: 'early-years',
      year: '2022 - 2024',
      role: 'Systems Programmer',
      organization: 'Self-Directed / Community Developer',
      location: 'Indore, India',
      description: 'Began building complex tools, custom automation scripts, and studying systems programming fundamentals.',
      details: [
        'Mastered core low-level principles, data structures, socket communications, and relational query structures.',
        'Released open-source utilities for web automation, security auditing, and localized script execution.',
        'Collaborated on open Discord communities, writing moderation bots and custom scrapers.'
      ],
      icon: <Code size={18} style={{ color: '#ffffff' }} />,
      accent: 'var(--accent-blue)'
    }
  ];

  return (
    <section id="experience" style={{ padding: '80px 0', position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'left', marginBottom: '3.5rem' }}>
          <h3 style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-pink)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>
            System Ledger
          </h3>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>
            Chronological <span className="text-gradient-purple-pink">Engineering Milestones</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', marginTop: '0.5rem' }}>
            A trace log of my professional history, hackathon wins, and active systems research. I build speed and leverage at every step.
          </p>
        </div>

        {/* Vertical Timeline Layout */}
        <div style={{ position: 'relative', maxWidth: '850px', margin: '0 auto', paddingLeft: '2rem' }}>
          
          {/* Vertical Timeline Central Line */}
          <div style={{ 
            position: 'absolute', 
            left: '11px', 
            top: '10px', 
            bottom: '10px', 
            width: '2px', 
            background: 'linear-gradient(180deg, var(--accent-cyan) 0%, var(--accent-purple) 30%, var(--accent-pink) 65%, var(--accent-blue) 100%)',
            opacity: 0.3
          }} />

          {/* Timeline Nodes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {items.map((item) => (
              <div 
                key={item.id} 
                className="timeline-item-container"
                style={{ position: 'relative', textAlign: 'left' }}
              >
                
                {/* Node Dot Ring */}
                <div style={{ 
                  position: 'absolute', 
                  left: '-32px', 
                  top: '6px', 
                  width: '24px', 
                  height: '24px', 
                  borderRadius: '50%', 
                  background: 'rgba(8, 6, 16, 0.95)', 
                  border: `2px solid ${item.accent}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 0 10px ${item.accent}`,
                  zIndex: 2
                }}>
                  <div style={{ transform: 'scale(0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {item.icon}
                  </div>
                </div>

                {/* Event Card */}
                <div 
                  className="glass-panel timeline-card"
                  style={{ 
                    padding: '2rem',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    borderLeft: `3px solid ${item.accent}`
                  }}
                  data-interactive
                >
                  
                  {/* Card Header metadata */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                    <div>
                      <span style={{ 
                        fontFamily: 'var(--font-mono)', 
                        fontSize: '0.78rem', 
                        fontWeight: 600,
                        color: item.accent, 
                        background: 'rgba(255, 255, 255, 0.03)', 
                        padding: '0.2rem 0.6rem',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        borderRadius: '4px' 
                      }}>
                        {item.year}
                      </span>
                      
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '0.5rem' }}>
                        {item.role}
                      </h3>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      <span style={{ fontWeight: 600, color: '#ffffff' }}>{item.organization}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', marginTop: '0.1rem' }}>
                        <MapPin size={10} />
                        {item.location}
                      </span>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '1.2rem', lineHeight: '1.5' }}>
                    {item.description}
                  </p>

                  {/* Bullet features */}
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {item.details.map((detail, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                        <span style={{ color: item.accent, fontWeight: 'bold' }}>↳</span>
                        {detail}
                      </li>
                    ))}
                  </ul>

                </div>

              </div>
            ))}
          </div>

        </div>

      </div>

      <style>{`
        .timeline-card:hover {
          transform: translateX(5px);
          border-color: #ffffff;
          box-shadow: 0 10px 30px rgba(255,255,255,0.02);
        }
      `}</style>
    </section>
  );
};

// Simple brain icon helper (lucide React lacks brain icon sometimes in older versions, we can write a custom path)
const BrainIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#ffffff' }}>
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3 3 0 0 1 0-4.88 2.5 2.5 0 0 1 0-3.12A2.5 2.5 0 0 1 9.5 2Z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3 3 0 0 0 0-4.88 2.5 2.5 0 0 0 0-3.12A2.5 2.5 0 0 0 14.5 2Z" />
  </svg>
);
