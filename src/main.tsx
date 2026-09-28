import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { initSecurityConsoleShield } from './utils/security'

// Initialize Enterprise Console Security Warning
initSecurityConsoleShield()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
