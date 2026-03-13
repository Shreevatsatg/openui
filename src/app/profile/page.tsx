import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/db";
import { Component } from "@/models/Component";
import { User } from "@/models/User";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { User as UserIcon, Settings, LayoutGrid } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
     redirect("/login");
  }

  await connectDB();

  const user = await User.findById(session.user.id).lean();
  
  if (!user) {
      redirect("/login");
  }

  const userComponents = await Component.find({ authorId: user._id })
    .sort({ createdAt: -1 })
    .lean();

  const approvedCount = userComponents.filter((c) => c.status === "approved").length;
  const pendingCount = userComponents.filter((c) => c.status === "pending").length;

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="flex flex-col md:flex-row gap-8">
         {/* Sidebar Profile Info */}
         <div className="w-full md:w-1/3 lg:w-1/4">
             <Card>
                 <CardContent className="pt-6 flex flex-col items-center text-center">
                     <div className="h-24 w-24 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                         <UserIcon className="h-12 w-12 text-primary" />
                     </div>
                     <h2 className="text-2xl font-bold">{user.name}</h2>
                     <p className="text-sm text-muted-foreground mb-4">{user.email}</p>
                     <div className="flex gap-2 mb-6 text-sm">
                         <Badge variant="secondary">Role: {user.role}</Badge>
                         <Badge variant="outline">Since {new Date(user.createdAt).getFullYear()}</Badge>
                     </div>
                     
                     <div className="w-full grid grid-cols-2 gap-2 text-sm border-t pt-4">
                         <div className="flex flex-col items-center p-2 bg-muted/30 rounded-lg">
                             <span className="font-bold text-xl">{approvedCount}</span>
                             <span className="text-muted-foreground text-xs uppercase tracking-wider">Published</span>
                         </div>
                         <div className="flex flex-col items-center p-2 bg-muted/30 rounded-lg">
                             <span className="font-bold text-xl">{pendingCount}</span>
                             <span className="text-muted-foreground text-xs uppercase tracking-wider">Pending</span>
                         </div>
                     </div>
                 </CardContent>
             </Card>
         </div>

         {/* Main content - User's Components */}
         <div className="w-full md:w-2/3 lg:w-3/4">
             <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                 <LayoutGrid className="h-6 w-6" />
                 Your Components
             </h3>

             {userComponents.length === 0 ? (
                 <div className="text-center p-12 border border-dashed rounded-lg bg-muted/10">
                     <p className="text-muted-foreground mb-4">You haven't submitted any components yet.</p>
                     <Link href="/submit" className="text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md transition-colors">
                        Submit your first component
                     </Link>
                 </div>
             ) : (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {userComponents.map((comp) => (
                         <Card key={comp._id.toString()} className="flex flex-col">
                             <CardHeader className="pb-2">
                                 <div className="flex justify-between items-start mb-2">
                                     <Badge variant="outline" className="capitalize">{comp.category}</Badge>
                                     <Badge 
                                        variant={comp.status === "approved" ? "default" : comp.status === "rejected" ? "destructive" : "secondary"}
                                        className="capitalize"
                                     >
                                        {comp.status}
                                     </Badge>
                                 </div>
                                 <CardTitle className="text-lg">
                                     {comp.status === "approved" ? (
                                        <Link href={`/components/${comp.slug}`} className="hover:text-primary transition-colors">
                                           {comp.title}
                                        </Link>
                                     ) : (
                                        comp.title
                                     )}
                                 </CardTitle>
                             </CardHeader>
                             <CardFooter className="mt-auto pt-4 text-xs text-muted-foreground">
                                 Submitted on {new Date(comp.createdAt).toLocaleDateString()}
                             </CardFooter>
                         </Card>
                     ))}
                 </div>
             )}
         </div>
      </div>
    </div>
  );
}
