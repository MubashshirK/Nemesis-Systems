import { motion } from "motion/react";
import { ArrowDown, CornerDownRight, Play } from "lucide-react";
import heroImage from "../assets/images/nemesis_hero.webp";

interface HeroProps {
  onOpenConfigurator: () => void;
  onOpenVideo?: () => void; // Optional video play trigger for immersion
}

export default function Hero({ onOpenConfigurator, onOpenVideo }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-screen bg-zinc-100 flex items-center overflow-hidden pt-20">
      {/* Absolute Large Background Deco Character (Desktop) */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none text-zinc-950/[0.1] text-[15vw] font-black leading-none font-jp z-0 hidden lg:block">
        ネメシス
      </div>

      {/* Decorative orbital thin guidelines in the background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-[55%] -translate-y-[45%] w-[120vw] h-[120vw] border border-zinc-200 rounded-full select-none pointer-events-none z-0"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-[55%] -translate-y-[45%] w-[80vw] h-[80vw] border border-zinc-200/80 rounded-full select-none pointer-events-none z-0"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-[55%] -translate-y-[45%] w-[45vw] h-[45vw] border border-dashed border-zinc-300/40 rounded-full select-none pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 py-16 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side Content */}
        <div className="lg:col-span-6 text-zinc-900 pr-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full border border-zinc-300 bg-zinc-200/50 backdrop-blur-sm font-mono text-[10px] text-zinc-600 tracking-wider mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
            <span>自律型システム : VER_X.09</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative font-display font-extrabold text-5xl md:text-6xl xl:text-7xl tracking-tight leading-[1.1] text-zinc-950 uppercase select-none"
          >
            <span className="whitespace-nowrap">BUILT FOR</span> <br />
            <span className="whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-zinc-950 via-zinc-800 to-zinc-950">
              THE VOID
            </span>
            <span className="lg:hidden absolute left-16 top-full -mt-20 select-none pointer-events-none text-zinc-950/10 text-[24vw] font-black leading-none font-jp whitespace-nowrap">
              ネメシス
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 text-sm md:text-base text-zinc-600 font-sans max-w-md leading-relaxed"
          >
            Nemesis autonomous robotic platforms feature decentralized biomechanical synthetic cardiac engines and robust carbon composite shells, engineered specifically for high-consequence environments beyond human threshold.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            {/* Custom CTA matching the premium screenshot button */}
            <button
              onClick={onOpenConfigurator}
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-zinc-950 text-zinc-50 px-8 py-4 font-mono text-xs font-bold tracking-widest shadow-xl cursor-pointer hover:bg-orange-600 hover:scale-[1.02] duration-300 transition-all"
            >
              <span className="relative z-10 flex items-center gap-2">
                MEET THE NEMESIS-X1
                <span>↗</span>
              </span>
            </button>

            {onOpenVideo && (
              <button
                onClick={onOpenVideo}
                className="inline-flex items-center gap-2.5 px-6 py-4 font-mono text-xs text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/60 rounded-full transition-all"
              >
                <div className="w-8 h-8 rounded-full border border-zinc-300 flex items-center justify-center bg-white shadow-sm">
                  <Play className="w-3 h-3 text-zinc-700 fill-zinc-700 ml-0.5" />
                </div>
                PLAY REEL (8:20)
              </button>
            )}
          </motion.div>

          {/* Core Telemetry Tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-16 flex items-start gap-3 border-l-2 border-zinc-300 pl-4 py-1"
          >
            <CornerDownRight className="w-4 h-4 text-zinc-500 mt-0.5" />
            <div>
              <p className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">Atmosphere Rating</p>
              <p className="font-tech text-xs text-zinc-700 mt-0.5">Vacuum & deep abyssal high-pressure systems intact</p>
            </div>
          </motion.div>
        </div>

        {/* Right Side Image (Robot Head Close-up with precise fades) */}
        <div className="lg:col-span-6 relative flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-lg aspect-[10/11] rounded-3xl -mt-24"
          >
            {/* Ambient surrounding drop shadows */}
            <div className="absolute inset-4 rounded-3xl bg-zinc-300/40 blur-2xl -z-10"></div>
            
            {/* The main picture with a gradient mask at the bottom to blend with off-white background */}
            <div className="relative w-full h-full overflow-hidden rounded-3xl border border-white/60 shadow-2xl group">
              <img
                src={heroImage}
                alt="Nemesis X1 Profile Android Close Up"
                className="w-full h-full object-cover grayscale-[15%] group-hover:scale-105 duration-700 ease-out"
              />
              
              {/* Overlay visual layout grid lines for futuristic feeling */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-100/30 via-transparent to-transparent pointer-events-none mix-blend-multiply"></div>
              
              {/* HUD alignment tags */}
              <div className="absolute top-4 left-4 font-mono text-[8px] text-zinc-400 bg-zinc-900/60 text-zinc-100/90 px-2 py-0.5 rounded tracking-widest">
                SYS_LOCK: SECURED
              </div>
              <div className="absolute bottom-4 right-4 font-mono text-[8px] text-zinc-200 bg-zinc-950/70 px-2 py-1 rounded tracking-widest leading-none">
                CAM_REC : 4K @ 120FPS
              </div>
            </div>


          </motion.div>
        </div>
      </div>

      {/* Bounce scroll down button at absolute bottom */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5">
        <span className="font-mono text-[10px] text-zinc-400 tracking-widest uppercase">DISCOVER SPECIFICATIONS</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-5 h-5 rounded-full border border-zinc-300 flex items-center justify-center bg-white shadow-sm"
        >
          <ArrowDown className="w-2.5 h-2.5 text-zinc-500" />
        </motion.div>
      </div>
    </section>
  );
}