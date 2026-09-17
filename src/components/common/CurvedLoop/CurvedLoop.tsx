import React, { useRef, useEffect, useState, useMemo, useId } from 'react';
import './CurvedLoop.css';

export interface CurvedLoopProps {
  marqueeText?: string;
  speed?: number;
  className?: string;
  containerClassName?: string;
  curveAmount?: number;
  direction?: 'left' | 'right';
  interactive?: boolean;
}

export const CurvedLoop: React.FC<CurvedLoopProps> = ({
  marqueeText = '',
  speed = 2,
  className,
  containerClassName,
  curveAmount = 140,
  direction = 'left',
  interactive = true,
}) => {
  const text = useMemo(() => {
    const hasTrailing = /\s|\u00A0$/.test(marqueeText);
    return (hasTrailing ? marqueeText.replace(/\s+$/, '') : marqueeText) + '\u00A0';
  }, [marqueeText]);

  const measureRef = useRef<SVGTextElement>(null);
  const textPathRef = useRef<SVGTextPathElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [spacing, setSpacing] = useState(0);
  const [offset, setOffset] = useState(0);
  const uid = useId();
  const safeUid = uid.replace(/[^a-zA-Z0-9_-]/g, '_');
  const pathId = `curve-${safeUid}`;
  const pathD = `M-100,40 Q720,${40 + curveAmount} 1540,40`;

  const dragRef = useRef(false);
  const lastXRef = useRef(0);
  const dirRef = useRef(direction);
  const velRef = useRef(0);

  useEffect(() => {
    dirRef.current = direction;
  }, [direction]);

  const textLength = spacing || Math.max(text.length * 28, 200);
  const totalText = useMemo(() => {
    return Array(Math.ceil(3200 / textLength) + 4)
      .fill(text)
      .join('');
  }, [text, textLength]);

  const ready = spacing > 0;

  const updateSpacing = () => {
    if (measureRef.current && typeof measureRef.current.getComputedTextLength === 'function') {
      try {
        const len = measureRef.current.getComputedTextLength();
        if (len > 20) {
          setSpacing(len);
          return;
        }
      } catch {}
    }
    setSpacing(Math.max(text.length * 28, 200));
  };

  useEffect(() => {
    updateSpacing();
    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(updateSpacing);
    }
  }, [text, className]);

  useEffect(() => {
    if (!spacing) return;
    if (textPathRef.current) {
      const initial = -spacing;
      textPathRef.current.setAttribute('startOffset', initial + 'px');
      setOffset(initial);
    }
  }, [spacing]);

  useEffect(() => {
    if (!spacing) return;
    let frame = 0;
    const step = () => {
      if (!dragRef.current && textPathRef.current) {
        const delta = dirRef.current === 'right' ? speed : -speed;
        const currentOffset = parseFloat(textPathRef.current.getAttribute('startOffset') || '0');
        let newOffset = currentOffset + delta;

        const wrapPoint = spacing;
        if (newOffset <= -wrapPoint) newOffset += wrapPoint;
        if (newOffset > 0) newOffset -= wrapPoint;

        textPathRef.current.setAttribute('startOffset', newOffset + 'px');
        setOffset(newOffset);
      }
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [spacing, speed]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive) return;
    dragRef.current = true;
    lastXRef.current = e.clientX;
    velRef.current = 0;
    try {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    } catch {}
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive || !dragRef.current || !textPathRef.current) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velRef.current = dx;

    const currentOffset = parseFloat(textPathRef.current.getAttribute('startOffset') || '0');
    let newOffset = currentOffset + dx;

    const wrapPoint = spacing;
    if (newOffset <= -wrapPoint) newOffset += wrapPoint;
    if (newOffset > 0) newOffset -= wrapPoint;

    textPathRef.current.setAttribute('startOffset', newOffset + 'px');
    setOffset(newOffset);
  };

  const endDrag = () => {
    if (!interactive) return;
    dragRef.current = false;
    dirRef.current = velRef.current > 0 ? 'right' : 'left';
  };

  const cursorStyle = interactive ? (dragRef.current ? 'grabbing' : 'grab') : 'auto';

  return (
    <div
      className={`curved-loop-jacket ${containerClassName || ''}`}
      style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.25s ease-out', cursor: cursorStyle }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
    >
      <svg 
        className="curved-loop-svg" 
        viewBox="0 0 1440 140"
        style={{ direction: 'ltr' }}
      >
        <text 
          ref={measureRef} 
          xmlSpace="preserve" 
          opacity="0" 
          pointerEvents="none"
          className={className}
          style={{ position: 'absolute', direction: 'ltr' }}
        >
          {text}
        </text>
        <defs>
          <path ref={pathRef} id={pathId} d={pathD} fill="none" stroke="transparent" />
        </defs>
        <text fontWeight="bold" xmlSpace="preserve" className={className} style={{ direction: 'ltr' }}>
          <textPath ref={textPathRef} href={`#${pathId}`} startOffset={offset + 'px'} xmlSpace="preserve">
            {totalText}
          </textPath>
        </text>
      </svg>
    </div>
  );
};

export default CurvedLoop;
