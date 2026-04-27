//dependency
// framer-motion lucide-react


//usage
/*
import { GlassCard } from "./components/card"
  
  export default function App() {
    return < GlassCard />
  }
    */

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const features = ["Unlimited projects", "Advanced Analytics", "Priority Support"];

export function GlassCard() {

  return (
    <motion.div
      whileHover={{ y: -5 }}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 24,
        padding: "2rem",
        width: "100%",
        maxWidth: 340,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        background: isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.72)",
        border: isDark
          ? "1px solid rgba(255,255,255,0.1)"
          : "1px solid rgba(99,120,200,0.2)",
        boxShadow: isDark
          ? "0 24px 48px rgba(0,0,0,0.45)"
          : "0 8px 32px rgba(80,100,180,0.14), 0 1.5px 0 rgba(255,255,255,0.9) inset",
      }}
    >
      {/* Glow blobs */}
      <div style={{
        position: "absolute", top: -80, right: -80,
        width: 180, height: 180, borderRadius: "50%", pointerEvents: "none",
        background: isDark
          ? "radial-gradient(circle, rgba(99,130,255,0.55) 0%, transparent 70%)"
          : "radial-gradient(circle, rgba(100,140,255,0.22) 0%, transparent 70%)",
      }} />
      <div style={{
        position: "absolute", bottom: -60, left: -60,
        width: 140, height: 140, borderRadius: "50%", pointerEvents: "none",
        background: isDark
          ? "radial-gradient(circle, rgba(160,90,255,0.35) 0%, transparent 70%)"
          : "radial-gradient(circle, rgba(200,120,255,0.18) 0%, transparent 70%)",
      }} />

      {/* Badge */}
      <span style={{
        display: "inline-block", marginBottom: 12,
        padding: "3px 10px", borderRadius: 999,
        fontSize: 11, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase",
        background: isDark ? "rgba(99,130,255,0.2)" : "rgba(80,110,230,0.1)",
        color: isDark ? "#a0b4ff" : "#3752cc",
        border: isDark ? "1px solid rgba(99,130,255,0.3)" : "1px solid rgba(80,110,230,0.2)",
      }}>
        Most popular
      </span>

      {/* Plan name */}
      <h3 style={{
        fontFamily: "Georgia, serif", fontSize: 20, fontWeight: 400,
        margin: "0 0 6px", letterSpacing: "-0.02em",
        color: isDark ? "#f0f0f8" : "#1a1d2e",
      }}>
        Pro Plan
      </h3>

      {/* Price */}
      <div style={{ display: "flex", alignItems: "flex-end", gap: 4, marginBottom: "1.25rem" }}>
        <span style={{
          fontSize: 42, fontWeight: 700, lineHeight: 1, letterSpacing: "-0.03em",
          color: isDark ? "#ffffff" : "#111827",
        }}>$29</span>
        <span style={{
          fontSize: 13, marginBottom: 6,
          color: isDark ? "#888aaa" : "#6b7280",
        }}>/mo</span>
      </div>

      {/* Divider */}
      <div style={{
        height: 1, marginBottom: "1.25rem",
        background: isDark ? "rgba(255,255,255,0.08)" : "rgba(80,100,180,0.12)",
      }} />

      {/* Features */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: "1.5rem" }}>
        {features.map((ft) => (
          <div key={ft} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14,
            color: isDark ? "#c8cae0" : "#374151" }}>
            <span style={{
              flexShrink: 0, width: 18, height: 18, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: isDark ? "rgba(99,200,140,0.18)" : "rgba(34,197,94,0.12)",
            }}>
              <Check size={10} color={isDark ? "#6ec88a" : "#16a34a"} strokeWidth={2.5} />
            </span>
            {ft}
          </div>
        ))}
      </div>

      {/* CTA */}
      <button style={{
        width: "100%", padding: "13px", borderRadius: 999,
        fontSize: 15, fontWeight: 500, border: "none", cursor: "pointer",
        background: isDark ? "#ffffff" : "linear-gradient(135deg, #4a6cf7 0%, #7c3aed 100%)",
        color: isDark ? "#111111" : "#ffffff",
        boxShadow: isDark ? "none" : "0 4px 16px rgba(99,102,241,0.35)",
      }}>
        Upgrade Now
      </button>
    </motion.div>
  );
}