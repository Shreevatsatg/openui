import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/db";
import { Component } from "@/models/Component";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "Component ID required" }, { status: 400 });
    }

    await connectDB();

    const component = await Component.findByIdAndUpdate(id, { status: "rejected" }, { new: true });

    if (!component) {
      return NextResponse.json({ message: "Component not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Component rejected successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: "Failed to reject component" }, { status: 500 });
  }
}
