import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Search, Menu, X, Check, Bell, Home, Settings, User } from "lucide-react";

/**
 * OPEN UI - EXAMPLE COMPONENTS
 * Copy and paste these directly into the Component Editor
 * 
 * Categories: 
 * Buttons, Cards, Forms, Inputs, Modals, Navigation, Animations, Loaders, Layouts
 */

// ==========================================
// 1. BUTTONS
// ==========================================

/* 
  Title: Magical Glow Button
  Description: A sleek button with a smooth animated glowing border.
  Dependencies: framer-motion, lucide-react
  Usage Example:
  import { MagicalButton } from "./components/MagicalButton"
  
  export default function App() {
    return <MagicalButton />
  }
*/
export function MagicalButton() {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative group px-8 py-3 rounded-full bg-black text-white font-medium overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full blur-xl -z-10" />
      <div className="absolute inset-[1px] bg-black rounded-full -z-10" />
      <span className="flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-purple-400 group-hover:animate-pulse" />
        Unlock Magic
      </span>
    </motion.button>
  );
}

/* 
  Title: Minimalist Arrow Button
  Description: Clean pill button where the arrow slides in on hover.
  Dependencies: framer-motion, lucide-react
  Usage Example:
  import { ArrowButton } from "./components/ArrowButton"
  
  export default function App() {
    return <ArrowButton />
  }
*/
export function ArrowButton() {
  return (
    <motion.button
      whileHover="hover"
      className="group flex items-center gap-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 border-none text-white px-6 py-2.5 rounded-full shadow-lg shadow-fuchsia-600/30"
    >
      <span className="font-medium text-sm">Explore Features</span>
      <motion.div
        variants={{
          hover: { x: 5, backgroundColor: "#fff", color: "#d946ef" }
        }}
        className="bg-white/20 text-white rounded-full p-1.5 transition-colors"
      >
        <ArrowRight className="w-3.5 h-3.5" />
      </motion.div>
    </motion.button>
  );
}

// ==========================================
// 2. CARDS
// ==========================================

/* 
  Title: Glassmorphic Pricing Card
  Description: A modern frosted glass card ideal for pricing or featured plans.
  Dependencies: framer-motion, lucide-react
*/
export function GlassCard() {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="max-w-sm p-8 rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden"
    >
      <div className="absolute -top-20 -right-20 w-56 h-56 bg-cyan-500 rounded-full blur-[80px] opacity-40 mix-blend-screen" />
      <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-fuchsia-500 rounded-full blur-[80px] opacity-40 mix-blend-screen" />
      <h3 className="text-xl font-medium text-white mb-2 relative z-10">Pro Plan</h3>
      <div className="flex items-end gap-1 mb-6 text-white relative z-10">
        <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 to-fuchsia-300">$29</span>
        <span className="text-zinc-300 text-sm mb-1">/mo</span>
      </div>
      <div className="space-y-3 mb-8 relative z-10">
        {['Unlimited projects', 'Advanced Analytics', 'Priority Support'].map((ft, i) => (
          <div key={i} className="flex items-center gap-3 text-sm text-zinc-200">
            <Check className="w-4 h-4 text-cyan-400 font-bold" /> {ft}
          </div>
        ))}
      </div>
      <button className="relative w-full py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium hover:from-cyan-400 hover:to-blue-400 transition-colors shadow-[0_0_20px_rgba(6,182,212,0.4)] z-10">
        Upgrade Now
      </button>
    </motion.div>
  );
}

/* 
  Title: Cyberpunk Product Card
  Description: High contrast neon tech card.
  Dependencies: framer-motion
*/
export function CyberCard() {
  return (
    <div className="group relative w-72 h-96 bg-zinc-950 border border-zinc-900 p-6 flex flex-col justify-end overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent z-10" />
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-400 via-transparent to-transparent"
      />
      <div className="relative z-20">
        <span className="text-xs font-mono text-green-400 mb-2 block tracking-widest uppercase">New Release</span>
        <h2 className="text-2xl font-bold text-white mb-1">Neural Engine v2</h2>
        <p className="text-sm text-zinc-500">Accelerate your local environment with discrete AI processing.</p>
      </div>
    </div>
  );
}

// ==========================================
// 3. FORMS
// ==========================================

/* 
  Title: Animated Waitlist Form
  Description: Simple email waitlist form that transitions to success state.
  Dependencies: framer-motion, lucide-react
*/
export function WaitlistForm() {
  const [status, setStatus] = useState("idle");

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => setStatus("success"), 1500);
  };

  return (
    <div className="relative p-8 bg-black rounded-2xl max-w-md w-full border border-zinc-800 shadow-2xl overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full blur-[100px] opacity-20" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500 rounded-full blur-[100px] opacity-20" />
      <h2 className="text-2xl font-bold text-white mb-2 relative z-10">Join the Beta</h2>
      <p className="text-zinc-400 text-sm mb-6 relative z-10">Enter your email to get early access.</p>

      <form onSubmit={handleSubmit} className="relative z-10">
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-xl flex items-center gap-3 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
            >
              <Check className="w-5 h-5 flex-shrink-0" /> You're on the beautiful list!
            </motion.div>
          ) : (
            <motion.div key="form" exit={{ opacity: 0, y: -10 }} className="flex gap-2">
              <input
                type="email" required placeholder="name@company.com"
                className="flex-1 bg-zinc-900 border border-zinc-700/50 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500 transition-colors shadow-inner"
              />
              <button disabled={status === "loading"} className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition disabled:opacity-50 min-w-[120px] shadow-lg shadow-emerald-500/20">
                {status === "loading" ? "Joining..." : "Join"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}

// ==========================================
// 4. INPUTS
// ==========================================

/* 
  Title: Expanding Search Bar
  Description: Search icon that expands into a full input field on focus.
  Dependencies: framer-motion, lucide-react
*/
export function ExpandingSearch() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={false}
      animate={{ width: isExpanded ? 240 : 44 }}
      className="relative h-11 bg-zinc-900 border border-zinc-800 rounded-full overflow-hidden flex items-center"
    >
      <button
        onClick={() => setIsExpanded(true)}
        className="absolute left-0 w-11 h-11 flex items-center justify-center text-zinc-400 hover:text-white z-10"
      >
        <Search className="w-4 h-4" />
      </button>
      <input
        type="text"
        placeholder="Search components..."
        onFocus={() => setIsExpanded(true)}
        onBlur={(e) => { if (!e.target.value) setIsExpanded(false) }}
        className="w-full h-full bg-transparent pl-11 pr-4 text-sm text-white outline-none placeholder:text-zinc-600"
      />
    </motion.div>
  );
}

// ==========================================
// 5. MODALS
// ==========================================

/* 
  Title: Spring Action Modal
  Description: A delightful modal that springs up with an animated backdrop.
  Dependencies: framer-motion, lucide-react
*/
export function SpringModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium">Open Spring Modal</button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="relative w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl"
            >
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                <Bell className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Enable Notifications</h3>
              <p className="text-zinc-400 text-sm mb-6">Get pinged when someone submits a new stunning component.</p>
              <div className="flex gap-3">
                <button onClick={() => setIsOpen(false)} className="flex-1 py-2.5 rounded-xl border border-zinc-700 text-white hover:bg-zinc-800 transition">Skip</button>
                <button onClick={() => setIsOpen(false)} className="flex-1 py-2.5 rounded-xl bg-white text-black font-medium hover:bg-zinc-200 transition">Allow</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

// ==========================================
// 6. NAVIGATION
// ==========================================

/* 
  Title: macOS Style Dock
  Description: Magnetic floating dock for primary navigation.
  Dependencies: framer-motion, lucide-react
*/
export function MacDock() {
  const items = [
    { icon: Home, label: "Home" },
    { icon: User, label: "Profile" },
    { icon: Settings, label: "Settings" }
  ];

  return (
    <div className="px-4 py-2 bg-white/10 border border-white/10 rounded-2xl backdrop-blur-xl flex items-center gap-2">
      {items.map((item, i) => (
        <motion.button
          key={i}
          whileHover={{ scale: 1.2, y: -5 }}
          className="p-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-white transition-colors cursor-pointer group relative"
        >
          <item.icon className="w-5 h-5" />
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
            {item.label}
          </span>
        </motion.button>
      ))}
    </div>
  );
}

// ==========================================
// 7. ANIMATIONS
// ==========================================

/* 
  Title: Staggered Fade Up Text
  Description: Reveals words one by one beautifully.
  Dependencies: framer-motion
*/
export function TextReveal() {
  const text = "Designing the future, one component at a time.";
  const words = text.split(" ");

  return (
    <h1 className="text-4xl font-bold text-white flex flex-wrap gap-x-2">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
        >
          {word}
        </motion.span>
      ))}
    </h1>
  );
}

// ==========================================
// 8. LOADERS
// ==========================================

/* 
  Title: Bouncing Dots Loader
  Description: Smooth sequential dot bounce.
  Dependencies: framer-motion
*/
export function BouncingDots() {
  return (
    <div className="flex gap-2 p-6 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent" />
      {['#3b82f6', '#8b5cf6', '#ec4899'].map((color, i) => (
        <motion.div
           key={i}
           animate={{ y: [0, -12, 0], scale: [1, 1.1, 1] }}
           transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
           className="w-3.5 h-3.5 rounded-full shadow-[0_0_10px_currentColor] relative"
           style={{ backgroundColor: color, color: color }}
        />
      ))}
    </div>
  );
}

// ==========================================
// 9. LAYOUTS
// ==========================================

/* 
  Title: Simple Bento Grid
  Description: A quick asymmetrical bento box layout structure.
  Dependencies: (none)
*/
export function BentoGrid() {
  return (
    <div className="grid grid-cols-3 gap-4 max-w-2xl w-full h-80">
      <div className="col-span-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 text-white flex flex-col justify-between">
        <h3 className="text-2xl font-bold">Main Dashboard</h3>
        <p className="opacity-80 text-sm">Visualize all your core metrics</p>
      </div>
      <div className="col-span-1 bg-zinc-900 border border-zinc-800 rounded-3xl p-6 text-white flex flex-col justify-between">
        <h4 className="font-semibold">Quick Stats</h4>
        <div className="text-3xl font-bold text-green-400">+24%</div>
      </div>
      <div className="col-span-1 bg-zinc-900 border border-zinc-800 rounded-3xl p-6" />
      <div className="col-span-2 bg-zinc-900 border border-zinc-800 rounded-3xl p-6" />
    </div>
  );
}
