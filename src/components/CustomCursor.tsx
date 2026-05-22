import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ringPosition, setRingPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Check if device is mobile/touch
    const checkDevice = () => {
      const mobile = window.matchMedia('(max-width: 768px)').matches || 
                     window.matchMedia('(pointer: coarse)').matches;
      setIsMobile(mobile);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    if (isMobile) return;

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsHidden(false);
    };

    const onMouseLeave = () => {
      setIsHidden(true);
    };

    const onMouseEnter = () => {
      setIsHidden(false);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isMobile]);

  // Smooth ring follow effect
  useEffect(() => {
    if (isMobile || isHidden) return;

    let animFrameId: number;
    
    const updateRing = () => {
      setRingPosition((prev) => {
        // Linear interpolation (lerp) for smooth trailing
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15,
        };
      });
      animFrameId = requestAnimationFrame(updateRing);
    };

    animFrameId = requestAnimationFrame(updateRing);

    return () => cancelAnimationFrame(animFrameId);
  }, [position, isHidden, isMobile]);

  // Detect hovering on interactive items
  useEffect(() => {
    if (isMobile) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.closest('[data-interactive]') ||
         target.closest('a') ||
         target.closest('button') ||
         target.closest('input') ||
         target.closest('textarea'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, [isMobile]);

  if (isMobile || isHidden) return null;

  return (
    <>
      <div
        className="custom-cursor"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          backgroundColor: isHovered ? 'var(--accent-cyan)' : '#ffffff',
          width: isHovered ? '4px' : '8px',
          height: isHovered ? '4px' : '8px',
          boxShadow: isHovered ? '0 0 10px var(--accent-cyan)' : 'none',
        }}
      />
      <div
        className="custom-cursor-ring"
        style={{
          left: `${ringPosition.x}px`,
          top: `${ringPosition.y}px`,
          borderColor: isHovered ? 'var(--accent-purple)' : 'rgba(255, 255, 255, 0.3)',
          width: isHovered ? '50px' : '32px',
          height: isHovered ? '50px' : '32px',
          backgroundColor: isHovered ? 'rgba(168, 85, 247, 0.08)' : 'transparent',
          boxShadow: isHovered ? '0 0 20px rgba(168, 85, 247, 0.2)' : 'none',
        }}
      />
    </>
  );
};
