import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/api";
import { COMPONENT_CATEGORY_OPTIONS } from "@/lib/componentCategories";
import { Highlight, themes } from "prism-react-renderer";
import { Eye, EyeOff } from "lucide-react";
import { LivePreviewSandbox } from "@/components/LivePreview";

const BOILERPLATE = `export function MyComponent() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
      <h3 className="text-lg font-semibold">My Component</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Edit this to build your component.
      </p>
      <button className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition">
        Action
      </button>
    </div>
  );
}

render(<MyComponent />);`;

export default function SubmitPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "", description: "", category: "", tags: "", code: BOILERPLATE, previewImage: "", themeSupport: "both",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showPreview, setShowPreview] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);

  if (!user) return null;

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

    try {
      await api.post("/api/components", formData);
      setMessage({ type: "success", text: "Component submitted! Redirecting..." });
      setTimeout(() => navigate("/components"), 2000);
    } catch (err: any) {
      setMessage({ type: "error", text: err.response?.data?.message || "Failed to submit" });
    } finally {
      setLoading(false);
    }
  };

  const categories = COMPONENT_CATEGORY_OPTIONS;

  return (
    <div className={`container mx-auto py-12 px-4 ${showPreview ? "max-w-none" : "max-w-4xl"}`}>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Submit a Component</CardTitle>
          <CardDescription>
            Share your best work with the OpenUI community. Review the <Link to="/contribute" className="text-primary underline-offset-4 hover:underline">contribution guide</Link> before submitting.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {message.text && (
              <div className={`p-4 rounded-md text-sm border ${message.type === "error" ? "bg-destructive/10 text-destructive border-destructive/20" : "bg-green-500/10 text-green-500 border-green-500/20"}`}>
                {message.text}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Component Title</label>
                <Input name="title" placeholder="e.g. Glowing Button" value={formData.title} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <select name="category" value={formData.category} onChange={handleChange} required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:ring-1 focus-visible:ring-primary outline-none">
                  <option value="" disabled>Select category</option>
                  {categories.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Input name="description" placeholder="Briefly describe" value={formData.description} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium">Tags (comma separated)</label>
                <Input name="tags" placeholder="react, tailwind" value={formData.tags} onChange={handleChange} />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium">Preview Image URL</label>
                <Input name="previewImage" type="url" placeholder="https://" value={formData.previewImage} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Theme Support</label>
              <select
                name="themeSupport"
                value={formData.themeSupport}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:ring-1 focus-visible:ring-primary outline-none"
              >
                <option value="both">Both light and dark</option>
                <option value="light">Light only</option>
                <option value="dark">Dark only</option>
              </select>
              <p className="text-xs text-muted-foreground">
                Prefer "Both light and dark". Single-theme components may be rejected if readability is affected.
              </p>
            </div>
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Code</label>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">Must use <code className="bg-muted px-1 rounded">export function</code> + <code className="bg-muted px-1 rounded">render()</code></span>
                    <Button type="button" variant="outline" size="sm" onClick={() => setShowPreview(p => !p)} className="h-7 px-2 text-xs gap-1">
                      {showPreview ? <><EyeOff className="h-3.5 w-3.5" /> Hide Preview</> : <><Eye className="h-3.5 w-3.5" /> Preview</>}
                    </Button>
                  </div>
                </div>
                <div className={`flex gap-4 ${showPreview ? "items-start" : ""}`}>
                  <div className="relative flex-1 rounded-md border border-input overflow-hidden bg-[#1E1E1E]" style={{ minHeight: "300px" }}>
                    <Highlight theme={themes.vsDark} code={formData.code || " "} language="tsx">
                      {({ tokens, getLineProps, getTokenProps }) => (
                        <pre
                          ref={preRef}
                          aria-hidden
                          className="absolute inset-0 p-3 text-sm font-mono m-0 overflow-auto pointer-events-none whitespace-pre"
                          style={{ background: "transparent", color: "inherit" }}
                        >
                          {tokens.map((line, i) => (
                            <div key={i} {...getLineProps({ line })}>
                              <span className="inline-block w-8 text-right opacity-30 select-none mr-4 text-xs">{i + 1}</span>
                              {line.map((token, key) => (
                                <span key={key} {...getTokenProps({ token })} />
                              ))}
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
                      className="absolute inset-0 w-full h-full p-3 pl-[3.25rem] text-sm font-mono bg-transparent text-transparent caret-white resize-none outline-none border-none"
                      style={{ caretColor: "white" }}
                    />
                  </div>
                  {showPreview && formData.code && (
                    <div className="flex-1 min-w-0">
                      <LivePreviewSandbox code={formData.code} themeSupport={formData.themeSupport as "both" | "light" | "dark"} />
                    </div>
                  )}
                </div>
            </div>
            <div className="flex justify-end pt-4 border-t">
               <Button type="submit" disabled={loading}>{loading ? "Submitting..." : "Submit"}</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
