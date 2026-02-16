import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";

export async function GET(request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const email = searchParams.get("email");

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        const deletedUser = await User.findOneAndDelete({ email });

        if (!deletedUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ message: `User ${email} deleted successfully. You can now sign in with Google.` });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
