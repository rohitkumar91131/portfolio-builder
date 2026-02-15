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
        image: "/placeholder-classic.png", // We'll need real images eventually
        color: "bg-blue-600"
    },
    {
        id: "modern",
        name: "Modern",
        description: "Split-screen design with bold typography and dark mode focus.",
        image: "/placeholder-modern.png",
        color: "bg-purple-600"
    },
    {
        id: "bento",
        name: "Bento Grid",
        description: "Trendy, grid-based layout inspired by modern tech UI.",
        image: "/placeholder-bento.png",
        color: "bg-indigo-600"
    },
    {
        id: "minimal",
        name: "Minimal",
        description: "Clean, whitespace-heavy design that puts content first.",
        image: "/placeholder-minimal.png",
        color: "bg-gray-400"
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
                        onClick={() => !template.disabled && setSelectedTemplate(template.id)}
                        className={`relative group cursor-pointer border-2 rounded-2xl overflow-hidden transition-all duration-300 ${template.disabled ? 'opacity-50 cursor-not-allowed grayscale' : ''} ${selectedTemplate === template.id
                            ? "border-blue-600 ring-4 ring-blue-600/10 scale-[1.02]"
                            : "border-gray-200 dark:border-gray-800 hover:border-blue-400 dark:hover:border-blue-500/50"
                            }`}
                    >
                        {/* Preview Image Placeholder */}
                        <div className={`h-48 ${template.color} flex items-center justify-center text-white/20`}>
                            <LayoutTemplate size={64} />
                        </div>

                        <div className="p-6 bg-white dark:bg-gray-900">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{template.name}</h3>
                                {selectedTemplate === template.id && (
                                    <div className="bg-blue-600 text-white p-1 rounded-full">
                                        <Check size={14} />
                                    </div>
                                )}
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{template.description}</p>
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
