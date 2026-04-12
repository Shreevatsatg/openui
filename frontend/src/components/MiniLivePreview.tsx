
import React, { useMemo } from "react";
import { LiveProvider, LivePreview as ReactLivePreview } from "react-live";
import { transform } from "@babel/standalone";

interface MiniLivePreviewProps {
  code: string;
}

// Minimal preview without editor/error boundary for grid display
export function MiniLivePreview({ code }: MiniLivePreviewProps) {
  // Use a transformed code string so ReactLive doesn't try to use standard Babel 
  // on every render if we can pre-process it or just pass it cleanly.
  // Actually, react-live handles this, but since we had issues with exports/imports in user code,
  // we ensure it's a clean snippet. We assume it's just a functional component.

  return (
    <div className="w-full h-full relative overflow-hidden bg-dot-pattern flex items-center justify-center p-4">
      <div className="scale-[0.85] origin-center w-full flex items-center justify-center pointer-events-none">
        <LiveProvider code={code}>
          <ReactLivePreview className="max-w-full" />
        </LiveProvider>
      </div>
    </div>
  );
}
