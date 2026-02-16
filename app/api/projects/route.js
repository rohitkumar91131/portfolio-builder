import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/db";
import Project from "@/models/Project";
import User from "@/models/User";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");

    // Public Access: If username is provided, fetch projects for that user
    if (username) {
      const targetUser = await User.findOne({ username });
      if (!targetUser) {
        return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
      }
      const projects = await Project.find({ user: targetUser._id }).sort({ createdAt: -1 });
      return NextResponse.json({ success: true, data: projects });
    }

    // Private Access: If no username, use session (Dashboard usage)
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const projects = await Project.find({ user: session.user.id }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const body = await req.json();

    // Ensure tech is array
    if (typeof body.tech === 'string') {
      body.tech = body.tech.split(',').map(t => t.trim());
    }

    const project = await Project.create({
      ...body,
      user: session.user.id,
    });

    // Add to User's projects array
    await User.findByIdAndUpdate(session.user.id, { $push: { projects: project._id } });

    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}