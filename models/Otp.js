import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 180, // Expire after 3 minutes (180 seconds)
    },
});

export default mongoose.models.Otp || mongoose.model("Otp", OtpSchema);
