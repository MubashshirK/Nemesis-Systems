import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronRight, Eye, Compass, ShieldAlert, CheckCircle2, 
  Terminal, Shield, FileText, Zap, HelpCircle, ArrowUpRight, Check, X, Sparkles
} from "lucide-react";
import { Hotspot, CustomizationOption } from "../types";

//All images imported 
import imgFrontChassis from "../assets/images/nemesis_hero.webp";
import imgCyberbotHeadset from "../assets/images/CyberBot-headset.webp";
import imgNemesisHeart from "../assets/images/Nemesis-heart.webp";
import imgManipulatorArm from "../assets/images/nemesis_manipulator_arm.webp";
import imgHumanController from "../assets/images/human-controller.webp";
import imgSpaceExplorer from "../assets/images/nemesis_space_explorer.webp";
import imgNewsFactory from "../assets/images/news_robot_factory.webp";
import imgNewsDeepSea from "../assets/images/news_deep_sea.webp";
import imgNewsNasa from "../assets/images/news_collab_nasa.webp";

interface InteractiveShowcaseProps {
  isConfiguratorOpen: boolean;
  onCloseConfigurator: () => void;
}

export default function InteractiveShowcase({
  isConfiguratorOpen,
  onCloseConfigurator,
}: InteractiveShowcaseProps) {
  // Toggle between "FRONT" and "BACK" chassis views in suit specifications
  const [telemetryView, setTelemetryView] = useState<"front" | "back">("back");
  const [selectedPill, setSelectedPill] = useState<number>(0);
  const [hoveredHotspot, setHoveredHotspot] = useState<Hotspot | null>(null);
  const [activeHotspotDetail, setActiveHotspotDetail] = useState<Hotspot | null>(null);

  // Configuration selections for custom build
  const [selectedSkin, setSelectedSkin] = useState<string>("skin-1");
  const [selectedPayload, setSelectedPayload] = useState<string>("payload-1");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("spec-1");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("Research Expedition Leader");
  const [orderNotes, setOrderNotes] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  // scrolling console code for simulation
  const [consoleLines, setConsoleLines] = useState<string[]>([]);

  const skins: CustomizationOption[] = [
    { id: "skin-1", name: "Silver Nanite Matte", description: "Standard atmospheric, high dissipation brushed silver plating.", type: "skin", costMultiplier: 1.0 },
    { id: "skin-2", name: "Abyssal Stealth Black", description: "Heavy nickel-coated hyper-dark composite plate for deep shadow-dense ops.", type: "skin", costMultiplier: 1.25 },
    { id: "skin-3", name: "Solar Titanium Gold", description: "Multi-layered thermo-reflective ceramic layer tailored for star-facing orbits.", type: "skin", costMultiplier: 1.5 }
  ];

  const payloads: CustomizationOption[] = [
    { id: "payload-1", name: "Sub-Zero Fusion Cell", description: "Cryogenic power core yielding 40 years of autonomic propulsion lifespans.", type: "payload", costMultiplier: 1.0 },
    { id: "payload-2", name: "Cardiac Pulse Synchronizer", description: "Biomimetic rhythm controller regulating synthetic heart pulsation at 1.2M cycles endurance.", type: "payload", costMultiplier: 1.35 },
    { id: "payload-3", name: "Compressed Gas Attitude Jetpack", description: "Auxiliary cold-gas micro-thrusters for zero-gravity tethered maneuvers.", type: "payload", costMultiplier: 1.2 }
  ];

  const specialties: CustomizationOption[] = [
    { id: "spec-1", name: "Deep-Sea Trench Bathymetry", description: "Optimized seals withstand pressures exceeding 1,100 Earth atmospheres.", type: "specialty", costMultiplier: 1.0 },
    { id: "spec-2", name: "Orbital Space Welder / rigger", description: "Magnetic anchors and structural microwave bonding tools.", type: "specialty", costMultiplier: 1.4 },
    { id: "spec-3", name: "Autonomous Lunar Sentry", description: "Advanced active optical filters & radioactive shielding grids.", type: "specialty", costMultiplier: 1.15 }
  ];

  const hotspots: Hotspot[] = [
    {
      id: "h1",
      title: "LIDAR OPTICAL SENSOR VISOR",
      description: "Generates real-time 3D depth telemetry mapping in total darkness and vacuum void spaces.",
      x: 42,
      y: 35,
      fullInfo: "Equipped with quad-frequency solid-state LiDAR sensors. Feeds telemetry directly into the local cardiac command node at 60Hz. Operates at extreme low-index light frequencies."
    },
    {
      id: "h2",
      title: "CHASSIS COLD-WELD NANO-SHUTTLE",
      description: "Deploys localized bonding nanites to autonomously repair outer micro-fissures.",
      x: 58,
      y: 52,
      fullInfo: "A pressurized reservoir containing dense alloy micro-shuttles. On structural breach detection, materials are automatically released to weld punctures in milliseconds."
    },
    {
      id: "h3",
      title: "TREATMENT REGULATED COMPRESSOR",
      description: "Dual-envelope titanium gas recycling valve maintaining constant atmospheric parameters.",
      x: 38,
      y: 65,
      fullInfo: "Optimizes thermal and pressure gradients. Rated for abyssal oceans as well as exposure to raw space vacuum. Recycles kinetic energy into baseline charging cycles."
    }
  ];

  // Generate continuous telemetry code logs for sci-fi atmosphere
  useEffect(() => {
    const commands = [
      "sys_boot_sec_chassis --validate",
      "0x000111f25  b0 00  data+56  mov",
      "0x000111f26  e4 00  data+58  call_core",
      "0x000111f27  a0 01  data+60  add",
      "0x000111f28  a2 80  data+54  jump_link",
      "0x000111f29  c8 11  data+52  pop_reg",
      "0x000111f30  f4 02  data+53  add_mem",
      "0x000111f31  a1 05  data+51  call_sync",
      "0x000111f32  a9 00  data+49  mov_accum",
      "SYS_STATUS_CHASSIS_MATRIC_OK",
      "atm_ambient_pressure: 0.0001 Pa",
      "fusion_core_energy_temp: 341.2 K",
      "sol_array_intensity_index: 100%",
      "thruster_nozzle_combustion: READY",
      "telemetry_link_strength: 99.8 dB",
      "lidar_raycast_points: 409600 pt/s",
      "kinetic_damping_solenoids: NOMINAL"
    ];

    const interval = setInterval(() => {
      setConsoleLines((prev) => {
        const nextCommand = commands[Math.floor(Math.random() * commands.length)];
        const addition = `[${new Date().toLocaleTimeString()}] ${nextCommand}`;
        if (prev.length >= 8) {
          return [...prev.slice(1), addition];
        } else {
          return [...prev, addition];
        }
      });
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  const handleBuildSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !userEmail) return;

    const selectedSkinName = skins.find(s => s.id === selectedSkin)?.name || selectedSkin;
    const selectedPayloadName = payloads.find(p => p.id === selectedPayload)?.name || selectedPayload;
    const selectedSpecName = specialties.find(s => s.id === selectedSpecialty)?.name || selectedSpecialty;

    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      onCloseConfigurator();
      // Reset form
      setUserName("");
      setUserName("");
      setUserEmail("");
      setOrderNotes("");
    }, 2800);
  };

  const getActiveTotalCost = () => {
    const sCost = skins.find(s => s.id === selectedSkin)?.costMultiplier || 1.0;
    const pCost = payloads.find(p => p.id === selectedPayload)?.costMultiplier || 1.0;
    const spCost = specialties.find(s => s.id === selectedSpecialty)?.costMultiplier || 1.0;
    
    // baseline unit costs
    const baseCost = 2854000;
    return Math.floor(baseCost * sCost * pCost * spCost);
  };

  return (
    <>
      {/* 1. CHASSIS SPECIFICATIONS SECTION */}
      <section id="specifications" className="bg-zinc-100 py-24 border-t border-zinc-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Header Typography */}
          <div className="text-center mb-16 space-y-4">
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-orange-500 font-semibold block">自律設計仕様</span>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl xl:text-6xl tracking-tight leading-none text-zinc-950 uppercase">
              NEXT-GEN CHASSIS SPECS
            </h2>
            <p className="font-sans text-sm md:text-base text-zinc-600 max-w-xl mx-auto leading-relaxed">
              Durable physical skeletons custom atmospheric rated to thrive seamlessly within both super-heated vacuum orbits and sub-zero oceanic trenches.
            </p>
          </div>

            {/* Large Interactive Terminal Container */}
          <div className="relative w-full min-h-[70vh] lg:aspect-[16/8.5] bg-zinc-950 rounded-3xl border border-zinc-800 shadow-2xl overflow-hidden mb-12 flex flex-col justify-between">

            {/* Inner HUD Header border, metadata labels */}
            <div className="p-4 md:p-8 flex flex-row items-center justify-between gap-2 border-b border-zinc-900 z-10">
              <div className="flex items-center gap-2 md:gap-3 min-w-0">
                <span className="font-mono text-zinc-50 font-bold uppercase tracking-widest text-[9px] md:text-[11px] flex items-center gap-1.5 md:gap-2 whitespace-nowrap">
                  <span className="inline-block w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-orange-500 animate-ping"></span>
                  NEMESIS MAIN INTERFACE
                </span>
                <span className="hidden md:inline-block h-4 w-px bg-zinc-800"></span>
                <span className="hidden md:inline-block font-mono text-[9px] text-zinc-500 tracking-wider whitespace-nowrap">
                  MODEL: NEMESIS-X1 // STATUS: NOMINAL
                </span>
              </div>

              {/* Toggle controls */}
              <div className="flex bg-zinc-900 border border-zinc-800 rounded-full p-0.5 md:p-1 shrink-0">
                <button
                  onClick={() => setTelemetryView("back")}
                  className={`px-2 md:px-4 py-1 md:py-1.5 rounded-full font-mono text-[7px] md:text-[9px] tracking-wider uppercase font-semibold transition-all ${
                    telemetryView === "back"
                      ? "bg-zinc-50 text-zinc-950 shadow"
                      : "text-zinc-400 hover:text-zinc-50"
                  }`}
                >
                  neural link
                </button>
                <button
                  onClick={() => setTelemetryView("front")}
                  className={`px-2 md:px-4 py-1 md:py-1.5 rounded-full font-mono text-[7px] md:text-[9px] tracking-wider uppercase font-semibold transition-all ${
                    telemetryView === "front"
                      ? "bg-zinc-50 text-zinc-950 shadow"
                      : "text-zinc-400 hover:text-zinc-50"
                  }`}
                >
                  front chassis
                </button>
              </div>
            </div>

            {/* Main Interactive Visual Content */}
            <div className="relative flex-grow pointer-events-auto h-full flex overflow-hidden">
              
              {/* Background visual asset depends on state */}
              {telemetryView === "front" ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src={imgFrontChassis}
                    alt="Nemesis Front Chassis Closeup"
                    className="w-full h-full object-cover opacity-70 scale-105 pointer-events-none transition-all duration-700 select-none"
                  />
                  
                  {/* Floating interactive Hotspots */}
                  {hotspots.map((hs) => (
                    <div
                      key={hs.id}
                      style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                      className="absolute z-30"
                    >
                      <button
                        onMouseEnter={() => setHoveredHotspot(hs)}
                        onMouseLeave={() => setHoveredHotspot(null)}
                        onClick={() => setActiveHotspotDetail(hs)}
                        className="relative group focus:outline-none"
                      >
                        {/* Glowing target pulsing circles */}
                        <span className="absolute -inset-3.5 bg-orange-500/20 rounded-full animate-ping duration-1000"></span>
                        <span className="absolute -inset-2 bg-orange-500/30 rounded-full scale-75 group-hover:scale-100 transition-all"></span>
                        <div className="relative w-4 h-4 rounded-full border-2 border-orange-500 bg-zinc-950 flex items-center justify-center transition-all group-hover:bg-orange-500">
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-50"></span>
                        </div>

                        {/* Tooltip dynamic hover */}
                        <AnimatePresence>
                          {hoveredHotspot?.id === hs.id && (
                            <motion.div
                              initial={{ opacity: 0, y: -8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              className="absolute bottom-6 left-1/2 -translate-x-1/2 w-56 p-3 bg-zinc-950 border border-zinc-800 rounded-lg shadow-2xl z-40 text-left hidden md:block"
                            >
                              <div className="font-tech text-[10px] text-orange-400 font-bold uppercase tracking-wider">{hs.title}</div>
                              <div className="font-sans text-[9px] text-zinc-300 mt-1 uppercase leading-normal">{hs.description}</div>
                              <div className="font-mono text-[7px] text-zinc-500 mt-1.5 uppercase">click unit to bind diagnostics</div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Click-activated popup (mobile) */}
                        <AnimatePresence>
                          {activeHotspotDetail?.id === hs.id && (
                            <motion.div
                              initial={{ opacity: 0, y: -8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              className="absolute bottom-6 left-1/2 -translate-x-1/2 w-64 p-3 bg-white border border-zinc-200 rounded-lg shadow-2xl z-40 text-left md:hidden"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="font-tech text-[10px] text-orange-500 font-bold uppercase tracking-wider">{hs.title}</div>
                                <span
                                  onClick={(e) => { e.stopPropagation(); setActiveHotspotDetail(null); }}
                                  className="text-zinc-400 hover:text-zinc-900 shrink-0 cursor-pointer"
                                >
                                  <X className="w-3 h-3" />
                                </span>
                              </div>
                              <div className="font-sans text-[9px] text-zinc-600 mt-1 leading-normal">{hs.description}</div>
                              <div className="font-mono text-[7px] text-zinc-400 mt-1.5 leading-normal">{hs.fullInfo}</div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Back mechanics carbon view layout */}
                  <img
                    src={imgCyberbotHeadset}
                    alt="CyberBot Headset Interface"
                    className="w-full h-full object-cover opacity-65 scale-102 pointer-events-none transition-all duration-700 select-none animate-pulse"
                  />

                  {/* Left Japanese overlay letters */}
                  <div className="absolute top-4 md:top-10 left-4 md:left-10 font-bold font-sans text-zinc-50/20 text-2xl md:text-4xl select-none leading-tight tracking-[0.2em]">
                    遠隔<br />操作
                  </div>

                  {/* Right specs tech frame box */}
                  <div className="absolute top-4 md:top-10 right-4 md:right-10 border border-zinc-700/60 p-2 md:p-4 font-mono text-[7px] md:text-[9px] text-zinc-400 space-y-0.5 md:space-y-1 bg-zinc-950/70 backdrop-blur-md rounded">
                    <div>OPERATOR: CMD-0941</div>
                    <div>LINK: NEURAL BRIDGE v3.2</div>
                    <div className="text-orange-400">SYNC: STABLE</div>
                    <div>LATENCY: 4.2ms</div>
                  </div>

                  {/* Right Bottom Live Terminal Assembly readout */}
                  <div className="absolute bottom-4 md:bottom-10 right-4 md:right-10 left-4 md:left-auto max-w-full md:max-w-sm w-auto md:w-80 bg-zinc-950/80 backdrop-blur border border-zinc-800 p-3 md:p-4 rounded-xl font-mono text-[7px] md:text-[8px] text-zinc-400 space-y-1.5 md:space-y-2 select-none shadow-2xl">
                    <div className="flex items-center gap-1.5 border-b border-zinc-900 pb-1.5">
                      <Eye className="w-3.5 h-3.5 text-zinc-500" />
                      <span className="text-zinc-200 tracking-wider font-bold">AR VISION FEED</span>
                    </div>
                    <div className="space-y-1 overflow-hidden h-28 leading-normal text-zinc-400">
                      {consoleLines.length === 0 ? (
                        <div className="text-zinc-600 italic">[Listening for system hooks...]</div>
                      ) : (
                        consoleLines.map((line, idx) => (
                          <div key={idx} className={`${line.includes("READY") || line.includes("OK") ? "text-emerald-400" : line.includes("Validate") ? "text-orange-400" : ""}`}>
                            {line}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Inside Left bottom action overlay card */}
              <div className="hidden lg:block absolute bottom-8 left-8 z-20 max-w-sm bg-zinc-950/80 backdrop-blur border border-zinc-800 p-5 rounded-2xl">
                <div className="font-mono text-[8px] text-zinc-500 tracking-widest uppercase">CONSEQUENTIAL DESIGN</div>
                <h3 className="font-display font-extrabold text-xl lg:text-2xl text-zinc-50 mt-1 uppercase tracking-tight">ENGINEERED SHIELDING</h3>
                <p className="font-sans text-[10px] text-zinc-400 mt-2 leading-relaxed">
                  Every chassis integrates high-tensile carbon composite plating backed by double-wall copper conduit pipes, mitigating atmospheric friction and structural load displacement.
                </p>
                <div className="mt-4">
                  <button
                    onClick={onCloseConfigurator}
                    className="inline-flex items-center gap-2 font-mono text-[9px] font-bold text-zinc-950 bg-zinc-50 hover:bg-orange-500 hover:text-white transition-all px-4 py-2 rounded-full shadow"
                  >
                    DEPLOY UNIT SPECIFICATIONS
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom mini telemetry footer bar */}
            <div className="p-4 md:px-8 border-t border-zinc-900 flex items-center justify-between text-[9px] font-mono text-zinc-500 bg-zinc-950 z-10 uppercase">
              <div className="flex items-center gap-4">
                <span>COORD: ALTITUDE // 980.4 KM</span>
                <span className="hidden md:inline">•</span>
                <span>REG: SHI-7719</span>
              </div>
              <div className="flex gap-4">
                <span>ORBIT: HIGH CONDUIT</span>
                <span>DECEL: AUTOMATIC</span>
              </div>
            </div>
          </div>

          {/* Underlay state switching Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-16">
            {["Deep-Sea Underlay", "Orbital Shell", "Lithosphere Core", "Interstellar Shield"].map((pill, idx) => (
              <button
                key={pill}
                onClick={() => setSelectedPill(idx)}
                className={`font-mono text-[10px] uppercase font-bold tracking-widest px-6 py-2.5 rounded-full border transition-all ${
                  selectedPill === idx
                    ? "bg-zinc-950 text-white border-zinc-950 scale-102"
                    : "bg-white text-zinc-600 border-zinc-300/80 hover:bg-zinc-50"
                }`}
              >
                {pill}
              </button>
            ))}
          </div>

          {/* Big custom statistics columns below suit specifications */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-zinc-200/80 pt-16">
            <div className="text-center space-y-1 select-none">
              <div className="font-mono text-[9px] text-orange-500 uppercase tracking-widest font-bold">OPERABILITY</div>
              <p className="font-display font-extrabold text-3xl md:text-4xl xl:text-5xl tracking-tight leading-none text-zinc-950">600+</p>
              <p className="font-sans text-[10px] text-zinc-500 uppercase tracking-wider">Missions Supported</p>
            </div>
            <div className="text-center space-y-1 select-none">
              <div className="font-mono text-[9px] text-orange-500 uppercase tracking-widest font-bold">STABILITY</div>
              <p className="font-display font-extrabold text-3xl md:text-4xl xl:text-5xl tracking-tight leading-none text-zinc-950">100%</p>
              <p className="font-sans text-[10px] text-zinc-500 uppercase tracking-wider">Pressure Integrity</p>
            </div>
            <div className="text-center space-y-1 select-none">
              <div className="font-mono text-[9px] text-orange-500 uppercase tracking-widest font-bold">TOLERANCE</div>
              <p className="font-display font-extrabold text-3xl md:text-4xl xl:text-5xl tracking-tight leading-none text-zinc-950">0.001%</p>
              <p className="font-sans text-[10px] text-zinc-500 uppercase tracking-wider">Failure Rate</p>
            </div>
            <div className="text-center space-y-1 select-none font-bold">
              <div className="font-mono text-[9px] text-orange-500 uppercase tracking-widest font-bold">HORIZON</div>
              <p className="font-display font-extrabold text-3xl md:text-4xl xl:text-5xl tracking-tight leading-none text-zinc-950">∞</p>
              <p className="font-sans text-[10px] text-zinc-500 uppercase tracking-wider">Possibilities</p>
            </div>
          </div>

        </div>
      </section>

      {/* 2. CHASSIS CORES / SYSTEM COMPONENTS SECTION */}
      <section id="solutions" className="bg-zinc-100 py-24 border-t border-zinc-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-24">
            
            {/* Left side text column */}
            <div className="lg:col-span-4 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 bg-zinc-50 font-mono text-[9px] text-zinc-650 tracking-wider">
                <span>SYNTHETIC CARDIAC CORE</span>
              </div>
              <h3 className="font-display font-extrabold text-5xl md:text-6xl xl:text-7xl uppercase tracking-tight leading-none text-zinc-950">
                THE ENGINE
              </h3>
              <p className="font-sans text-sm text-zinc-600 leading-relaxed">
                Powered by a self-regulating biomechanical pump that delivers pressurized hydraulic energy across all chassis systems, the Nemesis mainframe maintains peak operational endurance through every mission cycle.
              </p>
              
              <div className="space-y-4 pt-4">
                <div className="border-l-2 border-orange-500 pl-4 py-1">
                  <h4 className="font-mono text-xs text-zinc-900 uppercase font-bold">CARDIAC PRESSURE REGULATOR</h4>
                  <p className="font-sans text-xs text-zinc-500 mt-1">Maintains hydraulic equilibrium across the synthetic circulatory network under extreme G-loads.</p>
                </div>
                <div className="border-l-2 border-zinc-300 pl-4 py-1">
                  <h4 className="font-mono text-xs text-zinc-400 uppercase font-semibold">BIOMETRIC FEEDBACK LOOP</h4>
                  <p className="font-sans text-xs text-zinc-500 mt-1">Real-time hemodynamic sensor grid monitoring pulse rate, pressure, and structural fatigue margins.</p>
                </div>
              </div>
            </div>

            {/* Center graphical element (glowing halo layout, Image 4 details) */}
            <div className="lg:col-span-8 flex justify-center lg:justify-end relative select-none">
              <div className="relative w-[20rem] h-[20rem] sm:w-[30rem] sm:h-[30rem] md:w-[36rem] md:h-[36rem] flex items-center justify-center">
                
                {/* Decorative rings behind image */}
                <div className="absolute inset-0 border border-zinc-300/90 rounded-full pointer-events-none"></div>
                <div className="absolute inset-4 border border-dashed border-zinc-300/60 rounded-full pointer-events-none"></div>
                <div className="absolute inset-8 border border-zinc-200 rounded-full pointer-events-none"></div>
                <div className="absolute -inset-4 border border-zinc-200 rounded-full pointer-events-none"></div>

                {/* Centered System Core image */}
                <div className="relative z-10 w-full h-full transition-transform hover:scale-105 duration-500">
                  <img
                    src={imgNemesisHeart}
                    alt="Mechanical Synthetic Heart Engine"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* HUD telemetry text overlays pinned with relative absolute points */}
                <div className="absolute md:top-1/4 md:-left-12 -top-2 left-1/2 -translate-x-1/2 md:translate-x-0 font-mono text-[9px] md:text-[10px] text-zinc-700 bg-white/95 px-2.5 md:px-3 py-1.5 rounded-lg shadow-md border border-zinc-200 z-20 whitespace-nowrap">
                  <span className="font-bold block text-orange-500">SYNTHETIC HEART</span>
                  1.2M cycles endurance rated
                </div>

                <div className="absolute md:bottom-1/4 md:-right-(2/3) -bottom-2 left-2/3 -translate-x-1/2 md:translate-x-0 font-mono text-[9px] md:text-[10px] text-zinc-700 bg-white/95 px-2.5 md:px-3 py-1.5 rounded-lg shadow-md border border-zinc-200 z-20 whitespace-nowrap">
                  <span className="font-bold block text-zinc-950">BIOMETRIC PUMP</span>
                  Carbon fiber reinforced aorta
                </div>
              </div>
            </div>
            
          </div>

          {/* ENGINEERED TECHNOLOGY Cards Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-20 border-t border-zinc-200/80">
            
            {/* Column left side callout */}
            <div className="lg:col-span-6 flex flex-col justify-between pr-4 py-2">
              <div className="space-y-4">
                <span className="font-mono text-xs tracking-wider uppercase text-zinc-500 font-bold">ENGINEERED SPECS</span>
                <h3 className="font-display font-extrabold text-4xl md:text-5xl xl:text-6xl uppercase tracking-tight leading-[0.9] text-zinc-950">
                  SYSTEM COMPONENTS
                </h3>
                <p className="font-sans text-xs md:text-sm text-zinc-600 leading-relaxed">
                  Every structural module is rigorously stress-fabricated to exceed standard vacuum pressure load guidelines by 400%.
                </p>
              </div>

              <div className="mt-8 lg:mt-0">
                <button
                  onClick={onCloseConfigurator}
                  className="group relative inline-flex items-center gap-2 rounded-full border border-zinc-300 hover:border-zinc-950 bg-white hover:bg-zinc-950 hover:text-white transition-all px-6 py-3 font-mono text-xs tracking-wider"
                >
                  EXPLORE MODULES
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </div>

            {/* Column right side (Bento layout cards) */}
                <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 justify-items-center lg:justify-items-end">
                
               {/* MOBILITY CARD */}
               <div className="card-hover-box bg-white border border-zinc-200/80 rounded-2xl p-6 pt-5 flex flex-col justify-between hover:shadow-xl hover:scale-[1.01] transition-all group overflow-hidden relative sm:max-w-xs w-full">
                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-6 bg-zinc-100 border border-zinc-200">
                  <img
                    src={imgManipulatorArm}
                    alt="Precision Robotic Jointed Manipulator Hand close-up"
                    className="w-full h-full object-cover grayscale-[10%] group-hover:scale-105 duration-500 ease-out"
                  />
                </div>
                <div>
                  <h4 className="font-display font-bold text-lg text-zinc-950 uppercase tracking-tight">MOBILITY MODULES</h4>
                  <p className="font-sans text-xs text-zinc-500 mt-1 uppercase">Carbon composite multi-joint manipulator arm with integrated servo actuators</p>
                </div>
              </div>

              {/* HUMAN CONTROLLER CARD */}
              <div className="card-hover-box bg-white border border-zinc-200/80 rounded-2xl p-6 pt-5 flex flex-col justify-between hover:shadow-xl hover:scale-[1.01] transition-all group overflow-hidden relative sm:max-w-xs w-full">
                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-6 bg-zinc-100 border border-zinc-200">
                  <img
                    src={imgHumanController}
                    alt="Human Operator Controller Interface"
                    className="w-full h-full object-cover group-hover:scale-105 duration-500 ease-out"
                  />
                </div>
                <div>
                  <h4 className="font-display font-bold text-lg text-zinc-950 uppercase tracking-tight">HUMAN CONTROLLER</h4>
                  <p className="font-sans text-xs text-zinc-500 mt-1 uppercase">Ergonomic neural-linked command interface for real-time remote chassis piloting</p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 3. COSMIC EXPEDITION LANDSCAPE FULL BANNER */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-zinc-950 overflow-hidden">
        {/* Full screen background deep space image */}
        <div className="absolute inset-0">
          <img
            src={imgSpaceExplorer}
            alt="Space Sentinel Android on planet horizon"
            className="w-full h-full object-cover opacity-60 scale-102 select-none pointer-events-none"
          />
          {/* Subtle vignette masks for maximum contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-zinc-950"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/40 via-transparent to-zinc-950/40"></div>
        </div>

        {/* Floating centered text content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 space-y-6">
          <div className="flex justify-center">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-zinc-100 bg-zinc-900/80 px-4 py-1.5 rounded-full border border-zinc-800">
              永遠軌道
            </span>
          </div>
          <h2 className="font-display font-extrabold text-5xl md:text-6xl xl:text-7xl text-zinc-50 tracking-tight leading-none uppercase select-none">
            BUILT FOR THE VOID
          </h2>
          
          <p className="font-sans text-sm md:text-base text-zinc-300 max-w-xl mx-auto leading-relaxed uppercase">
            Autonomic platform hulls formulated with heavy titanium frames and shielding, crafted explicitly for extreme thermal space missions.
          </p>

          <div className="pt-6">
            <button
              onClick={onCloseConfigurator}
              className="group inline-flex items-center gap-3 bg-white text-zinc-950 hover:bg-orange-500 hover:text-white transition-all duration-300 px-8 py-4 rounded-full font-mono text-xs font-bold tracking-widest shadow-2xl"
            >
              MEET THE NEMESIS-X1
              <span className="font-sans">↗</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4. LATEST NEWS SECTION */}
      <section id="news" className="bg-zinc-100 py-24 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-orange-500 font-bold block mb-3">最新情報</span>
              <h2 className="font-display font-extrabold text-5xl md:text-6xl xl:text-7xl text-zinc-950 uppercase tracking-tight leading-none mt-2">
                LATEST NEWS
              </h2>
            </div>
            <div>
              <a
                href="#news"
                className="group inline-flex items-center gap-2 border border-zinc-350 bg-white hover:border-zinc-950 text-zinc-950 transition-all font-mono text-xs font-semibold uppercase px-6 py-3 rounded-full"
              >
                SEE ALL NEWS
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* Three columns grid layout of articles with clean image alignment */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* STORY 1 (NEMESIS FACTORY DEPLOYMENTS) */}
            <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group">
              <div className="space-y-4">
                <p className="font-mono text-[10px] text-zinc-400 font-semibold uppercase">March 12, 2026</p>
                <h3 className="font-tech text-base md:text-lg font-semibold text-zinc-950 leading-snug group-hover:text-orange-500 transition-colors uppercase">
                  NEMESIS COMMISSIONS TOKYO AUTONOMOUS ASSEMBLER GIGA-BAY
                </h3>
                <div className="w-full aspect-[16/10] overflow-hidden rounded-xl border border-zinc-100 bg-zinc-100">
                  <img
                    src={imgNewsFactory}
                    alt="Autonomous robotic assembly line inside factory"
                    className="w-full h-full object-cover group-hover:scale-105 duration-500"
                  />
                </div>
              </div>
              <div className="pt-6 flex justify-between items-center text-zinc-900 border-t border-zinc-100 mt-6">
                <span className="font-mono text-xs font-bold tracking-wider group-hover:translate-x-1 duration-200 uppercase">Read More</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-950 duration-200" />
              </div>
            </div>

            {/* STORY 2 (DEEP SEA EXPEDITIONS) */}
            <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group">
              <div className="space-y-4">
                <p className="font-mono text-[10px] text-zinc-400 font-semibold uppercase">Feb 18, 2026</p>
                <h3 className="font-tech text-base md:text-lg font-semibold text-zinc-950 leading-snug group-hover:text-orange-500 transition-colors uppercase">
                  NEMESIS-D4 SERIES EXPEDITIONS MAPPED DEEP SCIENTIFIC TRENCH CORES
                </h3>
                <div className="w-full aspect-[16/10] overflow-hidden rounded-xl border border-zinc-100 bg-zinc-100">
                  <img
                    src={imgNewsDeepSea}
                    alt="High-tech deep seafloor exploration rover"
                    className="w-full h-full object-cover group-hover:scale-105 duration-500"
                  />
                </div>
              </div>
              <div className="pt-6 flex justify-between items-center text-zinc-900 border-t border-zinc-100 mt-6">
                <span className="font-mono text-xs font-bold tracking-wider group-hover:translate-x-1 duration-200 uppercase">Read More</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-950 duration-200" />
              </div>
            </div>

            {/* STORY 3 (SPACE HABITATION GROUNDING) */}
            <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group">
              <div className="space-y-4">
                <p className="font-mono text-[10px] text-zinc-400 font-semibold uppercase">Jan 30, 2026</p>
                <h3 className="font-tech text-base md:text-lg font-semibold text-zinc-950 leading-snug group-hover:text-orange-500 transition-colors uppercase">
                  JOINT SPACE TELEMETRY STATION SEEDS STRUCTURAL ALGORITHMS
                </h3>
                <div className="w-full aspect-[16/10] overflow-hidden rounded-xl border border-zinc-100 bg-zinc-100">
                  <img
                    src={imgNewsNasa}
                    alt="Control center schematic screen"
                    className="w-full h-full object-cover group-hover:scale-105 duration-500"
                  />
                </div>
              </div>
              <div className="pt-6 flex justify-between items-center text-zinc-900 border-t border-zinc-100 mt-6">
                <span className="font-mono text-xs font-bold tracking-wider group-hover:translate-x-1 duration-200 uppercase">Read More</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-950 duration-200" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. SIDEBAR: CUSTOM BUILD CONFIGURATOR (SLIDES FROM RIGHT ON CLICK 'BUILD UNIT') */}
      <AnimatePresence>
        {isConfiguratorOpen && (
          <>
            {/* Backdrop click closer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={onCloseConfigurator}
              className="fixed inset-0 bg-zinc-950 z-50 pointer-events-auto"
            />

            {/* Configurator Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full max-w-lg bg-white text-zinc-950 z-50 border-l border-zinc-200 p-8 overflow-y-auto flex flex-col justify-between"
            >
              {/* Header section of configurator */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-orange-500" />
                    <span className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase font-semibold">UNIT CONFIGURATION COMMAND</span>
                  </div>
                  <button
                    onClick={onCloseConfigurator}
                    className="p-1.5 rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-zinc-900 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-3xl uppercase tracking-tight">BUILD NEMESIS-X1</h3>
                  <p className="font-sans text-xs text-zinc-500 leading-normal mt-1">Configure chassis platings, cardiac modules, and deep operative specialties.</p>
                </div>
              </div>

              {/* Form Options content */}
              {!formSubmitted ? (
                <form onSubmit={handleBuildSubmit} className="flex-grow my-8 space-y-6">
                  
                  {/* Category 1: Structural Skin Plating */}
                  <div className="space-y-3">
                    <label className="font-mono text-[10px] text-zinc-500 tracking-wider uppercase block font-bold">1. STRUCTURAL PLATINGS (SKIN)</label>
                    <div className="space-y-2">
                      {skins.map((skin) => (
                        <div
                          key={skin.id}
                          onClick={() => setSelectedSkin(skin.id)}
                          className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between gap-3 transition-colors ${
                            selectedSkin === skin.id
                              ? "bg-zinc-100 border-orange-500 text-zinc-900"
                              : "bg-white border-zinc-200 hover:bg-zinc-50 text-zinc-500"
                          }`}
                        >
                          <div className="space-y-0.5">
                            <div className="text-xs font-semibold flex items-center gap-1.5 text-zinc-900">
                              {skin.name}
                              {skin.costMultiplier > 1.0 && (
                                <span className="font-mono text-[8px] bg-orange-100 text-orange-600 px-1.5 py-0.2 rounded">
                                  +{( (skin.costMultiplier - 1) * 100 ).toFixed(0)}%
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-zinc-400 leading-relaxed">{skin.description}</div>
                          </div>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            selectedSkin === skin.id ? "bg-orange-500 border-orange-500" : "border-zinc-300"
                          }`}>
                            {selectedSkin === skin.id && <Check className="w-2.5 h-2.5 text-white" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Category 2: Cardiac & Power Modules */}
                  <div className="space-y-3">
                    <label className="font-mono text-[10px] text-zinc-500 tracking-wider uppercase block font-bold">2. CARDIAC & POWER MODULES</label>
                    <div className="space-y-2">
                      {payloads.map((payload) => (
                        <div
                          key={payload.id}
                          onClick={() => setSelectedPayload(payload.id)}
                          className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between gap-3 transition-colors ${
                            selectedPayload === payload.id
                              ? "bg-zinc-100 border-orange-500 text-zinc-900"
                              : "bg-white border-zinc-200 hover:bg-zinc-50 text-zinc-500"
                          }`}
                        >
                          <div className="space-y-0.5">
                            <div className="text-xs font-semibold flex items-center gap-1.5 text-zinc-900">
                              {payload.name}
                              {payload.costMultiplier > 1.0 && (
                                <span className="font-mono text-[8px] bg-orange-100 text-orange-600 px-1.5 py-0.2 rounded">
                                  +{( (payload.costMultiplier - 1) * 100 ).toFixed(0)}%
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-zinc-400 leading-relaxed">{payload.description}</div>
                          </div>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            selectedPayload === payload.id ? "bg-orange-500 border-orange-500" : "border-zinc-300"
                          }`}>
                            {selectedPayload === payload.id && <Check className="w-2.5 h-2.5 text-white" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Category 3: Specialty Missions Calibration */}
                  <div className="space-y-3">
                    <label className="font-mono text-[10px] text-zinc-500 tracking-wider uppercase block font-bold">3. ENVIRO OPERATIONAL SPECIALTIES</label>
                    <div className="space-y-2">
                      {specialties.map((spec) => (
                        <div
                          key={spec.id}
                          onClick={() => setSelectedSpecialty(spec.id)}
                          className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between gap-3 transition-colors ${
                            selectedSpecialty === spec.id
                              ? "bg-zinc-100 border-orange-500 text-zinc-900"
                              : "bg-white border-zinc-200 hover:bg-zinc-50 text-zinc-500"
                          }`}
                        >
                          <div className="space-y-0.5">
                            <div className="text-xs font-semibold flex items-center gap-1.5 text-zinc-900">
                              {spec.name}
                              {spec.costMultiplier > 1.0 && (
                                <span className="font-mono text-[8px] bg-orange-100 text-orange-600 px-1.5 py-0.2 rounded">
                                  +{( (spec.costMultiplier - 1) * 100 ).toFixed(0)}%
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-zinc-400 leading-relaxed">{spec.description}</div>
                          </div>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            selectedSpecialty === spec.id ? "bg-orange-500 border-orange-500" : "border-zinc-300"
                          }`}>
                            {selectedSpecialty === spec.id && <Check className="w-2.5 h-2.5 text-white" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Deployer Metadata details */}
                  <div className="space-y-4 pt-4 border-t border-zinc-200">
                    <label className="font-mono text-[10px] text-zinc-500 tracking-wider uppercase block font-bold">4. EXPEDITION DEPLOYER CREDENTIALS</label>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <span className="font-mono text-[9px] text-zinc-500 uppercase">Deployer Full Name</span>
                        <input
                          type="text"
                          required
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          placeholder="e.g. Commander Marcus"
                          className="w-full bg-zinc-100 border border-zinc-300 focus:border-orange-500 rounded-lg p-2.5 text-xs text-zinc-700 outline-none placeholder-zinc-400"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <span className="font-mono text-[9px] text-zinc-500 uppercase">Secure Email Gateway</span>
                        <input
                          type="email"
                          required
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                          placeholder="marcus@agency.org"
                          className="w-full bg-zinc-100 border border-zinc-300 focus:border-orange-500 rounded-lg p-2.5 text-xs text-zinc-700 outline-none placeholder-zinc-400"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <span className="font-mono text-[9px] text-zinc-500 uppercase">Expedition Role Title</span>
                      <select
                        value={userRole}
                        onChange={(e) => setUserRole(e.target.value)}
                        className="w-full bg-zinc-100 border border-zinc-300 focus:border-orange-500 rounded-lg p-2.5 text-xs text-zinc-700 outline-none"
                      >
                        <option>Research Expedition Leader</option>
                        <option>Orbital Station Commandant</option>
                        <option>Abyssal Rig Structural Engineer</option>
                        <option>Lead Robotics Surveyor</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <span className="font-mono text-[9px] text-zinc-500 uppercase">Special Directives (Override notes)</span>
                      <textarea
                        rows={2}
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                        placeholder="e.g. Calibrate optical vision sensors for thermal seismic activity."
                        className="w-full bg-zinc-100 border border-zinc-300 focus:border-orange-500 rounded-lg p-2.5 text-xs text-zinc-700 outline-none placeholder-zinc-400 resize-none"
                      />
                    </div>
                  </div>

                  <div className="border-t border-zinc-200 pt-6 flex items-center justify-between">
                    <div>
                      <div className="font-mono text-[9px] text-zinc-500 uppercase">ESTIMATED ASSEMBLE BUDGET</div>
                      <div className="font-tech text-xl text-orange-600 font-bold">${getActiveTotalCost().toLocaleString()} USD</div>
                      <div className="font-sans text-[8px] text-zinc-400 uppercase mt-0.5">including high consequence warranty</div>
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-3 font-mono text-xs font-bold text-white bg-zinc-950 hover:bg-orange-500 rounded-full transition-all flex items-center gap-1.5"
                    >
                      SECURE TELEMETRY ORDER
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>

                </form>
              ) : (
                <div className="flex-grow flex flex-col items-center justify-center text-center space-y-4">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-500 flex items-center justify-center"
                  >
                    <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                  </motion.div>
                  <h4 className="font-display font-extrabold text-2xl uppercase text-zinc-950 tracking-tight">TRANSMISSION COMPLETED</h4>
                  <p className="font-mono text-[10px] text-zinc-500 max-w-sm leading-normal">
                    Secure telemetry dispatch sent. Nemesis assembly payload locked. Initiating clean cold-boot in standard queue.
                  </p>
                  <div className="w-48 bg-zinc-200 h-1.5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2.2 }}
                      className="h-full bg-orange-500"
                    />
                  </div>
                </div>
              )}

              {/* Advanced diagnostic warning at bottom */}
              <div className="border-t border-zinc-200 pt-4 flex items-start gap-2 text-zinc-400">
                <ShieldAlert className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                <span className="font-sans text-[8px] uppercase leading-relaxed">
                  Notice: Autonomous mainframes operate under standard safety protocol 84-C. Modifying structural shells may impact atmospheric seals in temperatures below -160 Kelvin.
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 7. POPUP HOTSPOT DIAGNOSIS DETAIL (activated if hotspot on suite is clicked) */}
      <AnimatePresence>
        {activeHotspotDetail && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveHotspotDetail(null)}
              className="fixed inset-0 bg-zinc-950 z-50 pointer-events-auto hidden md:block"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="fixed bottom-0 left-0 right-0 md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-md md:w-full bg-white text-zinc-950 border border-zinc-200 md:rounded-2xl rounded-t-2xl p-5 md:p-6 z-50 shadow-2xl space-y-3 md:space-y-4 hidden md:block"
            >
              <div className="flex items-center justify-between border-b border-zinc-200 pb-2 md:pb-3">
                <span className="font-mono text-[8px] md:text-[9px] tracking-widest text-zinc-500 uppercase">CARDIAC DIAGNOSTIC CORE</span>
                <button
                  onClick={() => setActiveHotspotDetail(null)}
                  className="p-1 rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-zinc-900"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div>
                <span className="text-[9px] md:text-[10px] font-mono text-orange-500 font-bold block uppercase tracking-wider">HARDWARE LOG</span>
                <h4 className="font-display font-extrabold text-xl md:text-2xl text-zinc-950 uppercase tracking-tight mt-0.5">{activeHotspotDetail.title}</h4>
                <p className="font-sans text-[11px] md:text-xs text-zinc-500 mt-1.5 md:mt-2 leading-relaxed">
                  {activeHotspotDetail.fullInfo}
                </p>
              </div>

              <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3 md:p-3.5 space-y-1 md:space-y-1.5 font-mono text-[8px] md:text-[9px] text-zinc-500">
                <div className="flex justify-between">
                  <span>RESISTIVE EXPANSION:</span>
                  <span className="text-emerald-600 font-semibold uppercase">SECURED</span>
                </div>
                <div className="flex justify-between">
                  <span>OPERATING RATIO:</span>
                  <span className="text-zinc-700">1.04 BAR CRITICAL MAX</span>
                </div>
                <div className="flex justify-between">
                  <span>THERM DISK RATE:</span>
                  <span className="text-zinc-700">-190C TO +250C COMPATIBLE</span>
                </div>
              </div>

              <div className="pt-1 md:pt-2">
                <button
                  onClick={() => setActiveHotspotDetail(null)}
                  className="w-full text-center py-2 md:py-2.5 rounded-xl border border-zinc-300 bg-white hover:bg-zinc-100 transition-colors font-mono text-[9px] md:text-[10px] text-zinc-700"
                >
                  DISMISS DIAGNOSTICS LOG
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}