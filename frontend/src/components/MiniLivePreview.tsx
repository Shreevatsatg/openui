import { LiveProvider, LivePreview as ReactLivePreview } from "react-live";
import { useTheme } from "@/context/ThemeContext";

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

  return (
    <div className="w-full h-full relative overflow-hidden bg-dot-pattern flex items-center justify-center p-4">
      <div
        className={`scale-[0.85] origin-center w-full flex items-center justify-center pointer-events-none rounded-md border p-2 ${
          preview === "dark" ? "dark bg-black text-white border-zinc-700" : "bg-white text-black border-zinc-200"
        }`}
        style={{ colorScheme: preview }}
      >
        <LiveProvider code={code} noInline={isStatementStyleSnippet}>
          <ReactLivePreview className="max-w-full" />
        </LiveProvider>
      </div>
    </div>
  );
}
