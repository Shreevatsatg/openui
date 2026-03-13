"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LivePreviewSandbox } from "@/components/LivePreview";

type Submission = {
  _id: string;
  title: string;
  description: string;
  category: string;
  code: string;
  author: string;
  createdAt: string;
};

export function AdminSubmissionList({ submissions, isApproved = false }: { submissions: Submission[], isApproved?: boolean }) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleAction = async (id: string, action: "approve" | "reject") => {
    setLoadingId(id);
    try {
      const res = await fetch(`/api/admin/${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        router.refresh();
      } else {
        alert(`Failed to ${action} component`);
      }
    } catch (e) {
      alert("Error occurred");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-8">
      {submissions.map((sub) => (
        <Card key={sub._id} className="overflow-hidden border-border/50">
          <CardHeader className="bg-muted/30 pb-4">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{sub.title}</CardTitle>
                <div className="text-sm text-muted-foreground mt-1 flex gap-4">
                  <span>By {sub.author}</span>
                  <span className="capitalize">Category: {sub.category}</span>
                  <span>{new Date(sub.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="destructive"
                  size="sm"
                  disabled={loadingId === sub._id}
                  onClick={() => handleAction(sub._id, "reject")}
                >
                  {isApproved ? "Revoke" : "Reject"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push(`/edit/${sub._id}`)}
                >
                  Edit
                </Button>
                {!isApproved && (
                  <Button
                    size="sm"
                    disabled={loadingId === sub._id}
                    onClick={() => handleAction(sub._id, "approve")}
                  >
                    Approve
                  </Button>
                )}
              </div>
            </div>
            <CardDescription className="mt-2 text-base text-foreground">
              {sub.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 border-t">
            <div className="max-h-[500px] overflow-auto">
              <LivePreviewSandbox code={sub.code} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
