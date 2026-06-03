/*
dependency:

framer-motion lucide-react


usage:
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
          <div key={ft} style={{
            display: "flex", alignItems: "center", gap: 10, fontSize: 14,
            color: isDark ? "#c8cae0" : "#374151"
          }}>
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


/*

Premium Pricing Card

A sleek, glassmorphic plan configuration card featuring border glow hover transitions and dynamic interactive buttons.

Dependencies:
  framer-motion
  lucide-react

usage:
import { PremiumCard } from "./components/card"
  
  export default function App() {
< PremiumCard title = "Enterprise" price = "$199" features = { ["Unlimited Seats", "Custom SLA"]} />
}

*/
import React from "react";
import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function PremiumCard({
  isDark: isDarkProp,
  theme,
  title = "Professional Plan",
  price = "$29",
  features = [
    "10 Projects included",
    "50GB cloud storage",
    "Priority Email support",
    "Advanced Analytics",
  ],
}) {
  const isDark = isDarkProp !== undefined ? isDarkProp : theme === "dark";

  const colors = {
    bg: isDark ? "rgba(24, 24, 27, 0.75)" : "rgba(255, 255, 255, 0.75)",
    border: isDark ? "rgba(63, 63, 70, 0.4)" : "rgba(228, 228, 231, 0.6)",
    text: isDark ? "#ffffff" : "#09090b",
    textMuted: isDark ? "#a1a1aa" : "#71717a",
    accent: "#3b82f6",
    accentHover: "#2563eb",
    shadow: isDark
      ? "0 8px 32px 0 rgba(0, 0, 0, 0.37)"
      : "0 8px 32px 0 rgba(31, 38, 135, 0.05)",
  };

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        width: "320px",
        background: colors.bg,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: `1px solid ${colors.border} `,
        borderRadius: "24px",
        padding: "32px",
        boxShadow: colors.shadow,
        fontFamily: "sans-serif",
        color: colors.text,
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <div>
        <span
          style={{
            fontSize: "12px",
            fontWeight: "600",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: colors.accent,
          }}
        >
          {title}
        </span>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "4px",
            marginTop: "8px",
          }}
        >
          <span style={{ fontSize: "40px", fontWeight: "700" }}>{price}</span>
          <span style={{ color: colors.textMuted, fontSize: "14px" }}>
            /month
          </span>
        </div>
      </div>

      <div style={{ width: "100%", height: "1px", background: colors.border }} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          flexGrow: 1,
        }}
      >
        {features.map((feature, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                background: isDark
                  ? "rgba(59, 130, 246, 0.15)"
                  : "rgba(59, 130, 246, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Check size={12} color={colors.accent} />
            </div>
            <span style={{ fontSize: "14px", color: colors.text }}>
              {feature}
            </span>
          </div>
        ))}
      </div>

      <button
        style={{
          width: "100%",
          background: colors.accent,
          color: "#ffffff",
          padding: "14px",
          borderRadius: "14px",
          border: "none",
          fontWeight: "600",
          fontSize: "14px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          transition: "background-color 0.2s",
          outline: "none",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = colors.accentHover)
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = colors.accent)
        }
      >
        Get Started
        <ArrowRight size={16} />
      </button>
    </motion.div>
  );
}


/*
Animated Accordion

An interactive FAQ accordian group utilizing `AnimatePresence` and height transition constraints for smooth expand / collapse motions.

Dependencies
  framer - motion
  lucide - react

  usage:
  
  import { AnimatedAccordion } from "./components/card"
  
  export default function App() {
 < AnimatedAccordion items = { [{ title: "Title", content: "Content text" }]} />
}

  */

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function AnimatedAccordion({
  isDark: isDarkProp,
  theme,
  items = [
    {
      title: "What is OpenUI?",
      content:
        "OpenUI is a next-generation component marketplace and sandboxed rendering framework.",
    },
    {
      title: "Does it support Tailwind?",
      content:
        "Yes! OpenUI supports raw inline styling, custom CSS, and Tailwind CSS configuration.",
    },
    {
      title: "Is it open-source?",
      content:
        "Indeed! OpenUI is fully open-source and customizable for corporate component libraries.",
    },
  ],
}) {
  const isDark = isDarkProp !== undefined ? isDarkProp : theme === "dark";
  const [openIndex, setOpenIndex] = useState(null);

  const colors = {
    bg: isDark ? "#09090b" : "#ffffff",
    border: isDark ? "#27272a" : "#e4e4e7",
    text: isDark ? "#fafafa" : "#18181b",
    textMuted: isDark ? "#a1a1aa" : "#71717a",
  };

  return (
    <div
      style={{
        width: "360px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        fontFamily: "sans-serif",
      }}
    >
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            style={{
              border: `1px solid ${colors.border} `,
              borderRadius: "12px",
              overflow: "hidden",
              background: colors.bg,
              transition: "border-color 0.2s",
            }}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px",
                border: "none",
                background: "transparent",
                color: colors.text,
                fontSize: "15px",
                fontWeight: "600",
                cursor: "pointer",
                outline: "none",
                textAlign: "left",
              }}
            >
              <span>{item.title}</span>
              <ChevronDown
                size={18}
                style={{
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s ease",
                  color: colors.textMuted,
                }}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <div
                    style={{
                      padding: "0 16px 16px 16px",
                      fontSize: "14px",
                      lineHeight: "1.5",
                      color: colors.textMuted,
                    }}
                  >
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}


/*
Animated Toast Notification

A toast alert trigger and overlay that slides, scales, and fades beautifully inside sandbox bounds.

Dependencies
  framer - motion
  lucide - react

usage:

import { ToastNotification } from "./components/card"
  
  export default function App() {
 < ToastNotification message = "Changes saved!" type = "success" />
}
 
*/

import React, { useState } from "react";
import { X, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ToastNotification({
  isDark: isDarkProp,
  theme,
  message = "Action completed successfully!",
  type = "success",
}) {
  const isDark = isDarkProp !== undefined ? isDarkProp : theme === "dark";
  const [show, setShow] = useState(false);

  const colors = {
    bg: isDark ? "#18181b" : "#ffffff",
    border: isDark ? "#27272a" : "#e4e4e7",
    text: isDark ? "#fafafa" : "#18181b",
    shadow: isDark
      ? "0 10px 25px rgba(0,0,0,0.5)"
      : "0 10px 25px rgba(0,0,0,0.08)",
    success: "#22c55e",
    info: "#3b82f6",
    warning: "#eab308",
  };

  const typeColor = colors[type] || colors.info;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
        fontFamily: "sans-serif",
        position: "relative",
        width: "320px",
      }}
    >
      <button
        onClick={() => setShow(true)}
        style={{
          background: typeColor,
          color: "#ffffff",
          padding: "10px 20px",
          borderRadius: "10px",
          border: "none",
          fontWeight: "600",
          fontSize: "14px",
          cursor: "pointer",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          outline: "none",
        }}
      >
        Trigger Notification
      </button>

      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            style={{
              position: "absolute",
              top: "50px",
              zIndex: 50,
              width: "100%",
              background: colors.bg,
              border: `1px solid ${colors.border} `,
              borderRadius: "14px",
              padding: "14px 16px",
              boxShadow: colors.shadow,
              display: "flex",
              alignItems: "center",
              gap: "12px",
              color: colors.text,
            }}
          >
            <CheckCircle size={18} color={typeColor} />
            <span
              style={{ fontSize: "14px", fontWeight: "500", flexGrow: 1 }}
            >
              {message}
            </span>
            <button
              onClick={() => setShow(false)}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "2px",
                display: "flex",
                alignItems: "center",
                color: isDark ? "#71717a" : "#a1a1aa",
                outline: "none",
              }}
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
