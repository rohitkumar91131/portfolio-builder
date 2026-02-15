import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import mongoose from 'mongoose';
import Project from '@/models/Project';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;
    await mongoose.connect(process.env.MONGODB_URI);
};

export async function generateMetadata({ params }) {
    const { name } = await params;
    const decodedName = decodeURIComponent(name);
    return {
        title: `${decodedName} | Project Details`,
    };
}

export default async function ProjectDetails({ params }) {
    const { name } = await params;
    const decodedName = decodeURIComponent(name);

    // Use a try-catch block to handle potential DB connection errors gracefully
    try {
        await connectDB();
    } catch (error) {
        console.error("Database connection failed:", error);
        // You might want to show a custom error page or throw 
    }

    // Find project by title (case-insensitive)
    const project = await Project.findOne({
        title: { $regex: new RegExp(`^${decodedName}$`, 'i') }
    });

    if (!project) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white pb-20">
            {/* Header / Navigation */}
            <div className="pt-24 px-6 max-w-7xl mx-auto">
                <Link
                    href="/#projects"
                    className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors mb-8"
                >
                    <ArrowLeft size={20} />
                    Back to Projects
                </Link>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                        {project.title}
                    </h1>

                    <div className="flex gap-4">
                        {project.githubLink && (
                            <a
                                href={project.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                            >
                                <Github size={20} />
                                <span>Source</span>
                            </a>
                        )}
                        {project.liveLink && (
                            <a
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
                            >
                                <ExternalLink size={20} />
                                <span>Live Demo</span>
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* Left Column: Details */}
                <div className="lg:col-span-1 space-y-8">
                    <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                        <h3 className="text-xl font-semibold mb-4">Description</h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {project.description}
                        </p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                        <h3 className="text-xl font-semibold mb-4">Technologies</h3>
                        <div className="flex flex-wrap gap-2">
                            {project.tech.map((tech, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1 rounded-full text-sm bg-white dark:bg-black border border-gray-200 dark:border-gray-700"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Live Preview */}
                <div className="lg:col-span-2 space-y-4">
                    <h3 className="text-xl font-semibold">Live Preview</h3>
                    <div className="w-full aspect-video rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900 shadow-2xl relative group">
                        {project.liveLink ? (
                            <iframe
                                src={project.liveLink}
                                className="w-full h-full"
                                title={`${project.title} Preview`}
                                loading="lazy"
                            // sandbox="allow-scripts allow-same-origin" // strict sandbox might break some sites, enabling basic features
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-500">
                                No live preview available
                            </div>
                        )}

                        {/* Overlay for better UX on mobile or when interacting */}
                        <div className="absolute inset-0 pointer-events-none border-4 border-transparent group-hover:border-blue-500/10 transition-colors rounded-2xl" />
                    </div>
                    <p className="text-sm text-gray-500 text-center mt-2">
                        Interactive preview. Some sites may block embedding.
                    </p>
                </div>
            </div>
        </div>
    );
}
