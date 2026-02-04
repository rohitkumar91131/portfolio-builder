import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Project from "@/models/Project";

// 1. Connect to DB (Simple utility)
const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(MONGODB_URI);
};

// GET: Fetch all projects
export async function GET() {
  try {
    await connectDB();
    const projects = await Project.find({}).sort({ createdAt: -1 }); // Newest first
    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST: Add a new project
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    
    // Validate required fields (optional but good practice)
    if (!body.title || !body.description) {
      return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
    }

    const project = await Project.create(body);
    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}