"use client";

import Link from "next/link";
import { ArrowLeft, Layout } from "lucide-react";

const templates = [
    {
        id: "classic",
        name: "Classic",
        desc: "The timeless, reliable portfolio layout.",
        color: "bg-blue-500",
    },
    {
        id: "modern",
        name: "Modern",
        desc: "Bold typography and split-screen aesthetics.",
        color: "bg-purple-500",
    },
    {
        id: "bento",
        name: "Bento Grid",
        desc: "Trendy, modular grid layout for everything.",
        color: "bg-orange-500",
    },
    {
        id: "minimal",
        name: "Minimal",
        desc: "Clean, whitespace-heavy, distraction-free.",
        color: "bg-zinc-500"
    },
    // Placeholders for the rest
    { id: "parallax", name: "Parallax", desc: "Immersive scroll animations.", color: "bg-green-500" },
    { id: "retro", name: "Retro Terminal", desc: "For the true hackers.", color: "bg-green-700" },
    { id: "magazine", name: "Magazine", desc: "Editorial style layout.", color: "bg-pink-500" },
    { id: "corporate", name: "Corporate", desc: "Professional and crisp.", color: "bg-indigo-500" },
    { id: "creative", name: "Creative Chaos", desc: "Break the grid.", color: "bg-yellow-500" },
    { id: "horizontal", name: "Horizontal", desc: "Sideways scrolling journey.", color: "bg-red-500" },
];

export default function TemplateGallery() {
    return (
        <main className="min-h-screen bg-gray-50 dark:bg-black p-8">
            <div className="max-w-6xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:hover:text-gray-200 mb-8">
                    <ArrowLeft size={20} /> Back to Home
                </Link>

                <div className="mb-12">
                    <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Template Gallery</h1>
                    <p className="text-gray-600 dark:text-gray-400">Choose a design to preview your portfolio.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {templates.map((t) => (
                        <Link key={t.id} href={`/templates/${t.id}`} className="group block">
                            <div className={`h-48 rounded-2xl ${t.color} opacity-90 group-hover:opacity-100 transition-opacity mb-4 flex items-center justify-center text-white`}>
                                <Layout size={48} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                                {t.name}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {t.desc}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
