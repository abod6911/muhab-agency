import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause, Wifi, Battery, Signal } from "lucide-react";
import { useI18n } from "../../lib/i18n";
import { PhoneSlide } from "../../types";
import { motionTokens } from "../../lib/motionTokens";

const phoneSlides: PhoneSlide[] = [
  {
    id: "gotcha",
    titleEn: "Gotcha Fresh Tea — Jeddah",
    titleAr: "جوتشا فريش تي — جدة",
    categoryEn: "Fresh Tea & Beverage",
    categoryAr: "مشروبات وتجربة طلب",
    videoSrc: "/videos/app-demo1.mp4",
    poster: "/assets/projects/gotcha-real.jpg",
    alt: "Gotcha Fresh Tea Jeddah",
  },
  {
    id: "damascene",
    titleEn: "Damascene Heritage Restaurant",
    titleAr: "مطعم الدمشقي للأطعمة العريقة",
    categoryEn: "Syrian Culinary & Menu",
    categoryAr: "أطعمة وقائمة شامية عريقة",
    videoSrc: "/videos/app-demo2.mp4",
    poster: "/assets/projects/damascene-real.jpg",
    alt: "Damascene Heritage Dining",
  },
  {
    id: "ueno-saryo",
    titleEn: "Ueno Saryo — Japanese Culinary",
    titleAr: "أوينو ساريو — تجربة شاي ياباني",
    categoryEn: "Matcha & Teahouse",
    categoryAr: "ماتشا وشاي ياباني فاخر",
    videoSrc: "/videos/app-demo3.mp4",
    poster: "/assets/projects/ueno-saryo-real.jpg",
    alt: "Ueno Saryo Japanese Teahouse",
  },
  {
    id: "lavoa",
    titleEn: "LAVOA — Café Digital Experience",
    titleAr: "لافوا — تجربة رقمية لمقهى بطابع فاخر",
    categoryEn: "Café · Digital Menu",
    categoryAr: "مقهى · قائمة رقمية",
    videoSrc: "/videos/app-demo4.mp4",
    poster: "/assets/projects/lavoa-real.jpg",
    alt: "LAVOA Café & Lounge",
  },
];

export const PhoneShowcase: React.FC = () => {
  const { t, isAr } = useI18n();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isIntersecting, setIsIntersecting] = useState(true);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // IntersectionObserver to pause video when outside viewport
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (videoRef.current) {
          if (entry.isIntersecting && isPlaying) {
            videoRef.current.play().catch(() => {});
          } else {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isPlaying]);

  // Slides navigation
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % phoneSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + phoneSlides.length) % phoneSlides.length);
  }, []);

  // Auto carousel rotation with manual reset
  useEffect(() => {
    if (!isPlaying || !isIntersecting) return;
    const timer = setInterval(nextSlide, 7500);
    return () => clearInterval(timer);
  }, [isPlaying, isIntersecting, nextSlide, currentIndex]);

  // Desktop Micro 3D Tilt Physics (Disabled on Mobile)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [1.5, -1.5]), motionTokens.springGentle);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-2.5, 2.5]), motionTokens.springGentle);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && (window.innerWidth < 1024 || window.matchMedia("(pointer: coarse)").matches)) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const currentSlide = phoneSlides[currentIndex] || phoneSlides[0];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="flex flex-col items-center justify-center relative select-none w-full max-w-[430px] mx-auto py-2"
    >
      {/* Phone Wrapper */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1400,
        }}
        className="relative w-[285px] sm:w-[325px] md:w-[340px] h-[580px] sm:h-[660px] md:h-[690px] transition-shadow duration-500 will-change-transform"
      >
        {/* Contact Shadow (Optimized for Mobile) */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[80%] h-8 bg-black/60 blur-xl rounded-full pointer-events-none" />

        {/* Physical Hardware Buttons with Proportional Shell Positioning */}
        <div
          className="absolute -left-[4px] w-[4px] rounded-l-[3px] bg-[#222B26] border-l border-t border-b border-white/25 shadow-sm"
          style={{ top: "14%", height: "4.2%" }}
        />
        <div
          className="absolute -left-[4px] w-[4px] rounded-l-[3px] bg-[#222B26] border-l border-t border-b border-white/25 shadow-sm"
          style={{ top: "21.5%", height: "7.5%" }}
        />
        <div
          className="absolute -left-[4px] w-[4px] rounded-l-[3px] bg-[#222B26] border-l border-t border-b border-white/25 shadow-sm"
          style={{ top: "31%", height: "7.5%" }}
        />
        <div
          className="absolute -right-[4px] w-[4px] rounded-r-[3px] bg-[#222B26] border-r border-t border-b border-white/25 shadow-sm"
          style={{ top: "22%", height: "9.5%" }}
        />

        {/* Outer Phone Chassis (Dark Titanium) */}
        <div className="relative h-full w-full rounded-[48px] sm:rounded-[52px] bg-gradient-to-b from-[#1E2923] via-[#121915] to-[#0A0F0D] p-[9px] sm:p-[10px] shadow-2xl ring-1 ring-white/15">
          
          {/* Inner Display Bezel */}
          <div className="relative h-full w-full overflow-hidden rounded-[40px] sm:rounded-[44px] bg-black">
            
            {/* Status Bar (Clean 9:41 System Time) */}
            <div className="absolute top-0 inset-x-0 z-40 flex h-9 items-center justify-between px-6 pt-1 text-white text-[12px] font-semibold tracking-tight pointer-events-none">
              <span className="font-mono font-bold text-white/95">9:41</span>
              <div className="flex items-center gap-1.5 opacity-90">
                <Signal className="h-3 w-3 text-white/90" />
                <span className="text-[10px] font-mono font-bold text-white/90">5G</span>
                <Wifi className="h-3.5 w-3.5 text-white/90" />
                <Battery className="h-4 w-4 text-white/95" />
              </div>
            </div>

            {/* Subtle Centered Dynamic Island */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-50 flex h-5 w-24 items-center justify-between rounded-full bg-black px-2.5 shadow-md ring-1 ring-white/10 pointer-events-none">
              <div className="h-2 w-2 rounded-full bg-[#0E1512] ring-1 ring-slate-800 flex items-center justify-center">
                <div className="h-0.5 w-0.5 rounded-full bg-blue-900/40" />
              </div>
              <div className="h-1.5 w-1.5 rounded-full bg-black" />
            </div>

            {/* Main Screen Media (Actual Video Playing) */}
            <div className="relative h-full w-full bg-[#030A08] overflow-hidden">
              <video
                key={currentSlide.videoSrc}
                ref={videoRef}
                src={currentSlide.videoSrc}
                poster={currentSlide.poster}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="h-full w-full object-cover object-top"
              />

              {/* Gentle Top/Bottom Vignette to enhance UI contrast */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none" />
            </div>

            {/* Restrained Subtle Glass Reflection */}
            <div
              className="absolute inset-0 pointer-events-none z-30 opacity-25"
              style={{
                background:
                  "linear-gradient(115deg, rgba(255,255,255,0.06) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.02) 100%)",
              }}
            />

            {/* Bottom Minimal Project Information Badge */}
            <div className="absolute bottom-5 inset-x-3.5 z-40 transition-all duration-300">
              <div className="rounded-2xl bg-black/90 border border-white/15 p-3.5 text-white shadow-xl space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="inline-block rounded-full bg-[#B9FF38] px-2.5 py-0.5 text-[10px] font-mono font-black tracking-wider text-[#07130F] uppercase">
                    {isAr ? currentSlide.categoryAr : currentSlide.categoryEn}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-white/70">
                    0{currentIndex + 1} / 0{phoneSlides.length}
                  </span>
                </div>
                <p className="text-sm sm:text-base font-display font-bold text-white line-clamp-1 leading-snug">
                  {isAr ? currentSlide.titleAr : currentSlide.titleEn}
                </p>
              </div>
            </div>

            {/* Home Indicator Bar */}
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 z-50 h-1 w-24 rounded-full bg-white/60 pointer-events-none" />
          </div>
        </div>
      </motion.div>

      {/* External Carousel Controls & Indicator Capsule */}
      <div className="mt-6 flex items-center gap-3 bg-[#064E3B]/90 px-4 py-2 rounded-full border border-white/15 shadow-xl text-white">
        {/* Previous Slide Button */}
        <button
          onClick={prevSlide}
          className="p-1.5 rounded-full hover:bg-white/15 text-white transition-colors cursor-pointer active:scale-95"
          aria-label={t("phone.prev")}
        >
          <ChevronLeft className={`h-4 w-4 ${isAr ? "rotate-180" : ""}`} />
        </button>

        {/* Indicator Dots / Active Bar */}
        <div className="flex items-center gap-1.5 px-1">
          {phoneSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex
                  ? "w-6 bg-[#B9FF38] shadow-sm"
                  : "w-2 bg-white/30 hover:bg-white/60"
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Next Slide Button */}
        <button
          onClick={nextSlide}
          className="p-1.5 rounded-full hover:bg-white/15 text-white transition-colors cursor-pointer active:scale-95"
          aria-label={t("phone.next")}
        >
          <ChevronRight className={`h-4 w-4 ${isAr ? "rotate-180" : ""}`} />
        </button>

        {/* Play/Pause Button */}
        <div className="h-4 w-[1px] bg-white/20 mx-0.5" />
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-1.5 rounded-full bg-[#B9FF38]/20 text-[#B9FF38] hover:bg-[#B9FF38]/30 transition-colors cursor-pointer active:scale-95"
          aria-label={isPlaying ? t("phone.pause") : t("phone.play")}
        >
          {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
        </button>
      </div>
    </div>
  );
};
