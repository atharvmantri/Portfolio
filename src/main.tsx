import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

// Developer Console Diagnostics (Handcrafted Signature Greeting)
if (typeof window !== 'undefined') {
  console.log(
    '%cATHARV MANTRI %c// %cSYSTEMS ARCHITECT',
    'color: #00f2fe; font-weight: 800; font-size: 16px; font-family: "JetBrains Mono", monospace; text-shadow: 0 0 8px rgba(0,242,254,0.3);',
    'color: #94a3b8; font-size: 16px; font-family: monospace;',
    'color: #a855f7; font-weight: 800; font-size: 16px; font-family: "JetBrains Mono", monospace; text-shadow: 0 0 8px rgba(168,85,247,0.3);'
  );
  console.log(
    '%c[Connection Endpoint: work@atharv.me | Secure Shell Active]',
    'color: #10b981; font-family: monospace; font-size: 11px; font-weight: 600;'
  );
  console.log(
    '%cLooking at the source files? Respect. Check out the clean codebase or report security vulnerabilities on GitHub: https://github.com/atharvmantri/Portfolio',
    'color: #94a3b8; font-family: monospace; font-size: 11px;'
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
