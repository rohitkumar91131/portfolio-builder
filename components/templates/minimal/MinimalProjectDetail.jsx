
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";

export default function MinimalProjectDetail({ user, project }) {
    return (
        <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">

            {/* Header */}
            <header className="fixed top-0 left-0 w-full p-6 md:p-12 flex justify-between items-center z-50 bg-white/90 backdrop-blur-sm">
                <Link
                    href={`/${user.username}/minimal`}
                    className="text-sm uppercase tracking-widest font-bold hover:underline flex items-center gap-2"
                >
                    <ArrowLeft size={16} /> Back
                </Link>
                <div className="text-sm uppercase tracking-widest font-bold">
                    {project.title}
                </div>
            </header>

            <main className="pt-32 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto pb-24">

                {/* Title Section */}
                <section className="mb-24 text-center">
                    <h1 className="text-5xl md:text-7xl font-light tracking-tighter mb-8">
                        {project.title}
                    </h1>
                    <div className="flex justify-center gap-4 text-sm font-mono uppercase tracking-wider text-gray-500">
                        {project.tech.map(t => (
                            <span key={t}>{t}</span>
                        ))}
                    </div>
                </section>

                {/* Preview Image */}
                <section className="mb-24">
                    <div className="w-full aspect-video bg-gray-50 overflow-hidden relative group">
                        {project.liveLink ? (
                            <iframe
                                src={project.liveLink}
                                className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700"
                                title={project.title}
                                loading="lazy"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 font-mono text-sm uppercase">
                                No preview available
                            </div>
                        )}

                        {/* Interactive Overlay */}
                        {project.liveLink && (
                            <a
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/50 backdrop-blur-sm"
                            >
                                <span className="bg-black text-white px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest">
                                    Visit Site
                                </span>
                            </a>
                        )}
                    </div>
                </section>

                {/* Details Grid */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
                    <div className="md:col-span-1 space-y-8">
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest mb-4 border-b border-black pb-2">Links</h3>
                            <div className="flex flex-col gap-2">
                                {project.liveLink && (
                                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                                        <ExternalLink size={16} /> Live Demo
                                    </a>
                                )}
                                {project.githubLink && (
                                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                                        <Github size={16} /> Source Code
                                    </a>
                                )}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest mb-4 border-b border-black pb-2">Year</h3>
                            <p>{new Date().getFullYear()}</p>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <h3 className="text-xs font-bold uppercase tracking-widest mb-4 border-b border-black pb-2">About</h3>
                        <p className="text-xl leading-relaxed font-light text-gray-800">
                            {project.description}
                        </p>
                    </div>
                </section>

            </main>

            <footer className="fixed bottom-0 left-0 w-full p-6 text-center text-xs text-gray-400 uppercase tracking-widest pointer-events-none">
                {user.name} &copy; {new Date().getFullYear()}
            </footer>

        </div>
    );
}
