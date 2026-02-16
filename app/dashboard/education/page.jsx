"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Loader2, GraduationCap } from "lucide-react";
import { ListSkeleton } from "@/components/dashboard/Skeletons";
import { toast } from "sonner";

export default function EducationPage() {
    const [educationList, setEducationList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        degree: "",
        institution: "",
        startYear: "",
        endYear: "",
        description: "",
    });

    useEffect(() => {
        fetchEducation();
    }, []);

    const fetchEducation = async () => {
        try {
            const res = await fetch("/api/education");
            const data = await res.json();
            if (data.success) {
                setEducationList(data.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleEdit = (edu) => {
        setEditingId(edu._id);
        setFormData({
            degree: edu.degree,
            institution: edu.institution,
            startYear: edu.startYear || "",
            endYear: edu.endYear || "",
            description: edu.description || "",
        });
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.degree || !formData.institution) {
            toast.error("Please fill in required fields");
            return;
        }

        try {
            const url = editingId ? `/api/education/${editingId}` : "/api/education";
            const method = editingId ? "PUT" : "POST";

            const res = await fetch(url, {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setShowForm(false);
                setEditingId(null);
                setFormData({
                    degree: "",
                    institution: "",
                    startYear: "",
                    endYear: "",
                    description: "",
                });
                fetchEducation();
                toast.success(editingId ? "Education updated successfully!" : "Education added successfully!");
            } else {
                const data = await res.json();
                toast.error(data.error || "Failed to save education");
            }
        } catch (error) {
            console.error("Error saving education", error);
            toast.error("Error saving education");
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this education entry?")) return;

        try {
            const res = await fetch(`/api/education/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setEducationList(educationList.filter(edu => edu._id !== id));
                toast.success("Education entry deleted successfully");
            } else {
                toast.error("Failed to delete education entry");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error deleting education entry");
        }
    };

    const toggleForm = () => {
        if (showForm) {
            setShowForm(false);
            setEditingId(null);
            setFormData({
                degree: "",
                institution: "",
                startYear: "",
                endYear: "",
                description: "",
            });
        } else {
            setShowForm(true);
        }
    };

    if (loading) return <ListSkeleton />;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Education</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Add your academic background.</p>
                </div>
                <button
                    onClick={toggleForm}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${showForm ? "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200" : "bg-blue-600 text-white hover:bg-blue-700"}`}
                >
                    {showForm ? "Cancel" : <><Plus size={20} /> Add Education</>}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm mb-8 animate-in fade-in slide-in-from-top-4">
                    <h2 className="text-xl font-bold mb-4 dark:text-white">{editingId ? "Edit Education" : "Add New Education"}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Degree/Certificate *</label>
                            <input type="text" name="degree" value={formData.degree} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700" required />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Institution *</label>
                            <input type="text" name="institution" value={formData.institution} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Start Year</label>
                            <input type="text" name="startYear" value={formData.startYear} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700" placeholder="e.g. 2018" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 dark:text-gray-300">End Year</label>
                            <input type="text" name="endYear" value={formData.endYear} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700" placeholder="e.g. 2022" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Description</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700" />
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end gap-3">
                        <button type="button" onClick={toggleForm} className="px-6 py-2 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition">Cancel</button>
                        <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">{editingId ? "Update Education" : "Save Education"}</button>
                    </div>
                </form>
            )}

            <div className="space-y-4">
                {educationList.map((edu) => (
                    <div key={edu._id} className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm flex justify-between items-start group hover:border-blue-500/50 transition-colors">
                        <div className="flex gap-4">
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl h-fit">
                                <GraduationCap className="text-blue-600 dark:text-blue-400" size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold dark:text-white">{edu.degree}</h3>
                                <p className="text-gray-600 dark:text-gray-300 font-medium">{edu.institution}</p>
                                <p className="text-sm text-gray-500 mt-1">
                                    {edu.startYear} - {edu.endYear}
                                </p>
                                <p className="mt-2 text-gray-600 dark:text-gray-400">{edu.description}</p>
                            </div>
                        </div>
                        <div className="flex gap-1 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => handleEdit(edu)}
                                className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
                                title="Edit"
                            >
                                <Edit2 size={18} />
                            </button>
                            <button
                                onClick={() => handleDelete(edu._id)}
                                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                                title="Delete"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
                {educationList.length === 0 && !showForm && (
                    <div className="text-center py-12 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
                        <p className="text-gray-500">No education added yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
