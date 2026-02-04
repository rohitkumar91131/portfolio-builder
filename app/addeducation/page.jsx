"use client";

import { useState } from "react";
import { Loader2, GraduationCap, School, Book } from "lucide-react";

export default function AddEducation() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    degree: "",
    institution: "",
    startYear: "",
    endYear: "",
    description: "",
    iconType: "GraduationCap",
    color: "bg-blue-600",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/education", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Education Added!");
        setFormData({
          degree: "",
          institution: "",
          startYear: "",
          endYear: "",
          description: "",
          iconType: "GraduationCap",
          color: "bg-blue-600",
        });
      } else {
        alert("Error adding education");
      }
    } catch (error) {
      alert("Server error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white dark:bg-black p-8 rounded-3xl shadow-xl w-full max-w-2xl space-y-6 border border-gray-200 dark:border-gray-800"
      >
        <div className="border-b border-gray-200 dark:border-gray-800 pb-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Add Education</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Degree / Title</label>
            <input 
              name="degree"
              placeholder="e.g. B.Tech Computer Science" 
              className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.degree}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Institution</label>
            <input 
              name="institution"
              placeholder="e.g. University of Technology" 
              className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.institution}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Start Year</label>
            <input 
              name="startYear"
              placeholder="e.g. 2023" 
              className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.startYear}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">End Year (or Present)</label>
            <input 
              name="endYear"
              placeholder="e.g. 2027" 
              className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.endYear}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
          <textarea 
            name="description"
            rows="3"
            placeholder="Details about your major, grades, or achievements..." 
            className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Color (Tailwind)</label>
          <input 
            name="color"
            placeholder="e.g. bg-blue-600" 
            className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            value={formData.color}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Icon</label>
          <div className="grid grid-cols-4 gap-4">
            {["GraduationCap", "School", "Certificate", "Book"].map((icon) => (
              <button
                key={icon}
                type="button"
                onClick={() => setFormData({...formData, iconType: icon})}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                  formData.iconType === icon 
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" 
                    : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-500"
                }`}
              >
                {icon === "GraduationCap" && <GraduationCap size={24} />}
                {icon === "School" && <School size={24} />}
                {icon === "Certificate" && <Book size={24} />} 
                {icon === "Book" && <Book size={24} />}
                <span className="text-xs mt-2">{icon}</span>
              </button>
            ))}
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-blue-500/30 disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {isSubmitting ? <Loader2 className="animate-spin" /> : "Save Education"}
        </button>
      </form>
    </div>
  );
}