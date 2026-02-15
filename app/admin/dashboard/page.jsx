"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Edit, Plus, ExternalLink, Trash2 } from "lucide-react";

export default function AdminDashboard() {
    const [projects, setProjects] = useState([]);
    const [education, setEducation] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [projectsRes, educationRes] = await Promise.all([
                    fetch("/api/projects"),
                    fetch("/api/education")
                ]);

                const projectsData = await projectsRes.json();
                const educationData = await educationRes.json();

                if (projectsData.success) setProjects(projectsData.data);
                if (educationData.success) setEducation(educationData.data);
            } catch (error) {
                console.error("Failed to fetch dashboard data");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black p-6">
            <div className="max-w-6xl mx-auto space-y-12">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Admin Dashboard</h1>

                {/* Projects Section */}
                <section>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Projects</h2>
                        <Link
                            href="/addprojects"
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                        >
                            <Plus size={20} /> Add Project
                        </Link>
                    </div>

                    {loading ? (
                        <div className="text-center py-20 text-gray-500">Loading...</div>
                    ) : (
                        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                                    <tr>
                                        <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Title</th>
                                        <th className="p-4 font-medium text-gray-500 dark:text-gray-400 hidden md:table-cell">Tech Stack</th>
                                        <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                    {projects.map((project) => (
                                        <tr key={project._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/20 transition">
                                            <td className="p-4">
                                                <div className="font-semibold text-gray-900 dark:text-white">{project.title}</div>
                                                <div className="text-sm text-gray-500 truncate max-w-xs">{project.description}</div>
                                            </td>
                                            <td className="p-4 hidden md:table-cell">
                                                <div className="flex gap-1 flex-wrap">
                                                    {project.tech.slice(0, 3).map((t, i) => (
                                                        <span key={i} className="px-2 py-0.5 rounded text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                                                            {t}
                                                        </span>
                                                    ))}
                                                    {project.tech.length > 3 && <span className="text-xs text-gray-400">+{project.tech.length - 3}</span>}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex gap-2">
                                                    <Link
                                                        href={`/admin/edit/${project._id}`}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition"
                                                        title="Edit"
                                                    >
                                                        <Edit size={18} />
                                                    </Link>
                                                    <a
                                                        href={`/project/${project.title}`}
                                                        target="_blank"
                                                        className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition"
                                                        title="View Live"
                                                    >
                                                        <ExternalLink size={18} />
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {projects.length === 0 && (
                                        <tr>
                                            <td colSpan="3" className="p-8 text-center text-gray-400">No projects found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>

                {/* Education Section */}
                <section>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Education</h2>
                        <Link
                            href="/admin/education/add"
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
                        >
                            <Plus size={20} /> Add Education
                        </Link>
                    </div>

                    {loading ? (
                        <div className="text-center py-20 text-gray-500">Loading...</div>
                    ) : (
                        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                                    <tr>
                                        <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Degree & Institution</th>
                                        <th className="p-4 font-medium text-gray-500 dark:text-gray-400 hidden md:table-cell">Duration</th>
                                        <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                    {education.map((edu) => (
                                        <tr key={edu._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/20 transition">
                                            <td className="p-4">
                                                <div className="font-semibold text-gray-900 dark:text-white">{edu.degree}</div>
                                                <div className="text-sm text-gray-500">{edu.institution}</div>
                                            </td>
                                            <td className="p-4 hidden md:table-cell text-sm text-gray-600 dark:text-gray-400">
                                                {edu.startYear} - {edu.endYear}
                                            </td>
                                            <td className="p-4">
                                                <div className="flex gap-2">
                                                    <Link
                                                        href={`/admin/education/edit/${edu._id}`}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition"
                                                        title="Edit"
                                                    >
                                                        <Edit size={18} />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {education.length === 0 && (
                                        <tr>
                                            <td colSpan="3" className="p-8 text-center text-gray-400">No education entries found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}
