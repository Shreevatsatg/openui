import React from "react";
import { LiveProvider, LivePreview as ReactLivePreview } from "react-live";
import { useTheme } from "@/context/ThemeContext";
import * as LucideIcons from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  const isStatementStyleSnippet = true;
  const preview = effectiveMiniTheme(themeSupport, siteIsDark);

  const preprocessCode = (inputCode: string) => {
    return inputCode
      .replace(/import\s+.*?from\s+['"].*?['"];?\n?/g, "")
      .replace(/export\s+default\s+function/g, "function")
      .replace(/export\s+function/g, "function")
      .replace(/export\s+const/g, "const");
  };

  const strippedCode = preprocessCode(code);

  return (
    <div
      className={`w-full h-full relative overflow-hidden flex items-start justify-center ${
        preview === "dark" ? "dark bg-black text-white" : "bg-white text-black"
      }`}
      style={{ colorScheme: preview }}
    >
      <div className="w-full h-full pointer-events-none scale-[0.85] origin-top flex justify-center p-4">
        <LiveProvider code={strippedCode} noInline={true} scope={{ React, ...LucideIcons, motion, AnimatePresence }}>
          <ReactLivePreview className="w-full" />
        </LiveProvider>
      </div>
    </div>
  );
}
