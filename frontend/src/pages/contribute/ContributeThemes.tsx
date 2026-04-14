import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContributeThemes() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Theme compatibility</h1>
        <p className="mt-2 text-muted-foreground">
          Previews follow the site theme by default. You can temporarily override preview light/dark in the sandbox without changing global theme.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Standards</CardTitle>
          <CardDescription>What we expect for Theme Support.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <p>
            Prefer <strong className="text-foreground">both</strong>. Use design tokens such as{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">bg-background</code>,{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">text-foreground</code>,{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">border-border</code>, and{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">text-muted-foreground</code> instead of hard-coded hex colors.
          </p>
          <p>
            If you choose light-only or dark-only, explain why in the description. Single-theme snippets may still be rejected if they are hard to read.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
