import React, { useRef, useState, useEffect } from "react";
import { Linkedin, Mail, Github } from "lucide-react";

export default function Footer() {
  const [hovering, setHovering] = useState(false);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });
  const [showGlitch, setShowGlitch] = useState(false);
  const [glitchDone, setGlitchDone] = useState(false);
  const spotRef = useRef<HTMLDivElement>(null);
  const megaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = megaRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setShowGlitch(true), 500);
          setTimeout(() => setGlitchDone(true), 1100);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = spotRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlight({ x, y });
  };

  return (
    <footer className="bg-zinc-100 text-zinc-650 pt-20 pb-6 border-t border-zinc-200/80 select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Top line links structure */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border-b border-zinc-200 pb-12">
          <div className="space-y-4 max-w-sm">
            <div className="text-zinc-950 font-display font-extrabold text-2xl tracking-wider uppercase">
              NEMESIS SYSTEMS
            </div>
            <p className="font-sans text-[11px] text-zinc-500 leading-relaxed uppercase">
              Pioneering high-tensile physical robotics and decentralized artificial mainframe cores to conquer extreme threshold environments.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-[11px] font-mono uppercase tracking-widest text-zinc-500">
            <div className="space-y-3">
              <div className="text-zinc-950 font-bold mb-2">Specifications</div>
              <div><a href="#specifications" className="hover:text-orange-500 transition-colors">Chassis Hulls</a></div>
              <div><a href="#solutions" className="hover:text-orange-500 transition-colors">Quantum Core</a></div>
              <div><a href="#solutions" className="hover:text-orange-500 transition-colors">Mobility Joint</a></div>
            </div>
            <div className="space-y-3">
              <div className="text-zinc-950 font-bold mb-2">Global Site</div>
              <div><a href="#hero" className="hover:text-orange-500 transition-colors">Tokyo Bay</a></div>
              <div><a href="#hero" className="hover:text-orange-500 transition-colors">Challenger Deep</a></div>
              <div><a href="#hero" className="hover:text-orange-500 transition-colors">Antarctic Depot</a></div>
            </div>
            <div className="space-y-3">
              <div className="text-zinc-950 font-bold mb-2">Dispatches</div>
              <div><a href="#news" className="hover:text-orange-500 transition-colors">Command Center</a></div>
              <div><a href="#news" className="hover:text-orange-500 transition-colors">System Updates</a></div>
            </div>
          </div>
        </div>

        {/* Mega text row */}
        <div ref={megaRef} className="py-16 flex items-center justify-center border-b border-zinc-200">
          <div ref={spotRef} className="relative cursor-pointer"
               onMouseMove={handleMouseMove}
               onMouseEnter={() => setHovering(true)}
               onMouseLeave={() => setHovering(false)}>
            {/* Desktop spotlight layer */}
            <span className="hidden md:block select-none text-zinc-950/[0.07] text-[16vw] font-black font-jp tracking-tight leading-none">
              ネメシス
            </span>
            <span className="hidden md:block select-none absolute inset-0 text-zinc-950/50 text-[16vw] font-black font-jp tracking-tight leading-none pointer-events-none transition-opacity duration-500"
                  style={{
                    opacity: hovering ? 1 : 0,
                    maskImage: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, black 20%, transparent 50%)`,
                    WebkitMaskImage: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, black 20%, transparent 50%)`,
                    maskRepeat: 'no-repeat', WebkitMaskRepeat: 'no-repeat',
                  }}>
              ネメシス
            </span>
            {/* Mobile glitch text */}
            <span className={`md:hidden select-none text-zinc-950/50 text-[16vw] font-black font-jp tracking-tight leading-none ${showGlitch && !glitchDone ? 'animate-glitch' : ''} ${glitchDone ? 'animate-glitch-loop' : ''}`}
                  data-text="ネメシス"
                  style={{ opacity: showGlitch && glitchDone ? 0.5 : showGlitch ? undefined : 0 }}>
              ネメシス
            </span>
          </div>
        </div>

        {/* Bottom copyright & icons structure */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-zinc-400">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-6">
            <span>Copyright© 2026 NEMESIS</span>
            <span className="text-zinc-300">|</span>
            <span>Designed by <a href="https://mubashshir.vercel.app" target="_blank" rel="noreferrer" className="text-zinc-700 hover:text-orange-500 transition-colors font-semibold">Mubashshir Khan</a></span>
          </div>

          {/* Social Platform Icons */}
          <div className="flex items-center gap-5 text-zinc-600">
            <a href="https://github.com/MubashshirK" target="_blank" rel="noreferrer" aria-label="GitHub Profile" className="hover:text-orange-500 transition-colors duration-200">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://www.linkedin.com/in/mubashshir21/" target="_blank" rel="noreferrer" aria-label="LinkedIn Profile" className="hover:text-orange-500 transition-colors duration-200">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="mailto:mubashshirk786@gmail.com" target="_blank" rel="noreferrer" aria-label="Email" className="hover:text-orange-500 transition-colors duration-200">
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
