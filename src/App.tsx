/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import InteractiveShowcase from "./components/InteractiveShowcase";
import Footer from "./components/Footer";

export default function App() {
  const [isConfiguratorOpen, setIsConfiguratorOpen] = useState(false);

  // Prevent background scrolling when modals or drawer overlays are active
  useEffect(() => {
    if (isConfiguratorOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isConfiguratorOpen]);

  return (
    <div className="bg-zinc-100 min-h-screen font-sans selection:bg-orange-500 selection:text-white antialiased transition-colors duration-300">
      {/* 1. Header (Navbar component) */}
      <Header 
        onOpenConfigurator={() => setIsConfiguratorOpen(true)}
      />

      {/* 2. Hero Section */}
      <Hero 
        onOpenConfigurator={() => setIsConfiguratorOpen(true)}
      />

      {/* 3. Interactive Specifications, Components, Bento Grid, and News Details */}
      <InteractiveShowcase
        isConfiguratorOpen={isConfiguratorOpen}
        onCloseConfigurator={() => setIsConfiguratorOpen(false)}
      />

      {/* 4. Elegant Footer matching screenshot */}
      <Footer />
    </div>
  );
}

