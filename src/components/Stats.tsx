import React, { useEffect, useRef, useState } from 'react';
import { Award, Code, GitCommit, Calendar, Activity } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface CounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

const Counter: React.FC<CounterProps> = ({ end, suffix = '', prefix = '', duration = 1500 }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let start = 0;
    const increment = end / (duration / 16.7); // 60fps
    let timer: number;

    const updateCounter = () => {
      start += increment;
      if (start >= end) {
        setCount(end);
      } else {
        setCount(Math.floor(start));
        timer = requestAnimationFrame(updateCounter);
      }
    };

    timer = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(timer);
  }, [end, duration, hasStarted]);

  return (
    <span ref={elementRef} style={{ display: 'inline-block' }}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

export const Stats: React.FC = () => {
  const { t } = useTranslation();

  const statItems = [
    {
      icon: <Award size={28} className="text-gradient" />,
      title: t('stat_prizes_title'),
      value: <Counter end={12000} prefix="$" suffix="+" />,
      description: t('stat_prizes_desc')
    },
    {
      icon: <Calendar size={28} style={{ color: 'var(--accent-purple)' }} />,
      title: t('stat_age_title'),
      value: <Counter end={15} suffix=" y/o" />,
      description: t('stat_age_desc')
    },
    {
      icon: <Code size={28} style={{ color: 'var(--accent-pink)' }} />,
      title: t('stat_loc_title'),
      value: <Counter end={120000} suffix="+" />,
      description: t('stat_loc_desc')
    },
    {
      icon: <GitCommit size={28} style={{ color: 'var(--accent-blue)' }} />,
      title: t('stat_commits_title'),
      value: <Counter end={140} suffix="+" />,
      description: t('stat_commits_desc')
    },
    {
      icon: <Activity size={28} style={{ color: 'var(--accent-cyan)' }} />,
      title: t('stat_uptime_title'),
      value: <Counter end={99} suffix=".9%" duration={1200} />,
      description: t('stat_uptime_desc')
    }
  ];

  return (
    <section id="stats" style={{ padding: '80px 0', background: 'rgba(8, 6, 16, 0.4)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'left', marginBottom: '3.5rem' }}>
          <h3 style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-purple)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>
            {t('statsHeader')}
          </h3>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>
            {t('statsTitle')} <span className="text-gradient-purple-pink">{t('statsTitleAccent')}</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', marginTop: '0.5rem' }}>
            {t('statsDescription')}
          </p>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
          {statItems.map((item, index) => (
            <div 
              key={index}
              className="glass-panel" 
              style={{ 
                padding: '2rem 1.5rem', 
                textAlign: 'left', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                height: '100%',
                borderTop: '2px solid rgba(255, 255, 255, 0.05)'
              }}
              data-interactive
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '12px', padding: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {item.icon}
                  </div>
                </div>

                <h4 style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {item.title}
                </h4>
              </div>

              <div>
                <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem', fontFamily: 'var(--font-sans)', letterSpacing: '-0.02em' }}>
                  {item.value}
                </div>
                
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
