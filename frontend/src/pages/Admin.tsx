import { useCallback, useEffect, useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck } from "lucide-react";
import { AdminSubmissionsTabs } from "@/components/admin/AdminSubmissionsTabs";
import type { AdminSubmission } from "@/components/admin/AdminSubmissionList";
import { api } from "@/lib/api";

type AdminDashboardData = {
  pendingCount: number;
  approvedCount: number;
  usersCount: number;
  pendingSubmissions: AdminSubmission[];
  approvedSubmissions: AdminSubmission[];
  rejectedSubmissions: AdminSubmission[];
  allUsers: Array<{
    _id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
  }>;
};

export default function AdminDashboardPage() {
  const [data, setData] = useState<AdminDashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = useCallback(async () => {
    const res = await api.get<AdminDashboardData>("/api/admin/dashboard");
    setData(res.data);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchDashboard()
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [fetchDashboard]);

  if (loading) return <div className="p-8 text-center text-muted-foreground">Loading admin panel...</div>;
  if (!data) return <div className="p-8 text-center text-destructive">Not authorized or failed to fetch.</div>;

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-primary/10 rounded-lg text-primary">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage submissions and platform statistics.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pending Submissions</CardDescription>
            <CardTitle className="text-4xl text-primary">{data.pendingCount}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Approved Components</CardDescription>
            <CardTitle className="text-4xl">{data.approvedCount}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Users</CardDescription>
            <CardTitle className="text-4xl">{data.usersCount}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <AdminSubmissionsTabs
        pending={data.pendingSubmissions}
        approved={data.approvedSubmissions}
        rejected={data.rejectedSubmissions}
        onAfterAction={fetchDashboard}
      />

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 border-b border-border pb-2">Registered Users</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.allUsers.map((u) => (
            <Card key={u._id} className="border-border/50">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{u.name}</CardTitle>
                    <CardDescription className="mt-1">{u.email}</CardDescription>
                  </div>
                  <Badge variant={u.role === "admin" ? "default" : "outline"} className="capitalize">
                    {u.role}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground mt-4">
                  Joined {new Date(u.createdAt).toLocaleDateString()}
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
