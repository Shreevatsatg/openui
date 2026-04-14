import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const viteEnv = `VITE_API_URL=http://localhost:5000`;

const mainTsx = `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);`;

export default function InstallationReact() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">React + Vite + Tailwind CSS</h1>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          OpenUI snippets assume React and Tailwind utility classes. This guide matches Tailwind v4 with the Vite plugin, similar to this project.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>1. Create a Vite + React + TypeScript project</CardTitle>
          <CardDescription>Official scaffolding.</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="rounded-lg border border-border bg-muted/30 p-4 text-sm overflow-auto text-muted-foreground">
            npm create vite@latest my-app -- --template react-ts{"\n"}cd my-app{"\n"}npm install
          </pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>2. Install Tailwind CSS v4</CardTitle>
          <CardDescription>Using the Vite plugin (recommended for new apps).</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <pre className="rounded-lg border border-border bg-muted/30 p-4 text-sm overflow-auto">
            npm install tailwindcss @tailwindcss/vite
          </pre>
          <p>Add the plugin in <code className="rounded bg-muted px-1">vite.config.ts</code>:</p>
          <pre className="rounded-lg border border-border bg-muted/30 p-4 text-xs overflow-auto">
{`import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});`}
          </pre>
          <p>
            In <code className="rounded bg-muted px-1">src/index.css</code>, import Tailwind once:
          </p>
          <pre className="rounded-lg border border-border bg-muted/30 p-4 text-xs overflow-auto">
            @import "tailwindcss";
          </pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>3. Align design tokens (optional)</CardTitle>
          <CardDescription>For colors that match OpenUI previews, define CSS variables similar to the gallery.</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>
            Copy token patterns from OpenUI&apos;s <code className="rounded bg-muted px-1">index.css</code> (<code className="rounded bg-muted px-1">:root</code> and{" "}
            <code className="rounded bg-muted px-1">.dark</code>) or extend Tailwind&apos;s <code className="rounded bg-muted px-1">@theme</code> block so classes like{" "}
            <code className="rounded bg-muted px-1">bg-background</code> resolve correctly.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>4. Common dependencies for snippets</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="rounded-lg border border-border bg-muted/30 p-4 text-sm overflow-auto text-muted-foreground">
            npm install lucide-react clsx tailwind-merge
          </pre>
          <p className="mt-3 text-sm text-muted-foreground">
            Some examples reference <code className="rounded bg-muted px-1">lucide-react</code> icons. Install only what your component uses.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>5. Environment (if you call an API)</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>Create <code className="rounded bg-muted px-1">.env</code> for Vite-prefixed variables:</p>
          <pre className="rounded-lg border border-border bg-muted/30 p-4 text-xs overflow-auto">{viteEnv}</pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>6. Entry point</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="rounded-lg border border-border bg-muted/30 p-4 text-xs overflow-auto text-muted-foreground">{mainTsx}</pre>
        </CardContent>
      </Card>
    </div>
  );
}
