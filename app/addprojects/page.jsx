"use client";

import { useState, useEffect } from "react"; // Added useEffect
import { Loader2, Link as LinkIcon, Github } from "lucide-react";
import CreatableSelect from "react-select/creatable";

const TECH_OPTIONS = [
  { value: "React", label: "React" },
  { value: "Next.js", label: "Next.js" },
  { value: "Node.js", label: "Node.js" },
  { value: "TypeScript", label: "TypeScript" },
  { value: "Tailwind CSS", label: "Tailwind CSS" },
  { value: "MongoDB", label: "MongoDB" },
  { value: "PostgreSQL", label: "PostgreSQL" },
  { value: "Redis", label: "Redis" },
  { value: "Docker", label: "Docker" },
  { value: "AWS", label: "AWS" },
  { value: "Python", label: "Python" },
  { value: "C++", label: "C++" },
  { value: "WebRTC", label: "WebRTC" },
  { value: "Socket.io", label: "Socket.io" },
  { value: "GraphQL", label: "GraphQL" },
  { value: "Express", label: "Express" },
  { value: "Framer Motion", label: "Framer Motion" },
  { value: "GSAP", label: "GSAP" },
];

const customStyles = {
  control: (base, state) => ({
    ...base,
    background: "transparent",
    borderColor: state.isFocused ? "#3b82f6" : "rgba(107, 114, 128, 0.5)",
    borderRadius: "0.75rem",
    padding: "4px",
    boxShadow: state.isFocused ? "0 0 0 2px rgba(59, 130, 246, 0.5)" : "none",
    "&:hover": { borderColor: "#3b82f6" }
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "0.75rem",
    overflow: "hidden",
    zIndex: 9999,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "#3b82f6" : "white",
    color: state.isFocused ? "white" : "black",
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "#eff6ff",
    borderRadius: "9999px",
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "#1e40af",
    fontWeight: 600,
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: "#1e40af",
    ":hover": { backgroundColor: "#dbeafe", color: "#1e3a8a" },
  }),
  input: (base) => ({
    ...base,
    color: "inherit",
  }),
  singleValue: (base) => ({
    ...base,
    color: "inherit",
  }),
};

export default function AddProject() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  // 1. Add mounted state to prevent Hydration Errors
  const [mounted, setMounted] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tech: [],
    iconName: "Code",
    color: "bg-blue-50/50 dark:bg-blue-900/20",
    githubLink: "",
    liveLink: "",
  });

  // 2. Set mounted to true only after component loads on client
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTechChange = (newValue) => {
    const techArray = newValue ? newValue.map(item => item.value) : [];
    setFormData({ ...formData, tech: techArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Success: Project Added!");
        setFormData({
          title: "",
          description: "",
          tech: [],
          iconName: "Code",
          color: "bg-blue-50/50 dark:bg-blue-900/20",
          githubLink: "",
          liveLink: "",
        });
      } else {
        const error = await res.json();
        alert(`Error: ${error.message || "Something went wrong"}`);
      }
    } catch (err) {
      alert("Error: Failed to connect to server");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 3. Avoid rendering until mounted to prevent hydration mismatch
  if (!mounted) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black p-4 transition-colors">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900/50 dark:border dark:border-gray-800 p-8 rounded-3xl shadow-xl w-full max-w-2xl space-y-6 backdrop-blur-sm"
      >
        <div className="border-b border-gray-200 dark:border-gray-800 pb-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Add New Project</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Fill in the details to update your portfolio.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Project Title</label>
            <input
              name="title"
              placeholder="e.g. NoUpload"
              className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Card Color (Tailwind)</label>
            <input
              name="color"
              placeholder="e.g. bg-blue-50/50 dark:bg-blue-900/20"
              className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={formData.color}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
          <textarea
            name="description"
            rows="3"
            placeholder="Briefly explain what problem this project solves..."
            className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Tech Stack</label>
          <CreatableSelect
            isMulti
            instanceId="tech-select" // Added instanceId for accessibility stability
            options={TECH_OPTIONS}
            value={formData.tech.map(t => ({ value: t, label: t }))}
            onChange={handleTechChange}
            styles={customStyles}
            className="text-sm"
            classNamePrefix="select"
            placeholder="Select technologies or type to create new ones..."
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Icon</label>
          <select
            name="iconName"
            className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={formData.iconName}
            onChange={handleChange}
          >
            <option value="Video">Video</option>
            <option value="Database">Database</option>
            <option value="Code">Code</option>
            <option value="Terminal">Terminal</option>
            <option value="ExternalLink">Link</option>
            <option value="Layout">Layout</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="space-y-2 relative">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Github size={16} /> GitHub URL
            </label>
            <input
              name="githubLink"
              placeholder="https://github.com/username/repo"
              className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={formData.githubLink}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2 relative">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <LinkIcon size={16} /> Live Demo URL
            </label>
            <input
              name="liveLink"
              placeholder="https://myproject.com"
              className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={formData.liveLink}
              onChange={handleChange}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-blue-500/30 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" /> Saving Project...
            </>
          ) : (
            "Add Project"
          )}
        </button>
      </form>
    </div>
  );
}