import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { api } from "@/lib/api";
import { COMPONENT_CATEGORY_OPTIONS } from "@/lib/componentCategories";

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

  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
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
            <div className="space-y-2">
              <label className="text-sm font-medium">Code</label>
              <textarea name="code" rows={15} value={formData.code} onChange={handleChange} required className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono resize-y" />
            </div>
            <div className="flex justify-end pt-4 border-t border-border/50">
              <Button type="submit" size="lg" disabled={loading} className="w-full md:w-auto text-background">
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
