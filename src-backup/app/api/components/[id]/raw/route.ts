import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/db";
import { Component } from "@/models/Component";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    
    await connectDB();

    const component = await Component.findById(id).lean();

    if (!component) {
      return NextResponse.json({ message: "Component not found" }, { status: 404 });
    }

    // Must be author or admin to get the raw data via this endpoint
    if (component.authorId.toString() !== session.user.id && session.user.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json({ component }, { status: 200 });
  } catch (error: any) {
    console.error("Fetch raw component error:", error);
    return NextResponse.json({ message: "Failed to fetch component" }, { status: 500 });
  }
}
