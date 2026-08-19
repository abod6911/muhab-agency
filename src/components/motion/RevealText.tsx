import React from "react";
import { motion } from "framer-motion";

interface RevealTextProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
}

export const RevealText: React.FC<RevealTextProps> = ({
  children,
  delay = 0,
  className = "",
  tag = "div",
}) => {
  const Component = motion[tag] as any;

  return (
    <div className="overflow-hidden inline-block w-full">
      <Component
        initial={{ y: "100%", opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration: 0.85,
          delay,
          ease: [0.16, 1, 0.3, 1], // authoritative premium ease
        }}
        className={className}
      >
        {children}
      </Component>
    </div>
  );
};
