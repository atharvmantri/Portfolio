import React, { useEffect, useRef, useState } from 'react';
import { Award, Code, GitCommit, Calendar, Activity } from 'lucide-react';

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
  const statItems = [
    {
      icon: <Award size={28} className="text-gradient" />,
      title: "Hackathon Prizes",
      value: <Counter end={12000} prefix="$" suffix="+" />,
      description: "Won globally via international hackathons building systems and devtools"
    },
    {
      icon: <Calendar size={28} style={{ color: 'var(--accent-purple)' }} />,
      title: "Developer Age",
      value: <Counter end={15} suffix=" y/o" />,
      description: "Young-scale engineering, building complex architectures"
    },
    {
      icon: <Code size={28} style={{ color: 'var(--accent-pink)' }} />,
      title: "Lines of Code Deployed",
      value: <Counter end={120000} suffix="+" />,
      description: "Highly optimized codebase written across languages"
    },
    {
      icon: <GitCommit size={28} style={{ color: 'var(--accent-blue)' }} />,
      title: "Commits This Year",
      value: <Counter end={540} suffix="+" />,
      description: "Continuous leverage deployment and open-source contributions"
    },
    {
      icon: <Activity size={28} style={{ color: 'var(--accent-cyan)' }} />,
      title: "Core Architecture Uptime",
      value: <Counter end={99} suffix=".9%" duration={1200} />,
      description: "High-scale engineering with redundancy and fault tolerance"
    }
  ];

  return (
    <section id="stats" style={{ padding: '80px 0', background: 'rgba(8, 6, 16, 0.4)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'left', marginBottom: '3.5rem' }}>
          <h3 style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-purple)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>
            Metrics &amp; Telemetry
          </h3>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>
            Real-Time <span className="text-gradient-purple-pink">Leverage Statistics</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', marginTop: '0.5rem' }}>
            Hardware specifications and system metrics validating technical leverage. I build systems that scale, and I back it up with data.
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
