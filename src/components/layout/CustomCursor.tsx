import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState<"default" | "project" | "button" | "hidden">("default");
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check touch screen or reduced motion
    if (window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorTarget) {
        const type = cursorTarget.getAttribute("data-cursor");
        const text = cursorTarget.getAttribute("data-cursor-text") || "";
        if (type === "project") {
          setCursorVariant("project");
          setCursorText(text || "VIEW");
        } else if (type === "button") {
          setCursorVariant("button");
          setCursorText(text);
        } else if (type === "play") {
          setCursorVariant("project");
          setCursorText(text || "PLAY");
        }
      } else {
        const isClickable = target.closest("button, a, input, select, textarea");
        if (isClickable) {
          setCursorVariant("button");
          setCursorText("");
        } else {
          setCursorVariant("default");
          setCursorText("");
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (isTouchDevice) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center rounded-full pointer-events-none"
        animate={{
          x: mousePosition.x - (cursorVariant === "project" ? 44 : cursorVariant === "button" ? 20 : 6),
          y: mousePosition.y - (cursorVariant === "project" ? 44 : cursorVariant === "button" ? 20 : 6),
          width: cursorVariant === "project" ? 88 : cursorVariant === "button" ? 40 : 12,
          height: cursorVariant === "project" ? 88 : cursorVariant === "button" ? 40 : 12,
          backgroundColor: cursorVariant === "project" ? "rgba(185, 255, 56, 0.95)" : cursorVariant === "button" ? "rgba(185, 255, 56, 0.25)" : "#B9FF38",
          borderColor: cursorVariant === "button" ? "#B9FF38" : "transparent",
          borderWidth: cursorVariant === "button" ? 1.5 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 450,
          damping: 28,
          mass: 0.2,
        }}
      >
        {cursorText && (
          <span className="text-[11px] font-black uppercase tracking-wider text-[#07130F] font-mono">
            {cursorText}
          </span>
        )}
      </motion.div>
    </div>
  );
};
