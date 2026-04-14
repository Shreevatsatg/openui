import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { LiveProvider, LiveError, LivePreview as ReactLivePreview } from "react-live";
import { Highlight, themes } from "prism-react-renderer";
import * as LucideIcons from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Moon, Sun, Code, Play } from "lucide-react";
import { api } from "@/lib/api";

export default function LivePreviewPage() {
  const { slug } = useParams<{ slug: string }>();
  const [code, setCode] = useState("");
  const [theme, setTheme] = useState("dark");
  const [loading, setLoading] = useState(true);
  const [showCode, setShowCode] = useState(false);

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
    return inputCode
      .replace(/import\s+.*?from\s+['"].*?['"];?\n?/g, "")
      .replace(/export\s+default\s+function/g, "function")
      .replace(/export\s+function/g, "function")
      .replace(/export\s+const/g, "const");
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
            <Link to="/components" className="mt-4 text-primary hover:underline">Go back</Link>
        </div>
    );
  }

  return (
    <div className={`min-h-screen w-full flex flex-col ${theme === "dark" ? "dark bg-black text-white" : "bg-white text-black"}`} style={{ colorScheme: theme as any }}>
      
      {/* Top Bar matching screenshot */}
      <div className="h-14 flex items-center justify-between px-4 sm:px-6 bg-[#111111] border-b border-[#222] text-zinc-300 select-none z-50 fixed top-0 w-full">
         <div className="flex items-center gap-4">
             <Link to="/components" className="flex items-center gap-2 hover:text-white transition-colors text-sm font-medium">
                 <ArrowLeft className="h-4 w-4" />
                 Components
             </Link>
             <div className="w-[1px] h-4 bg-zinc-700" />
             <span className="text-sm font-medium text-white">{slug === "sandbox" ? "unsaved-draft" : slug}</span>
         </div>

         <div className="flex items-center gap-4">
             <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="hover:text-white transition-colors">
                 {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
             </button>
             <div className="w-[1px] h-4 bg-zinc-700" />
             <button 
                onClick={() => setShowCode(!showCode)} 
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${showCode ? 'bg-white text-black' : 'bg-zinc-800 text-white hover:bg-zinc-700'}`}
             >
                 {showCode ? <Play className="h-4 w-4" /> : <Code className="h-4 w-4" />}
                 {showCode ? "Preview" : "Code"}
             </button>
         </div>
      </div>

      <div className="flex-1 mt-14 flex overflow-hidden relative">
        {showCode ? (
            <div className={`w-full h-full overflow-auto ${theme === "dark" ? "bg-black" : "bg-white"}`}>
                <Highlight theme={theme === "dark" ? themes.vsDark : themes.github} code={code} language="tsx">
                  {({ className, style, tokens, getLineProps, getTokenProps }) => (
                    <pre className={`${className} p-8 text-sm font-mono m-0 min-h-full`} style={{ ...style, background: "transparent" }}>
                      {tokens.map((line, i) => (
                        <div key={i} {...getLineProps({ line })}>
                          <span className="inline-block w-8 text-right opacity-30 select-none mr-4">{i + 1}</span>
                          {line.map((token, key) => (
                            <span key={key} {...getTokenProps({ token })} />
                          ))}
                        </div>
                      ))}
                    </pre>
                  )}
                </Highlight>
            </div>
        ) : (
            <LiveProvider code={strippedCode} theme={theme === "dark" ? themes.vsDark : themes.github} noInline={true} scope={{ React, ...LucideIcons, motion, AnimatePresence }}>
                <div className="w-full h-full overflow-auto p-4 md:p-8 flex items-center justify-center">
                    <ReactLivePreview className="w-full min-h-full flex items-center justify-center" />
                </div>
                <LiveError className="fixed bottom-4 left-4 right-4 md:right-auto md:max-w-2xl z-50 bg-destructive text-destructive-foreground p-4 rounded-md shadow-lg text-xs font-mono overflow-auto max-h-60" />
            </LiveProvider>
        )}
      </div>
    </div>
  );
}
