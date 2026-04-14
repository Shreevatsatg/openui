import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { LivePreviewSandbox } from "@/components/LivePreview";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { Highlight, themes } from "prism-react-renderer";
import { Clipboard, Check } from "lucide-react";

export default function ComponentDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();
  const [component, setComponent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copiedDep, setCopiedDep] = useState(false);
  const [copiedUsage, setCopiedUsage] = useState(false);

  const handleCopyDep = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedDep(true);
    setTimeout(() => setCopiedDep(false), 2000);
  };

  const handleCopyUsage = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUsage(true);
    setTimeout(() => setCopiedUsage(false), 2000);
  };

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

        {component.dependencies && component.dependencies.length > 0 && (
          <section className="space-y-4">
            <h3 className="text-xl font-semibold tracking-tight">Dependencies</h3>
            <div className="bg-muted p-4 rounded-md text-sm font-mono overflow-auto border border-border/50 text-muted-foreground relative group flex items-center justify-between">
              <span>npm install {component.dependencies.join(" ")}</span>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleCopyDep(`npm install ${component.dependencies.join(" ")}`)}
              >
                {copiedDep ? <Check className="h-3.5 w-3.5 text-green-500 mr-2" /> : <Clipboard className="h-3.5 w-3.5 mr-2" />}
                {copiedDep ? "Copied" : "Copy"}
              </Button>
            </div>
          </section>
        )}

        {component.usage && (
          <section className="space-y-4">
            <h3 className="text-xl font-semibold tracking-tight">Usage Example</h3>
            <div className="bg-[#1E1E1E] rounded-md overflow-hidden relative group">
              <Highlight theme={themes.vsDark} code={component.usage} language="tsx">
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                  <pre className={`${className} p-4 text-sm font-mono overflow-auto m-0`} style={style}>
                    {tokens.map((line, i) => (
                      <div key={i} {...getLineProps({ line })}>
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token })} />
                        ))}
                      </div>
                    ))}
                  </pre>
                )}
              </Highlight>
              <Button 
                variant="outline" 
                size="sm" 
                className="absolute right-2 top-2 h-8 bg-[#333] border-none text-[#ccc] hover:bg-[#444] hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleCopyUsage(component.usage)}
              >
                {copiedUsage ? <Check className="h-3.5 w-3.5 text-green-500 mr-2" /> : <Clipboard className="h-3.5 w-3.5 mr-2" />}
                {copiedUsage ? "Copied" : "Copy Code"}
              </Button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
