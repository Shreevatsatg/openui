import React from "react";
import { LiveProvider, LivePreview as ReactLivePreview } from "react-live";
import { useTheme } from "@/context/ThemeContext";
import * as LucideIcons from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import * as OGL from "ogl";
import * as THREE from "three";
import { gsap } from "gsap";

interface MiniLivePreviewProps {
  code: string;
  themeSupport?: "both" | "light" | "dark";
}

function effectiveMiniTheme(
  themeSupport: "both" | "light" | "dark",
  siteIsDark: boolean
): "light" | "dark" {
  if (themeSupport === "light") return "light";
  if (themeSupport === "dark") return "dark";
  return siteIsDark ? "dark" : "light";
}

export function MiniLivePreview({ code, themeSupport = "both" }: MiniLivePreviewProps) {
  const { isDark: siteIsDark } = useTheme();
  const preview = effectiveMiniTheme(themeSupport, siteIsDark);

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

  return (
    <div
      className={`w-full h-full relative overflow-hidden flex items-start justify-center ${preview === "dark" ? "dark bg-black text-white" : "bg-white text-black"
        }`}
      style={{ colorScheme: preview }}
    >
      <div className="w-full h-full pointer-events-none scale-[0.85] origin-top flex items-center justify-center p-4">
        <LiveProvider code={strippedCode} noInline={true} scope={{ React, useState: React.useState, useEffect: React.useEffect, useRef: React.useRef, useMemo: React.useMemo, useCallback: React.useCallback, useReducer: React.useReducer, useContext: React.useContext, ...LucideIcons, motion, AnimatePresence, previewTheme: preview, isDark: preview === "dark", ...OGL, ...THREE, gsap }}>
          <ReactLivePreview className="w-full h-full flex items-center justify-center" />
        </LiveProvider>
      </div>
    </div>
  );
}
