/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#07130F',
          darker: '#030A08',
          surface: '#0B1F19',
          surfaceLight: '#112C24',
          primary: '#064E3B',
          primaryLight: '#0E6C53',
          accent: '#B9FF38',
          accentHover: '#CAFF5E',
          accentMuted: 'rgba(185, 255, 56, 0.15)',
          cream: '#F7F7F2',
          creamDark: '#EBEBE3',
          stone: '#D8DCD7',
          stoneDark: '#8B968F',
          white: '#FCFCFA',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Cabinet Grotesk"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        arabic: ['"Alexandria"', '"Cairo"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'marquee': 'marquee 80s linear infinite',
        'marquee-reverse': 'marquee-reverse 80s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
}
