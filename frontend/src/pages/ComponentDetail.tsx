import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { LivePreviewSandbox } from "@/components/LivePreview";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";

export default function ComponentDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();
  const [component, setComponent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    api.get(`/api/components/${slug}`)
      .then((res) => setComponent(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="p-12 text-center text-muted-foreground">Loading component...</div>;
  if (error || !component) return <div className="p-12 text-center text-destructive">Component not found.</div>;

  return (
    <div>
      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Link to="/components" className="hover:text-foreground transition-colors">Components</Link>
          <span>/</span>
          <span className="capitalize">{component.category}</span>
          <span>/</span>
          <span className="text-foreground">{component.title}</span>
        </div>

        <div className="flex justify-between items-start gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">{component.title}</h1>
            <p className="text-lg text-muted-foreground mt-2 w-full">
              {component.description}
            </p>
            <div className="mt-2 text-sm text-muted-foreground">
              By {component.authorId?.name || "Unknown"}
            </div>
            <Badge variant="outline" className="mt-3 capitalize">
              Theme support: {component.themeSupport || "both"}
            </Badge>
          </div>

          {(user?.role === "admin" ||
            (user && String(component.authorId?._id ?? component.authorId) === String(user._id))) && (
              <Button asChild variant="outline">
                <Link to={`/edit/${component._id}`}>Edit Component</Link>
              </Button>
            )}
        </div>
      </div>

      <div className="space-y-12">
        <section>
          <LivePreviewSandbox code={component.code} themeSupport={component.themeSupport || "both"} slug={component.slug} />
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-semibold tracking-tight">Installation</h3>
          <div className="bg-muted p-4 rounded-md text-sm font-mono overflow-auto border border-border/50 text-muted-foreground">
            npm install lucide-react framer-motion clsx tailwind-merge
          </div>
        </section>
      </div>
    </div>
  );
}
