import connectDB from "@/lib/db";
import { Component } from "@/models/Component";
import { Sidebar } from "./Sidebar"; // Client component

export default async function ComponentsLayout({ children }: { children: React.ReactNode }) {
  await connectDB();

  // Fetch only approved components
  const components = await Component.find({ status: "approved" })
    .select("title slug category")
    .lean();

  // Serialize Mongoose documents
  const serializedComponents = components.map(c => ({
    title: c.title,
    slug: c.slug,
    category: c.category
  }));

  return (
    <div className="flex w-full flex-1">
      <div className="w-64 flex-shrink-0 border-r border-border min-h-[calc(100vh-4rem)] hidden md:block bg-background">
        <Sidebar components={serializedComponents} />
      </div>
      <div className="flex-1 min-h-[calc(100vh-4rem)]">
        {children}
      </div>
    </div>
  );
}
