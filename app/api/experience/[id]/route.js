import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/db";
import Experience from "@/models/Experience";
import mongoose from "mongoose";

// GET: Fetch single experience entry by ID (Public)
export async function GET(req, { params }) {
    try {
        await connectDB();
        const { id } = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, error: "Invalid Experience ID" }, { status: 400 });
        }

        const experience = await Experience.findById(id);

        if (!experience) {
            return NextResponse.json({ success: false, error: "Experience entry not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: experience });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// PUT: Update experience entry by ID (Private/Owner)
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
            return NextResponse.json({ success: false, error: "Invalid Experience ID" }, { status: 400 });
        }

        // Verify ownership
        const experience = await Experience.findById(id);
        if (!experience) {
            return NextResponse.json({ success: false, error: "Experience entry not found" }, { status: 404 });
        }

        if (experience.user.toString() !== session.user.id) {
            return NextResponse.json({ success: false, error: "Forbidden: You do not own this entry" }, { status: 403 });
        }

        const updatedExperience = await Experience.findByIdAndUpdate(
            id,
            { $set: body },
            { new: true, runValidators: true }
        );

        return NextResponse.json({ success: true, data: updatedExperience });
    } catch (error) {
        console.error("Experience Update Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// DELETE: Remove experience entry by ID (Private/Owner)
export async function DELETE(req, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const { id } = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, error: "Invalid Experience ID" }, { status: 400 });
        }

        // Verify ownership
        const experience = await Experience.findById(id);
        if (!experience) {
            return NextResponse.json({ success: false, error: "Experience entry not found" }, { status: 404 });
        }

        if (experience.user.toString() !== session.user.id) {
            return NextResponse.json({ success: false, error: "Forbidden: You do not own this entry" }, { status: 403 });
        }

        await Experience.findByIdAndDelete(id);

        return NextResponse.json({ success: true, message: "Experience entry deleted successfully" });
    } catch (error) {
        console.error("Experience Delete Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
