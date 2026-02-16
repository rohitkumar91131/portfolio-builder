import { getServerSession } from "next-auth";
import { authOptions } from "../../[...nextauth]/route";
import connectDB from "@/lib/db";
import User from "@/models/User";
import Otp from "@/models/Otp";
import Project from "@/models/Project";
import Education from "@/models/Education";
import Experience from "@/models/Experience";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { otp } = await req.json();

        if (!otp) {
            return NextResponse.json({ error: "OTP is required" }, { status: 400 });
        }

        await connectDB();
        const user = await User.findOne({ email: session.user.email });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Verify OTP
        const otpRecord = await Otp.findOne({
            email: user.email,
            otp: otp,
        });

        if (!otpRecord) {
            return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 });
        }

        // OTP is valid, proceed with deletion

        // 1. Delete all related data
        await Project.deleteMany({ user: user._id });
        await Education.deleteMany({ user: user._id });
        await Experience.deleteMany({ user: user._id });

        // 2. Delete the user
        await User.findByIdAndDelete(user._id);

        // 3. Delete the used OTP (to prevent replay, though user is gone anyway)
        await Otp.deleteOne({ _id: otpRecord._id });

        // 4. Also delete any other OTPs for this email?
        await Otp.deleteMany({ email: user.email });

        return NextResponse.json({ message: "Account deleted successfully" });

    } catch (error) {
        console.error("Error verifying OTP and deleting account:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
