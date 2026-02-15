import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Project from "@/models/Project";

// Connect to DB
const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;
    await mongoose.connect(MONGODB_URI);
};

// GET: Fetch single project by ID
export async function GET(req, { params }) {
    try {
        await connectDB();
        const { id } = await params; // Next.js 15+ params are async

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, error: "Invalid Project ID" }, { status: 400 });
        }

        const project = await Project.findById(id);

        if (!project) {
            return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: project });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// PUT: Update project by ID
export async function PUT(req, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const body = await req.json();

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, error: "Invalid Project ID" }, { status: 400 });
        }

        const updatedProject = await Project.findByIdAndUpdate(
            id,
            { $set: body },
            { new: true, runValidators: true }
        );

        if (!updatedProject) {
            return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: updatedProject });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// DELETE: Remove project by ID
export async function DELETE(req, { params }) {
    try {
        await connectDB();
        const { id } = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, error: "Invalid Project ID" }, { status: 400 });
        }

        const deletedProject = await Project.findByIdAndDelete(id);

        if (!deletedProject) {
            return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Project deleted successfully" });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
