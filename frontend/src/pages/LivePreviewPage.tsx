import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { LiveProvider, LiveError, LivePreview as ReactLivePreview } from "react-live";
import { themes } from "prism-react-renderer";
import * as LucideIcons from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Moon, Sun } from "lucide-react";
import { api } from "@/lib/api";

export default function LivePreviewPage() {
  const { slug } = useParams<{ slug: string }>();
  const [code, setCode] = useState("");
  const [theme, setTheme] = useState("dark");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug === "sandbox") {
      const savedCode = localStorage.getItem("sandbox_code");
      const savedTheme = localStorage.getItem("sandbox_theme");
      if (savedCode) setCode(savedCode);
      if (savedTheme) setTheme(savedTheme);
      setLoading(false);
      return;
    }

    // Fetch by slug
    api.get(`/api/components/${slug}`)
      .then((res) => setCode(res.data.code))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  const preprocessCode = (inputCode: string) => {
    let processedCode = inputCode.replace(/import[\s\S]*?from\s+['"].*?['"];?\n?/g, "");

    // Auto-inject render() if it's missing
    if (!processedCode.includes("render(")) {
      const exportMatch = processedCode.match(/export\s+(?:default\s+)?(?:function\s+|const\s+)([A-Z]\w*)/);
      if (exportMatch && exportMatch[1]) {
        processedCode += `\n\nrender(<${exportMatch[1]} theme={previewTheme} />);`;
      } else {
        const fallbackMatch = processedCode.match(/function\s+([A-Z]\w*)/) || processedCode.match(/const\s+([A-Z]\w*)\s*=/);
        if (fallbackMatch && fallbackMatch[1]) {
          processedCode += `\n\nrender(<${fallbackMatch[1]} theme={previewTheme} />);`;
        }
      }
    }

    return processedCode
      .replace(/export\s+default\s+function/g, "function")
      .replace(/export\s+function/g, "function")
      .replace(/export\s+const/g, "const")
      .replace(/export\s+default\s+[A-Z]\w*;?/g, "");
  };

  const strippedCode = preprocessCode(code);

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">Loading preview...</div>;
  }

  if (!code) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-background text-foreground p-8 font-sans">
        <h2 className="text-xl font-semibold mb-2">Sandbox Empty</h2>
        <p className="text-muted-foreground text-sm">No code was found for this component.</p>
        <Link to={slug === 'sandbox' ? '/components' : `/components/${slug}`} className="mt-4 text-primary hover:underline">Go back</Link>
      </div>
    );
  }

  return (
    <div className={`min-h-screen w-full flex flex-col relative ${theme === "dark" ? "dark bg-black text-white" : "bg-white text-black"}`} style={{ colorScheme: theme as any }}>

      {/* Dynamic Floating Bottom Island Navbar */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center bg-[#1C1C1E] text-zinc-300 rounded-full p-1.5 shadow-2xl border border-white/10 backdrop-blur-md">
        <Link to={slug === 'sandbox' ? '/components' : `/components/${slug}`} className="flex items-center gap-2 hover:text-white transition-colors text-[13px] font-medium px-4 py-1.5 rounded-full hover:bg-white/10">
          <ArrowLeft className="h-3.5 w-3.5" />
          Back
        </Link>

        <div className="w-[1px] h-5 bg-zinc-700/80 mx-1" />

        <span className="text-[13px] font-medium text-white px-3 max-w-[200px] sm:max-w-[300px] truncate">
          {slug === "sandbox" ? "unsaved-draft" : slug}
        </span>

        <div className="w-[1px] h-5 bg-zinc-700/80 mx-1" />

        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 ml-1" title="Toggle Theme">
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <LiveProvider code={strippedCode} theme={theme === "dark" ? themes.vsDark : themes.github} noInline={true} scope={{ React, useState: React.useState, useEffect: React.useEffect, useRef: React.useRef, useMemo: React.useMemo, useCallback: React.useCallback, useReducer: React.useReducer, useContext: React.useContext, ...LucideIcons, motion, AnimatePresence, previewTheme: theme, isDark: theme === "dark" }}>
          <div className="w-full h-full overflow-auto p-4 md:p-8 pb-32 flex items-center justify-center">
            <ReactLivePreview className="w-full min-h-full flex items-center justify-center" />
          </div>
          <LiveError className="fixed top-4 left-4 right-4 md:right-auto md:max-w-2xl z-50 bg-destructive text-destructive-foreground p-4 rounded-md shadow-lg text-xs font-mono overflow-auto max-h-60" />
        </LiveProvider>
      </div>
    </div>
  );
}
