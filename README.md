# Nemesis Systems

The official landing showcase of the Nemesis autonomous robotic system, engineered for high-consequence environments.

## Overview

Nemesis Systems is a high-fidelity concept design website showcasing a futuristic autonomous robotic platform. Built with modern web technologies, it features an immersive cyberpunk/industrial aesthetic with interactive chassis specifications, a live telemetry terminal, a custom unit configurator, and a responsive bento-grid layout. The design blends Japanese typography with military-grade HUD elements to create a premium sci-fi brand experience.

## Features

- **Hero Section**: Cinematic landing area with animated typography and a call-to-action to build a custom unit
- **Interactive Chassis Specifications**: Toggle between front and back chassis views with hoverable hotspots revealing detailed system diagnostics
- **Live Telemetry Terminal**: Scrolling console simulation with real-time system status updates
- **Custom Unit Configurator**: Slide-out drawer for configuring robot skins, payloads, and mission specialties with dynamic cost calculation
- **Engineered Specs Bento Grid**: Modular cards displaying mobility modules and human controller interfaces
- **Cosmic Expedition Banner**: Full-width immersive banner showcasing space exploration capabilities
- **Latest News Section**: Three-column grid displaying mission dispatches and company updates
- **Mega-Glitch Footer**: Responsive footer with spotlight hover effects and glitch animations

## Tech Stack

- React 19
- TypeScript 5.8
- Vite 6
- Tailwind CSS 4
- Motion (Framer Motion successor)
- Lucide React (icons)
- Google Generative AI (Gemini API)

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Nemesis
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run TypeScript type checking

## Project Structure

```
Nemesis/
├── public/                          # Static assets
├── src/
│   ├── assets/
│   │   └── images/                  # Product and news imagery
│   ├── components/
│   │   ├── Header.tsx                 # Navigation with dropdown menus
│   │   ├── Hero.tsx                   # Hero section with profile image
│   │   ├── InteractiveShowcase.tsx    # Main interactive hub (specs, bento, news, configurator)
│   │   └── Footer.tsx                 # Glitch effect footer
│   ├── App.tsx                        # Root application component
│   ├── index.css                      # Global styles, fonts, and animations
│   ├── main.tsx                       # React entry point
│   └── types.ts                       # TypeScript interfaces
├── index.html                         # HTML entry point
├── vite.config.ts                     # Vite configuration
├── tsconfig.json                      # TypeScript configuration
└── package.json                       # Project dependencies
```

## Design Credits

Designed and conceptualized by [Mubashshir Khan](https://mubashshir.vercel.app)

## License

MIT
