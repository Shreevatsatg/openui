import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/db";
import { Component } from "@/models/Component";
import { User } from "@/models/User";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    
    // Parse update body
    const body = await req.json();
    const { title, description, category, code, tags, previewImage } = body;

    await connectDB();

    const component = await Component.findById(id);

    if (!component) {
      return NextResponse.json({ message: "Component not found" }, { status: 404 });
    }

    // Check authorization: Must be author or an admin
    if (component.authorId.toString() !== session.user.id && session.user.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    // Only update allowed fields
    if (title) component.title = title;
    // Don't change slug on update to avoid breaking links, unless we specifically want to. 
    // We'll leave slug as is.
    if (description) component.description = description;
    if (category) component.category = category;
    if (code) component.code = code;
    if (tags !== undefined) {
       component.tags = typeof tags === "string" 
         ? tags.split(",").map((t: string) => t.trim()).filter((t: string) => t) 
         : tags;
    }
    if (previewImage !== undefined) component.previewImage = previewImage;

    await component.save();

    return NextResponse.json({ message: "Component updated successfully", component }, { status: 200 });
  } catch (error: any) {
    console.error("Component update error:", error);
    return NextResponse.json({ message: "Failed to update component" }, { status: 500 });
  }
}
