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
    const increment = end / (duration / 16.7);
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
      icon: <Award size={24} style={{ color: 'var(--accent-orange)' }} />,
      title: t('stat_prizes_title'),
      value: <Counter end={12000} prefix="$" suffix="+" />,
      description: t('stat_prizes_desc')
    },
    {
      icon: <Calendar size={24} style={{ color: 'var(--accent-blue)' }} />,
      title: t('stat_age_title'),
      value: <Counter end={15} suffix=" y/o" />,
      description: t('stat_age_desc')
    },
    {
      icon: <Code size={24} style={{ color: 'var(--accent-green)' }} />,
      title: t('stat_loc_title'),
      value: <Counter end={120000} suffix="+" />,
      description: t('stat_loc_desc')
    },
    {
      icon: <GitCommit size={24} style={{ color: 'var(--accent-red)' }} />,
      title: t('stat_commits_title'),
      value: <Counter end={140} suffix="+" />,
      description: t('stat_commits_desc')
    },
    {
      icon: <Activity size={24} style={{ color: 'var(--bg-titlebar-active)' }} />,
      title: t('stat_uptime_title'),
      value: <Counter end={99} suffix=".9%" duration={1200} />,
      description: t('stat_uptime_desc')
    }
  ];

  return (
    <section id="stats" className="retro-section" style={{ background: 'var(--bg-grid)' }}>
      <div className="container">

        {/* Section Header */}
        <div style={{ textAlign: 'left', marginBottom: '2rem' }}>
          <h3 className="section-header">
            {t('statsHeader')}
          </h3>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 700, fontFamily: 'var(--font-serif)' }}>
            {t('statsTitle')} <span className="text-gradient-purple-pink">{t('statsTitleAccent')}</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '650px', marginTop: '0.5rem', fontSize: '1.05rem' }}>
            {t('statsDescription')}
          </p>
        </div>

        {/* Stats Grid — Each stat as a mini retro window */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          {statItems.map((item, index) => (
            <div
              key={index}
              className="retro-window"
              data-interactive
            >
              <div className="retro-titlebar" style={{ padding: '5px 10px' }}>
                <span className="retro-titlebar-path" style={{ fontSize: '0.85rem' }}>
                  {item.title}
                </span>
              </div>
              <div className="retro-window-content" style={{ padding: '20px', textAlign: 'center' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '10px'
                }}>
                  {item.icon}
                </div>

                <div style={{
                  fontSize: '2.1rem',
                  fontWeight: 800,
                  color: 'var(--text-heading)',
                  fontFamily: 'var(--font-pixel)',
                  marginBottom: '6px',
                  letterSpacing: '0.02em'
                }}>
                  {item.value}
                </div>

                <p style={{
                  fontSize: '0.92rem',
                  color: 'var(--text-muted)',
                  lineHeight: '1.4'
                }}>
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
