import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Sparkles, MoveHorizontal } from 'lucide-react';

export const CurvedLoopSection: React.FC = () => {
  const { language } = useLanguage();

  const arabicItems = [
    'استوديو مهاب الرقمي',
    'هندسة برمجية فاخرة',
    'مواقع فائقة السرعة',
    'واجهات معمارية استثنائية',
    'كود مخصص بدون قوالب',
    'أداء 120 FPS فائق',
    'نمو مبيعات موثق',
  ];

  const englishItems = [
    'MUHAB DIGITAL STUDIO',
    'BESPOKE WEB ARCHITECTURE',
    'SUB-SECOND VELOCITY',
    'NO GENERIC TEMPLATES',
    '120 FPS FLUID MOTION',
    'HIGH CONVERSION SLA',
    'TIER-1 ARCHITECTURE',
  ];

  const items = language === 'ar' ? arabicItems : englishItems;

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const isDraggingRef = useRef(false);
  const lastXRef = useRef(0);
  const velocityRef = useRef(0);
  const baseSpeedRef = useRef(language === 'ar' ? 1.3 : -1.3);
  const [cursorStyle, setCursorStyle] = useState<'grab' | 'grabbing'>('grab');

  useEffect(() => {
    baseSpeedRef.current = language === 'ar' ? 1.3 : -1.3;
  }, [language]);

  // Smooth 120 FPS hardware-accelerated RAF animation loop
  useEffect(() => {
    let frameId = 0;
    let isIntersecting = false;
    let isPageVisible = !document.hidden;

    const step = () => {
      if (!trackRef.current) return;

      const track = trackRef.current;
      const singleSetWidth = track.scrollWidth / 3;

      if (!isDraggingRef.current) {
        // Smoothly decay velocity back to cruising speed
        velocityRef.current += (baseSpeedRef.current - velocityRef.current) * 0.04;
        offsetRef.current += velocityRef.current;
      }

      // Seamless infinite loop wrapping
      if (singleSetWidth > 0) {
        if (offsetRef.current <= -singleSetWidth) {
          offsetRef.current += singleSetWidth;
        } else if (offsetRef.current >= 0) {
          offsetRef.current -= singleSetWidth;
        }
      }

      track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;

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

    if (containerRef.current) {
      observer.observe(containerRef.current);
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
  }, []);

  // Pointer drag interactions (touch & mouse)
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
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;

    offsetRef.current += deltaX;
    velocityRef.current = deltaX * 0.8;

    if (trackRef.current) {
      const singleSetWidth = trackRef.current.scrollWidth / 3;
      if (singleSetWidth > 0) {
        if (offsetRef.current <= -singleSetWidth) {
          offsetRef.current += singleSetWidth;
        } else if (offsetRef.current >= 0) {
          offsetRef.current -= singleSetWidth;
        }
      }
      trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
    }
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;
    setCursorStyle('grab');
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  }, []);

  return (
    <section 
      id="kinetic-ribbon"
      ref={containerRef}
      className="relative w-full py-10 sm:py-14 md:py-20 bg-gradient-to-b from-[#020a06] via-[#04160d] to-[#020a06] overflow-hidden border-y border-emerald-500/15 select-none"
      aria-label="Kinetic Studio Vision Ribbon"
    >
      {/* Ambient background glow orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#a6ff2e]/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Micro-Header Guidance Pill */}
      <div className="flex items-center justify-center mb-5 sm:mb-8 px-4">
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#051a11]/90 border border-emerald-500/30 backdrop-blur-md text-[11px] sm:text-xs font-medium text-emerald-300 shadow-sm whitespace-nowrap">
          <Sparkles className="w-3.5 h-3.5 text-[#a6ff2e] shrink-0" />
          <span className="font-semibold tracking-wide">
            {language === 'ar' ? 'شريط الرؤية الحركي التفاعلي' : 'Interactive Kinetic Vision Ribbon'}
          </span>
          <span className="w-1 h-1 rounded-full bg-emerald-500/60 shrink-0" />
          <div className="flex items-center gap-1.5 text-slate-400">
            <MoveHorizontal className="w-3.5 h-3.5 text-[#a6ff2e]/90 shrink-0" />
            <span className="text-[10px] sm:text-[11px]">
              {language === 'ar' ? 'اسحب للتوجيه والتحكم' : 'Drag to steer'}
            </span>
          </div>
        </div>
      </div>

      {/* Kinetic Angled Ribbon Wrapper */}
      <div 
        className="relative w-full overflow-hidden py-3 sm:py-5 -rotate-1 sm:-rotate-1.5 scale-105 origin-center border-y border-emerald-500/20 bg-[#020e08]/85 backdrop-blur-sm shadow-[0_0_35px_rgba(166,255,46,0.06)]"
        style={{ cursor: cursorStyle, touchAction: 'pan-y' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Infinite Looping Track (3x Sets for Seamless Repeat) */}
        <div 
          ref={trackRef}
          className="flex items-center whitespace-nowrap will-change-transform"
          style={{ direction: 'ltr' }}
        >
          {[0, 1, 2].map((setIndex) => (
            <div key={setIndex} className="flex items-center shrink-0">
              {items.map((text, itemIndex) => (
                <div key={itemIndex} className="flex items-center">
                  <span className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-wider text-slate-100 hover:text-[#a6ff2e] transition-colors duration-200 px-3 sm:px-5 select-none drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">
                    {text}
                  </span>
                  <span className="text-[#a6ff2e] text-base sm:text-2xl md:text-3xl px-2 sm:px-4 drop-shadow-[0_0_12px_rgba(166,255,46,0.8)] select-none">
                    ✦
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Soft Vignette Edge Fades */}
        <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#020a06] to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#020a06] to-transparent pointer-events-none z-10" />
      </div>

      {/* Value Proposition Subtitle Bar (Clean Arabic Phrasing without BiDi Inversion) */}
      <div className="relative z-10 text-center mt-5 sm:mt-8 px-4">
        <p className="text-xs sm:text-sm md:text-base text-emerald-300/90 font-medium tracking-wide">
          {language === 'ar'
            ? 'هندسة برمجية فاخرة • استجابة لحظية في أقل من 0.8 ثانية • كود مخصص بدون قوالب جاهزة'
            : 'Bespoke Web Architecture • Sub-Second Velocity (< 0.8s) • 100% Handcrafted Code'}
        </p>
      </div>

      {/* Top and Bottom Subtle Linear Edge Masks */}
      <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#020a06] to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-[#020a06] to-transparent pointer-events-none" />
    </section>
  );
};

export default CurvedLoopSection;
