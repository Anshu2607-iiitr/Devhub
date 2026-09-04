import React, { useRef, useState } from 'react';

export default function TiltCard3D({
  children,
  className = "",
  maxTilt = 12,
  perspective = 1000,
  scale = 1.02,
  glare = true
}) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setTilt({ rotateX, rotateY });

    if (glare) {
      setGlarePos({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
        opacity: 0.25
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
    setGlarePos(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-transform duration-200 ease-out will-change-transform ${className}`}
      style={{
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d',
        transform: isHovered
          ? `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${scale})`
          : 'rotateX(0deg) rotateY(0deg) scale(1)',
      }}
    >
      {children}

      {/* Dynamic Glare Sheen Reflection */}
      {glare && (
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300 overflow-hidden"
          style={{
            opacity: glarePos.opacity,
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.4) 0%, rgba(245,158,11,0.1) 40%, transparent 80%)`,
          }}
        />
      )}
    </div>
  );
}
