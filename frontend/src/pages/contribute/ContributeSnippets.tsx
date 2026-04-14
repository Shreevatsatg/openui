import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const patternA = `<button className="rounded-md bg-primary px-4 py-2 text-primary-foreground">
  Click me
</button>`;

const patternB = `function DemoCard() {
  return (
    <div className="rounded-lg border border-border bg-card p-4 text-card-foreground">
      Hello
    </div>
  );
}

render(<DemoCard />);`;

const starter = `function ContributorStarterCard() {
  return (
    <div className="w-full max-w-sm rounded-xl border border-border bg-card text-card-foreground shadow-sm">
      <div className="border-b border-border p-4">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">OpenUI Starter</p>
        <h3 className="mt-1 text-xl font-semibold">Theme-safe Component</h3>
      </div>
      <div className="p-4 space-y-3">
        <p className="text-sm text-muted-foreground">
          Uses token-based classes so it works in both light and dark mode.
        </p>
        <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition">
          Primary action
        </button>
      </div>
    </div>
  );
}

render(<ContributorStarterCard />);`;

export default function ContributeSnippets() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Snippet format</h1>
        <p className="mt-2 text-muted-foreground">Valid patterns for the live preview. Avoid import/export in pasted code.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pattern A — simple JSX</CardTitle>
          <CardDescription>Single expression.</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="rounded-lg border border-border bg-muted/30 p-4 text-xs overflow-auto text-muted-foreground">{patternA}</pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pattern B — component + render</CardTitle>
          <CardDescription>For stateful or multi-line UI.</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="rounded-lg border border-border bg-muted/30 p-4 text-xs overflow-auto text-muted-foreground">{patternB}</pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Starter example</CardTitle>
          <CardDescription>Copy/paste to test submission.</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="rounded-lg border border-border bg-muted/30 p-4 text-xs overflow-auto text-muted-foreground">{starter}</pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quality checklist</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>— Accessible labels, focus styles, predictable keyboard navigation.</p>
          <p>— No secrets or private URLs in snippets.</p>
          <p>— Flexible layout; avoid fixed widths when possible.</p>
          <p>— Keep dependencies minimal (Lucide is common for icons).</p>
        </CardContent>
      </Card>
    </div>
  );
}
