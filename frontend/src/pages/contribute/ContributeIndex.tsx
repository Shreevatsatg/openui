import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Code2, Layers, ShieldCheck, Check, Clipboard, AlertTriangle, Cpu, Terminal, ToggleLeft, Rows, CheckSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

const examplesList = [
  {
    id: "glass-card",
    title: "Premium Glass Card",
    description: "A glassmorphic plan selection card featuring border glow hover transitions and dynamic interactive buttons.",
    icon: CheckSquare,
    code: `import React from "react";
import { Check, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function PremiumGlassCard({ isDark: isDarkProp, theme }) {
  // Resolve theme from sandbox wrapper prop (theme) or standard boolean override (isDarkProp)
  const isDark = isDarkProp !== undefined ? isDarkProp : theme === "dark";

  const styles = {
    container: {
      width: "100%",
      maxWidth: "320px",
      borderRadius: "24px",
      padding: "28px",
      fontFamily: "system-ui, sans-serif",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      background: isDark ? "rgba(24, 24, 27, 0.7)" : "rgba(255, 255, 255, 0.75)",
      border: isDark ? "1px solid rgba(63, 63, 70, 0.4)" : "1px solid rgba(228, 228, 231, 0.8)",
      color: isDark ? "#ffffff" : "#09090b",
      boxShadow: isDark ? "0 8px 32px 0 rgba(0, 0, 0, 0.4)" : "0 8px 32px 0 rgba(31, 38, 135, 0.06)",
      transition: "all 0.3s ease",
      position: "relative",
    },
    title: {
      fontSize: "12px",
      fontWeight: "600",
      letterSpacing: "0.05em",
      textTransform: "uppercase",
      color: "#3b82f6",
      display: "flex",
      alignItems: "center",
      gap: "6px",
    },
    price: {
      fontSize: "36px",
      fontWeight: "700",
      marginTop: "8px",
      display: "flex",
      alignItems: "baseline",
    },
    subtext: {
      fontSize: "14px",
      color: isDark ? "#a1a1aa" : "#71717a",
      fontWeight: "400",
    },
    divider: {
      height: "1px",
      backgroundColor: isDark ? "rgba(63, 63, 70, 0.4)" : "rgba(228, 228, 231, 0.8)",
      margin: "16px 0",
    },
    featureList: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      margin: "0 0 24px 0",
      padding: 0,
      listStyle: "none",
    },
    featureItem: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      fontSize: "14px",
    },
    iconBg: {
      width: "18px",
      height: "18px",
      borderRadius: "50%",
      background: isDark ? "rgba(59, 130, 246, 0.15)" : "rgba(59, 130, 246, 0.1)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    button: {
      width: "100%",
      background: "#3b82f6",
      color: "#ffffff",
      padding: "12px",
      borderRadius: "12px",
      border: "none",
      fontWeight: "600",
      fontSize: "14px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "6px",
      transition: "background-color 0.2s",
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.01 }}
      style={styles.container}
    >
      <div style={styles.title}>
        <Sparkles size={14} />
        Premium Feature
      </div>
      <div style={styles.price}>
        $19
        <span style={{ ...styles.subtext, fontSize: "14px", marginLeft: "4px" }}>/mo</span>
      </div>
      <div style={styles.divider} />
      <ul style={styles.featureList}>
        <li style={styles.featureItem}>
          <div style={styles.iconBg}><Check size={12} color="#3b82f6" /></div>
          Light & Dark Mode Support
        </li>
        <li style={styles.featureItem}>
          <div style={styles.iconBg}><Check size={12} color="#3b82f6" /></div>
          Fluid motion animations
        </li>
        <li style={styles.featureItem}>
          <div style={styles.iconBg}><Check size={12} color="#3b82f6" /></div>
          Vite & Next.js Compatible
        </li>
      </ul>
      <button style={styles.button}>Get Started</button>
    </motion.div>
  );
}

// Render call is required for sandbox previews!
render(<PremiumGlassCard />);`
  },
  {
    id: "segmented-tabs",
    title: "Segmented Tabs",
    description: "A sliding pill navigation panel featuring smooth layout transitions mapped across both color states.",
    icon: Rows,
    code: `import React, { useState } from "react";
import { motion } from "framer-motion";

export function SegmentedTabs({ isDark: isDarkProp, theme, tabs = ["Overview", "Settings", "Analytics", "Billing"] }) {
  // Resolve theme from sandbox wrapper prop (theme) or standard boolean override (isDarkProp)
  const isDark = isDarkProp !== undefined ? isDarkProp : theme === "dark";
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const colors = {
    bg: isDark ? "#18181b" : "#f4f4f5",
    tabText: isDark ? "#a1a1aa" : "#71717a",
    activeText: isDark ? "#ffffff" : "#09090b",
    pillBg: isDark ? "#27272a" : "#ffffff",
    border: isDark ? "#27272a" : "#e4e4e7",
  };

  return (
    <div
      style={{
        display: "inline-flex",
        background: colors.bg,
        padding: "4px",
        borderRadius: "12px",
        border: \`1px solid \${colors.border}\`,
        position: "relative",
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "none",
              background: "transparent",
              color: isActive ? colors.activeText : colors.tabText,
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
              position: "relative",
              outline: "none",
              transition: "color 0.2s ease",
              zIndex: 1,
            }}
          >
            {isActive && (
              <motion.div
                layoutId="active-contrib-example-pill"
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: colors.pillBg,
                  borderRadius: "8px",
                  zIndex: -1,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span style={{ relative: "z-10" }}>{tab}</span>
          </button>
        );
      })}
    </div>
  );
}

render(<SegmentedTabs />);`
  },
  {
    id: "toggle-switch",
    title: "Dynamic Toggle",
    description: "An animated toggle switch with interactive icons that shift position depending on selection state.",
    icon: ToggleLeft,
    code: `import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export function InteractiveToggle({ isDark: isDarkProp, theme, label = "Feature Toggle" }) {
  // Resolve theme from sandbox wrapper prop (theme) or standard boolean override (isDarkProp)
  const isDark = isDarkProp !== undefined ? isDarkProp : theme === "dark";
  const [enabled, setEnabled] = useState(false);

  const colors = {
    bgOff: isDark ? "#27272a" : "#e4e4e7",
    bgOn: "#3b82f6",
    circleBg: "#ffffff",
    text: isDark ? "#fafafa" : "#18181b",
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", fontFamily: "sans-serif" }}>
      <span style={{ color: colors.text, fontSize: "14px", fontWeight: "500" }}>{label}</span>
      <button
        onClick={() => setEnabled(!enabled)}
        style={{
          width: "60px",
          height: "32px",
          borderRadius: "9999px",
          background: enabled ? colors.bgOn : colors.bgOff,
          border: "none",
          cursor: "pointer",
          position: "relative",
          padding: "4px",
          display: "flex",
          alignItems: "center",
          transition: "background-color 0.2s ease",
          outline: "none",
        }}
      >
        <motion.div
          animate={{ x: enabled ? "28px" : "0px" }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          style={{
            width: "24px",
            height: "24px",
            borderRadius: "50%",
            background: colors.circleBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
          }}
        >
          {enabled ? <Moon size={14} color="#3b82f6" /> : <Sun size={14} color="#eab308" />}
        </motion.div>
      </button>
    </div>
  );
}

render(<InteractiveToggle />);`
  },
  {
    id: "accordion",
    title: "Smooth Accordion",
    description: "An expand/collapse FAQ accordion utilizing spring heights and clear layout states inside both light and dark grids.",
    icon: Code2,
    code: `import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function AnimatedAccordion({
  isDark: isDarkProp,
  theme,
  items = [
    { title: "What is OpenUI?", content: "OpenUI is a component marketplace and sandboxed rendering framework." },
    { title: "Does it support Tailwind?", content: "Yes! OpenUI supports raw inline styling, custom CSS, and Tailwind CSS configuration." }
  ],
}) {
  // Resolve theme from sandbox wrapper prop (theme) or standard boolean override (isDarkProp)
  const isDark = isDarkProp !== undefined ? isDarkProp : theme === "dark";
  const [openIndex, setOpenIndex] = useState(null);

  const colors = {
    bg: isDark ? "#09090b" : "#ffffff",
    border: isDark ? "#27272a" : "#e4e4e7",
    text: isDark ? "#fafafa" : "#18181b",
    textMuted: isDark ? "#a1a1aa" : "#71717a",
  };

  return (
    <div style={{ width: "100%", maxWidth: "360px", display: "flex", flexDirection: "column", gap: "8px", fontFamily: "sans-serif" }}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            style={{
              border: \`1px solid \${colors.border}\`,
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
                  <div style={{ padding: "0 16px 16px 16px", fontSize: "14px", lineHeight: "1.5", color: colors.textMuted }}>
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

render(<AnimatedAccordion />);`
  }
];

export default function ContributeIndex() {
  const [activeSection, setActiveSection] = useState<"installation" | "overview" | "rules" | "example">("installation");
  const [selectedExample, setSelectedExample] = useState("glass-card");
  const [copied, setCopied] = useState(false);

  const activeExampleData = examplesList.find(ex => ex.id === selectedExample) || examplesList[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeExampleData.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navItems = [
    { id: "installation" as const, label: "1. Installation & Themes", icon: Layers },
    { id: "overview" as const, label: "2. Overview & Workflow", icon: BookOpen },
    { id: "rules" as const, label: "3. Snippet Rules", icon: ShieldCheck },
    { id: "example" as const, label: "4. Code Examples", icon: Code2 },
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] w-full">
      <div className="w-full max-w-7xl mx-auto px-6 py-10 flex-1">
        {/* Top Header Banner */}
        <div className="border-b border-border/40 pb-8 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-3">
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
              Contribute to OpenUI
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-3xl leading-relaxed">
              Create, test, and publish gorgeous, responsive UI components that seamlessly support both light and dark themes. Everything you need is now consolidated in this single page dashboard.
            </p>
          </div>
          <Button asChild className="shrink-0 text-background cursor-pointer self-start md:self-auto">
            <Link to="/submit">Submit Component</Link>
          </Button>
        </div>

      {/* Main Grid Splitter */}
      <div className="flex flex-col lg:flex-row gap-10 items-start">

        {/* Left Side Sidebar */}
        <aside className="w-full lg:w-60 shrink-0 lg:sticky lg:top-24 space-y-1.5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 px-3.5 mb-2">
            Documentation sections
          </p>
          <nav className="flex flex-row lg:flex-col gap-1 p-1 lg:p-0 bg-muted/40 lg:bg-transparent border border-border/40 lg:border-none rounded-xl overflow-x-auto lg:overflow-x-visible">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`relative w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer outline-none whitespace-nowrap lg:whitespace-normal text-left ${isActive ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                    }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-contrib-sidebar-pill"
                      className="absolute inset-0 bg-muted border border-border/30 rounded-lg"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon className="h-4 w-4 relative z-10 shrink-0" />
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Right Side Content Panel */}
        <main className="flex-1 min-w-0 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="space-y-8"
            >
              {/* SECTION: INSTALLATION */}
              {activeSection === "installation" && (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
                      <Layers className="h-6 w-6 text-indigo-500" />
                      Local Setup & Light/Dark Mode Styling
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      OpenUI templates rely on Tailwind design tokens. For colors to transition seamlessly on theme changes, declare custom properties mapping dark/light colors inside your main CSS file.
                    </p>
                  </div>

                  {/* Tailwind Setup Steps */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="shadow-xs hover:border-foreground/10 transition-colors">
                      <CardHeader>
                        <CardTitle className="text-sm font-semibold">1. Declaring CSS Theme Variables</CardTitle>
                        <CardDescription>Add this to your index.css file.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <pre className="rounded-lg border border-border bg-[#1E1E1E] p-4 text-[11px] overflow-auto text-zinc-300 font-mono">
                          {`:root {
  --background: #ffffff;
  --foreground: #09090b;
  --border: #e4e4e7;
  --muted: #f4f4f5;
}

.dark {
  --background: #09090b;
  --foreground: #fafafa;
  --border: #27272a;
  --muted: #27272a;
}`}
                        </pre>
                      </CardContent>
                    </Card>

                    <Card className="shadow-xs hover:border-foreground/10 transition-colors">
                      <CardHeader>
                        <CardTitle className="text-sm font-semibold">2. Tailwind v4 Configuration</CardTitle>
                        <CardDescription>Bind these variables in the @theme block.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <pre className="rounded-lg border border-border bg-[#1E1E1E] p-4 text-[11px] overflow-auto text-zinc-300 font-mono">
                          {`@import "tailwindcss";

@theme {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-border: var(--border);
  --color-muted: var(--muted);
}`}
                        </pre>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Context toggling */}
                  <Card className="shadow-xs">
                    <CardHeader>
                      <CardTitle className="text-base font-semibold">React ThemeProvider Integration</CardTitle>
                      <CardDescription>
                        Toggle the <code className="bg-muted px-1 rounded text-xs">.dark</code> class on the HTML container element dynamically to support both modes in your local app.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <pre className="rounded-lg border border-border bg-[#1E1E1E] p-4 text-xs overflow-auto text-zinc-300 font-mono max-h-[360px]">
                        {`import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({ isDark: false, toggleTheme: () => {} });

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    return document.documentElement.classList.contains("dark") ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches);
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);`}
                      </pre>
                    </CardContent>
                  </Card>

                  {/* Scaffolding Commands */}
                  <Card className="shadow-xs">
                    <CardHeader>
                      <CardTitle className="text-base font-semibold">Vite + React Scaffolding Commands</CardTitle>
                      <CardDescription>Set up a fresh project locally.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <pre className="rounded-lg border border-border bg-muted/30 p-4 text-xs md:text-sm overflow-auto text-muted-foreground font-mono">
                        {`# Create Vite scaffold
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install

# Install Tailwind & Vite Plugin
npm install tailwindcss @tailwindcss/vite

# Install icons and styling helpers
npm install lucide-react clsx tailwind-merge`}
                      </pre>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* SECTION: OVERVIEW */}
              {activeSection === "overview" && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
                      <BookOpen className="h-6 w-6 text-indigo-500" />
                      Overview & Roadmap Workflow
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Learn the flow of designing, previewing, submitting, and publishing UI components.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="hover:border-foreground/10 transition-colors shadow-xs">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Cpu className="h-5 w-5 text-indigo-500" />
                          Publish Component
                        </CardTitle>
                        <CardDescription>
                          Ready to submit a component? Open the editor to write and preview your code.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex flex-wrap gap-2.5">
                        <Button asChild className="text-background cursor-pointer">
                          <Link to="/submit">Submit Component</Link>
                        </Button>
                        <Button variant="outline" asChild className="cursor-pointer">
                          <Link to="/components">Browse Component Gallery</Link>
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="hover:border-foreground/10 transition-colors shadow-xs">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Terminal className="h-5 w-5 text-emerald-500" />
                          Guidelines Checklist
                        </CardTitle>
                        <CardDescription>
                          Before submitting, review sandbox boilerplate guidelines and rules.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="secondary" onClick={() => setActiveSection("rules")} className="cursor-pointer">
                          View Snippet Syntax Rules
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="shadow-xs">
                    <CardHeader>
                      <CardTitle>Contribution Roadmap Steps</CardTitle>
                      <CardDescription>
                        Roadmap sequence for review dashboard approvals.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="relative border-l-2 border-border pl-6 ml-3 space-y-6">
                        <div className="relative">
                          <div className="absolute -left-[31px] top-0.5 bg-background border-2 border-primary rounded-full p-1 w-5 h-5 flex items-center justify-center">
                            <span className="text-[10px] font-bold">1</span>
                          </div>
                          <h4 className="font-semibold text-foreground">Build & Style</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Develop locally using customizable component props and Tailwind design tokens.
                          </p>
                        </div>

                        <div className="relative">
                          <div className="absolute -left-[31px] top-0.5 bg-background border-2 border-primary rounded-full p-1 w-5 h-5 flex items-center justify-center">
                            <span className="text-[10px] font-bold">2</span>
                          </div>
                          <h4 className="font-semibold text-foreground">Verify Both Contrast Modes</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Toggle the preview switch on the sandbox toolbar to test visual quality under both light and dark conditions.
                          </p>
                        </div>

                        <div className="relative">
                          <div className="absolute -left-[31px] top-0.5 bg-background border-2 border-primary rounded-full p-1 w-5 h-5 flex items-center justify-center">
                            <span className="text-[10px] font-bold">3</span>
                          </div>
                          <h4 className="font-semibold text-foreground">Sandbox Compliance</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Make sure code has a named function and concludes with a <code className="bg-muted px-1 rounded text-xs">render()</code> statement (no raw JSX outside components).
                          </p>
                        </div>

                        <div className="relative">
                          <div className="absolute -left-[31px] top-0.5 bg-background border-2 border-primary rounded-full p-1 w-5 h-5 flex items-center justify-center">
                            <span className="text-[10px] font-bold">4</span>
                          </div>
                          <h4 className="font-semibold text-foreground">Publishing</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Once admins approve, the component will go live automatically.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* SECTION: RULES */}
              {activeSection === "rules" && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
                      <ShieldCheck className="h-6 w-6 text-indigo-500" />
                      Snippet Code Rules
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      OpenUI parses code blocks directly without dynamic import modules. Match these specifications.
                    </p>
                  </div>

                  <Card className="shadow-xs">
                    <CardHeader>
                      <CardTitle className="text-base font-semibold">Boilerplate Format Requirement</CardTitle>
                      <CardDescription>
                        Define export functions, then trigger mounting using a `render()` method at the bottom.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <pre className="rounded-lg border border-border bg-[#1E1E1E] p-4 text-xs overflow-auto text-zinc-300 font-mono">
                        {`export function PrimaryButton({ label = "Click Me" }) {
  return (
    <button className="px-4 py-2 rounded bg-primary text-primary-foreground hover:opacity-90 transition">
      {label}
    </button>
  );
}

// Conclude script with:
render(<PrimaryButton />);`}
                      </pre>
                    </CardContent>
                  </Card>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="shadow-xs border-red-500/10 dark:border-red-950/20">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm font-semibold">
                          <AlertTriangle className="h-4 w-4" />
                          Rejection Conditions
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3 text-sm text-muted-foreground">
                        <div className="flex gap-2">
                          <span className="text-red-500 font-bold">•</span>
                          <p><strong>Bare JSX:</strong> Code blocks containing raw JSX lines outside a wrapper component.</p>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-red-500 font-bold">•</span>
                          <p><strong>Imports/Default Exports:</strong> Code including <code className="bg-muted px-1 rounded text-xs">import</code> or <code className="bg-muted px-1 rounded text-xs">export default</code> statements.</p>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-red-500 font-bold">•</span>
                          <p><strong>Fixed Pixel Widths:</strong> Sizing elements with rigid properties that break screen responsiveness.</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="shadow-xs">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                          <Check className="h-4 w-4 text-emerald-500" />
                          Quality Checklist
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3 text-sm text-muted-foreground">
                        <div className="flex gap-2">
                          <span className="text-emerald-500 font-bold">✓</span>
                          <p>Incorporate interactive focus outlines for accessibility.</p>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-emerald-500 font-bold">✓</span>
                          <p>Provide description tags for icon-only components.</p>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-emerald-500 font-bold">✓</span>
                          <p>Map component styles to css variables rather than rigid color codes.</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {/* SECTION: CODE EXAMPLES */}
              {activeSection === "example" && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
                      <Code2 className="h-6 w-6 text-indigo-500" />
                      Sandbox Theme-Aware Code Examples
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Explore multiple real-working components that properly resolve themes and adapt to both dark and light modes.
                    </p>
                  </div>

                  {/* Horizontal selector for component examples */}
                  <div className="flex flex-wrap items-center gap-2 pb-1 border-b border-border/40">
                    {examplesList.map((ex) => {
                      const isSelected = selectedExample === ex.id;
                      const Icon = ex.icon;
                      return (
                        <button
                          key={ex.id}
                          onClick={() => setSelectedExample(ex.id)}
                          className={`relative flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer outline-none ${isSelected ? "text-primary bg-primary/10 border border-primary/20" : "text-muted-foreground hover:text-foreground border border-transparent"
                            }`}
                        >
                          <Icon className="h-3.5 w-3.5" />
                          {ex.title}
                        </button>
                      );
                    })}
                  </div>

                  <Card className="shadow-xs">
                    <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div>
                        <CardTitle className="text-base font-semibold">{activeExampleData.title}</CardTitle>
                        <CardDescription>
                          {activeExampleData.description}
                        </CardDescription>
                      </div>
                      <Button variant="outline" size="sm" onClick={handleCopyCode} className="h-9 px-3 gap-2 shrink-0 cursor-pointer">
                        {copied ? (
                          <>
                            <Check className="h-4 w-4 text-emerald-500" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Clipboard className="h-4 w-4" />
                            Copy Code
                          </>
                        )}
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="rounded-lg border border-border bg-[#1E1E1E] p-4 text-xs overflow-auto text-zinc-300 font-mono max-h-[460px]">
                        <pre>{activeExampleData.code}</pre>
                      </div>

                      <div className="p-4 rounded-xl bg-muted/40 border border-border/40 text-sm text-muted-foreground space-y-2 leading-relaxed">
                        <h4 className="font-semibold text-foreground">Theme Resolution Logic Details:</h4>
                        <p>
                          This component template accepts two standard props: `isDark` (custom boolean override) and `theme` (injected automatically by our live sandbox component as either `"light"` or `"dark"`).
                        </p>
                        <p>
                          Resolving with <code className="bg-muted px-1 rounded text-xs">const isDark = isDarkProp !== undefined ? isDarkProp : theme === "dark";</code> enables full styling compatibility under both sandboxed testing and standard React application layouts.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      </div>
      <Footer />
    </div>
  );
}
