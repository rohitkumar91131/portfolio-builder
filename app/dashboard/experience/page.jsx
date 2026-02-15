"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Loader2, Briefcase } from "lucide-react";
import { ListSkeleton } from "@/components/dashboard/Skeletons";
import { toast } from "sonner";

export default function ExperiencePage() {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        company: "",
        position: "",
        description: "",
        startDate: "",
        endDate: "",
        current: false,
        location: ""
    });

    useEffect(() => {
        fetchExperiences();
    }, []);

    const fetchExperiences = async () => {
        try {
            const res = await fetch("/api/experience");
            const data = await res.json();
            if (data.success) {
                setExperiences(data.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate required fields
        if (!formData.company || !formData.position || !formData.startDate) {
            toast.error("Please fill in required fields");
            return;
        }

        try {
            const res = await fetch("/api/experience", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setShowForm(false);
                setFormData({
                    company: "",
                    position: "",
                    description: "",
                    startDate: "",
                    endDate: "",
                    current: false,
                    location: ""
                });
                fetchExperiences();
                toast.success("Experience added successfully!");
            }
        } catch (error) {
            console.error("Error saving experience", error);
            toast.error("Error saving experience");
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure?")) return;
        try {
            // Note: Needs DELETE endpoint implementation
            toast.info("Delete functionality to be implemented in API");
            // const res = await fetch(`/api/experience/${id}`, { method: "DELETE" });
            // if(res.ok) fetchExperiences();
        } catch (error) {
            console.error(error);
        }
    }

    if (loading) return <ListSkeleton />;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Experience</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Add your professional work history.</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    {showForm ? "Cancel" : <><Plus size={20} /> Add Experience</>}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm mb-8 animate-in fade-in slide-in-from-top-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Company *</label>
                            <input type="text" name="company" value={formData.company} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Position *</label>
                            <input type="text" name="position" value={formData.position} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Start Date *</label>
                            <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 dark:text-gray-300">End Date</label>
                            <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} disabled={formData.current} className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700 disabled:opacity-50" />
                        </div>
                        <div className="md:col-span-2 flex items-center gap-2">
                            <input type="checkbox" name="current" checked={formData.current} onChange={handleChange} id="current" className="w-4 h-4 rounded border-gray-300" />
                            <label htmlFor="current" className="text-sm dark:text-gray-300">I currently work here</label>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Description</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700" />
                        </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save Experience</button>
                    </div>
                </form>
            )}

            <div className="space-y-4">
                {experiences.map((exp) => (
                    <div key={exp._id} className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm flex justify-between items-start group">
                        <div className="flex gap-4">
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl h-fit">
                                <Briefcase className="text-blue-600 dark:text-blue-400" size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold dark:text-white">{exp.position}</h3>
                                <p className="text-gray-600 dark:text-gray-300 font-medium">{exp.company}</p>
                                <p className="text-sm text-gray-500 mt-1">
                                    {new Date(exp.startDate).toLocaleDateString()} -
                                    {exp.current ? " Present" : new Date(exp.endDate).toLocaleDateString()}
                                </p>
                                <p className="mt-2 text-gray-600 dark:text-gray-400">{exp.description}</p>
                            </div>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => handleDelete(exp._id)}
                                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
                {experiences.length === 0 && !showForm && (
                    <div className="text-center py-12 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
                        <p className="text-gray-500">No experience added yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
