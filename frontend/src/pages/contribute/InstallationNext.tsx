import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function InstallationNext() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Next.js + Tailwind CSS</h1>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          Use the App Router and Tailwind v4 when starting a new project. Snippets from OpenUI paste into client components.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>1. Create a Next.js app</CardTitle>
          <CardDescription>TypeScript, ESLint, Tailwind, and App Router.</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="rounded-lg border border-border bg-muted/30 p-4 text-sm overflow-auto text-muted-foreground">
            npx create-next-app@latest my-app{"\n"}
            {"\n"}
            # Enable: TypeScript, ESLint, Tailwind, src/ directory, App Router
          </pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>2. Tailwind v4 in Next.js</CardTitle>
          <CardDescription>Follow the current Next.js + Tailwind docs for your CLI version.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            New <code className="rounded bg-muted px-1">create-next-app</code> templates often include Tailwind. Ensure{" "}
            <code className="rounded bg-muted px-1">src/app/globals.css</code> imports Tailwind (for v4:{" "}
            <code className="rounded bg-muted px-1">@import &quot;tailwindcss&quot;;</code>).
          </p>
          <p>
            Configure <code className="rounded bg-muted px-1">darkMode: [&quot;class&quot;]</code> if you toggle <code className="rounded bg-muted px-1">class=&quot;dark&quot;</code> on{" "}
            <code className="rounded bg-muted px-1">html</code> to match OpenUI-style tokens.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>3. Using copied components</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            Add <code className="rounded bg-muted px-1">&quot;use client&quot;;</code> at the top of files that use <code className="rounded bg-muted px-1">useState</code>,{" "}
            <code className="rounded bg-muted px-1">useEffect</code>, or event handlers.
          </p>
          <p>Place UI in <code className="rounded bg-muted px-1">src/components</code> and import from your routes or layouts.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>4. Dependencies</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="rounded-lg border border-border bg-muted/30 p-4 text-sm overflow-auto text-muted-foreground">
            npm install lucide-react clsx tailwind-merge
          </pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>5. Environment variables</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>Prefix client-side variables with <code className="rounded bg-muted px-1">NEXT_PUBLIC_</code>.</p>
          <pre className="rounded-lg border border-border bg-muted/30 p-4 text-xs overflow-auto">
            NEXT_PUBLIC_API_URL=http://localhost:5000
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
