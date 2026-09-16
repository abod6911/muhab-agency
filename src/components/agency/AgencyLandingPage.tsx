import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Lenis from 'lenis';
import { 
  ArrowUpRight, 
  Sparkles, 
  Compass, 
  Cpu, 
  Zap, 
  Activity
} from 'lucide-react';

// =========================================================================
// 1. TYPED CONFIGURATION & DATA SEPARATION
import { defaultAgencyConfig } from '../../data/agencyData';
import type { AgencyPageConfig } from '../../data/agencyData';

export type { AgencyPageConfig };

// =========================================================================
// 2. 3D PERSPECTIVE TILT CARD COMPONENT
// =========================================================================

interface TeamCardProps {
  member: AgencyPageConfig['team'][0];
  index: number;
}

const TeamCard: React.FC<TeamCardProps> = ({ member, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Raw tilt values
  const rotateXRaw = useSpring(0, { stiffness: 300, damping: 20 });
  const rotateYRaw = useSpring(0, { stiffness: 300, damping: 20 });
  const scaleSpring = useSpring(1, { stiffness: 350, damping: 22 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);

    // Subtle 3D rotation angles
    rotateXRaw.set(-deltaY * 12);
    rotateYRaw.set(deltaX * 12);
  }, [rotateXRaw, rotateYRaw]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    scaleSpring.set(1.06);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateXRaw.set(0);
    rotateYRaw.set(0);
    scaleSpring.set(1);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotateXRaw,
        rotateY: rotateYRaw,
        scale: scaleSpring,
        rotateZ: isHovered ? 0 : member.skewDeg,
        transformStyle: 'preserve-3d',
        zIndex: isHovered ? 30 : index + 1
      }}
      className="relative w-72 sm:w-80 shrink-0 cursor-pointer rounded-3xl p-4 transition-shadow duration-300 select-none"
    >
      {/* Outer Glow & Border Frame */}
      <div 
        className="absolute inset-0 rounded-3xl transition-all duration-300 pointer-events-none"
        style={{
          backgroundColor: isHovered ? 'rgba(18, 38, 30, 0.95)' : 'rgba(7, 34, 24, 0.85)',
          borderColor: isHovered ? member.accent : 'rgba(166, 255, 46, 0.18)',
          borderWidth: '1px',
          borderStyle: 'solid',
          boxShadow: isHovered 
            ? `0 25px 50px -12px rgba(0,0,0,0.8), 0 0 30px ${member.accent}33`
            : '0 15px 30px -10px rgba(0,0,0,0.6)',
          backdropFilter: 'blur(16px)'
        }}
      />

      {/* Card Content Stack */}
      <div className="relative z-10 flex flex-col gap-3.5">
        {/* Portrait Image with Subtle Overlay */}
        <div className="relative w-full h-72 rounded-2xl overflow-hidden bg-black/40">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover object-center filter grayscale contrast-110 group-hover:grayscale-0 transition-all duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#041a12] via-transparent to-transparent opacity-80" />
          
          {/* Accent Corner Tag */}
          <span 
            className="absolute top-3 right-3 text-[10px] font-mono font-black px-2 py-0.5 rounded-full uppercase tracking-wider text-[#041a12]"
            style={{ backgroundColor: member.accent }}
          >
            0{index + 1}
          </span>
        </div>

        {/* Member Details */}
        <div>
          <h4 className="text-lg font-black text-white tracking-tight flex items-center justify-between">
            <span>{member.name}</span>
            <ArrowUpRight 
              className="w-4 h-4 transition-transform duration-300"
              style={{
                color: member.accent,
                transform: isHovered ? 'translate(2px, -2px)' : 'none'
              }} 
            />
          </h4>
          <span 
            className="text-xs font-semibold block mt-0.5"
            style={{ color: member.accent }}
          >
            {member.role}
          </span>
          <p className="text-xs text-slate-300 leading-relaxed mt-2 line-clamp-3">
            {member.bio}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// =========================================================================
// 3. MAGNETIC BRAND BRICK PILL COMPONENT
// =========================================================================

interface BrandPillProps {
  brand: AgencyPageConfig['brands'][0];
}

const BrandPill: React.FC<BrandPillProps> = ({ brand }) => {
  const pillRef = useRef<HTMLDivElement>(null);
  const targetX = useSpring(0, { stiffness: 350, damping: 18 });
  const targetY = useSpring(0, { stiffness: 350, damping: 18 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!pillRef.current) return;
    const rect = pillRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const pullX = (e.clientX - centerX) * 0.25;
    const pullY = (e.clientY - centerY) * 0.25;

    targetX.set(pullX);
    targetY.set(pullY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    targetX.set(0);
    targetY.set(0);
  };

  return (
    <motion.div
      ref={pillRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        x: targetX,
        y: targetY
      }}
      className={`group relative flex items-center justify-between gap-4 px-6 py-4 rounded-2xl border transition-all duration-300 cursor-pointer select-none ${
        isHovered
          ? 'bg-[#18352a] border-[#a6ff2e] shadow-[0_0_25px_rgba(166,255,46,0.3)]'
          : 'bg-[#0a2016]/70 border-emerald-500/20 hover:border-emerald-500/40'
      } backdrop-blur-md`}
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center text-[#a6ff2e] group-hover:scale-110 transition-transform">
          <Zap className="w-4 h-4" />
        </div>
        <div>
          <span className="text-sm font-bold text-white block tracking-tight">
            {brand.name}
          </span>
          <span className="text-[11px] text-slate-400 font-mono">
            {brand.category}
          </span>
        </div>
      </div>

      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-[#a6ff2e]">
        {brand.metric}
      </span>
    </motion.div>
  );
};

// =========================================================================
// 4. INTERACTIVE PARTICLE WAVE HTML5 CANVAS
// =========================================================================

const ParticleWaveCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const mouse = { x: -1000, y: -1000, radius: 140 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Grid nodes configuration
    const cols = Math.floor(width / 32);
    const rows = Math.floor(height / 28);
    let step = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      step += 0.035;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x0 = (i / cols) * width + 16;
          const y0 = (j / rows) * height + 14;

          // Undulating sine wave displacement
          const wave = Math.sin(step + i * 0.25 + j * 0.35) * 8;
          let px = x0;
          let py = y0 + wave;

          // Mouse repulsion physics
          const dx = px - mouse.x;
          const dy = py - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius && dist > 0) {
            const force = (1 - dist / mouse.radius) * 35;
            px += (dx / dist) * force;
            py += (dy / dist) * force;
          }

          // Dot render with dynamic opacity
          const alpha = 0.15 + Math.sin(step + i * 0.2) * 0.1;
          ctx.beginPath();
          ctx.arc(px, py, 1.75, 0, Math.PI * 2);
          ctx.fillStyle = dist < mouse.radius 
            ? 'rgba(166, 255, 46, 0.85)' 
            : `rgba(166, 255, 46, ${alpha})`;
          ctx.fill();
        }
      }

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
      className="absolute inset-0 w-full h-full pointer-events-none z-0" 
    />
  );
};

// =========================================================================
// 5. MAIN AGENCY LANDING PAGE ROOT COMPONENT
// =========================================================================

export interface AgencyLandingPageProps {
  config?: AgencyPageConfig;
  onOpenContact?: () => void;
}

export const AgencyLandingPage: React.FC<AgencyLandingPageProps> = ({
  config = defaultAgencyConfig,
  onOpenContact
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const emblemRef = useRef<HTMLDivElement>(null);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Section 1: Scroll-driven Hero Expanding Diamond Mask
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  // Diamond radius expands from 160px (resting diamond) to 1800px (full viewport takeover)
  const diamondRadius = useTransform(heroScrollProgress, [0, 0.85], [160, 1800]);
  const clipPathValue = useTransform(
    diamondRadius,
    (r) => `polygon(50% calc(50% - ${r}px), calc(50% + ${r}px) 50%, 50% calc(50% + ${r}px), calc(50% - ${r}px) 50%)`
  );
  const heroTextOpacity = useTransform(heroScrollProgress, [0, 0.4], [1, 0]);
  const heroTextY = useTransform(heroScrollProgress, [0, 0.4], [0, -100]);

  // Section 3: Emblem Scroll-Linked Rotation
  const { scrollYProgress: emblemScrollProgress } = useScroll({
    target: emblemRef,
    offset: ['start end', 'end start']
  });
  const emblemRotate = useTransform(emblemScrollProgress, [0, 1], [0, 360]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full min-h-screen text-slate-100 overflow-x-hidden font-sans selection:bg-[#a6ff2e]/30 selection:text-[#a6ff2e]"
      style={{
        // Theme CSS variables (Neutral & Highly Configurable)
        ['--bg-primary' as string]: '#041a12',
        ['--bg-surface' as string]: '#072218',
        ['--text-primary' as string]: '#f8fafc',
        ['--text-secondary' as string]: '#94a3b8',
        ['--accent' as string]: '#a6ff2e',
        ['--border-subtle' as string]: 'rgba(166, 255, 46, 0.18)',
        backgroundColor: 'var(--bg-primary)'
      }}
    >

      {/* ===================================================================
          SECTION 1: HERO WITH SCROLL-DRIVEN EXPANDING GEOMETRIC MASK
          =================================================================== */}
      <section 
        ref={heroRef}
        className="relative h-[200vh] w-full"
      >
        {/* Pinned Viewport Container */}
        <div className="sticky top-0 h-screen w-full flex flex-col justify-between p-6 sm:p-10 overflow-hidden">
          
          {/* Ambient Lighting */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#a6ff2e]/10 rounded-full blur-[140px] pointer-events-none" />

          {/* 1. HUD Top Margins */}
          <div className="relative z-30 flex items-center justify-between text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a6ff2e] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#a6ff2e]" />
              </span>
              <span>{config.hero.hudTopLeft}</span>
            </div>

            {/* Central Top Badge with Pulsing Dot */}
            <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12261e]/90 border border-emerald-500/25 text-[11px] font-bold tracking-wider uppercase text-emerald-300 shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-[#a6ff2e] animate-pulse" />
              <span>{config.hero.badge}</span>
            </div>

            <div className="font-mono text-right">
              {config.hero.hudTopRight}
            </div>
          </div>

          {/* 2. Central Expanding Diamond Geometric Mask */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <motion.div
              style={{
                clipPath: clipPathValue,
                willChange: 'clip-path'
              }}
              className="absolute inset-0 w-full h-full overflow-hidden"
            >
              {/* Media inside the expanding mask */}
              <img
                src={config.hero.mediaSrc}
                alt={config.hero.mediaAlt}
                className="w-full h-full object-cover object-center filter brightness-95 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#041a12]/80 via-transparent to-[#041a12]/30" />
            </motion.div>

            {/* Glowing Diamond Frame at rest */}
            <motion.div
              style={{
                scale: useTransform(heroScrollProgress, [0, 0.4], [1, 2.2]),
                opacity: useTransform(heroScrollProgress, [0, 0.3], [1, 0]),
                willChange: 'transform, opacity'
              }}
              className="w-72 h-72 sm:w-80 sm:h-80 border-2 border-[#a6ff2e]/60 rotate-45 shadow-[0_0_50px_rgba(166,255,46,0.5)] pointer-events-none"
            />
          </div>

          {/* 3. Edge-to-Edge Ultra-Condensed Display Headline */}
          <motion.div 
            style={{
              opacity: heroTextOpacity,
              y: heroTextY
            }}
            className="relative z-20 flex flex-col items-center justify-center text-center my-auto pointer-events-none"
          >
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-none text-white drop-shadow-2xl">
              <span className="block font-black">{config.hero.headlinePart1}</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-200 to-[#a6ff2e]">
                {config.hero.headlinePart2}
              </span>
            </h1>

            <p className="mt-4 text-xs sm:text-sm font-mono tracking-widest text-[#a6ff2e] uppercase font-bold">
              [ ADVANCED AGENTIC & CREATIVE WEB ENGINEERING ]
            </p>
          </motion.div>

          {/* 4. HUD Bottom Margins */}
          <div className="relative z-30 flex items-center justify-between text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-[#a6ff2e] animate-spin" style={{ animationDuration: '10s' }} />
              <span>{config.hero.hudBottomLeft}</span>
            </div>
            <div>
              {config.hero.hudBottomRight}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 2: EDITORIAL TYPOGRAPHY & MICRO-NARRATIVE GRID
          =================================================================== */}
      <section className="relative py-28 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto border-t border-emerald-500/15">
        <div className="flex items-center gap-2 mb-8">
          <span className="w-2 h-2 rounded-full bg-[#a6ff2e]" />
          <span className="text-xs font-mono font-bold text-[#a6ff2e] tracking-widest uppercase">
            {config.editorial.badge}
          </span>
        </div>

        {/* Stacked Giant Editorial Statement */}
        <div className="space-y-1 mb-16 overflow-hidden">
          {config.editorial.mainStatement.map((line, idx) => (
            <motion.div 
              key={idx}
              initial={{ y: '100%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-tight">
                {line}
              </h2>
            </motion.div>
          ))}
        </div>

        {/* Asymmetrical Flanking Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-emerald-500/15">
          <div className="p-8 rounded-3xl bg-[#12261e]/50 border border-emerald-500/20 backdrop-blur-md">
            <span className="text-xs font-mono text-[#a6ff2e] block mb-3 font-bold">
              {config.editorial.leftColumnTitle}
            </span>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              {config.editorial.leftColumnText}
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#12261e]/50 border border-emerald-500/20 backdrop-blur-md">
            <span className="text-xs font-mono text-[#a6ff2e] block mb-3 font-bold">
              {config.editorial.rightColumnTitle}
            </span>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              {config.editorial.rightColumnText}
            </p>
          </div>
        </div>

        {/* Telemetry Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 pt-8 border-t border-emerald-500/15">
          {config.editorial.metrics.map((m, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight text-[#a6ff2e]">
                {m.value}
              </span>
              <span className="text-xs font-mono text-slate-400 mt-1 uppercase">
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ===================================================================
          SECTION 3: SCROLL-LINKED ROTATING EMBLEM ("EMBLEM IN MOTION")
          =================================================================== */}
      <section 
        ref={emblemRef}
        className="relative py-24 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-transparent via-[#020f0a] to-transparent"
      >
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
          {/* Outer Rotating Circular Text Ring */}
          <motion.div
            style={{ rotate: emblemRotate }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <svg className="w-full h-full" viewBox="0 0 300 300">
              <defs>
                <path
                  id="circlePath"
                  d="M 150, 150 m -115, 0 a 115,115 0 1,1 230,0 a 115,115 0 1,1 -230,0"
                />
              </defs>
              <text className="text-[11.5px] font-mono tracking-[0.25em] font-bold fill-[#a6ff2e] uppercase">
                <textPath href="#circlePath" startOffset="0%">
                  {config.emblem.circularText}
                </textPath>
              </text>
            </svg>
          </motion.div>

          {/* Central Graphical Badge Lockup */}
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-[#12261e] via-[#041a12] to-black border border-[#a6ff2e]/40 shadow-[0_0_30px_rgba(166,255,46,0.3)] flex flex-col items-center justify-center p-4 cursor-pointer"
          >
            <Cpu className="w-8 h-8 text-[#a6ff2e] mb-1.5 animate-pulse" />
            <span className="text-[10px] font-mono font-black text-white tracking-widest uppercase">
              {config.emblem.centerLabel}
            </span>
          </motion.div>
        </div>

        <span className="text-xs font-mono text-slate-400 mt-6 tracking-widest uppercase">
          {config.emblem.subtext}
        </span>
      </section>

      {/* ===================================================================
          SECTION 4: "MEET THE TEAM" OVERLAPPING SKEWED CARDS CAROUSEL
          =================================================================== */}
      <section className="relative py-28 overflow-hidden">
        {/* Background Marquee Colossal Typography */}
        <div className="absolute top-1/3 -translate-y-1/2 inset-x-0 overflow-hidden whitespace-nowrap pointer-events-none opacity-5 select-none">
          <span className="text-8xl sm:text-9xl md:text-[14rem] font-black tracking-tighter uppercase font-mono text-white">
            CREATIVE ARCHITECTS • SYSTEMS LEADERSHIP • DIGITAL EXCELLENCE • 
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-12 mb-12 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-bold text-[#a6ff2e] tracking-widest uppercase block mb-2">
              04 / LEADERSHIP & VISION
            </span>
            <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              MEET THE TEAM
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            [ HOVER FOR 3D PERSPECTIVE TILT ]
          </span>
        </div>

        {/* Horizontal Overlapping Skewed Cards Tray */}
        <div className="w-full overflow-x-auto pb-12 pt-4 px-6 sm:px-12 scrollbar-none flex items-center gap-4 sm:gap-6">
          {config.team.map((member, index) => (
            <TeamCard key={member.id} member={member} index={index} />
          ))}
        </div>
      </section>

      {/* ===================================================================
          SECTION 5: STAGGERED PILL / BRICK GRID ("BRANDS & PARTNERS WALL")
          =================================================================== */}
      <section className="relative py-28 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto border-t border-emerald-500/15">
        <div className="max-w-2xl mb-14">
          <span className="text-xs font-mono font-bold text-[#a6ff2e] tracking-widest uppercase block mb-2">
            05 / CLIENT & ECOSYSTEM WALL
          </span>
          <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            PROVEN IMPACT & PARTNERS
          </h3>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            From national retail deployments to exclusive private aviation, our systems handle mission-critical transactions and elevate consumer loyalty across the Kingdom.
          </p>
        </div>

        {/* Masonry Interlocking Brickwork Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {config.brands.map((brand) => (
            <BrandPill key={brand.id} brand={brand} />
          ))}
        </div>
      </section>

      {/* ===================================================================
          SECTION 6: FOOTER CTA WITH INTERACTIVE PARTICLE WAVE CANVAS
          =================================================================== */}
      <footer className="relative min-h-[500px] flex flex-col justify-between p-8 sm:p-16 overflow-hidden border-t border-emerald-500/20 bg-[#020B07]">
        {/* Interactive Particle Simulation Background */}
        <ParticleWaveCanvas />

        {/* Foreground Content Stack */}
        <div className="relative z-10 my-auto flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* Sub-Header Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs font-mono font-bold text-[#a6ff2e] tracking-wider uppercase mb-6">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>{config.footer.badge}</span>
          </div>

          {/* High-Visibility Headline */}
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight uppercase leading-tight mb-8 drop-shadow-2xl">
            {config.footer.headline}
          </h2>

          {/* Magnetic CTA Action Button */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenContact}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#a6ff2e] text-[#041a12] font-black text-sm tracking-wide uppercase shadow-[0_0_30px_rgba(166,255,46,0.4)] hover:shadow-[0_0_50px_rgba(166,255,46,0.7)] transition-all cursor-pointer"
          >
            <span>{config.footer.ctaButton}</span>
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        </div>

        {/* Footer Bottom Bar */}
        <div className="relative z-10 pt-8 border-t border-emerald-500/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <p>{config.footer.copyright}</p>
          <div className="flex items-center gap-4">
            <span className="text-[#a6ff2e]">EDGE ENGINE V2.6</span>
            <span>•</span>
            <span>WCAG AAA COMPLIANT</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default AgencyLandingPage;
