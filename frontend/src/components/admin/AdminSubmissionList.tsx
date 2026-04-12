import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LivePreviewSandbox } from "@/components/LivePreview";
import { api } from "@/lib/api";

export type AdminSubmission = {
  _id: string;
  title: string;
  description: string;
  category: string;
  code: string;
  author: string;
  createdAt: string;
};

type Props = {
  submissions: AdminSubmission[];
  status?: "pending" | "approved" | "rejected";
  onAfterAction: () => Promise<void>;
};

export function AdminSubmissionList({ submissions, status = "pending", onAfterAction }: Props) {
  const navigate = useNavigate();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleAction = async (id: string, action: "approve" | "reject") => {
    setLoadingId(id);
    try {
      const path = action === "approve" ? "/api/admin/approve" : "/api/admin/reject";
      const res = await api.post(path, { id });
      if (res.status === 200) {
        await onAfterAction();
      } else {
        alert(`Failed to ${action} component`);
      }
    } catch {
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
            <div className="flex justify-between items-start gap-4 flex-wrap">
              <div>
                <CardTitle>{sub.title}</CardTitle>
                <div className="text-sm text-muted-foreground mt-1 flex flex-wrap gap-x-4 gap-y-1">
                  <span>By {sub.author}</span>
                  <span className="capitalize">Category: {sub.category}</span>
                  <span>{new Date(sub.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                {status !== "rejected" && (
                  <Button
                    variant="destructive"
                    size="sm"
                    disabled={loadingId === sub._id}
                    onClick={() => handleAction(sub._id, "reject")}
                  >
                    {status === "approved" ? "Revoke" : "Reject"}
                  </Button>
                )}
                <Button variant="outline" size="sm" onClick={() => navigate(`/edit/${sub._id}`)}>
                  Edit
                </Button>
                {status !== "approved" && (
                  <Button size="sm" disabled={loadingId === sub._id} onClick={() => handleAction(sub._id, "approve")}>
                    Approve
                  </Button>
                )}
              </div>
            </div>
            <CardDescription className="mt-2 text-base text-foreground">{sub.description}</CardDescription>
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
