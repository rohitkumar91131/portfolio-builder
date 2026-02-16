import { getServerSession } from "next-auth";
import { authOptions } from "../../[...nextauth]/route";
import connectDB from "@/lib/db";
import User from "@/models/User";
import Otp from "@/models/Otp";
import { sendDeleteAccountOTP } from "@/lib/mail";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const user = await User.findOne({ email: session.user.email });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Save to DB (expires in 3 mins automatically via schema)
        await Otp.create({
            email: user.email,
            otp: otp,
        });

        // Send Email
        await sendDeleteAccountOTP({
            to: user.email,
            otp: otp,
        });

        return NextResponse.json({ message: "OTP sent successfully" });
    } catch (error) {
        console.error("Error requesting OTP:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
