import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { Sparkles, ArrowUpRight, ShieldCheck, Zap, Volume2, VolumeX } from 'lucide-react';
import { audioSynth } from '../../utils/audioSynth';
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
  const [isFinished, setIsFinished] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isExitingRef = useRef(false);

  // 3D Spatial Tilt Physics for the Logo & Gyroscope Rings
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 28, stiffness: 220 };
  const rotateX = useSpring(useTransform(mouseY, [-350, 350], [16, -16]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-350, 350], [-16, 16]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    audioSynth.isMuted = nextMuted;
    if (!nextMuted) {
      audioSynth.playHoverBlip();
    }
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
    
    // Notify parent to start smooth camera landing on Hero
    onStartExitRef.current?.();

    // Trigger rich cinematic sub-bass whoosh + crystal harmonic chord
    audioSynth.playCinematicWhoosh();
    audioSynth.playHarmonicSuccess();

    // Complete transition after smooth camera dive (650ms duration)
    setTimeout(() => {
      setIsFinished(true);
      document.body.style.overflow = '';
      onCompleteRef.current?.();
    }, 650);
  }, []);

  // Loading Simulation, Sound Design & Lightweight Ambient Dust Engine
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Ambient intro rumble sound
    const audioTimeout = setTimeout(() => {
      audioSynth.playAmbientRumble();
    }, 150);

    // 1. Progress Counter Animation (Snappy 1.1s progression)
    const startTime = performance.now();
    const duration = 1100;

    let progressFrameId: number;
    let lastTickValue = 0;

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      
      // Smooth cubic easing
      const eased = rawProgress < 0.5 
        ? 2 * rawProgress * rawProgress 
        : -1 + (4 - 2 * rawProgress) * rawProgress;

      const currentPercent = Math.min(Math.floor(eased * 100), 100);
      setProgress(currentPercent);

      // Trigger audio blips on 25% intervals
      if (currentPercent - lastTickValue >= 25) {
        lastTickValue = currentPercent;
        audioSynth.playTelemetryTick();
      }

      if (rawProgress < 1) {
        progressFrameId = requestAnimationFrame(updateProgress);
      } else {
        setIsReady(true);
        audioSynth.playHarmonicSuccess();

        // Auto transition after 3000ms if user doesn't click Enter or Skip
        const autoExitTimeout = setTimeout(() => {
          handleExit();
        }, 3000);

        return () => clearTimeout(autoExitTimeout);
      }
    };

    progressFrameId = requestAnimationFrame(updateProgress);

    // 2. High-Performance Lightweight Luminous Dust Engine (Zero Jitter)
    const canvas = canvasRef.current;
    let particleFrameId: number;

    if (canvas) {
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
          pulseSpeed: number;
        }

        const particleCount = 35;
        const particles: Particle[] = [];

        for (let i = 0; i < particleCount; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.8,
            vy: -0.4 - Math.random() * 0.6,
            radius: Math.random() * 1.8 + 0.6,
            alpha: Math.random() * 0.5 + 0.25,
            pulseSpeed: 0.02 + Math.random() * 0.03,
          });
        }

        const renderParticles = () => {
          ctx.clearRect(0, 0, width, height);
          const exiting = isExitingRef.current;

          for (let i = 0; i < particles.length; i++) {
            const p = particles[i];

            if (exiting) {
              const centerX = width / 2;
              const centerY = height / 2;
              const dx = p.x - centerX;
              const dy = p.y - centerY;

              p.x += dx * 0.06;
              p.y += dy * 0.06;

              ctx.strokeStyle = `rgba(166, 255, 46, ${Math.min(p.alpha * 1.2, 0.9)})`;
              ctx.lineWidth = p.radius * 1.2;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p.x - dx * 0.1, p.y - dy * 0.1);
              ctx.stroke();
            } else {
              p.x += p.vx;
              p.y += p.vy;

              if (p.y < 0) p.y = height;
              if (p.x < 0) p.x = width;
              if (p.x > width) p.x = 0;

              p.alpha += Math.sin(Date.now() * p.pulseSpeed * 0.005) * 0.008;

              ctx.fillStyle = `rgba(166, 255, 46, ${Math.max(0.15, Math.min(p.alpha, 0.75))})`;
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
              ctx.fill();
            }
          }

          particleFrameId = requestAnimationFrame(renderParticles);
        };

        renderParticles();

        return () => {
          window.removeEventListener('resize', handleResize);
          cancelAnimationFrame(particleFrameId);
        };
      }
    }

    return () => {
      clearTimeout(audioTimeout);
      cancelAnimationFrame(progressFrameId);
      document.body.style.overflow = originalOverflow;
    };
  }, [handleExit]);

  const getStatusTelemetry = () => {
    if (progress < 28) {
      return language === 'ar'
        ? 'تهيئة الهوية الرقمية الفاخرة لعلامتك التجارية...'
        : 'Curating bespoke digital elegance for your brand...';
    } else if (progress < 65) {
      return language === 'ar'
        ? 'بناء واجهات تفاعلية مخصصة لمضاعفة المبيعات...'
        : 'Crafting high-converting interfaces built to scale...';
    } else if (progress < 92) {
      return language === 'ar'
        ? 'تجهيز حلول رقمية سريعة ومتوافقة مع السوق السعودي...'
        : 'Optimizing ultra-fast architectures for the GCC market...';
    } else {
      return language === 'ar'
        ? 'مرحباً بك في عالم التميّز الرقمي • استوديو مهاب'
        : 'Welcome to extraordinary digital craft • MUHAB Studio';
    }
  };

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div 
          data-testid="intro-splash-screen"
          onMouseMove={handleMouseMove}
          initial={{ opacity: 1, scale: 1 }}
          animate={{
            opacity: isExiting ? 0 : 1,
            scale: isExiting ? 1.05 : 1,
          }}
          style={{ willChange: 'transform, opacity' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] select-none overflow-hidden bg-[#020704]"
        >
          {/* Background Canvas Particle Grid */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 z-10 pointer-events-none opacity-50"
          />

          {/* Ambient Volumetric Lighting Flares */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-[#a6ff2e]/10 rounded-full blur-[170px] pointer-events-none z-10" />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[550px] h-[320px] bg-emerald-700/15 rounded-full blur-[140px] pointer-events-none z-10" />

          {/* Top Marketing Telemetry Header */}
          <div className="absolute inset-x-0 top-0 z-40 flex items-center justify-between p-5 sm:p-8 font-mono text-xs text-slate-400 border-b border-emerald-500/15 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a6ff2e] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#a6ff2e]" />
              </span>
              <span className="font-bold text-[#a6ff2e] tracking-wider text-[11px] sm:text-xs">
                {language === 'ar' ? 'استوديو مهاب • نصنع حلولاً رقمية تضاعف مبيعاتك' : 'MUHAB STUDIO • BESPOKE DIGITAL FLAGSHIPS'}
              </span>
            </div>

            <div className="hidden md:flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#051a11]/90 border border-emerald-500/30 text-[11px] text-[#a6ff2e] font-bold shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-[#a6ff2e] animate-pulse" />
              <span>{language === 'ar' ? 'حلول حصرية للشركات والمتاجر الفاخرة' : 'BESPOKE DIGITAL SOLUTIONS FOR PREMIER BRANDS'}</span>
            </div>

            <div className="flex items-center gap-2.5">
              {/* Interactive Sound Design Toggle */}
              <button
                onClick={toggleSound}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#051a11]/80 hover:bg-[#0c261b] text-slate-300 hover:text-[#a6ff2e] border border-emerald-500/30 text-[11px] font-mono transition-all cursor-pointer"
                title={isMuted ? 'تفعيل الصوت' : 'كتم الصوت'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5 text-slate-400" /> : <Volume2 className="w-3.5 h-3.5 text-[#a6ff2e]" />}
                <span className="hidden sm:inline">{isMuted ? 'Muted' : 'Audio On'}</span>
              </button>

              {/* Instant Skip CTA */}
              <button
                data-testid="skip-intro"
                onClick={handleExit}
                className="flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#071912] hover:bg-[#0c261b] text-slate-200 hover:text-[#a6ff2e] border border-emerald-500/40 hover:border-[#a6ff2e]/80 text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <span>{language === 'ar' ? 'تخطي الدخول' : 'Skip Intro'}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#a6ff2e]" />
              </button>
            </div>
          </div>

          {/* Bottom Marketing Telemetry Footer */}
          <div className="absolute inset-x-0 bottom-0 z-40 flex items-center justify-between p-5 sm:p-8 font-mono text-xs text-slate-400 border-t border-emerald-500/15 backdrop-blur-md">
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

            {/* Dynamic Soundwave Equalizer Bars */}
            <div className="flex items-end gap-1 h-3.5">
              {[40, 85, 60, 100, 70, 90, 45, 80].map((h, i) => (
                <motion.div
                  key={i}
                  animate={{ height: [`${h * 0.3}%`, `${h}%`, `${h * 0.2}%`] }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.8 + i * 0.1,
                    ease: 'easeInOut',
                  }}
                  className="w-1 bg-[#a6ff2e] rounded-full opacity-85"
                />
              ))}
            </div>

            <span className="font-bold text-[#a6ff2e]">MUHAB © 2026</span>
          </div>

          {/* === CENTER EMBLEM & BRAND AUTHORITY === */}
          <motion.div
            animate={{ 
              opacity: isExiting ? 0 : 1,
              scale: isExiting ? 1.08 : 1,
            }}
            style={{ willChange: 'transform, opacity' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
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
              {/* Central Official 3D Master Logo */}
              <div className="relative mb-3 flex flex-col items-center">
                {/* Radial Volumetric Light Aura */}
                <div className="absolute -inset-8 bg-gradient-to-tr from-[#a6ff2e]/25 via-emerald-600/20 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse" />

                {/* Official 3D Master Logo with Pristine Alpha Transparency */}
                <div className="relative flex items-center justify-center p-1">
                  <img
                    src={getAssetUrl('muhab-logo.png')}
                    alt="MUHAB Studio - صُنّاع المواقع السعودية"
                    className="w-[240px] sm:w-[380px] md:w-[440px] h-auto object-contain select-none pointer-events-none drop-shadow-[0_20px_40px_rgba(166,255,46,0.3)]"
                  />
                  
                  {/* Laser Pinpoint on the 3D Growth Arrowhead */}
                  <div className="absolute top-[30%] left-[28%] sm:top-[29%] sm:left-[27%] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    <div className="w-3 h-3 rounded-full bg-white shadow-[0_0_18px_#a6ff2e,0_0_35px_#a6ff2e] animate-ping" />
                    <div className="absolute inset-0 w-3 h-3 rounded-full bg-[#a6ff2e] shadow-[0_0_15px_#a6ff2e]" />
                  </div>
                </div>
              </div>

              {/* Saudi Gold Standard Eyebrow Pill */}
              <div className="flex items-center gap-2 mb-3 px-3.5 py-1 rounded-full bg-[#051a11]/90 border border-emerald-500/40 shadow-sm">
                <Sparkles className="w-3 h-3 text-[#a6ff2e]" />
                <span className="text-[11px] sm:text-xs font-bold text-[#a6ff2e]">
                  {language === 'ar' ? 'المعيار السعودي المعتمد للواجهات الرقمية الفاخرة' : 'THE GOLD STANDARD IN BESPOKE DIGITAL CRAFT'}
                </span>
              </div>

              {/* Authority Subtitle */}
              <div className="flex flex-col items-center text-center mb-4 max-w-lg px-2">
                <span className="text-xs sm:text-sm md:text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-200 to-[#a6ff2e] tracking-wide leading-relaxed drop-shadow-[0_0_20px_rgba(166,255,46,0.35)]">
                  {language === 'ar' 
                    ? 'نبتكر لعلامتك التجارية حضوراً رقمياً استثنائياً يضاعف مبيعاتك وأرباحك' 
                    : 'ENGINEERING BESPOKE DIGITAL FLAGSHIPS THAT SCALE YOUR BUSINESS'}
                </span>
              </div>

              {/* 3 Value Badges */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-6 pointer-events-none">
                <span className="text-[10.5px] font-bold text-slate-200 bg-[#03150d]/85 border border-emerald-500/30 px-3 py-1 rounded-full shadow-sm">
                  {language === 'ar' ? '✨ تصاميم مخصصة 100%' : '✨ 100% Bespoke'}
                </span>
                <span className="text-[10.5px] font-bold text-slate-200 bg-[#03150d]/85 border border-emerald-500/30 px-3 py-1 rounded-full shadow-sm">
                  {language === 'ar' ? '⚡ استجابة فائقة < 0.8s' : '⚡ Sub-Second Speed'}
                </span>
                <span className="text-[10.5px] font-bold text-slate-200 bg-[#03150d]/85 border border-emerald-500/30 px-3 py-1 rounded-full shadow-sm">
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

                    {/* Neon High-Precision Progress Track */}
                    <div className="w-full h-2 bg-[#051a11] rounded-full overflow-hidden border border-emerald-500/40 relative p-0.5 shadow-inner">
                      <motion.div
                        className="h-full bg-gradient-to-r from-emerald-600 via-[#84cc16] to-[#a6ff2e] rounded-full shadow-[0_0_18px_#a6ff2e] relative"
                        style={{ width: `${progress}%` }}
                        transition={{ ease: 'linear' }}
                      >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_12px_#ffffff]" />
                      </motion.div>
                    </div>
                  </div>
                ) : (
                  /* Interactive Flagship Gateway Button at 100% */
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleExit}
                    className="pointer-events-auto group relative px-7 py-3 rounded-full bg-gradient-to-r from-[#a6ff2e] via-[#b6ff4d] to-[#84cc16] text-[#020704] font-black text-xs sm:text-sm tracking-wider shadow-[0_0_35px_rgba(166,255,46,0.6)] cursor-pointer flex items-center gap-2 transition-all overflow-hidden active:brightness-110"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <Sparkles className="w-3.5 h-3.5 text-[#020704] animate-spin" style={{ animationDuration: '4s' }} />
                    <span>{language === 'ar' ? 'ادخل التحفة الرقمية • استوديو مهاب' : 'EXPLORE THE DIGITAL FLAGSHIP • MUHAB'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#020704] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </motion.button>
                )}
              </div>

            </motion.div>
          </motion.div>

          {/* Expanding Radiant Portal Shockwave on Exit (120 FPS GPU Accelerated, Zero Blur) */}
          {isExiting && (
            <motion.div
              initial={{ scale: 0.3, opacity: 0.85 }}
              animate={{ scale: 4.5, opacity: 0 }}
              style={{ willChange: 'transform, opacity' }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border-2 border-[#a6ff2e] shadow-[0_0_60px_#a6ff2e] pointer-events-none z-50"
            />
          )}

        </motion.div>
      )}
    </AnimatePresence>
  );
};
