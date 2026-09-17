import React, { useRef, useEffect } from 'react';

interface ParticleWaveCanvasProps {
  className?: string;
  particleColor?: string;
  hoverColor?: string;
  repulsionRadius?: number;
}

export const ParticleWaveCanvas: React.FC<ParticleWaveCanvasProps> = ({
  className = 'absolute inset-0 w-full h-full pointer-events-none z-0',
  particleColor = '166, 255, 46',
  hoverColor = '166, 255, 46',
  repulsionRadius = 150,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const mouse = { x: -1000, y: -1000, radius: repulsionRadius };

    let cachedRect: DOMRect | null = null;
    const updateRect = () => {
      cachedRect = canvas.getBoundingClientRect();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!cachedRect) updateRect();
      if (!cachedRect) return;
      mouse.x = e.clientX - cachedRect.left;
      mouse.y = e.clientY - cachedRect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      updateRect();
    };

    const handleScroll = () => {
      cachedRect = null;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    // Grid nodes configuration
    const cols = Math.floor(width / 28);
    const rows = Math.floor(height / 22);
    let step = 0;

    // Visibility control via IntersectionObserver to save GPU/CPU when offscreen
    let isIntersecting = false;
    let isPageVisible = !document.hidden;

    const startLoop = () => {
      if (!animationFrameId && isIntersecting && isPageVisible) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const stopLoop = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = 0;
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      step += 0.03;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x0 = (i / cols) * width + 14;
          const y0 = (j / rows) * height + 11;

          // Multi-frequency undulating wave
          const wave = Math.sin(step + i * 0.22 + j * 0.32) * 9 + Math.cos(step * 0.7 + i * 0.15) * 4;
          let px = x0;
          let py = y0 + wave;

          // Fluid cursor repulsion physics
          const dx = px - mouse.x;
          const dy = py - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius && dist > 0) {
            const force = (1 - dist / mouse.radius) * 40;
            px += (dx / dist) * force;
            py += (dy / dist) * force;
          }

          // Dynamic opacity and luminosity
          const alpha = 0.12 + Math.sin(step + i * 0.18 + j * 0.1) * 0.08;
          ctx.beginPath();
          ctx.arc(px, py, dist < mouse.radius ? 2.2 : 1.6, 0, Math.PI * 2);
          ctx.fillStyle = dist < mouse.radius 
            ? `rgba(${hoverColor}, 0.9)` 
            : `rgba(${particleColor}, ${alpha})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { rootMargin: '100px' }
    );
    observer.observe(canvas);

    const handleVisibilityChange = () => {
      isPageVisible = !document.hidden;
      if (isPageVisible && isIntersecting) {
        startLoop();
      } else {
        stopLoop();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();
      stopLoop();
    };
  }, [particleColor, hoverColor, repulsionRadius]);

  return (
    <canvas 
      ref={canvasRef} 
      className={className} 
    />
  );
};

export default ParticleWaveCanvas;
