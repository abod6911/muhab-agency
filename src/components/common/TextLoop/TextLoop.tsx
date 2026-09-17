import React, { useEffect, useId, useLayoutEffect, useMemo, useRef, useState, useCallback } from 'react';
import './TextLoop.css';

const VIEW_W = 1200;
const VIEW_H = 150;
const CX = VIEW_W / 2;
const CY = VIEW_H / 2;
const EDGE_PAD = 8;

export interface TextLoopProps {
  text?: string;
  shape?: 'wave' | 'wave-reverse' | 'counter-wave' | 'circle' | 'infinity' | 'arch' | 'line';
  path?: string;
  speed?: number;
  direction?: 'forward' | 'reverse';
  separator?: string;
  curviness?: number;
  fontSize?: number;
  fontWeight?: number | string;
  letterSpacing?: number;
  uppercase?: boolean;
  color?: string;
  ribbon?: boolean;
  ribbonColor?: string;
  ribbonWidth?: number;
  pauseOnHover?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const buildPath = (shape: string, curviness: number, ribbonWidth: number): string => {
  const c = Math.max(0, curviness);
  const room = Math.max(12, CY - Math.max(0, ribbonWidth) / 2 - EDGE_PAD);

  switch (shape) {
    case 'circle': {
      const r = Math.min(60 + c * 0.5, room);
      return `M ${CX - r} ${CY} A ${r} ${r} 0 1 1 ${CX + r} ${CY} A ${r} ${r} 0 1 1 ${CX - r} ${CY} Z`;
    }
    case 'infinity': {
      const r = 150 + c * 1.4;
      const h = Math.min(40 + c * 0.5, room);
      return [
        `M ${CX} ${CY}`,
        `C ${CX + r * 0.55} ${CY - h} ${CX + r} ${CY - h} ${CX + r} ${CY}`,
        `C ${CX + r} ${CY + h} ${CX + r * 0.55} ${CY + h} ${CX} ${CY}`,
        `C ${CX - r * 0.55} ${CY - h} ${CX - r} ${CY - h} ${CX - r} ${CY}`,
        `C ${CX - r} ${CY + h} ${CX - r * 0.55} ${CY + h} ${CX} ${CY}`,
        'Z'
      ].join(' ');
    }
    case 'arch': {
      const rise = Math.min(30 + c * 0.6, room);
      return `M 120 ${CY + rise / 2} Q ${CX} ${CY - rise} ${VIEW_W - 120} ${CY + rise / 2}`;
    }
    case 'line':
      return `M -320 ${CY} L ${VIEW_W + 320} ${CY}`;
    case 'wave-reverse':
    case 'counter-wave': {
      const a = Math.min(c * 1.1, room);
      return `M -320 ${CY} Q -160 ${CY + a} 0 ${CY} T 320 ${CY} T 640 ${CY} T 960 ${CY} T 1280 ${CY} T ${VIEW_W + 320} ${CY}`;
    }
    case 'wave':
    default: {
      const a = Math.min(c * 1.1, room);
      return `M -320 ${CY} Q -160 ${CY - a} 0 ${CY} T 320 ${CY} T 640 ${CY} T 960 ${CY} T 1280 ${CY} T ${VIEW_W + 320} ${CY}`;
    }
  }
};

export const TextLoop: React.FC<TextLoopProps> = ({
  text = 'React ✦ Bits',
  shape = 'wave',
  path,
  speed = 90,
  direction = 'forward',
  separator = '✦',
  curviness = 90,
  fontSize = 46,
  fontWeight = 800,
  letterSpacing = 2,
  uppercase = true,
  color = '#ffffff',
  ribbon = true,
  ribbonColor = '#5227FF',
  ribbonWidth = 86,
  pauseOnHover = true,
  className = '',
  style = {}
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const measureRef = useRef<SVGTextElement>(null);
  const textPathRef = useRef<SVGTextPathElement>(null);

  const rawId = useId();
  const pathId = `text-loop-${rawId.replace(/[^a-zA-Z0-9_-]/g, '')}`;

  const d = useMemo(() => path || buildPath(shape, curviness, ribbonWidth), [path, shape, curviness, ribbonWidth]);

  const unit = useMemo(() => {
    const base = uppercase ? String(text).toUpperCase() : String(text);
    const gap = separator ? `\u00A0${separator}\u00A0` : '\u00A0\u00A0\u00A0';
    return `${base}${gap}`;
  }, [text, separator, uppercase]);

  const isArabic = useMemo(() => /[\u0600-\u06FF]/.test(text), [text]);

  const textStyle = useMemo<React.CSSProperties>(
    () => ({
      fontSize: `${fontSize}px`,
      fontWeight: String(fontWeight),
      letterSpacing: isArabic ? '0px' : `${letterSpacing}px`,
      fontFamily: isArabic ? "'Cairo', 'Readex Pro', sans-serif" : "'Plus Jakarta Sans', system-ui, sans-serif"
    }),
    [fontSize, fontWeight, letterSpacing, isArabic]
  );

  const [spacing, setSpacing] = useState(0);
  const spacingRef = useRef(0);

  const updateSpacing = useCallback(() => {
    let len = 0;
    if (measureRef.current && typeof measureRef.current.getComputedTextLength === 'function') {
      try {
        len = measureRef.current.getComputedTextLength();
      } catch {}
    }
    if (!len || len < 20) {
      len = Math.max(unit.length * fontSize * 0.7, 300);
    }
    setSpacing(len);
    spacingRef.current = len;
  }, [unit, fontSize]);

  useLayoutEffect(() => {
    updateSpacing();
    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(updateSpacing).catch(() => {});
    }
  }, [updateSpacing]);

  const textLength = spacing || Math.max(unit.length * fontSize * 0.7, 300);
  const totalText = useMemo(() => {
    const count = Math.max(8, Math.ceil(4000 / textLength) + 4);
    return Array(count).fill(unit).join('');
  }, [unit, textLength]);

  const calcBaseSpeed = useCallback(() => {
    const dir = direction === 'reverse' ? -1 : 1;
    return dir * Math.max(1.2, speed / 55);
  }, [direction, speed]);

  const baseSpeedRef = useRef(calcBaseSpeed());
  const velocityRef = useRef(calcBaseSpeed());
  const offsetRef = useRef(-textLength);
  const isDraggingRef = useRef(false);
  const lastXRef = useRef(0);
  const isHoveredRef = useRef(false);
  const [cursorStyle, setCursorStyle] = useState<'grab' | 'grabbing'>('grab');

  useEffect(() => {
    baseSpeedRef.current = calcBaseSpeed();
    if (!isDraggingRef.current) {
      velocityRef.current = calcBaseSpeed();
    }
  }, [calcBaseSpeed]);

  // Continuous 120 FPS hardware-accelerated RAF animation loop matching CurvedLoopSection
  useEffect(() => {
    let frameId = 0;
    let isIntersecting = false;
    let isPageVisible = typeof document !== 'undefined' ? !document.hidden : true;

    const step = () => {
      const textPath = textPathRef.current;
      if (textPath) {
        if (!isDraggingRef.current) {
          const targetSpeed = (pauseOnHover && isHoveredRef.current) ? 0 : baseSpeedRef.current;
          // Smooth inertia decay back to cruising speed (signature CurvedLoop physics)
          velocityRef.current += (targetSpeed - velocityRef.current) * 0.04;
          offsetRef.current += velocityRef.current;
        }

        const wrapPoint = spacingRef.current || textLength;
        if (wrapPoint > 0) {
          while (offsetRef.current <= -wrapPoint) {
            offsetRef.current += wrapPoint;
          }
          while (offsetRef.current > 0) {
            offsetRef.current -= wrapPoint;
          }
        }

        textPath.setAttribute('startOffset', `${offsetRef.current}px`);
      }

      if (isIntersecting && isPageVisible) {
        frameId = requestAnimationFrame(step);
      } else {
        frameId = 0;
      }
    };

    const start = () => {
      if (!frameId && isIntersecting && isPageVisible) {
        frameId = requestAnimationFrame(step);
      }
    };

    const stop = () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
        frameId = 0;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) start();
        else stop();
      },
      { rootMargin: '120px' }
    );

    if (rootRef.current) {
      observer.observe(rootRef.current);
    }

    const handleVisibility = () => {
      isPageVisible = !document.hidden;
      if (isPageVisible && isIntersecting) start();
      else stop();
    };

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [pauseOnHover, textLength]);

  // Pointer drag interactions (touch & mouse) - Matching CurvedLoopSection
  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    lastXRef.current = e.clientX;
    velocityRef.current = 0;
    setCursorStyle('grabbing');
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !textPathRef.current) return;
    const deltaX = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;

    offsetRef.current += deltaX;
    velocityRef.current = deltaX * 0.85;

    const wrapPoint = spacingRef.current || textLength;
    if (wrapPoint > 0) {
      while (offsetRef.current <= -wrapPoint) {
        offsetRef.current += wrapPoint;
      }
      while (offsetRef.current > 0) {
        offsetRef.current -= wrapPoint;
      }
    }

    textPathRef.current.setAttribute('startOffset', `${offsetRef.current}px`);
  }, [textLength]);

  const handlePointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;
    setCursorStyle('grab');
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  }, []);

  return (
    <div 
      ref={rootRef} 
      className={`text-loop ${className}`.trim()} 
      style={{ ...style, cursor: cursorStyle, touchAction: 'pan-y' }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseEnter={() => { if (pauseOnHover) isHoveredRef.current = true; }}
      onMouseLeave={() => { if (pauseOnHover) isHoveredRef.current = false; }}
    >
      <svg
        className="text-loop-svg"
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={text}
      >
        <path
          ref={pathRef}
          id={pathId}
          d={d}
          fill="none"
          stroke={ribbon ? ribbonColor : 'none'}
          strokeWidth={ribbon ? ribbonWidth : 0}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <text ref={measureRef} className="text-loop-measure" style={textStyle} aria-hidden="true">
          {unit}
        </text>

        <text
          className="text-loop-text"
          style={textStyle}
          fill={color}
          dominantBaseline="central"
          aria-hidden="true"
        >
          <textPath ref={textPathRef} href={`#${pathId}`} startOffset="0px">
            {totalText}
          </textPath>
        </text>
      </svg>
    </div>
  );
};

export default TextLoop;
