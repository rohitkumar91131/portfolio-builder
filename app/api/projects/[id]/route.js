import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/db";
import Project from "@/models/Project";
import mongoose from "mongoose";

// GET: Fetch single project by ID (Public)
export async function GET(req, { params }) {
    try {
        await connectDB();
        const { id } = await params;

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

// PUT: Update project by ID (Private/Owner)
export async function PUT(req, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const { id } = await params;
        const body = await req.json();

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, error: "Invalid Project ID" }, { status: 400 });
        }

        // Verify ownership
        const project = await Project.findById(id);
        if (!project) {
            return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
        }

        if (project.user.toString() !== session.user.id) {
            return NextResponse.json({ success: false, error: "Forbidden: You do not own this project" }, { status: 403 });
        }

        const updatedProject = await Project.findByIdAndUpdate(
            id,
            { $set: body },
            { new: true, runValidators: true }
        );

        return NextResponse.json({ success: true, data: updatedProject });
    } catch (error) {
        console.error("Project Update Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// DELETE: Remove project by ID (Private/Owner)
export async function DELETE(req, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const { id } = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, error: "Invalid Project ID" }, { status: 400 });
        }

        // Verify ownership
        const project = await Project.findById(id);
        if (!project) {
            return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
        }

        if (project.user.toString() !== session.user.id) {
            return NextResponse.json({ success: false, error: "Forbidden: You do not own this project" }, { status: 403 });
        }

        await Project.findByIdAndDelete(id);

        // Optional: Also remove from User's projects array if it's there
        // Actually, in many cases it's better to keep it in sync, but the prompt asked for CRUD.
        // User.findByIdAndUpdate(session.user.id, { $pull: { projects: id } }) would be good practice here.

        return NextResponse.json({ success: true, message: "Project deleted successfully" });
    } catch (error) {
        console.error("Project Delete Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
