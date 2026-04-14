import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { api } from "@/lib/api";
import { COMPONENT_CATEGORY_OPTIONS } from "@/lib/componentCategories";
import { LivePreviewSandbox } from "@/components/LivePreview";
import { Highlight, themes } from "prism-react-renderer";

export default function EditComponentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [formData, setFormData] = useState({
    title: "", description: "", category: "", tags: "", code: "", previewImage: "", themeSupport: "both",
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showPreview, setShowPreview] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (!id || authLoading || !user) return;
    api.get(`/api/components/id/${id}`)
    .then(res => {
      const data = res.data;
      setFormData({
        title: data.title || "", description: data.description || "",
        category: data.category || "", tags: data.tags ? data.tags.join(", ") : "",
        code: data.code || "", previewImage: data.previewImage || "", themeSupport: data.themeSupport || "both",
      });
    })
    .catch(() => setMessage({ type: "error", text: "Failed to load" }))
    .finally(() => setFetching(false));
  }, [id, authLoading, user]);

  if (authLoading || fetching) return <div className="p-12 text-center text-muted-foreground">Loading...</div>;
  if (!user) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setMessage({ type: "", text: "" });
    try {
      await api.put(`/api/components/${id}`, formData);
      setMessage({ type: "success", text: "Updated successfully! Going back..." });
      setTimeout(() => navigate(-1), 1500);
    } catch (err: any) {
      setMessage({ type: "error", text: err.response?.data?.message || "Failed to update" });
    } finally {
      setLoading(false);
    }
  };

  const categories = COMPONENT_CATEGORY_OPTIONS;

  const syncScroll = () => {
    if (textareaRef.current && preRef.current) {
      preRef.current.scrollTop = textareaRef.current.scrollTop;
      preRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  return (
    <div className={`container mx-auto py-12 px-4 ${showPreview ? "max-w-none" : "max-w-4xl"}`}>
      <Button variant="ghost" className="mb-6 -ml-4" onClick={() => navigate(-1)}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <Card className="shadow-lg border-border/50">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Edit Component</CardTitle>
          <CardDescription>Update your component details below.</CardDescription>
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
                <Input name="title" value={formData.title} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <select name="category" value={formData.category} onChange={handleChange} required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option value="" disabled>Select category</option>
                  {categories.map((cat) => (
                    <option key={cat.slug} value={cat.slug}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Input name="description" value={formData.description} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Tags (comma separated)</label>
              <Input name="tags" value={formData.tags} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Preview Image URL</label>
              <Input name="previewImage" type="url" value={formData.previewImage} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Theme Support</label>
              <select
                name="themeSupport"
                value={formData.themeSupport}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="both">Both light and dark</option>
                <option value="light">Light only</option>
                <option value="dark">Dark only</option>
              </select>
            </div>
            <div className={`space-y-2 ${showPreview ? "col-span-full" : ""}`}>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Code</label>
                <Button type="button" variant="outline" size="sm" onClick={() => setShowPreview(p => !p)} className="h-7 px-2 text-xs gap-1">
                  {showPreview ? <><EyeOff className="h-3.5 w-3.5" /> Hide Preview</> : <><Eye className="h-3.5 w-3.5" /> Preview</>}
                </Button>
              </div>
              <div className={`flex gap-4 ${showPreview ? "items-start" : ""}`}>
                {/* Syntax-highlighted code editor */}
                <div className="relative flex-1 rounded-md border border-input overflow-hidden bg-[#1E1E1E]" style={{ minHeight: "360px" }}>
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
                {/* Live preview panel */}
                {showPreview && formData.code && (
                  <div className="flex-1 min-w-0">
                    <LivePreviewSandbox code={formData.code} themeSupport={formData.themeSupport as "both" | "light" | "dark"} />
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end pt-4 border-t border-border/50">
              <Button type="submit" size="lg" disabled={loading} className="w-full md:w-auto text-background">
                {loading ? "Submiting..." : "Submit"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
