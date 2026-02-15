import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Otp from "@/models/Otp";
import { sendEmail } from "@/lib/mail";
import { getOtpEmailTemplate } from "@/lib/emailTemplate";

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;
    await mongoose.connect(process.env.MONGODB_URI);
};

export async function POST(req) {
    try {
        const { email } = await req.json();
        const adminEmail = process.env.ADMIN_EMAIL;

        if (!adminEmail || email !== adminEmail) {
            return NextResponse.json(
                { success: false, error: "Unauthorized email" },
                { status: 401 }
            );
        }

        await connectDB();

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        await Otp.deleteMany({ email });
        await Otp.create({ email, otp });

        await sendEmail({
            to: email,
            subject: "Admin Access OTP",
            text: `Your OTP for admin access is: ${otp}. It expires in 3 minutes.`,
            html: getOtpEmailTemplate(otp),
        });

        return NextResponse.json({
            success: true,
            message: "OTP sent successfully",
        });

    } catch (error) {
        console.error("OTP Send Error:", error);

        return NextResponse.json(
            { success: false, error: "Failed to send OTP" },
            { status: 500 }
        );
    }
}
