# Atharv Mantri — Core Portfolio Architecture

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19.2-blue?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue?logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8.0-blue?logo=vite)](https://vite.dev)

This repository contains the architecture, source pipelines, and interactive console frontend for my personal portfolio. Built from scratch with a strict focus on offline resiliency, visual metrics, and self-contained asset pipelines. 

I build **systems**, not side projects. This portfolio reflects that philosophy—designed for maximum performance, minimal bundle size, and completely self-contained elements (e.g., local inline vector SVGs instead of third-party network fetches).

---

## 🛠 Architecture & Tech Stack

The workspace is structured as a client-side Single Page Application (SPA) designed to run at 99.9% Google Lighthouse performance ratings.

- **Frontend Core**: [React 19.2](https://react.dev) + [TypeScript 6.0](https://www.typescriptlang.org)
- **Compilation Tooling**: [Vite 8.0](https://vite.dev) (ESLint & custom HMR boundaries)
- **Iconography & Visuals**: Inline SVG representations + [Lucide React](https://github.com/lucide-react/lucide) for system metrics
- **Animations**: Hand-crafted CSS keyframes + cubic-bezier micro-interactions encapsulated in component styles to keep stylesheet scope isolated

---

## 📂 Codebase Breakdown

```
Portfolio/
├── public/
│   ├── favicon.svg        # Custom glowing terminal logo
│   └── icons.svg          # Local asset backup definitions
├── src/
│   ├── components/
│   │   ├── App.tsx        # Entry router & scroll section trackers
│   │   ├── Hero.tsx       # Glowing Neural Core SVG particle animation
│   │   ├── Terminal.tsx   # Custom interactive kernel shell interpreter
│   │   ├── Stats.tsx      # Performance metrics and hackathon logs
│   │   ├── Projects.tsx   # Project cards & 3D tilt interaction handlers
│   │   ├── Skills.tsx     # Vector SVG technology grid (offline-first)
│   │   └── Contact.tsx    # Connection endpoint and form payload handler
│   ├── index.css          # Design system variables, typography & layout utilities
│   └── main.tsx           # React bootstrapping + developer console greetings
```

---

## 🚀 Execution & Deployment

### Dependencies Installation
The project uses the fast, modern Vite asset bundler:
```bash
npm install
```

### Local Dev Loop
Launch the development server with HMR active:
```bash
npm run dev
```

### Production Build compilation
Runs the TypeScript compiler followed by the Vite production build asset pipeline. Outputs static HTML/JS/CSS assets to the `/dist` directory.
```bash
npm run build
```

---

## 📬 Contact Form Backend (Vercel + Neon)

### 1) Create the database table
Run the SQL in `db/schema.sql` on your Neon database.

### 2) Configure environment variables
Set these on Vercel (and locally for testing):
```bash
DATABASE_URL=postgres://USER:PASSWORD@HOST:PORT/DB?sslmode=require
DATABASE_SSL=true
ADMIN_USER=your-admin-user
ADMIN_PASSWORD=your-strong-password
```

### 3) Deploy
Vercel will pick up serverless functions from the `/api` directory.

### 4) View submissions
Open `/admin.html` after deployment and sign in with your admin credentials.

---

## 🔐 System Project Blueprints (Highlighted)

This portfolio showcases three core architectures:
1. **ShadowKey**: A privacy-preserving zero-knowledge identity system compiled with Compact circuits on the Midnight Network. Runs 9 Groth16 circuits directly in-browser.
2. **GuardNet**: An offline-first disaster response network PWA using Leaflet geo-position heat maps, NASA telemetry APIs, and Service Worker offline queues.
3. **WebSniper**: A local-first visual web scraper engine connecting a React Chrome Extension to a Playwright headless Chromium runner via FastAPI endpoints.

---

## 💻 Developer Console Greetings

When inspecting the site's network traffic or standard outputs, developers will find custom styled outputs printed directly to their console. Open DevTools (`F12` or `Ctrl+Shift+I` on Windows) to verify handshake credentials!

---

## 📝 License
This project is open-source and licensed under the [MIT License](LICENSE).
