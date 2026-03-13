import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/db";
import { Component } from "@/models/Component";
import { User } from "@/models/User";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminSubmissionList } from "./AdminSubmissionList";
import { ShieldCheck } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
     // fallback if middleware/navigation didn't catch it
     redirect("/");
  }

  await connectDB();

  // Fetch stats and pending submissions
  const pendingCount = await Component.countDocuments({ status: "pending" });
  const approvedCount = await Component.countDocuments({ status: "approved" });
  const usersCount = await User.countDocuments();

  const pendingSubmissions = await Component.find({ status: "pending" })
     .populate("authorId", "name", User)
     .sort({ createdAt: -1 })
     .lean();

  // Need to serialize ObjectId and Date so we can pass it to the Client Component
  const serializedSubmissions = pendingSubmissions.map(sub => ({
      _id: sub._id.toString(),
      title: sub.title,
      description: sub.description,
      category: sub.category,
      code: sub.code,
      author: sub.authorId ? (sub.authorId as any).name : "Unknown",
      createdAt: sub.createdAt.toISOString()
  }));

  const approvedSubmissions = await Component.find({ status: "approved" })
     .populate("authorId", "name", User)
     .sort({ createdAt: -1 })
     .lean();

  const serializedApproved = approvedSubmissions.map(sub => ({
      _id: sub._id.toString(),
      title: sub.title,
      description: sub.description,
      category: sub.category,
      code: sub.code,
      author: sub.authorId ? (sub.authorId as any).name : "Unknown",
      createdAt: sub.createdAt.toISOString()
  }));

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
                   <CardTitle className="text-4xl text-primary">{pendingCount}</CardTitle>
               </CardHeader>
           </Card>
           <Card>
               <CardHeader className="pb-2">
                   <CardDescription>Approved Components</CardDescription>
                   <CardTitle className="text-4xl">{approvedCount}</CardTitle>
               </CardHeader>
           </Card>
           <Card>
               <CardHeader className="pb-2">
                   <CardDescription>Total Users</CardDescription>
                   <CardTitle className="text-4xl">{usersCount}</CardTitle>
               </CardHeader>
           </Card>
       </div>

       <div className="mb-12">
           <h2 className="text-2xl font-bold mb-6">Pending Submissions</h2>
           {serializedSubmissions.length === 0 ? (
               <div className="text-center p-12 border border-dashed rounded-lg text-muted-foreground">
                   No pending submissions right now.
               </div>
           ) : (
               <AdminSubmissionList submissions={serializedSubmissions} />
           )}
       </div>

       <div>
           <h2 className="text-2xl font-bold mb-6">Approved Components Catalog</h2>
           {serializedApproved.length === 0 ? (
               <div className="text-center p-12 border border-dashed rounded-lg text-muted-foreground">
                   No components have been approved yet.
               </div>
           ) : (
               <AdminSubmissionList submissions={serializedApproved} isApproved={true} />
           )}
       </div>
    </div>
  );
}
