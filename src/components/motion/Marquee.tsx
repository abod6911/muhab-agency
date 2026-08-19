import React from "react";

interface MarqueeProps {
  children: React.ReactNode;
  direction?: "ltr" | "rtl";
  speed?: string;
  className?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({
  children,
  direction = "ltr",
  className = "",
}) => {
  const animClass = direction === "rtl" ? "animate-marquee-rtl" : "animate-marquee-ltr";

  return (
    <div className={`overflow-hidden select-none flex ${className}`}>
      <div className={animClass}>
        <div className="flex items-center gap-12 sm:gap-20 shrink-0 px-6 sm:px-10">
          {children}
        </div>
        <div className="flex items-center gap-12 sm:gap-20 shrink-0 px-6 sm:px-10" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
};
