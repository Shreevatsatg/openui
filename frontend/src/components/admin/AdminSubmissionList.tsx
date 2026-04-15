import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LivePreviewSandbox } from "@/components/LivePreview";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";
import { Highlight, themes } from "prism-react-renderer";
import { Clipboard, Check } from "lucide-react";

export type AdminSubmission = {
  _id: string;
  title: string;
  description: string;
  category: string;
  code: string;
  dependencies?: string[];
  usage?: string;
  themeSupport?: "both" | "light" | "dark";
  author: string;
  createdAt: string;
};

function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <Button
      variant="outline"
      size="sm"
      className="h-8 absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background text-foreground"
      onClick={handleCopy}
    >
      {copied ? <Check className="h-3.5 w-3.5 text-green-500 mr-2" /> : <Clipboard className="h-3.5 w-3.5 mr-2" />}
      {copied ? "Copied" : label}
    </Button>
  );
}

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
          <CardContent className="p-4 pt-0 border-t space-y-6">
            <div className="max-h-[500px] overflow-auto rounded-md border mt-4">
              <LivePreviewSandbox code={sub.code} themeSupport={sub.themeSupport ?? "both"} />
            </div>

            {sub.dependencies && sub.dependencies.length > 0 && (
              <section className="space-y-2">
                <h4 className="text-sm font-semibold tracking-tight">Dependencies</h4>
                <div className="bg-muted p-3 rounded-md text-sm font-mono overflow-auto border border-border/50 text-muted-foreground relative group flex items-center justify-between">
                  <span>npm install {sub.dependencies.join(" ")}</span>
                  <CopyButton text={`npm install ${sub.dependencies.join(" ")}`} />
                </div>
              </section>
            )}

            {sub.usage && (
              <section className="space-y-2">
                <h4 className="text-sm font-semibold tracking-tight">Usage Example</h4>
                <div className="bg-[#1E1E1E] rounded-md overflow-hidden relative group">
                  <Highlight theme={themes.vsDark} code={sub.usage} language="tsx">
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
                  <CopyButton text={sub.usage} label="Copy Code" />
                </div>
              </section>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
