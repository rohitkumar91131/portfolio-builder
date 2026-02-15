import mongoose from "mongoose";

const EducationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  degree: {
    type: String,
    required: true,
    trim: true,
  },
  institution: {
    type: String,
    required: true,
    trim: true,
  },
  startYear: {
    type: String,
    required: true,
    trim: true,
  },
  endYear: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  iconType: {
    type: String,
    enum: ["GraduationCap", "School", "Certificate", "Book"],
    default: "GraduationCap",
  },
  color: {
    type: String,
    default: "bg-blue-600",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Education || mongoose.model("Education", EducationSchema);