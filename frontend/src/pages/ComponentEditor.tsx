import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";
import { COMPONENT_CATEGORY_OPTIONS } from "@/lib/componentCategories";
import { Highlight, themes } from "prism-react-renderer";
import { LivePreviewSandbox } from "@/components/LivePreview";
import { Loader2, ArrowLeft, PanelLeftClose, PanelLeft, Columns, Code, Eye, X, Plus } from "lucide-react";

const BOILERPLATE = `import React from "react";
import { Loader2 } from "lucide-react";

export function MyComponent() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
      <h3 className="text-lg font-semibold">My Component</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Edit this to build your component.
      </p>
      <button className="mt-4 flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition">
        Action <Loader2 className="h-4 w-4 animate-spin" />
      </button>
    </div>
  );
}`;

export default function ComponentEditor() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const [formData, setFormData] = useState({
    title: "", description: "", category: "", tags: "", code: isEditMode ? "" : BOILERPLATE, previewImage: "", themeSupport: "both", dependencies: [] as string[], usage: "",
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditMode);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [showSidebar, setShowSidebar] = useState(true);
  const [ideView, setIdeView] = useState<"split" | "code" | "preview">("split");
  const [splitWidth, setSplitWidth] = useState(50);

  const containerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (!isEditMode || authLoading || !user) return;

    api.get(`/api/components/id/${id}`)
      .then(res => {
        const data = res.data;
        setFormData({
          title: data.title || "", description: data.description || "",
          category: data.category || "", tags: data.tags ? data.tags.join(", ") : "",
          code: data.code || "", previewImage: data.previewImage || "", themeSupport: data.themeSupport || "both",
          dependencies: data.dependencies || [], usage: data.usage || "",
        });
      })
      .catch(() => setMessage({ type: "error", text: "Failed to load component data." }))
      .finally(() => setFetching(false));
  }, [id, authLoading, user, isEditMode]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const newPercentage = ((e.clientX - left) / width) * 100;
    setSplitWidth(Math.max(20, Math.min(80, newPercentage)));
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const syncScroll = () => {
    if (textareaRef.current && preRef.current) {
      preRef.current.scrollTop = textareaRef.current.scrollTop;
      preRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    const codeChecksPassed = formData.code.includes("export function") || formData.code.includes("export default function") || formData.code.includes("export const");
    if (!codeChecksPassed) {
      setMessage({ type: "error", text: "Invalid Code Format: Please export your main component (e.g. 'export function MyComponent()')." });
      setLoading(false);
      return;
    }

    try {
      if (isEditMode) {
        await api.put(`/api/components/${id}`, formData);
        setMessage({ type: "success", text: "Component updated! Going back..." });
        setTimeout(() => navigate(-1), 1500);
      } else {
        await api.post("/api/components", formData);
        setMessage({ type: "success", text: "Component submitted! Redirecting..." });
        setTimeout(() => navigate("/components"), 2000);
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.response?.data?.message || (isEditMode ? "Failed to update" : "Failed to submit") });
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || fetching) return <div className="flex h-screen items-center justify-center p-12 text-center text-muted-foreground"><Loader2 className="mr-2 h-6 w-6 animate-spin" /> Loading Editor...</div>;
  if (!user) return null;

  const categories = COMPONENT_CATEGORY_OPTIONS;

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)] w-full overflow-hidden bg-background">
      {/* Left Sidebar - Metadata */}
      {showSidebar && (
        <div className="w-full lg:w-1/3 xl:w-1/4 border-r border-border/50 overflow-y-auto flex flex-col bg-card transition-all duration-300">
          <div className=" border-b border-border/50 sticky top-0 bg-card z-10 flex items-center justify-center">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5 mr-3" />
            </Button>
            <h1 className="text-xl font-bold tracking-tight p-4">{isEditMode ? "Edit Component" : "Submit Component"}</h1>
          </div>

          <div className="p-4 flex-1">
            <p className="text-sm text-muted-foreground mb-6">
              {isEditMode
                ? "Update your component metadata and code."
                : "Review the contribution guide before submitting. Make sure to export your main component."
              }
            </p>

            <form id="editor-form" onSubmit={handleSubmit} className="space-y-5">
              {message.text && (
                <div className={`p-3 rounded-md text-sm border ${message.type === "error" ? "bg-destructive/10 text-destructive border-destructive/20" : "bg-green-500/10 text-green-500 border-green-500/20"}`}>
                  {message.text}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Title</label>
                <Input name="title" placeholder="Glowing Button" value={formData.title} onChange={handleChange} required className="h-9" />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Category</label>
                <select name="category" value={formData.category} onChange={handleChange} required className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm focus-visible:ring-1 focus-visible:ring-primary outline-none">
                  <option value="" disabled>Select...</option>
                  {categories.map((c) => (
                    <option key={c.slug} value={c.slug}>{c.label}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Description</label>
                <Input name="description" placeholder="A stunning button..." value={formData.description} onChange={handleChange} required className="h-9" />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Tags</label>
                <Input name="tags" placeholder="react, tailwind (comma separated)" value={formData.tags} onChange={handleChange} className="h-9" />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider flex items-center justify-between">
                  <span>Dependencies</span>
                  <button type="button" onClick={() => setFormData({...formData, dependencies: [...formData.dependencies, ""]})} className="text-primary hover:underline hover:text-primary/80 lowercase flex items-center gap-1">
                    <Plus className="h-3 w-3" /> Add
                  </button>
                </label>
                <div className="space-y-2">
                  {formData.dependencies.map((dep, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Input value={dep} onChange={(e) => {
                        const newDeps = [...formData.dependencies];
                        newDeps[idx] = e.target.value;
                        setFormData({...formData, dependencies: newDeps});
                      }} placeholder="e.g. lucide-react" className="h-9 flex-1" />
                      <Button type="button" variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-destructive shrink-0" onClick={() => {
                        const newDeps = formData.dependencies.filter((_, i) => i !== idx);
                        setFormData({...formData, dependencies: newDeps});
                      }}>
                         <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  {formData.dependencies.length === 0 && <div className="text-xs text-muted-foreground italic">No dependencies added.</div>}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Usage Example</label>
                <textarea
                  name="usage"
                  placeholder="import { Button } from '@/components/ui/button';&#10;&#10;export default function App() {&#10;  return <Button>Click</Button>&#10;}"
                  value={formData.usage}
                  onChange={handleChange}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground outline-none focus-visible:ring-1 focus-visible:ring-primary min-h-[100px] font-mono"
                />
              </div>

            </form>
          </div>

          <div className="p-4 border-t border-border/50 bg-card sticky bottom-0 z-10 w-full">
            <Button type="submit" form="editor-form" disabled={loading} className="w-full shadow-md font-medium text-lg h-11">
              {loading
                ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> {isEditMode ? "Saving" : "Submitting"}</>
                : (isEditMode ? "Save Changes" : "Submit Component")
              }
            </Button>
          </div>
        </div>
      )}

      {/* Right Content - IDE Area */}
      <div className={`w-full flex flex-col h-[calc(100vh-4rem)] bg-[#1e1e1e] transition-all duration-300 ${showSidebar ? "lg:w-2/3 xl:w-3/4" : "flex-1"}`}>
        <div className="bg-[#252526] px-4 py-2 border-b border-[#333] flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => setShowSidebar(!showSidebar)} className="h-7 w-7 text-[#ccc] hover:text-white hover:bg-[#333]">
              {showSidebar ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeft className="h-4 w-4" />}
            </Button>
            <span className="text-xs font-medium text-[#ccc] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
              component.tsx
            </span>
          </div>

          <div className="flex items-center gap-1 bg-[#1e1e1e] p-1 rounded-md">
            <button onClick={() => setIdeView("split")} className={`p-1.5 rounded ${ideView === 'split' ? 'bg-[#333] text-white shadow-sm' : 'text-[#888] hover:text-[#ccc]'}`} title="Split View">
              <Columns className="h-4 w-4" />
            </button>
            <button onClick={() => setIdeView("code")} className={`p-1.5 rounded ${ideView === 'code' ? 'bg-[#333] text-white shadow-sm' : 'text-[#888] hover:text-[#ccc]'}`} title="Code Only">
              <Code className="h-4 w-4" />
            </button>
            <button onClick={() => setIdeView("preview")} className={`p-1.5 rounded ${ideView === 'preview' ? 'bg-[#333] text-white shadow-sm' : 'text-[#888] hover:text-[#ccc]'}`} title="Preview Only">
              <Eye className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-row min-h-0 bg-[#1e1e1e]" ref={containerRef}>
          {/* Component 1: Code Editor */}
          {ideView !== "preview" && (
            <div
              className={`relative flex flex-col min-h-0 bg-[#1E1E1E] ${ideView === "split" ? "border-r border-[#333]" : "flex-1"}`}
              style={ideView === "split" ? { width: `${splitWidth}%` } : {}}
            >
              <div className="relative flex-1 overflow-hidden">
                <Highlight theme={themes.vsDark} code={formData.code || " "} language="tsx">
                  {({ tokens, getLineProps, getTokenProps }) => (
                    <pre
                      ref={preRef}
                      aria-hidden
                      className="absolute inset-0 p-4 text-[13px] leading-relaxed font-mono m-0 overflow-auto pointer-events-none whitespace-pre"
                      style={{ background: "transparent", color: "inherit", tabSize: 2 }}
                    >
                      {tokens.map((line, i) => (
                        <div key={i} {...getLineProps({ line })} className="table-row">
                          <span className="table-cell text-right w-8 opacity-30 select-none pr-4 text-xs">{i + 1}</span>
                          <span className="table-cell">
                            {line.map((token, key) => (
                              <span key={key} {...getTokenProps({ token })} />
                            ))}
                          </span>
                        </div>
                      ))}
                    </pre>
                  )}
                </Highlight>
                <textarea
                  ref={textareaRef}
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  onScroll={syncScroll}
                  required
                  spellCheck={false}
                  className="absolute inset-0 w-full h-full p-4 pl-[3.25rem] text-[13px] leading-relaxed font-mono bg-transparent text-transparent caret-white resize-none outline-none border-none"
                  style={{ caretColor: "white", tabSize: 2 }}
                />
              </div>
            </div>
          )}

          {/* Draggable Divider */}
          {ideView === "split" && (
            <div
              className="w-2 hover:bg-primary/50 active:bg-primary cursor-col-resize transition-colors z-10 hidden lg:block border-x border-[#222]"
              onMouseDown={handleMouseDown}
            />
          )}

          {/* Component 2: Live Preview Sandbox */}
          {ideView !== "code" && (
            <div
              className="bg-muted/30 relative flex flex-col min-h-0 overflow-hidden"
              style={ideView === "split" ? { width: `calc(${100 - splitWidth}% - 8px)` } : { flex: 1 }}
            >
              <div className="w-full h-full p-4 overflow-y-auto">
                <LivePreviewSandbox code={formData.code} themeSupport={formData.themeSupport as any} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
