import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Search, Check, Bell, Home, Settings, User } from "lucide-react";

/**
 * OPEN UI - EXAMPLE COMPONENTS
 * Copy and paste these directly into the Component Editor
 *
 * Categories:
 * Buttons, Cards, Forms, Inputs, Modals, Navigation, Animations, Loaders, Layouts
 *
 * themeSupport: "both"  ← all components below support light + dark mode
 */

// ==========================================
// 1. BUTTONS
// ==========================================

/*
  Title: Magical Glow Button
  Description: A sleek pill button with an animated gradient glow that works in both light and dark themes.
  Dependencies: framer-motion, lucide-react
  themeSupport: both
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
      className="relative group px-8 py-3 rounded-full bg-zinc-900 dark:bg-zinc-900 text-white font-medium overflow-hidden shadow-lg"
    >
      {/* glow layer */}
      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10" />
      {/* inner fill */}
      <span className="absolute inset-[1.5px] rounded-full bg-zinc-900 dark:bg-zinc-900 -z-10" />
      <span className="flex items-center gap-2 relative z-10">
        <Sparkles className="w-4 h-4 text-purple-400 group-hover:animate-pulse" />
        Unlock Magic
      </span>
    </motion.button>
  );
}

/*
  Title: Gradient Arrow Button
  Description: Clean pill button with a sliding arrow icon on hover. Adapts to light and dark backgrounds.
  Dependencies: framer-motion, lucide-react
  themeSupport: both
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
      className="inline-flex items-center gap-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-5 py-2.5 rounded-full shadow-lg shadow-fuchsia-600/25 font-medium text-sm"
    >
      <span>Explore Features</span>
      <motion.span
        variants={{ hover: { x: 4, backgroundColor: "#fff", color: "#d946ef" } }}
        className="bg-white/20 text-white rounded-full p-1.5 transition-colors"
      >
        <ArrowRight className="w-3.5 h-3.5" />
      </motion.span>
    </motion.button>
  );
}

// ==========================================
// 2. CARDS
// ==========================================

/*
  Title: Glassmorphic Pricing Card
  Description: A frosted-glass pricing card with gradient accents. Readable in both light and dark themes.
  Dependencies: framer-motion, lucide-react
  themeSupport: both
*/
export function GlassCard() {
  const features = ["Unlimited projects", "Advanced analytics", "Priority support"];
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative max-w-sm w-full p-8 rounded-3xl border border-white/20 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-2xl shadow-2xl overflow-hidden"
    >
      {/* decorative blobs */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-cyan-400 dark:bg-cyan-500 rounded-full blur-[72px] opacity-30 pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-fuchsia-400 dark:bg-fuchsia-500 rounded-full blur-[72px] opacity-30 pointer-events-none" />

      <p className="text-xs font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-4">Pro Plan</p>
      <div className="flex items-end gap-1 mb-6">
        <span className="text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-cyan-500 to-fuchsia-500">$29</span>
        <span className="text-zinc-500 dark:text-zinc-400 text-sm mb-1.5">/month</span>
      </div>

      <ul className="space-y-3 mb-8">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-3 text-sm text-zinc-700 dark:text-zinc-300">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-cyan-500/15 dark:bg-cyan-500/20 flex items-center justify-center">
              <Check className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
            </span>
            {f}
          </li>
        ))}
      </ul>

      <button className="relative w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition shadow-lg shadow-cyan-500/30">
        Upgrade Now
      </button>
    </motion.div>
  );
}

/*
  Title: Product Spotlight Card
  Description: A sleek dark card with a subtle radial hover glow. Works on both light and dark backgrounds.
  Dependencies: framer-motion
  themeSupport: both
*/
export function ProductCard() {
  return (
    <motion.div
      whileHover="hover"
      className="group relative w-72 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden shadow-md"
    >
      {/* top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-emerald-400 to-cyan-500" />

      {/* hover glow */}
      <motion.div
        variants={{ hover: { opacity: 1 } }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(52,211,153,0.08),_transparent_70%)] pointer-events-none"
      />

      <div className="p-6">
        <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full mb-4">
          New Release
        </span>
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 leading-snug">Neural Engine v2</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
          Accelerate your local environment with discrete AI processing.
        </p>
        <div className="mt-6 flex items-center justify-between">
          <span className="text-2xl font-extrabold text-zinc-900 dark:text-white">$199</span>
          <button className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline underline-offset-2">
            Learn more →
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ==========================================
// 3. FORMS
// ==========================================

/*
  Title: Animated Waitlist Form
  Description: Email waitlist form that transitions to a success state. Fully theme-aware.
  Dependencies: framer-motion, lucide-react
  themeSupport: both
*/
export function WaitlistForm() {
  const [status, setStatus] = useState("idle");

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => setStatus("success"), 1500);
  };

  return (
    <div className="relative w-full max-w-md p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-xl overflow-hidden">
      {/* decorative blobs */}
      <div className="absolute top-0 right-0 w-56 h-56 bg-emerald-400 dark:bg-emerald-500 rounded-full blur-[90px] opacity-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-indigo-400 dark:bg-indigo-500 rounded-full blur-[90px] opacity-10 pointer-events-none" />

      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-1 relative z-10">Join the Beta</h2>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 relative z-10">Enter your email to get early access.</p>

      <form onSubmit={handleSubmit} className="relative z-10">
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-sm font-medium"
            >
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                <Check className="w-3.5 h-3.5 text-white" />
              </span>
              You're on the list — we'll be in touch!
            </motion.div>
          ) : (
            <motion.div key="form" exit={{ opacity: 0, y: -8 }} className="flex gap-2">
              <input
                type="email"
                required
                placeholder="name@company.com"
                className="flex-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition"
              />
              <button
                disabled={status === "loading"}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-5 py-3 rounded-xl text-sm font-semibold hover:opacity-90 active:scale-95 transition disabled:opacity-50 shadow-lg shadow-emerald-500/20 whitespace-nowrap"
              >
                {status === "loading" ? "Joining…" : "Join now"}
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
  Description: A compact search icon that smoothly expands into a full input on focus. Theme-aware.
  Dependencies: framer-motion, lucide-react
  themeSupport: both
*/
export function ExpandingSearch() {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      animate={{ width: expanded ? 260 : 44 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="relative h-11 rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 overflow-hidden flex items-center shadow-sm"
    >
      <button
        onClick={() => setExpanded(true)}
        className="absolute left-0 w-11 h-11 flex items-center justify-center text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 z-10 transition-colors"
      >
        <Search className="w-4 h-4" />
      </button>
      <input
        type="text"
        placeholder="Search components…"
        onFocus={() => setExpanded(true)}
        onBlur={(e) => { if (!e.target.value) setExpanded(false); }}
        className="w-full h-full bg-transparent pl-11 pr-4 text-sm text-zinc-900 dark:text-white outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
      />
    </motion.div>
  );
}

// ==========================================
// 5. MODALS
// ==========================================

/*
  Title: Spring Action Modal
  Description: A polished modal that springs in with a blurred backdrop. Fully theme-aware.
  Dependencies: framer-motion, lucide-react
  themeSupport: both
*/
export function SpringModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-sm font-semibold transition shadow-lg shadow-blue-600/25"
      >
        Open Modal
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
            />
            {/* panel */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 16 }}
              transition={{ type: "spring", damping: 22, stiffness: 320 }}
              className="relative w-full max-w-sm rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-2xl"
            >
              <div className="w-11 h-11 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center mb-4">
                <Bell className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-1.5">Enable Notifications</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed">
                Get pinged when someone submits a stunning new component.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
                >
                  Skip
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-semibold hover:opacity-90 active:scale-95 transition"
                >
                  Allow
                </button>
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
  Description: Floating magnetic dock for primary navigation. Adapts to light and dark themes.
  Dependencies: framer-motion, lucide-react
  themeSupport: both
*/
export function MacDock() {
  const items = [
    { icon: Home, label: "Home" },
    { icon: User, label: "Profile" },
    { icon: Settings, label: "Settings" },
  ];

  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-2xl border border-zinc-200 dark:border-zinc-700/60 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl shadow-xl shadow-black/10 dark:shadow-black/40">
      {items.map(({ icon: Icon, label }) => (
        <motion.button
          key={label}
          whileHover={{ scale: 1.25, y: -6 }}
          transition={{ type: "spring", stiffness: 400, damping: 18 }}
          className="relative p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 transition-colors group"
        >
          <Icon className="w-5 h-5" />
          <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[11px] font-medium py-1 px-2.5 rounded-lg opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none shadow-lg">
            {label}
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
  Title: Staggered Word Reveal
  Description: Reveals words one by one with a smooth fade-up. Works on any background.
  Dependencies: framer-motion
  themeSupport: both
*/
export function TextReveal() {
  const words = "Designing the future, one component at a time.".split(" ");

  return (
    <h1 className="text-4xl font-bold text-zinc-900 dark:text-white flex flex-wrap gap-x-2.5 gap-y-1 leading-tight">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
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
  Description: Smooth sequential dot bounce with gradient colors. Theme-aware container.
  Dependencies: framer-motion
  themeSupport: both
*/
export function BouncingDots() {
  const dots = ["#3b82f6", "#8b5cf6", "#ec4899"];

  return (
    <div className="inline-flex items-center gap-2.5 px-6 py-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-md">
      {dots.map((color, i) => (
        <motion.span
          key={i}
          animate={{ y: [0, -10, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 0.75, repeat: Infinity, delay: i * 0.14, ease: "easeInOut" }}
          className="block w-3 h-3 rounded-full"
          style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}80` }}
        />
      ))}
    </div>
  );
}

// ==========================================
// 9. LAYOUTS
// ==========================================

/*
  Title: Bento Grid Layout
  Description: Asymmetrical bento-box layout with theme-aware tiles.
  Dependencies: (none)
  themeSupport: both
*/
export function BentoGrid() {
  return (
    <div className="grid grid-cols-3 gap-3 max-w-2xl w-full h-80">
      {/* main tile */}
      <div className="col-span-2 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 p-6 text-white flex flex-col justify-between shadow-lg shadow-indigo-500/20">
        <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-200">Overview</span>
        <div>
          <h3 className="text-2xl font-bold leading-snug">Main Dashboard</h3>
          <p className="text-sm text-indigo-200 mt-1">Visualize all your core metrics</p>
        </div>
      </div>

      {/* stat tile */}
      <div className="col-span-1 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5 flex flex-col justify-between shadow-sm">
        <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Growth</span>
        <div>
          <div className="text-3xl font-extrabold text-emerald-500">+24%</div>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">vs last month</p>
        </div>
      </div>

      {/* small tile */}
      <div className="col-span-1 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5 flex flex-col justify-between shadow-sm">
        <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Users</span>
        <div className="text-3xl font-extrabold text-zinc-900 dark:text-white">1.2k</div>
      </div>

      {/* wide tile */}
      <div className="col-span-2 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5 flex items-center gap-4 shadow-sm">
        <div className="flex-1">
          <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1">Revenue</p>
          <div className="h-2 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
            <div className="h-full w-3/5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" />
          </div>
        </div>
        <span className="text-sm font-bold text-zinc-900 dark:text-white whitespace-nowrap">$18,240</span>
      </div>
    </div>
  );
}
