"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, Loader2 } from "lucide-react";
import Link from "next/link";

export default function AddEducation() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        degree: "",
        institution: "",
        startYear: "",
        endYear: "",
        description: "",
        iconType: "GraduationCap", // Default
        color: "bg-blue-600" // Default
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/education", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            if (data.success) {
                router.push("/admin/dashboard");
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError("Failed to add education");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black p-6 pb-20">
            <div className="max-w-2xl mx-auto">
                <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:hover:text-gray-200 mb-6">
                    <ArrowLeft size={20} /> Back to Dashboard
                </Link>

                <h1 className="text-3xl font-bold mb-8">Add Education</h1>

                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-8">
                    {error && <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-lg border border-red-100">{error}</div>}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-1">Degree / Role</label>
                            <input name="degree" value={formData.degree} onChange={handleChange} className="w-full p-2 border rounded-lg bg-transparent" placeholder="e.g. B.Tech in CSE" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Institution</label>
                            <input name="institution" value={formData.institution} onChange={handleChange} className="w-full p-2 border rounded-lg bg-transparent" placeholder="e.g. IIT Bombay" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Start Year</label>
                                <input name="startYear" value={formData.startYear} onChange={handleChange} className="w-full p-2 border rounded-lg bg-transparent" placeholder="e.g. 2020" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">End Year</label>
                                <input name="endYear" value={formData.endYear} onChange={handleChange} className="w-full p-2 border rounded-lg bg-transparent" placeholder="e.g. 2024" required />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Description</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded-lg bg-transparent h-32" placeholder="Brief details..." required />
                        </div>

                        {/* Simple selection for Icon/Color could be added here, currently defaulting */}

                        <button type="submit" disabled={loading} className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2">
                            {loading ? <Loader2 className="animate-spin" /> : <>Add Education <Plus size={18} /></>}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
