import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ContributeIndex() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">Contribute to OpenUI</h1>
        <p className="text-muted-foreground text-lg max-w-3xl">
          This guide explains how to submit production-ready components that pass review quickly and work reliably in both light and dark themes. Use the sidebar to jump to installation steps for React or Next.js.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick start</CardTitle>
          <CardDescription>Set up Tailwind in your app, then copy components from the gallery.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button asChild className="text-background">
            <Link to="/contribute/installation/react">Install — React + Vite</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/contribute/installation/nextjs">Tailwind css</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link to="/submit">Submit a component</Link>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contribution workflow</CardTitle>
          <CardDescription>Follow this sequence for smooth approvals.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>1. Build your component with reusable props and clean naming.</p>
          <p>2. Verify keyboard support, focus states, and semantic HTML.</p>
          <p>3. Test visual quality in both light and dark preview modes.</p>
          <p>4. Submit clear title, category, description, and tags.</p>
          <p>5. Write code as <code className="bg-muted px-1 rounded text-xs">export function MyComponent()</code> ending with <code className="bg-muted px-1 rounded text-xs">render(&lt;MyComponent /&gt;)</code> — bare JSX is rejected.</p>
          <p>6. Choose correct Theme Support (both, light-only, dark-only).</p>
          <p>7. Re-open your submission in preview and verify there are no runtime or syntax errors.</p>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-3">
        <Button asChild className="text-background">
          <Link to="/submit">Submit a Component</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/components">Browse Existing Components</Link>
        </Button>
      </div>
    </div>
  );
}
