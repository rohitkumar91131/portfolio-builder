import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Education from "@/models/Education";

const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(MONGODB_URI);
};

export async function GET() {
  try {
    await connectDB();
    const education = await Education.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: education });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const education = await Education.create(body);
    return NextResponse.json({ success: true, data: education }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}