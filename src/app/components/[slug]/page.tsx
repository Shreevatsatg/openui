import { notFound } from "next/navigation";
import connectDB from "@/lib/db";
import { Component } from "@/models/Component";
import { User } from "@/models/User";
import { LivePreviewSandbox } from "@/components/LivePreview";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const dynamic = "force-dynamic";

export default async function ComponentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const session = await getServerSession(authOptions);
  await connectDB();

  const component = await Component.findOne({ slug, status: "approved" })
    .populate("authorId", "name", User)
    .lean();

  if (!component) {
    notFound();
  }

  return (
    <div className="py-10 px-8 max-w-5xl">
      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Link href="/components" className="hover:text-foreground transition-colors">Components</Link>
          <span>/</span>
          <span className="capitalize">{component.category}</span>
          <span>/</span>
          <span className="text-foreground">{component.title}</span>
        </div>
        
        <div className="flex justify-between items-start gap-4">
           <div>
               <h1 className="text-4xl font-bold tracking-tight">{component.title}</h1>
               <p className="text-lg text-muted-foreground mt-2 w-full">
                   {component.description}
               </p>
           </div>
           
           {(session?.user?.role === "admin" || session?.user?.id === component.authorId._id.toString()) && (
               <Button asChild variant="outline">
                   <Link href={`/edit/${component._id}`}>Edit Component</Link>
               </Button>
           )}
        </div>
      </div>

      <div className="space-y-12">
          <section>
              <LivePreviewSandbox code={component.code} />
          </section>

          <section className="space-y-4">
             <h3 className="text-xl font-semibold tracking-tight">Installation</h3>
             <div className="bg-muted p-4 rounded-md text-sm font-mono overflow-auto border border-border/50 text-muted-foreground">
                 npm install lucide-react framer-motion clsx tailwind-merge
             </div>
          </section>
      </div>
    </div>
  );
}
