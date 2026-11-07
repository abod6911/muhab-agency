import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { Sparkles, ArrowUpRight, ShieldCheck, Zap } from 'lucide-react';
import { getAssetUrl } from '../../utils/assets';

interface IntroSplashScreenProps {
  onStartExit?: () => void;
  onComplete?: () => void;
}

export const IntroSplashScreen: React.FC<IntroSplashScreenProps> = ({ onStartExit, onComplete }) => {
  const { language } = useLanguage();
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isFinished, setIsFinished] = useState(() => {
    if (typeof window !== 'undefined' && window.sessionStorage.getItem('muhab_intro_seen')) {
      return true;
    }
    return false;
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isExitingRef = useRef(false);

  // 3D Spatial Tilt Physics for the Logo & Gyroscope Rings (Subtle, efficient)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200 };
  const rotateX = useSpring(useTransform(mouseY, [-350, 350], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-350, 350], [-10, 10]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const onStartExitRef = useRef(onStartExit);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onStartExitRef.current = onStartExit;
    onCompleteRef.current = onComplete;
  }, [onStartExit, onComplete]);

  const handleExit = useCallback(() => {
    if (isExitingRef.current) return;
    isExitingRef.current = true;
    setIsExiting(true);
    
    try {
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem('muhab_intro_seen', 'true');
      }
    } catch {}

    // Notify parent to start smooth camera landing on Hero
    onStartExitRef.current?.();

    // Complete transition after smooth dive (450ms duration)
    setTimeout(() => {
      setIsFinished(true);
      document.body.style.overflow = '';
      onCompleteRef.current?.();
    }, 450);
  }, []);

  // Snappy progress animation & minimal ambient dust (zero sound, zero lag)
  useEffect(() => {
    if (isFinished) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Snappy progression (450ms total)
    const startTime = performance.now();
    const duration = 450;

    let progressFrameId: number;

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      
      const eased = rawProgress < 0.5 
        ? 2 * rawProgress * rawProgress 
        : -1 + (4 - 2 * rawProgress) * rawProgress;

      const currentPercent = Math.min(Math.floor(eased * 100), 100);
      setProgress(currentPercent);

      if (rawProgress < 1) {
        progressFrameId = requestAnimationFrame(updateProgress);
      } else {
        setIsReady(true);
        // Swift auto-exit with 150ms gentle pause
        const autoExitTimeout = setTimeout(() => {
          handleExit();
        }, 150);

        return () => clearTimeout(autoExitTimeout);
      }
    };

    progressFrameId = requestAnimationFrame(updateProgress);

    // Minimal dust particles on desktop only
    const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
    const canvas = canvasRef.current;
    let particleFrameId: number;

    if (canvas && !isTouch) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const handleResize = () => {
          if (!canvas) return;
          width = canvas.width = window.innerWidth;
          height = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        interface Particle {
          x: number;
          y: number;
          vx: number;
          vy: number;
          radius: number;
          alpha: number;
        }

        const particleCount = 12;
        const particles: Particle[] = [];

        for (let i = 0; i < particleCount; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: -0.2 - Math.random() * 0.4,
            radius: Math.random() * 1.4 + 0.6,
            alpha: Math.random() * 0.3 + 0.1,
          });
        }

        const renderParticles = () => {
          ctx.clearRect(0, 0, width, height);

          for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;

            if (p.y < 0) p.y = height;
            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;

            ctx.fillStyle = `rgba(166, 255, 46, ${p.alpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
          }

          if (!isExitingRef.current) {
            particleFrameId = requestAnimationFrame(renderParticles);
          }
        };

        renderParticles();

        return () => {
          window.removeEventListener('resize', handleResize);
          cancelAnimationFrame(particleFrameId);
        };
      }
    }

    return () => {
      cancelAnimationFrame(progressFrameId);
      document.body.style.overflow = originalOverflow;
    };
  }, [handleExit, isFinished]);

  const getStatusTelemetry = () => {
    if (progress < 40) {
      return language === 'ar'
        ? 'تهيئة الهوية الرقمية لعلامتك التجارية...'
        : 'Curating bespoke digital elegance...';
    } else if (progress < 85) {
      return language === 'ar'
        ? 'بناء واجهات تفاعلية سريعة...'
        : 'Crafting high-converting interfaces...';
    } else {
      return language === 'ar'
        ? 'مرحباً بك في استوديو مهاب'
        : 'Welcome to MUHAB Studio';
    }
  };

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div 
          data-testid="intro-splash-screen"
          onMouseMove={handleMouseMove}
          onClick={handleExit}
          initial={{ opacity: 1 }}
          animate={{
            opacity: isExiting ? 0 : 1,
            scale: isExiting ? 1.02 : 1,
          }}
          style={{ willChange: 'transform, opacity' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] select-none overflow-hidden bg-[#020704] cursor-pointer"
        >
          {/* Background Canvas Particle Grid */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 z-10 pointer-events-none opacity-40"
          />

          {/* Refined Ambient Lighting Flares (Subtle luxury, non-distracting) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-emerald-600/6 rounded-full blur-[90px] pointer-events-none z-10" />

          {/* Top Marketing Telemetry Header */}
          <div className="absolute inset-x-0 top-0 z-40 flex items-center justify-between p-4 sm:p-6 font-mono text-xs text-slate-400 border-b border-emerald-500/10 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a6ff2e] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#a6ff2e]" />
              </span>
              <span className="font-bold text-[#a6ff2e] tracking-wider text-[11px] sm:text-xs">
                {language === 'ar' ? 'استوديو مهاب • نصنع حلولاً رقمية تضاعف مبيعاتك' : 'MUHAB STUDIO • BESPOKE DIGITAL FLAGSHIPS'}
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              {/* Instant Skip CTA */}
              <button
                data-testid="skip-intro"
                onClick={(e) => {
                  e.stopPropagation();
                  handleExit();
                }}
                className="flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#071912] hover:bg-[#0c261b] text-slate-200 hover:text-[#a6ff2e] border border-emerald-500/30 text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <span>{language === 'ar' ? 'تخطي الدخول' : 'Skip Intro'}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#a6ff2e]" />
              </button>
            </div>
          </div>

          {/* Bottom Marketing Telemetry Footer */}
          <div className="absolute inset-x-0 bottom-0 z-40 flex items-center justify-between p-4 sm:p-6 font-mono text-xs text-slate-400 border-t border-emerald-500/10 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-[#a6ff2e]" />
                <span>{language === 'ar' ? 'واجهات برمجية خاصة بدون قوالب جاهزة' : 'ZERO TEMPLATES • 100% BESPOKE ARCHITECTURE'}</span>
              </div>
              <div className="hidden md:flex items-center gap-1.5 text-slate-300">
                <Zap className="w-3.5 h-3.5 text-[#a6ff2e]" />
                <span>{language === 'ar' ? 'أداء استثنائي وتجربة مستخدم ترفع المبيعات' : 'HIGH-VELOCITY PERFORMANCE & MAXIMUM ROI'}</span>
              </div>
            </div>

            <span className="font-bold text-[#a6ff2e]">MUHAB © 2026</span>
          </div>

          {/* === CENTER EMBLEM & BRAND AUTHORITY === */}
          <motion.div
            animate={{ 
              opacity: isExiting ? 0 : 1,
              scale: isExiting ? 1.04 : 1,
            }}
            style={{ willChange: 'transform, opacity' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none px-4"
          >
            {/* 3D Perspective Gyroscope Tilt Container */}
            <motion.div
              style={{
                perspective: 1200,
                rotateX: rotateX,
                rotateY: rotateY,
              }}
              className="relative flex flex-col items-center justify-center my-auto transition-transform duration-75 ease-out max-w-xl w-full"
            >
              {/* Central Official Master Logo */}
              <div className="relative mb-3 flex flex-col items-center">
                <div className="relative flex items-center justify-center p-1">
                  <img
                    src={getAssetUrl('muhab-logo.png')}
                    alt="MUHAB Studio - صُنّاع المواقع السعودية"
                    className="w-[220px] sm:w-[340px] md:w-[400px] h-auto object-contain select-none pointer-events-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
                  />
                  
                  {/* Subtle Pinpoint on the Growth Arrowhead */}
                  <div className="absolute top-[30%] left-[28%] sm:top-[29%] sm:left-[27%] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_#a6ff2e]" />
                  </div>
                </div>
              </div>

              {/* Saudi Gold Standard Eyebrow Pill */}
              <div className="flex items-center gap-2 mb-3 px-3.5 py-1 rounded-full bg-[#051a11]/90 border border-emerald-500/30 shadow-sm">
                <Sparkles className="w-3 h-3 text-[#a6ff2e]" />
                <span className="text-[11px] sm:text-xs font-bold text-[#a6ff2e]">
                  {language === 'ar' ? 'المعيار السعودي المعتمد للواجهات الرقمية الفاخرة' : 'THE GOLD STANDARD IN BESPOKE DIGITAL CRAFT'}
                </span>
              </div>

              {/* Authority Subtitle */}
              <div className="flex flex-col items-center text-center mb-4 max-w-lg px-2">
                <span className="text-xs sm:text-sm md:text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-200 to-[#a6ff2e] tracking-wide leading-relaxed">
                  {language === 'ar' 
                    ? 'نبتكر لعلامتك التجارية حضوراً رقمياً استثنائياً يضاعف مبيعاتك وأرباحك' 
                    : 'ENGINEERING BESPOKE DIGITAL FLAGSHIPS THAT SCALE YOUR BUSINESS'}
                </span>
              </div>

              {/* 3 Value Badges */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-6 pointer-events-none">
                <span className="text-[10.5px] font-bold text-slate-200 bg-[#03150d]/85 border border-emerald-500/20 px-3 py-1 rounded-full shadow-sm">
                  {language === 'ar' ? '✨ تصاميم مخصصة 100%' : '✨ 100% Bespoke'}
                </span>
                <span className="text-[10.5px] font-bold text-slate-200 bg-[#03150d]/85 border border-emerald-500/20 px-3 py-1 rounded-full shadow-sm">
                  {language === 'ar' ? '⚡ استجابة فائقة < 0.8s' : '⚡ Sub-Second Speed'}
                </span>
                <span className="text-[10.5px] font-bold text-slate-200 bg-[#03150d]/85 border border-emerald-500/20 px-3 py-1 rounded-full shadow-sm">
                  {language === 'ar' ? '📈 مضاعفة التحويل والمبيعات' : '📈 Maximum ROI'}
                </span>
              </div>

              {/* High-Tech Telemetry Gauge & Progress Bar OR Interactive Flagship Button */}
              <div className="w-full max-w-xs sm:max-w-md flex flex-col items-center min-h-[65px] justify-center">
                {!isReady ? (
                  <div className="w-full flex flex-col items-center">
                    <div className="flex items-center justify-between w-full font-mono text-xs mb-2">
                      <span className="text-[11px] text-slate-400 truncate max-w-[240px]">
                        {getStatusTelemetry()}
                      </span>
                      <span className="text-base sm:text-lg font-black text-[#a6ff2e] tracking-tight font-mono">
                        [ {progress.toString().padStart(2, '0')}% ]
                      </span>
                    </div>

                    {/* Refined Progress Track */}
                    <div className="w-full h-2 bg-[#051a11] rounded-full overflow-hidden border border-emerald-500/30 relative p-0.5 shadow-inner">
                      <motion.div
                        className="h-full bg-gradient-to-r from-emerald-600 via-[#84cc16] to-[#a6ff2e] rounded-full relative"
                        style={{ width: `${progress}%` }}
                        transition={{ ease: 'linear' }}
                      >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_6px_#ffffff]" />
                      </motion.div>
                    </div>
                  </div>
                ) : (
                  /* Interactive Flagship Gateway Button at 100% */
                  <motion.button
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleExit();
                    }}
                    className="pointer-events-auto group relative px-7 py-3 rounded-full bg-gradient-to-r from-[#a6ff2e] via-[#b6ff4d] to-[#84cc16] text-[#020704] font-black text-xs sm:text-sm tracking-wider shadow-[0_4px_16px_rgba(166,255,46,0.3)] cursor-pointer flex items-center gap-2 transition-all overflow-hidden"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#020704]" />
                    <span>{language === 'ar' ? 'ادخل التحفة الرقمية • استوديو مهاب' : 'EXPLORE THE DIGITAL FLAGSHIP • MUHAB'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#020704] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </motion.button>
                )}
              </div>

            </motion.div>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};
