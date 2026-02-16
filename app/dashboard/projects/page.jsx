"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Loader2, FolderGit2, Link as LinkIcon, Github } from "lucide-react";
import { ListSkeleton } from "@/components/dashboard/Skeletons";
import { toast } from "sonner";

export default function ProjectsPage() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        tech: "",
        liveLink: "",
        githubLink: "",
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await fetch("/api/projects");
            const data = await res.json();
            if (data.success) {
                setProjects(data.data);
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

    const handleEdit = (project) => {
        setEditingId(project._id);
        setFormData({
            title: project.title,
            description: project.description,
            tech: project.tech.join(", "),
            liveLink: project.liveLink || "",
            githubLink: project.githubLink || "",
        });
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.description) {
            toast.error("Please fill in required fields");
            return;
        }

        // Process tech string into array
        const processedData = {
            ...formData,
            tech: formData.tech.split(",").map(t => t.trim()).filter(t => t !== "")
        };

        try {
            const url = editingId ? `/api/projects/${editingId}` : "/api/projects";
            const method = editingId ? "PUT" : "POST";

            const res = await fetch(url, {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(processedData),
            });

            if (res.ok) {
                setShowForm(false);
                setEditingId(null);
                setFormData({
                    title: "",
                    description: "",
                    tech: "",
                    liveLink: "",
                    githubLink: "",
                });
                fetchProjects();
                toast.success(editingId ? "Project updated successfully!" : "Project added successfully!");
            } else {
                const data = await res.json();
                toast.error(data.error || "Failed to save project");
            }
        } catch (error) {
            console.error("Error saving project", error);
            toast.error("Error saving project");
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this project?")) return;

        try {
            const res = await fetch(`/api/projects/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setProjects(projects.filter(p => p._id !== id));
                toast.success("Project deleted successfully");
            } else {
                toast.error("Failed to delete project");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error deleting project");
        }
    };

    const toggleForm = () => {
        if (showForm) {
            setShowForm(false);
            setEditingId(null);
            setFormData({
                title: "",
                description: "",
                tech: "",
                liveLink: "",
                githubLink: "",
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
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Projects</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Showcase your best work.</p>
                </div>
                <button
                    onClick={toggleForm}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${showForm ? "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200" : "bg-blue-600 text-white hover:bg-blue-700"}`}
                >
                    {showForm ? "Cancel" : <><Plus size={20} /> Add Project</>}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm mb-8 animate-in fade-in slide-in-from-top-4">
                    <h2 className="text-xl font-bold mb-4 dark:text-white">{editingId ? "Edit Project" : "Add New Project"}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Project Title *</label>
                            <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700" required />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Description *</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700" required />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Technologies (comma separated)</label>
                            <input type="text" name="tech" value={formData.tech} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700" placeholder="e.g. React, Node.js, MongoDB" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Live URL</label>
                            <input type="url" name="liveLink" value={formData.liveLink} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700" placeholder="https://..." />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 dark:text-gray-300">GitHub URL</label>
                            <input type="url" name="githubLink" value={formData.githubLink} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700" placeholder="https://github.com/..." />
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end gap-3">
                        <button type="button" onClick={toggleForm} className="px-6 py-2 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition">Cancel</button>
                        <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">{editingId ? "Update Project" : "Save Project"}</button>
                    </div>
                </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                    <div key={project._id} className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm group flex flex-col h-full hover:border-blue-500/50 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                                <FolderGit2 className="text-blue-600 dark:text-blue-400" size={24} />
                            </div>
                            <div className="flex gap-1 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleEdit(project)}
                                    className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
                                    title="Edit"
                                >
                                    <Edit2 size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(project._id)}
                                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                                    title="Delete"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>

                        <h3 className="text-xl font-bold dark:text-white mb-2">{project.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">{project.description}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.tech.map((t, i) => (
                                <span key={i} className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-md">
                                    {t}
                                </span>
                            ))}
                        </div>

                        <div className="flex gap-4 pt-4 border-t border-gray-100 dark:border-gray-800 mt-auto">
                            {project.githubLink && (
                                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                                    <Github size={16} /> Code
                                </a>
                            )}
                            {project.liveLink && (
                                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                                    <LinkIcon size={16} /> Live Demo
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {projects.length === 0 && !showForm && (
                <div className="text-center py-12 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 mt-6">
                    <p className="text-gray-500">No projects added yet.</p>
                </div>
            )}
        </div>
    );
}
