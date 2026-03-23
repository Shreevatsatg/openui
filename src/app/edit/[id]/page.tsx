"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function EditComponentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    tags: "",
    code: "",
    previewImage: "",
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    async function fetchComponent() {
      try {
        const res = await fetch(`/api/components/${id}/raw`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();

        // Populate the form
        setFormData({
          title: data.component.title || "",
          description: data.component.description || "",
          category: data.component.category || "",
          tags: data.component.tags ? data.component.tags.join(", ") : "",
          code: data.component.code || "",
          previewImage: data.component.previewImage || "",
        });
      } catch (e) {
        setMessage({ type: "error", text: "Failed to load component data." });
      } finally {
        setFetching(false);
      }
    }

    if (!authLoading && user) {
      fetchComponent();
    }
  }, [id, authLoading, user]);

  if (authLoading || fetching) return <div className="p-12 text-center text-muted-foreground">Loading...</div>;
  if (!user) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch(`/api/components/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage({ type: "error", text: data.message || "Failed to update component" });
      } else {
        setMessage({ type: "success", text: "Component updated successfully! Going back..." });
        setTimeout(() => {
          router.back();
        }, 1500);
      }
    } catch (err) {
      setMessage({ type: "error", text: "An error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "Buttons", "Cards", "Forms", "Inputs", "Modals", "Navigation", "Animations", "Loaders", "Layouts"
  ];

  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <Button variant="ghost" className="mb-6 -ml-4" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <Card className="shadow-lg border-border/50">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Edit Component</CardTitle>
          <CardDescription>
            Update your component details below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {message.text && (
              <div
                className={`p-4 rounded-md text-sm border ${message.type === "error"
                  ? "bg-destructive/10 text-destructive border-destructive/20"
                  : "bg-green-500/10 text-green-500 border-green-500/20"
                  }`}
              >
                {message.text}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="title">Component Title</label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g. Glowing Gradient Button"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="" disabled>Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat.toLowerCase()}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="description">Description</label>
              <Input
                id="description"
                name="description"
                placeholder="Briefly describe what this component does"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="tags">Tags (comma separated)</label>
              <Input
                id="tags"
                name="tags"
                placeholder="react, tailwind, animated, hover"
                value={formData.tags}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="previewImage">Preview Image URL (Optional)</label>
              <Input
                id="previewImage"
                name="previewImage"
                type="url"
                placeholder="https://example.com/preview.png"
                value={formData.previewImage}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="code">React / Tailwind Code</label>
              <textarea
                id="code"
                name="code"
                rows={15}
                placeholder={`function Button() {\n  return <button className="bg-primary px-4 py-2 rounded">Click me</button>\n}`}
                value={formData.code}
                onChange={handleChange}
                required
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 font-mono resize-y"
              />
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
