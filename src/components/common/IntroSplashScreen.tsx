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
  onStartExitRef.current = onStartExit;
  onCompleteRef.current = onComplete;

  const handleExit = useCallback(() => {
    if (isExitingRef.current) return;
    isExitingRef.current = true;
    setIsExiting(true);
    
    // Notify parent to start smooth camera landing on Hero
    onStartExitRef.current?.();

    // Trigger rich cinematic sub-bass whoosh + crystal harmonic chord
    audioSynth.playCinematicWhoosh();
    audioSynth.playHarmonicSuccess();

    // Complete transition after cinematic camera dive (850ms 120 FPS duration)
    setTimeout(() => {
      setIsFinished(true);
      document.body.style.overflow = '';
      onCompleteRef.current?.();
    }, 850);
  }, []);

  // Loading Simulation, Sound Design & Particle Engine
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Ambient intro rumble sound
    const audioTimeout = setTimeout(() => {
      audioSynth.playAmbientRumble();
    }, 200);

    // 1. Progress Counter Animation
    const startTime = performance.now();
    const duration = 2300; // 2.3s cinematic pacing

    let progressFrameId: number;
    let lastTickValue = 0;

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      
      // Easing progression with dramatic pauses at 48% and 92%
      let eased = rawProgress;
      if (rawProgress < 0.5) {
        eased = 2 * rawProgress * rawProgress;
      } else {
        eased = -1 + (4 - 2 * rawProgress) * rawProgress;
      }

      const currentPercent = Math.min(Math.floor(eased * 100), 100);
      setProgress(currentPercent);

      // Trigger audio blips on 15% intervals
      if (currentPercent - lastTickValue >= 15) {
        lastTickValue = currentPercent;
        audioSynth.playTelemetryTick();
      }

      if (rawProgress < 1) {
        progressFrameId = requestAnimationFrame(updateProgress);
      } else {
        setIsReady(true);
        audioSynth.playHarmonicSuccess();

        // Auto transition after 1.2s on mobile, 2.4s on desktop if user doesn't click the enter button
        const isMobileScreen = typeof window !== 'undefined' && window.innerWidth < 768;
        const autoExitTimeout = setTimeout(() => {
          handleExit();
        }, isMobileScreen ? 1200 : 2400);

        return () => clearTimeout(autoExitTimeout);
      }
    };

    progressFrameId = requestAnimationFrame(updateProgress);

    // 2. Interactive Canvas Particle Web & Hyperspace Warp Engine
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

        // Particle class
        interface Particle {
          x: number;
          y: number;
          vx: number;
          vy: number;
          radius: number;
          alpha: number;
          pulseSpeed: number;
        }

        const particleCount = 90;
        const particles: Particle[] = [];

        for (let i = 0; i < particleCount; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 1.2,
            vy: (Math.random() - 0.5) * 1.2,
            radius: Math.random() * 2 + 0.8,
            alpha: Math.random() * 0.7 + 0.3,
            pulseSpeed: 0.02 + Math.random() * 0.03,
          });
        }

        const renderParticles = () => {
          ctx.clearRect(0, 0, width, height);

          const exiting = isExitingRef.current;

          if (!exiting) {
            // Render connecting energy filaments in normal state
            for (let i = 0; i < particles.length; i++) {
              for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                  ctx.strokeStyle = `rgba(166, 255, 46, ${(1 - dist / 120) * 0.22})`;
                  ctx.lineWidth = 0.8;
                  ctx.beginPath();
                  ctx.moveTo(particles[i].x, particles[i].y);
                  ctx.lineTo(particles[j].x, particles[j].y);
                  ctx.stroke();
                }
              }
            }
          }

          // Update & draw particles
          for (let i = 0; i < particles.length; i++) {
            const p = particles[i];

            if (exiting) {
              // Hyperspace warp-speed star-streaks expanding from center!
              const centerX = width / 2;
              const centerY = height / 2;
              const dx = p.x - centerX;
              const dy = p.y - centerY;

              p.x += dx * 0.08;
              p.y += dy * 0.08;

              // Draw elongated hyperspace light streak
              ctx.strokeStyle = `rgba(166, 255, 46, ${Math.min(p.alpha * 1.4, 0.95)})`;
              ctx.lineWidth = p.radius * 1.5;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p.x - dx * 0.12, p.y - dy * 0.12);
              ctx.stroke();
            } else {
              p.x += p.vx;
              p.y += p.vy;

              if (p.x < 0 || p.x > width) p.vx *= -1;
              if (p.y < 0 || p.y > height) p.vy *= -1;

              p.alpha += Math.sin(Date.now() * p.pulseSpeed * 0.005) * 0.01;

              ctx.fillStyle = `rgba(166, 255, 46, ${Math.max(0.2, Math.min(p.alpha, 0.85))})`;
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
    if (progress < 25) {
      return language === 'ar'
        ? 'تشغيل النواة الرقمية // MUHAB.CORE 1.0'
        : 'INITIALIZING SUB-SECOND CORE // QUANTUM.BOOT';
    } else if (progress < 60) {
      return language === 'ar'
        ? 'مزامنة المنظومات المخصصة // BESPOKE.SYNC'
        : 'SYNCHRONIZING BESPOKE ECOSYSTEMS // WEBSITES.GROWTH';
    } else if (progress < 90) {
      return language === 'ar'
        ? 'معايرة فيزياء الأبعاد الثلاثية // 120FPS.LOCKED'
        : 'CALIBRATING 3D SPATIAL TILT & PHYSICS // 120FPS.LOCKED';
    } else {
      return language === 'ar'
        ? 'جاهزية كاملة 100% // مرحباً بك في استوديو مُهاب'
        : 'ALL SYSTEMS NOMINAL // WELCOME TO MUHAB STUDIO';
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
            scale: isExiting ? 1.08 : 1,
          }}
          style={{ willChange: 'transform, opacity' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] select-none overflow-hidden bg-[#020704]"
        >
          {/* Background Canvas Particle Grid */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 z-10 pointer-events-none opacity-65"
          />

          {/* Receding 3D Cyber Horizon Grid Floor */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden pointer-events-none z-10 opacity-35">
            <div 
              className="w-[200%] h-[200%] -left-1/2 -top-1/4 origin-bottom"
              style={{
                perspective: '600px',
                transform: 'rotateX(74deg)',
                backgroundImage: 'linear-gradient(to right, rgba(166,255,46,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(166,255,46,0.18) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                maskImage: 'linear-gradient(to top, black 30%, transparent 95%)',
                WebkitMaskImage: 'linear-gradient(to top, black 30%, transparent 95%)',
              }}
            />
            {/* Luminous Neon Horizon Line */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#a6ff2e]/80 to-transparent shadow-[0_0_20px_#a6ff2e]" />
          </div>

          {/* Ambient Volumetric Lighting Flares */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-[#a6ff2e]/12 rounded-full blur-[180px] pointer-events-none z-10" />
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[650px] h-[380px] bg-emerald-700/18 rounded-full blur-[160px] pointer-events-none z-10" />

          {/* Top HUD Telemetry Header */}
          <div className="absolute inset-x-0 top-0 z-40 flex items-center justify-between p-6 sm:p-10 font-mono text-xs text-slate-400 border-b border-emerald-500/15 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a6ff2e] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#a6ff2e]" />
              </span>
              <span className="font-bold text-[#a6ff2e] tracking-wider text-[11px] sm:text-xs">
                SYS.STATUS // ONLINE • LATENCY 0.4ms
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#051a11]/90 border border-emerald-500/30 text-[11px] text-[#a6ff2e] font-bold shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-[#a6ff2e] animate-pulse" />
              <span>{language === 'ar' ? 'صُنّاع المواقع السعودية • جدة' : 'SAUDI WEBMAKERS • JEDDAH HQ'}</span>
            </div>

            <div className="flex items-center gap-3">
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
                onClick={handleExit}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#071912] hover:bg-[#0c261b] text-slate-200 hover:text-[#a6ff2e] border border-emerald-500/40 hover:border-[#a6ff2e]/80 text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <span>{language === 'ar' ? 'تخطي الدخول' : 'Skip Intro'}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#a6ff2e]" />
              </button>
            </div>
          </div>

          {/* Bottom HUD Telemetry Footer */}
          <div className="absolute inset-x-0 bottom-0 z-40 flex items-center justify-between p-6 sm:p-10 font-mono text-xs text-slate-400 border-t border-emerald-500/15 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-[#a6ff2e]" />
                <span>{language === 'ar' ? 'تصاميم مخصصة 100% بدون قوالب' : '100% BESPOKE ARCHITECTURE'}</span>
              </div>
              <div className="hidden md:flex items-center gap-1.5 text-slate-300">
                <Zap className="w-3.5 h-3.5 text-[#a6ff2e]" />
                <span>LIGHTHOUSE SCORE 100/100</span>
              </div>
            </div>

            {/* Dynamic Soundwave Equalizer Bars */}
            <div className="flex items-end gap-1 h-4">
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

          {/* === CENTER 3D GYROSCOPE RING NEXUS & OFFICIAL 3D LOGO ARTWORK === */}
          <motion.div
            animate={{ 
              opacity: isExiting ? 0 : 1,
              scale: isExiting ? 1.25 : 1,
            }}
            style={{ willChange: 'transform, opacity' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none px-4"
          >
            {/* 3D Perspective Gyroscope Tilt Container */}
            <motion.div
              style={{
                perspective: 1200,
                rotateX: rotateX,
                rotateY: rotateY,
              }}
              className="relative flex flex-col items-center justify-center my-auto transition-transform duration-75 ease-out"
            >
              {/* === HOLOGRAPHIC GYROSCOPE RINGS SYSTEM === */}
              {/* Ring 1: Outer Celestial Coordinate Ring with tick marks */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
                className="absolute w-[370px] h-[370px] sm:w-[500px] sm:h-[500px] rounded-full border border-[#a6ff2e]/20 border-dashed pointer-events-none -z-10"
              >
                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[9px] font-mono text-[#a6ff2e]/80 bg-[#020704] px-1.5">N 21°32'36"</span>
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-[9px] font-mono text-[#a6ff2e]/80 bg-[#020704] px-1.5">S 39°10'22"</span>
                <span className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 text-[9px] font-mono text-[#a6ff2e]/80 bg-[#020704] px-1.5">120FPS</span>
                <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 text-[9px] font-mono text-[#a6ff2e]/80 bg-[#020704] px-1.5">0.4MS</span>
              </motion.div>

              {/* Ring 2: Medium Counter-rotating Radar Ring with Orbiting Satellite Beacons */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="absolute w-[290px] h-[290px] sm:w-[380px] sm:h-[380px] rounded-full border border-emerald-500/30 pointer-events-none -z-10"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#a6ff2e] shadow-[0_0_15px_#a6ff2e]" />
                <div className="absolute bottom-4 right-10 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
              </motion.div>

              {/* Ring 3: Inner High-Velocity Pulse Ring */}
              <div className="absolute w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] rounded-full border border-[#a6ff2e]/40 animate-ping opacity-35 pointer-events-none -z-10" />

              {/* === CENTRAL OFFICIAL 3D MUHAB LOGO ARTWORK (Pristine High-Res Master Asset) === */}
              <div className="relative mb-2 flex flex-col items-center">
                {/* Radial Volumetric Light Aura */}
                <div className="absolute -inset-10 bg-gradient-to-tr from-[#a6ff2e]/25 via-emerald-600/20 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse" />

                {/* Official 3D Master Logo with Pristine Alpha Transparency */}
                <div className="relative flex items-center justify-center p-1">
                  <img
                    src={getAssetUrl('muhab-logo.png')}
                    alt="MUHAB Studio - صُنّاع المواقع السعودية"
                    className="w-[320px] sm:w-[440px] md:w-[510px] h-auto object-contain select-none pointer-events-none drop-shadow-[0_20px_45px_rgba(166,255,46,0.35)]"
                  />
                  
                  {/* Laser Pinpoint on the 3D Growth Arrowhead */}
                  <div className="absolute top-[30%] left-[28%] sm:top-[29%] sm:left-[27%] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    <div className="w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_20px_#a6ff2e,0_0_40px_#a6ff2e] animate-ping" />
                    <div className="absolute inset-0 w-3.5 h-3.5 rounded-full bg-[#a6ff2e] shadow-[0_0_15px_#a6ff2e]" />
                  </div>
                </div>
              </div>

              {/* Authority Subtitle */}
              <div className="flex flex-col items-center text-center mb-6 max-w-lg">
                <span className="text-xs sm:text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-200 to-[#a6ff2e] tracking-widest uppercase mb-1 drop-shadow-[0_0_20px_rgba(166,255,46,0.4)]">
                  {language === 'ar' ? 'هندسة النظم الرقمية الفاخرة • تجربة تفاعلية متكاملة' : 'BESPOKE DIGITAL ARCHITECTURE & FLAGSHIP EXPERIENCES'}
                </span>
              </div>

              {/* High-Tech Telemetry Gauge & Progress Bar OR Interactive Flagship Button */}
              <div className="w-full max-w-xs sm:max-w-md flex flex-col items-center min-h-[70px] justify-center">
                {!isReady ? (
                  <div className="w-full flex flex-col items-center">
                    <div className="flex items-center justify-between w-full font-mono text-xs mb-2">
                      <span className="text-[11px] text-slate-400 truncate max-w-[240px]">
                        {getStatusTelemetry()}
                      </span>
                      <span className="text-lg sm:text-xl font-black text-[#a6ff2e] tracking-tight">
                        [ {progress.toString().padStart(2, '0')}% ]
                      </span>
                    </div>

                    {/* Neon High-Precision Progress Track */}
                    <div className="w-full h-2 bg-[#051a11] rounded-full overflow-hidden border border-emerald-500/40 relative p-0.5 shadow-inner">
                      <motion.div
                        className="h-full bg-gradient-to-r from-emerald-600 via-[#84cc16] to-[#a6ff2e] rounded-full shadow-[0_0_20px_#a6ff2e] relative"
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
                    initial={{ opacity: 0, scale: 0.85, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleExit}
                    className="pointer-events-auto group relative px-8 py-3.5 rounded-full bg-gradient-to-r from-[#a6ff2e] via-[#84cc16] to-[#a6ff2e] text-[#020704] font-black text-sm sm:text-base tracking-wider shadow-[0_0_40px_rgba(166,255,46,0.7)] cursor-pointer flex items-center gap-2.5 transition-all overflow-hidden active:brightness-110"
                  >
                    {/* Animated Specular Light Streak */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    
                    <Sparkles className="w-4 h-4 text-[#020704] animate-spin" style={{ animationDuration: '4s' }} />
                    <span>{language === 'ar' ? 'ادخل التحفة الرقمية // اكتشف الموقع' : 'EXPLORE THE DIGITAL FLAGSHIP'}</span>
                    <ArrowUpRight className="w-4 h-4 text-[#020704] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border-2 border-[#a6ff2e] shadow-[0_0_60px_#a6ff2e] pointer-events-none z-50"
            />
          )}

        </motion.div>
      )}
    </AnimatePresence>
  );
};
