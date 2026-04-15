import React, { useEffect, useState } from "react";
import { LiveProvider, LiveError, LivePreview as ReactLivePreview } from "react-live";
import { Highlight, themes } from "prism-react-renderer";
import { Check, Clipboard, Moon, Play, Sun, Maximize } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { useTheme } from "@/context/ThemeContext";

interface LivePreviewProps {
  code: string;
  themeSupport?: "both" | "light" | "dark";
  slug?: string;
}

function clampPreviewTheme(
  t: "light" | "dark",
  themeSupport: "both" | "light" | "dark"
): "light" | "dark" {
  if (themeSupport === "light") return "light";
  if (themeSupport === "dark") return "dark";
  return t;
}

export function LivePreviewSandbox({ code, themeSupport = "both", slug = "sandbox" }: LivePreviewProps) {
  const { isDark: siteIsDark } = useTheme();
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  /** When `null`, preview follows the site theme. Otherwise preview-only override. */
  const [lockedPreview, setLockedPreview] = useState<"light" | "dark" | null>(null);
  const [copied, setCopied] = useState(false);

  const siteTheme = siteIsDark ? "dark" : "light";
  const siteClamped = clampPreviewTheme(siteTheme, themeSupport);
  const effectivePreview = lockedPreview !== null ? clampPreviewTheme(lockedPreview, themeSupport) : siteClamped;

  const preprocessCode = (inputCode: string) => {
    let processedCode = inputCode.replace(/import[\s\S]*?from\s+['"].*?['"];?\n?/g, "");

    // Auto-inject render() if it's missing
    if (!processedCode.includes("render(")) {
      const exportMatch = processedCode.match(/export\s+(?:default\s+)?(?:function\s+|const\s+)([A-Z]\w*)/);
      if (exportMatch && exportMatch[1]) {
        processedCode += `\n\nrender(<${exportMatch[1]} />);`;
      } else {
        const fallbackMatch = processedCode.match(/function\s+([A-Z]\w*)/) || processedCode.match(/const\s+([A-Z]\w*)\s*=/);
        if (fallbackMatch && fallbackMatch[1]) {
          processedCode += `\n\nrender(<${fallbackMatch[1]} />);`;
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

  useEffect(() => {
    if (lockedPreview === null) return;
    const clamped = clampPreviewTheme(lockedPreview, themeSupport);
    if (clamped !== lockedPreview) {
      setLockedPreview(clamped);
    }
  }, [themeSupport, lockedPreview]);

  const canUseLight = themeSupport !== "dark";
  const canUseDark = themeSupport !== "light";
  const canTogglePreview = canUseLight && canUseDark;

  const handlePreviewThemeClick = () => {
    if (!canTogglePreview) return;
    if (lockedPreview === null) {
      const opposite: "light" | "dark" = siteClamped === "dark" ? "light" : "dark";
      setLockedPreview(opposite);
      return;
    }
    setLockedPreview((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenSandbox = () => {
    localStorage.setItem("sandbox_code", code);
    localStorage.setItem("sandbox_theme", effectivePreview);
    window.open(`/live-preview/${slug}`, "_blank");
  };

  return (
    <div className="rounded-xl overflow-hidden border border-border bg-card shadow-sm flex flex-col">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b px-4 py-3 bg-muted/20">
        <div className="flex bg-muted p-1 rounded-lg">
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={`flex items-center text-sm px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === "preview" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Play className="mr-2 h-3.5 w-3.5" />
            Preview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("code")}
            className={`flex items-center text-sm px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === "code" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Clipboard className="mr-2 h-3.5 w-3.5" />
            Code
          </button>
        </div>

        {activeTab === "preview" && (
          <div className="flex flex-wrap items-center gap-1 sm:border-x sm:px-2 sm:mx-2">
            {canTogglePreview && (
              <div className="flex items-center gap-1 mr-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handlePreviewThemeClick}
                  className="h-8 px-2 text-muted-foreground hover:text-foreground"
                  title={
                    lockedPreview === null
                      ? "Preview matches site — click to preview the other theme only"
                      : "Toggle preview light / dark (does not change site theme)"
                  }
                  aria-label="Toggle preview theme"
                >
                  {effectivePreview === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
              </div>
            )}
            <Button variant="ghost" size="sm" onClick={handleOpenSandbox} className="h-8 px-2 text-muted-foreground hover:text-foreground" title="Open in new tab (Fullscreen)">
               <Maximize className="h-4 w-4" />
            </Button>
          </div>
        )}

        {activeTab === "code" && (
          <Button variant="outline" size="sm" onClick={handleCopy} className="h-8 rounded-md px-3 bg-background text-xs ml-auto">
            {copied ? (
              <>
                <Check className="mr-2 h-3.5 w-3.5 text-green-500" />
                Copied
              </>
            ) : (
              <>
                <Clipboard className="mr-2 h-3.5 w-3.5" />
                Copy Code
              </>
            )}
          </Button>
        )}
      </div>

      <div className="flex-1 bg-background relative min-h-[400px] flex items-center justify-center">
        {activeTab === "preview" ? (
          <div
            className={`absolute flex justify-center overflow-auto transition-all duration-300 ease-in-out border-x border-dashed border-border/50 h-full w-full ${
              effectivePreview === "dark" ? "dark bg-black text-white" : "bg-white text-black"
            }`}
            style={{ colorScheme: effectivePreview }}
          >
            <LiveProvider code={strippedCode} theme={themes.vsDark} noInline={true} scope={{ React, ...LucideIcons, motion, AnimatePresence }}>
              <div className="w-full min-h-full p-8 flex items-center justify-center">
                <ReactLivePreview className="w-full min-h-full flex items-center justify-center" />
              </div>
              <LiveError className="absolute bottom-4 left-4 right-4 bg-destructive text-destructive-foreground p-3 rounded text-xs font-mono overflow-auto max-h-40" />
            </LiveProvider>
          </div>
        ) : (
          <div className="absolute inset-0 overflow-auto bg-[#1E1E1E]">
            <Highlight theme={themes.vsDark} code={code} language="tsx">
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={`${className} p-4 text-sm font-mono m-0`} style={style}>
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
        )}
      </div>
    </div>
  );
}
