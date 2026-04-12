"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SubmitPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    tags: "",
    code: "",
    previewImage: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Only logged-in users can submit, though CentralNavigation handles the redirect if not authenticated.
  if (!user) {
    return null; // Let the navigation handle redirect
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch("/api/components", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage({ type: "error", text: data.message || "Failed to submit component" });
      } else {
        setMessage({ type: "success", text: "Component submitted successfully! Redirecting..." });
        setTimeout(() => {
          router.push("/components");
        }, 2000);
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
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Submit a Component</CardTitle>
          <CardDescription>
            Share your best work with the OpenUI community. All submissions are reviewed by an admin before being published.
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
              <p className="text-xs text-muted-foreground">
                Ensure your code is a valid React component. It will be rendered in the Live Preview sandbox. Please do NOT include `export default` in the raw string if it breaks react-live. Usually just provide the component function definition.
              </p>
            </div>

            <div className="flex justify-end pt-4 border-t">
              <Button type="submit" size="lg" disabled={loading} className="w-full md:w-auto text-background">
                {loading ? "Submitting..." : "Submit Component"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
