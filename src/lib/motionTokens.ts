export const motionTokens = {
  // Easing curves derived from Afternow forensics
  easePrimary: [0.16, 1, 0.3, 1] as const, // Quintic / Exponential deceleration
  easeInteractive: [0.25, 1, 0.5, 1] as const, // Smooth hover & micro-interaction
  easeExit: [0.7, 0, 0.84, 0] as const,

  // Duration scales (seconds)
  durationFast: 0.25,
  durationNormal: 0.45,
  durationMedium: 0.7,
  durationSlow: 0.95,
  durationReveal: 1.1,

  // Stagger intervals (seconds)
  staggerFast: 0.06,
  staggerMedium: 0.12,
  staggerSlow: 0.18,

  // Physics springs for 3D tilt & cursor
  springGentle: { damping: 30, stiffness: 100, mass: 0.9 },
  springSnappy: { damping: 20, stiffness: 220, mass: 0.6 },
};
