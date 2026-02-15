import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Otp from "@/models/Otp";
import { cookies } from "next/headers";

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;
    await mongoose.connect(process.env.MONGODB_URI);
};

export async function POST(req) {
    try {
        const { email, otp } = await req.json();
        const adminEmail = process.env.ADMIN_EMAIL;

        // Normalize email
        const normalizedEmail = email.toLowerCase();
        const normalizedAdminEmail = adminEmail.toLowerCase();

        if (!normalizedAdminEmail || normalizedEmail !== normalizedAdminEmail) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();

        const validOtp = await Otp.findOne({ email: normalizedEmail, otp });

        if (!validOtp) {
            return NextResponse.json({ success: false, error: "Invalid or expired OTP" }, { status: 400 });
        }

        // OTP is valid. Delete it to prevent reuse.
        await Otp.deleteOne({ _id: validOtp._id });

        // Set HttpOnly Cookie
        const cookieStore = await cookies();
        cookieStore.set("admin_token", "true", { // In a real app, use a JWT or session ID
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24, // 1 day session
        });

        return NextResponse.json({ success: true, message: "Login successful" });

    } catch (error) {
        console.error("OTP Verify Error:", error);
        return NextResponse.json({ success: false, error: "Verification failed" }, { status: 500 });
    }
}
