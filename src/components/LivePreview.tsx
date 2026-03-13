"use client";

import React, { useState } from "react";
import { LiveProvider, LiveError, LivePreview as ReactLivePreview } from "react-live";
import { Highlight, themes } from "prism-react-renderer";
import { Check, Clipboard, Play } from "lucide-react";
import { Button } from "./ui/button";

interface LivePreviewProps {
  code: string;
}

export function LivePreviewSandbox({ code }: LivePreviewProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const viewportWidths = {
    desktop: "100%",
    tablet: "768px",
    mobile: "375px",
  };

  return (
    <div className="rounded-xl overflow-hidden border border-border bg-card shadow-sm flex flex-col">
      <div className="flex items-center justify-between border-b px-4 py-3 bg-muted/20">
        <div className="flex bg-muted p-1 rounded-lg">
          <button
            onClick={() => setActiveTab("preview")}
            className={`flex items-center text-sm px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === "preview" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Play className="mr-2 h-3.5 w-3.5" />
            Preview
          </button>
          <button
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
           <div className="flex gap-1 border-x px-2 mx-2">
              <Button variant={viewport === "desktop" ? "secondary" : "ghost"} size="sm" onClick={() => setViewport("desktop")} className="h-8 px-2" title="Desktop">
                 <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4"><path d="M2.5 4C2.22386 4 2 4.22386 2 4.5V10.5C2 10.7761 2.22386 11 2.5 11H12.5C12.7761 11 13 10.7761 13 10.5V4.5C13 4.22386 12.7761 4 12.5 4H2.5ZM0.5 4.5C0.5 3.39543 1.39543 2.5 2.5 2.5H12.5C13.6046 2.5 14.5 3.39543 14.5 4.5V10.5C14.5 11.6046 13.6046 12.5 12.5 12.5H2.5C1.39543 12.5 0.5 11.6046 0.5 10.5V4.5ZM4.5 14C4.22386 14 4 13.7761 4 13.5C4 13.2239 4.22386 13 4.5 13H10.5C10.7761 13 11 13.2239 11 13.5C11 13.7761 10.7761 14 10.5 14H4.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
              </Button>
              <Button variant={viewport === "tablet" ? "secondary" : "ghost"} size="sm" onClick={() => setViewport("tablet")} className="h-8 px-2" title="Tablet">
                 <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4"><path d="M3.5 1.5C3.22386 1.5 3 1.72386 3 2V13C3 13.2761 3.22386 13.5 3.5 13.5H11.5C11.7761 13.5 12 13.2761 12 13V2C12 1.72386 11.7761 1.5 11.5 1.5H3.5ZM1.5 2C1.5 0.89543 2.39543 0 3.5 0H11.5C12.6046 0 13.5 0.89543 13.5 2V13C13.5 14.1046 12.6046 15 11.5 15H3.5C2.39543 15 1.5 14.1046 1.5 13V2ZM7.5 12C7.22386 12 7 12.2239 7 12.5C7 12.7761 7.22386 13 7.5 13C7.77614 13 8 12.7761 8 12.5C8 12.2239 7.77614 12 7.5 12Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
              </Button>
              <Button variant={viewport === "mobile" ? "secondary" : "ghost"} size="sm" onClick={() => setViewport("mobile")} className="h-8 px-2" title="Mobile">
                 <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4"><path d="M4.5 1.5C4.22386 1.5 4 1.72386 4 2V13C4 13.2761 4.22386 13.5 4.5 13.5H10.5C10.7761 13.5 11 13.2761 11 13V2C11 1.72386 10.7761 1.5 10.5 1.5H4.5ZM2.5 2C2.5 0.89543 3.39543 0 4.5 0H10.5C11.6046 0 12.5 0.89543 12.5 2V13C12.5 14.1046 11.6046 15 10.5 15H4.5C3.39543 15 2.5 14.1046 2.5 13V2ZM7.5 12C7.22386 12 7 12.2239 7 12.5C7 12.7761 7.22386 13 7.5 13C7.77614 13 8 12.7761 8 12.5C8 12.2239 7.77614 12 7.5 12Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
              </Button>
           </div>
        )}

        {activeTab === "code" && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="h-8 rounded-md px-3 bg-background text-xs ml-auto"
            >
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
             className="absolute p-8 flex items-center justify-center overflow-auto bg-dot-pattern transition-all duration-300 ease-in-out border-x border-dashed border-border/50 h-full"
             style={{ width: viewportWidths[viewport] }}
          >
             <LiveProvider code={code} theme={themes.vsDark}>
               <div className="w-full flex items-center justify-center bg-background rounded-md shadow-sm border p-4">
                 <ReactLivePreview className="max-w-full" />
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
