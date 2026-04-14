import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const onlyPattern = `export function MyComponent() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
      <h3 className="text-lg font-semibold">My Component</h3>
      <p className="mt-2 text-sm text-muted-foreground">Description here.</p>
    </div>
  );
}

render(<MyComponent />);`;

const statefulExample = `export function Counter() {
  const [count, setCount] = React.useState(0);
  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-6">
      <button
        onClick={() => setCount(c => c - 1)}
        className="rounded-md bg-secondary px-3 py-1 text-sm font-medium hover:opacity-80 transition"
      >
        −
      </button>
      <span className="text-lg font-semibold tabular-nums">{count}</span>
      <button
        onClick={() => setCount(c => c + 1)}
        className="rounded-md bg-primary px-3 py-1 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
      >
        +
      </button>
    </div>
  );
}

render(<Counter />);`;

const multiComponentExample = `export function Badge({ label, variant = "default" }) {
  const styles = variant === "success"
    ? "bg-green-500/10 text-green-600 border-green-500/20"
    : "bg-primary/10 text-primary border-primary/20";
  return (
    <span className={\`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium \${styles}\`}>
      {label}
    </span>
  );
}

export function BadgeDemo() {
  return (
    <div className="flex gap-2">
      <Badge label="Default" />
      <Badge label="Success" variant="success" />
    </div>
  );
}

render(<BadgeDemo />);`;

export default function ContributeSnippets() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Snippet format</h1>
        <p className="mt-2 text-muted-foreground">
          OpenUI only accepts the <strong>function component</strong> pattern. Bare JSX expressions are not supported.
          Every submission must define at least one <code className="bg-muted px-1 rounded text-xs">export function</code> and end with a <code className="bg-muted px-1 rounded text-xs">render()</code> call.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Required pattern — export function + render</CardTitle>
          <CardDescription>The only accepted format. Works for static, stateful, and multi-component submissions.</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="rounded-lg border border-border bg-[#1E1E1E] p-4 text-xs overflow-auto text-zinc-300 font-mono">{onlyPattern}</pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Stateful component</CardTitle>
          <CardDescription>Use <code className="bg-muted px-1 rounded text-xs">React.useState</code> (no imports needed — React is available globally).</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="rounded-lg border border-border bg-[#1E1E1E] p-4 text-xs overflow-auto text-zinc-300 font-mono">{statefulExample}</pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Multiple components</CardTitle>
          <CardDescription>Define helpers above, render the top-level one at the bottom.</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="rounded-lg border border-border bg-[#1E1E1E] p-4 text-xs overflow-auto text-zinc-300 font-mono">{multiComponentExample}</pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What will be rejected</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>— Bare JSX with no wrapping function (e.g. just <code className="bg-muted px-1 rounded text-xs">&lt;button&gt;Click&lt;/button&gt;</code>).</p>
          <p>— Code with <code className="bg-muted px-1 rounded text-xs">import</code> or <code className="bg-muted px-1 rounded text-xs">export default</code> statements — the sandbox has no bundler.</p>
          <p>— Missing <code className="bg-muted px-1 rounded text-xs">render()</code> at the end — the preview will be blank.</p>
          <p>— Fixed pixel widths that break the responsive preview.</p>
          <p>— External fetch calls or private URLs.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quality checklist</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>— Accessible labels, focus styles, predictable keyboard navigation.</p>
          <p>— Token-based Tailwind classes only (<code className="bg-muted px-1 rounded text-xs">bg-primary</code>, <code className="bg-muted px-1 rounded text-xs">text-foreground</code>, etc.) so both themes work.</p>
          <p>— No secrets or private URLs in snippets.</p>
          <p>— Keep dependencies minimal — Lucide icons are available globally as <code className="bg-muted px-1 rounded text-xs">LucideIcons</code>.</p>
        </CardContent>
      </Card>
    </div>
  );
}
