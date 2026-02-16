"use client";

import { useState, useLayoutEffect } from "react";
import { useSession } from "next-auth/react";
import { Check, LayoutTemplate } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

const templates = [
    {
        id: "classic",
        name: "Classic",
        description: "A timeless, professional layout suitable for any industry.",
        color: "bg-blue-600"
    },
    {
        id: "modern",
        name: "Modern",
        description: "Split-screen design with bold typography and dark mode focus.",
        color: "bg-purple-600"
    },
    {
        id: "bento",
        name: "Bento Grid",
        description: "Trendy, grid-based layout inspired by modern tech UI.",
        color: "bg-indigo-600"
    },
    {
        id: "minimal",
        name: "Minimal",
        description: "Clean, whitespace-heavy design that puts content first.",
        color: "bg-gray-400"
    },
    {
        id: "retro",
        name: "Retro Terminal",
        description: "A hacker-style terminal interface for developers.",
        color: "bg-green-600"
    },
    {
        id: "chaos",
        name: "Creative Chaos",
        description: "Brutalist, high-energy layout with draggable elements.",
        color: "bg-yellow-500"
    },
    {
        id: "corporate",
        name: "Corporate",
        description: "Polished, business-first design for consultants and agencies.",
        color: "bg-slate-700"
    },
    {
        id: "horizontal",
        name: "Horizontal Scroll",
        description: "Unique horizontal navigation for a cinematic experience.",
        color: "bg-orange-600"
    },
    {
        id: "magazine",
        name: "Magazine",
        description: "Editorial style layout with large typography and grid systems.",
        color: "bg-red-700"
    },
    {
        id: "parallax",
        name: "Parallax",
        description: "Immersive 3D scrolling effects for visual storytelling.",
        color: "bg-emerald-600"
    }
];

export default function TemplatesPage() {
    const { data: session } = useSession();
    const [selectedTemplate, setSelectedTemplate] = useState("classic");
    const [loading, setLoading] = useState(false);

    // Initialize with current user template
    useLayoutEffect(() => {
        if (session?.user?.template) {
            setSelectedTemplate(session.user.template);
        }
    }, [session]);

    const handleSave = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/user/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ template: selectedTemplate }) // Only sending template
            });

            if (res.ok) {
                toast.success("Template applied successfully!");
                // Optionally reload session to update UI immediately if session stores template
                window.location.reload();
            } else {
                toast.error("Failed to apply template.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error applying template.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Choose Template</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Select the design that best fits your personal brand.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template) => (
                    <div
                        key={template.id}
                        className={`relative group border-2 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col ${selectedTemplate === template.id
                            ? "border-blue-600 ring-4 ring-blue-600/10 scale-[1.02]"
                            : "border-gray-200 dark:border-gray-800 hover:border-blue-400 dark:hover:border-blue-500/50"
                            }`}
                    >
                        {/* Preview Image Placeholder */}
                        <div
                            onClick={() => setSelectedTemplate(template.id)}
                            className={`h-48 ${template.color} flex items-center justify-center text-white/20 cursor-pointer`}
                        >
                            <LayoutTemplate size={64} />
                        </div>

                        <div className="p-6 bg-white dark:bg-gray-900 flex flex-col flex-grow">
                            <div
                                onClick={() => setSelectedTemplate(template.id)}
                                className="flex justify-between items-center mb-2 cursor-pointer"
                            >
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{template.name}</h3>
                                {selectedTemplate === template.id && (
                                    <div className="bg-blue-600 text-white p-1 rounded-full">
                                        <Check size={14} />
                                    </div>
                                )}
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex-grow">{template.description}</p>

                            <a
                                href={`/${session?.user?.username}/${template.id}`}
                                target="_blank"
                                className="w-full text-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                            >
                                View Preview
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 flex justify-end">
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="px-8 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Applying..." : "Apply Template"}
                </button>
            </div>
        </div>
    );
}
