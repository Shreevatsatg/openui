import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/db";
import { Component } from "@/models/Component";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { title, description, category, code, tags, previewImage } = await req.json();

    if (!title || !description || !category || !code) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    await connectDB();

    // Create a URL-friendly slug from the title
    const baseSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    let slug = baseSlug;
    let counter = 1;

    // Ensure slug uniqueness
    while (await Component.findOne({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const newComponent = await Component.create({
      title,
      slug,
      description,
      category,
      code,
      tags: tags ? tags.split(",").map((t: string) => t.trim()).filter((t: string) => t) : [],
      previewImage: previewImage || "",
      authorId: session.user.id,
      status: "pending", // All new submissions are pending admin approval
    });

    return NextResponse.json(
      { message: "Component submitted successfully. Pending admin approval.", component: newComponent },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Component submission error:", error);
    return NextResponse.json(
      { message: "Failed to submit component" },
      { status: 500 }
    );
  }
}
