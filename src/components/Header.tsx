import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Globe, ArrowUpRight, Menu, X, Radio, ChevronDown, Monitor } from "lucide-react";

interface HeaderProps {
  onOpenConfigurator: () => void;
}

export default function Header({ onOpenConfigurator }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const menuItems = [
    {
      name: "SOLUTIONS",
      items: [
        { label: "Deep-sea Exploration", desc: "Titanium alloy frames for abyssal pressures." },
        { label: "Orbital Space Assembly", desc: "Zero-G cold-welding nanites & thruster units." },
        { label: "Tactical Response", desc: "High-temperature situational operations." },
      ]
    },
    {
      name: "COMPANY",
      items: [
        { label: "About Nemesis", desc: "Pioneering the future of physical autonomy." },
        { label: "Research Lab", desc: "Active exploratory research into synthetic cardiac engines." },
        { label: "Carbon Metrics", desc: "100% sustainable localized assembly hubs." },
      ]
    },
    {
      name: "PRESS",
      items: [
        { label: "News Wire", desc: "Official updates, mission briefs, and patch notes." },
        { label: "Media Kit", desc: "High-fidelity vectors, imagery, and 3D mockups." },
      ]
    },
    {
      name: "SUPPORT",
      items: [
        { label: "Engineering Portal", desc: "Access telemetry documentation and CAD files." },
        { label: "Direct Inquiries", desc: "Connect with our deployment counselors." },
      ]
    }
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-white/70 backdrop-blur-xl border-b border-zinc-200/60 text-zinc-900 transition-colors">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        {/* Left Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <span className="font-display font-extrabold text-2xl tracking-wider text-zinc-900 group-hover:text-orange-500 transition-colors">
            NEMESIS
          </span>
        </a>

        {/* Center Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-8">
          {menuItems.map((menu) => (
            <div
              key={menu.name}
              className="relative"
              onMouseEnter={() => setActiveDropdown(menu.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="font-mono text-xs font-semibold tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors flex items-center gap-1.5 py-4">
                {menu.name}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  activeDropdown === menu.name ? "rotate-180 text-orange-500" : "text-zinc-400"
                }`} />
              </button>

              <AnimatePresence>
                {activeDropdown === menu.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-72 bg-white border border-zinc-200 rounded-xl p-4 shadow-xl"
                  >
                    <div className="space-y-4">
                      <div className="text-[10px] font-mono text-zinc-400 tracking-wider uppercase border-b border-zinc-100 pb-2">
                        System Modules
                      </div>
                      {menu.items.map((item, idx) => (
                        <a
                          key={idx}
                          href="#solutions"
                          className="block hover:bg-zinc-50 p-2 rounded-lg group/item transition-all"
                        >
                          <div className="text-xs font-semibold text-zinc-700 group-hover/item:text-orange-500 transition-colors flex items-center justify-between">
                            {item.label}
                            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-300 group-hover/item:text-orange-500 transition-colors duration-200 opacity-0 group-hover/item:opacity-100 translate-y-1 group-hover/item:translate-y-0" />
                          </div>
                          <div className="text-[10px] text-zinc-400 mt-1 leading-normal">
                            {item.desc}
                          </div>
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Right Status Indicator & Call to Action (Desktop) */}
        <div className="hidden lg:flex items-center gap-6">


          <button
            onClick={onOpenConfigurator}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-zinc-950 bg-zinc-950 px-6 py-2.5 font-mono text-xs font-bold text-white shadow-md hover:bg-white hover:text-zinc-950 hover:scale-105 duration-200"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              BUILD UNIT
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </button>
        </div>

        {/* Hamburger (Mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 rounded-lg text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6 text-orange-500" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden w-full bg-white/95 backdrop-blur-xl border-t border-zinc-200 overflow-hidden"
          >
            <div className="px-6 py-8 space-y-6">
              {menuItems.map((menu) => (
                <div key={menu.name} className="space-y-2">
                  <div className="font-mono text-[10px] text-zinc-400 tracking-widest">{menu.name}</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 pl-2">
                    {menu.items.map((item, idx) => (
                      <a
                        key={idx}
                        href="#solutions"
                        onClick={() => setIsOpen(false)}
                        className="block p-2 hover:bg-zinc-50 rounded-lg group"
                      >
                        <div className="text-xs font-semibold text-zinc-700 group-hover:text-orange-500 transition-colors">
                          {item.label}
                        </div>
                        <div className="text-[10px] text-zinc-400 mt-0.5">{item.desc}</div>
                      </a>
                    ))}
                  </div>
                </div>
              ))}

              <div className="border-t border-zinc-200 pt-6 flex flex-col gap-4">

                <button
                  onClick={() => {
                    onOpenConfigurator();
                    setIsOpen(false);
                  }}
                  className="w-full text-center py-3 rounded-full bg-zinc-100 text-zinc-950 font-mono text-xs font-bold hover:bg-orange-500 hover:text-white transition-all shadow-lg"
                >
                  BUILD NEMESIS UNIT ↗
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
