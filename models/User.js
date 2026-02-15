import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        unique: true,
        sparse: true, // Allow null/undefined for existing users until migrated
        trim: true,
    },
    image: {
        type: String,
    },
    // Custom Fields for Portfolio Platform
    bio: {
        type: String,
        default: "",
    },
    resume: {
        type: String, // URL to resume
        default: "",
    },
    template: {
        type: String,
        default: "classic", // Default template
    },
    // Arrays of references
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
    education: [{ type: mongoose.Schema.Types.ObjectId, ref: "Education" }],
    experience: [{ type: mongoose.Schema.Types.ObjectId, ref: "Experience" }],

    socialLinks: {
        github: String,
        linkedin: String,
        twitter: String,
        website: String,
        instagram: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

// Prevent overwrite
const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
