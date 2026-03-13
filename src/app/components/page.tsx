import Link from "next/link";
import connectDB from "@/lib/db";
import { Component } from "@/models/Component";
import { User } from "@/models/User";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, LayoutGrid } from "lucide-react";
import { MiniLivePreview } from "@/components/MiniLivePreview";

// Force absolute dynamic rendering since components change often
export const dynamic = "force-dynamic";

export default function ComponentsPage() {
  return (
    <div className="py-12 px-8 max-w-5xl">
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Components</h1>
        <p className="text-lg text-muted-foreground">
          Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.
        </p>
      </div>

      <ComponentList />
    </div>
  );
}

async function ComponentList() {
  await connectDB();
  
  // Only show approved components
  // Populate the author data
  const components = await Component.find({ status: "approved" })
    .populate("authorId", "name", User)
    .sort({ createdAt: -1 })
    .lean();

  if (!components || components.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 mt-12 border border-dashed rounded-lg bg-muted/20 text-center space-y-4">
        <LayoutGrid className="h-12 w-12 text-muted-foreground/50" />
        <h3 className="text-xl font-medium">No components found</h3>
        <p className="text-muted-foreground max-w-sm">No components have been approved yet. Be the first to submit one!</p>
        <Link href="/submit" className="text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md">
          Submit Component
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {components.map((comp: any) => (
        <Card key={comp._id.toString()} className="flex flex-col overflow-hidden group hover:border-border transition-colors border-border/50 bg-background shadow-xs">
          <div className="aspect-[4/3] bg-muted/20 border-b border-border/50 relative group flex items-center justify-center p-0 overflow-hidden">
           {comp.previewImage ? (
               // eslint-disable-next-line @next/next/no-img-element
              <img src={comp.previewImage} alt={comp.title} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" />
           ) : (
             <MiniLivePreview code={comp.code} />
           )}
          </div>
          <CardHeader className="p-4 pb-0">
            <CardTitle className="text-base font-semibold group-hover:text-primary transition-colors">
              <Link href={`/components/${comp.slug}`} className="before:absolute before:inset-0 flex items-center justify-between">
                <span>{comp.title}</span>
                <ChevronRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </Link>
            </CardTitle>
            <CardDescription className="line-clamp-2 mt-1 text-sm text-muted-foreground">
              {comp.description}
            </CardDescription>
          </CardHeader>
          <CardFooter className="p-4 pt-3 mt-auto text-xs text-muted-foreground flex justify-between items-center">
             <Badge variant="secondary" className="text-[10px] bg-muted hover:bg-muted text-muted-foreground border-transparent font-normal">
                {comp.category}
             </Badge>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
