import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/db";
import User from "@/models/User";

export async function PUT(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const body = await req.json();

        // Extract fields to allow update
        const { name, bio, website, twitter, github, linkedin, template } = body;

        const updateData = {};
        if (name) updateData.name = name;
        if (bio) updateData.bio = bio;
        if (template) updateData.template = template;

        // Handle social links carefully - we don't want to overwrite with undefined
        if (website !== undefined) updateData['socialLinks.website'] = website;
        if (twitter !== undefined) updateData['socialLinks.twitter'] = twitter;
        if (github !== undefined) updateData['socialLinks.github'] = github;
        if (linkedin !== undefined) updateData['socialLinks.linkedin'] = linkedin;

        const updatedUser = await User.findOneAndUpdate(
            { email: session.user.email },
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: updatedUser });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
