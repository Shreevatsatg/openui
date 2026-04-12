import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/api";

export default function SubmitPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "", description: "", category: "", tags: "", code: "", previewImage: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  if (!user) return null;

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

  const categories = ["Buttons", "Cards", "Forms", "Inputs", "Modals", "Navigation", "Animations", "Loaders", "Layouts"];

  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Submit a Component</CardTitle>
          <CardDescription>Share your best work with the OpenUI community.</CardDescription>
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
                  {categories.map(c => <option key={c} value={c.toLowerCase()}>{c}</option>)}
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
                <label className="text-sm font-medium">Code</label>
                <textarea name="code" rows={10} value={formData.code} onChange={handleChange} required className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono focus-visible:ring-1 focus-visible:ring-primary outline-none"/>
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
