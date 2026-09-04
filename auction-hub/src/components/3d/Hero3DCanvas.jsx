import React, { useEffect, useRef } from 'react';

export default function Hero3DCanvas({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse interactive coordinates
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = (e.clientX - rect.left - width / 2) * 0.0015;
      targetMouseY = (e.clientY - rect.top - height / 2) * 0.0015;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 3D Particles & Stadium Dome Rings
    const numParticles = 140;
    const particles = [];

    // Create 3D particles on a spherical / cylindrical sports arena
    for (let i = 0; i < numParticles; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 220 + Math.random() * 180;

      particles.push({
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta) * 0.5, // flattened stadium look
        z: radius * Math.cos(phi),
        size: Math.random() * 2.5 + 1,
        color: Math.random() > 0.4 ? '#F59E0B' : (Math.random() > 0.5 ? '#06B6D4' : '#ffffff'),
        speed: (Math.random() * 0.006 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
        pulse: Math.random() * Math.PI * 2
      });
    }

    // 3D Rings coordinates
    const rings = [
      { radius: 180, count: 24, yOffset: -40, rotSpeed: 0.008, color: 'rgba(245, 158, 11, ' },
      { radius: 260, count: 36, yOffset: 0, rotSpeed: -0.005, color: 'rgba(6, 182, 212, ' },
      { radius: 340, count: 48, yOffset: 40, rotSpeed: 0.004, color: 'rgba(245, 158, 11, ' },
    ];

    let angleY = 0;
    let angleX = 0.2;

    const fov = 420; // Field of View

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      angleY += 0.006 + mouseX * 0.5;
      angleX = 0.25 + mouseY * 0.5;

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      const centerX = width / 2;
      const centerY = height / 2;

      // Project & Draw Arena Rings in 3D
      rings.forEach((ring, rIdx) => {
        const ringAngle = angleY * (ring.rotSpeed > 0 ? 1.5 : -1.2);
        const pts = [];

        for (let i = 0; i < ring.count; i++) {
          const theta = (i / ring.count) * Math.PI * 2 + ringAngle;
          const x0 = Math.cos(theta) * ring.radius;
          const y0 = ring.yOffset;
          const z0 = Math.sin(theta) * ring.radius;

          // Rotate around Y
          let x1 = x0 * cosY - z0 * sinY;
          let z1 = z0 * cosY + x0 * sinY;

          // Rotate around X
          let y2 = y0 * cosX - z1 * sinX;
          let z2 = z1 * cosX + y0 * sinX + 500;

          if (z2 > 10) {
            const scale = fov / z2;
            const px = centerX + x1 * scale;
            const py = centerY + y2 * scale;
            const alpha = Math.max(0.05, Math.min(0.6, (scale - 0.3) * 0.8));

            pts.push({ px, py, alpha, z: z2 });
          }
        }

        // Connect ring points with glowing 3D wireframe line
        if (pts.length > 2) {
          ctx.beginPath();
          ctx.strokeStyle = `${ring.color}0.15)`;
          ctx.lineWidth = 1;
          for (let p = 0; p < pts.length; p++) {
            const nextP = pts[(p + 1) % pts.length];
            ctx.moveTo(pts[p].px, pts[p].py);
            ctx.lineTo(nextP.px, nextP.py);
          }
          ctx.stroke();

          // Draw vertex points
          pts.forEach((p, idx) => {
            if (idx % 2 === 0) {
              ctx.fillStyle = `${ring.color}${p.alpha})`;
              ctx.beginPath();
              ctx.arc(p.px, p.py, 1.8 * (fov / p.z), 0, Math.PI * 2);
              ctx.fill();
            }
          });
        }
      });

      // 3D Particles Render with Depth Sort
      const projectedParticles = [];

      particles.forEach((p) => {
        p.pulse += 0.04;
        const currentRadiusOffset = Math.sin(p.pulse) * 12;

        // Rotate Y
        let x1 = p.x * cosY - p.z * sinY;
        let z1 = p.z * cosY + p.x * sinY;

        // Rotate X
        let y2 = (p.y + currentRadiusOffset) * cosX - z1 * sinX;
        let z2 = z1 * cosX + (p.y + currentRadiusOffset) * sinX + 500;

        if (z2 > 10) {
          const scale = fov / z2;
          const px = centerX + x1 * scale;
          const py = centerY + y2 * scale;
          const alpha = Math.max(0.1, Math.min(0.85, (scale - 0.25) * 1.1));

          projectedParticles.push({
            px,
            py,
            scale,
            size: p.size * scale,
            alpha,
            color: p.color,
            z: z2
          });
        }
      });

      // Sort by Z (farthest first)
      projectedParticles.sort((a, b) => b.z - a.z);

      projectedParticles.forEach((p) => {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8 * p.scale;

        ctx.beginPath();
        ctx.arc(p.px, p.py, Math.max(0.5, p.size), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Draw Center 3D Hologram Glow Core
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 220);
      gradient.addColorStop(0, 'rgba(245, 158, 11, 0.12)');
      gradient.addColorStop(0.4, 'rgba(6, 182, 212, 0.06)');
      gradient.addColorStop(1, 'rgba(7, 10, 18, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 220, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 w-full h-full ${className}`}
      style={{ opacity: 0.95 }}
    />
  );
}
