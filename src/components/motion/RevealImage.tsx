import React from "react";
import { motion } from "framer-motion";

interface RevealImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  delay?: number;
  priority?: boolean;
}

export const RevealImage: React.FC<RevealImageProps> = ({
  src,
  alt,
  className = "",
  aspectRatio = "aspect-[16/10]",
  delay = 0.1,
  priority = false,
}) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-[#0B1F19] ${aspectRatio} ${className}`}>
      <motion.div
        initial={{ scale: 1.15, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration: 1.2,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="w-full h-full"
      >
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#07130F]/40 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};
