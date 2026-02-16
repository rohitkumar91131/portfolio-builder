import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/db";
import Experience from "@/models/Experience";
import User from "@/models/User";

export async function GET(req) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const username = searchParams.get("username");

        // Public Access
        if (username) {
            const targetUser = await User.findOne({ username });
            if (!targetUser) {
                return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
            }
            const experiences = await Experience.find({ user: targetUser._id }).sort({ startDate: -1 });
            return NextResponse.json({ success: true, data: experiences });
        }

        // Private Access
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const experiences = await Experience.find({ user: session.user.id }).sort({ startDate: -1 });

        return NextResponse.json({ success: true, data: experiences });
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

        const experience = await Experience.create({
            ...body,
            user: session.user.id,
        });

        // Add to User's experience array
        await User.findByIdAndUpdate(session.user.id, { $push: { experience: experience._id } });

        return NextResponse.json({ success: true, data: experience });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
