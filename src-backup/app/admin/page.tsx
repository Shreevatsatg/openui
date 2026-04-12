import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/db";
import { Component } from "@/models/Component";
import { User } from "@/models/User";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AdminSubmissionsTabs } from "./AdminSubmissionsTabs";
import { ShieldCheck } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
     // fallback if middleware/navigation didn't catch it
     redirect("/");
  }

  await connectDB();

  // Fetch stats and pending submissions in parallel for better performance
  const [
    pendingCount,
    approvedCount,
    usersCount,
    pendingSubmissions,
    approvedSubmissions,
    rejectedSubmissions,
    allUsers
  ] = await Promise.all([
    Component.countDocuments({ status: "pending" }),
    Component.countDocuments({ status: "approved" }),
    User.countDocuments(),
    Component.find({ status: "pending" }).populate("authorId", "name", User).sort({ createdAt: -1 }).lean(),
    Component.find({ status: "approved" }).populate("authorId", "name", User).sort({ createdAt: -1 }).lean(),
    Component.find({ status: "rejected" }).populate("authorId", "name", User).sort({ createdAt: -1 }).lean(),
    User.find({}).sort({ createdAt: -1 }).lean()
  ]);

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

  const serializedApproved = approvedSubmissions.map(sub => ({
      _id: sub._id.toString(),
      title: sub.title,
      description: sub.description,
      category: sub.category,
      code: sub.code,
      author: sub.authorId ? (sub.authorId as any).name : "Unknown",
      createdAt: sub.createdAt.toISOString()
  }));

  const serializedRejected = rejectedSubmissions.map(sub => ({
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

       <AdminSubmissionsTabs 
           pending={serializedSubmissions} 
           approved={serializedApproved} 
           rejected={serializedRejected} 
       />

       <div className="mt-12">
           <h2 className="text-2xl font-bold mb-6 border-b border-border pb-2">Registered Users</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {allUsers.map((u) => (
               <Card key={u._id.toString()} className="border-border/50">
                 <CardHeader className="pb-4">
                   <div className="flex justify-between items-start">
                     <div>
                       <CardTitle className="text-lg">{u.name}</CardTitle>
                       <CardDescription className="mt-1">{u.email}</CardDescription>
                     </div>
                     <Badge variant={u.role === 'admin' ? 'default' : 'outline'} className="capitalize">{u.role}</Badge>
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
