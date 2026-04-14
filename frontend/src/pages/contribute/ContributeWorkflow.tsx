import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContributeWorkflow() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Workflow</h1>
        <p className="mt-2 text-muted-foreground">End-to-end path from local development to an approved listing.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Steps</CardTitle>
          <CardDescription>What happens after you click Submit.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <ol className="list-decimal list-inside space-y-2">
            <li>Sign in and open Submit. Paste a self-contained snippet (see Snippets).</li>
            <li>Admins review in the dashboard. They check theme contrast, accessibility, and parser errors.</li>
            <li>Approved components appear on the Components page and in search.</li>
            <li>Edits by non-admins return the item to pending for another review.</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
