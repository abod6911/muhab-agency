import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: false,
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'react-vendor';
          }
          if (id.includes('node_modules/framer-motion/') || id.includes('node_modules/gsap/') || id.includes('node_modules/lenis/')) {
            return 'motion-vendor';
          }
          if (id.includes('node_modules/lucide-react/')) {
            return 'lucide-icons';
          }
        },
      },
    },
  },
})

