import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  tech: [{
    type: String,
    trim: true,
    required: true
  }],
  iconName: {
    type: String,
    required: true,
    enum: ["Video", "Database", "Code", "Terminal", "ExternalLink", "Layout"],
    default: "Code"
  },
  color: {
    type: String,
    default: "bg-gray-50/50 dark:bg-gray-900/20",
  },
  githubLink: {
    type: String,
    trim: true,
    default: "",
  },
  liveLink: {
    type: String,
    trim: true,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);