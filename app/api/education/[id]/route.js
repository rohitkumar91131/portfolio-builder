import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Education from "@/models/Education";

// Connect to DB
const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;
    await mongoose.connect(MONGODB_URI);
};

// GET: Fetch single education entry by ID
export async function GET(req, { params }) {
    try {
        await connectDB();
        const { id } = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, error: "Invalid Education ID" }, { status: 400 });
        }

        const education = await Education.findById(id);

        if (!education) {
            return NextResponse.json({ success: false, error: "Education entry not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: education });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// PUT: Update education entry by ID
export async function PUT(req, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const body = await req.json();

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, error: "Invalid Education ID" }, { status: 400 });
        }

        const updatedEducation = await Education.findByIdAndUpdate(
            id,
            { $set: body },
            { new: true, runValidators: true }
        );

        if (!updatedEducation) {
            return NextResponse.json({ success: false, error: "Education entry not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: updatedEducation });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// DELETE: Remove education entry by ID
export async function DELETE(req, { params }) {
    try {
        await connectDB();
        const { id } = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, error: "Invalid Education ID" }, { status: 400 });
        }

        const deletedEducation = await Education.findByIdAndDelete(id);

        if (!deletedEducation) {
            return NextResponse.json({ success: false, error: "Education entry not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Education entry deleted successfully" });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
