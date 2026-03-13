import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { User } from "@/models/User";

export async function GET() {
  try {
    await connectDB();
    
    const result = await User.updateOne(
      { email: "admin@openui.com" },
      { $set: { role: "admin" } }
    );

    return NextResponse.json({ 
      message: "Admin role updated",
      found: result.matchedCount,
      modified: result.modifiedCount 
    });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}