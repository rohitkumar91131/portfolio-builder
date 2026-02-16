
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";

export default function ClassicProjectDetail({ user, project }) {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-serif">

            <header className="bg-white border-b border-gray-200 py-6">
                <div className="max-w-4xl mx-auto px-6 flex justify-between items-center">
                    <Link href={`/${user.username}/classic`} className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors font-sans text-sm tracking-wide uppercase">
                        <ArrowLeft size={16} /> Back to Portfolio
                    </Link>
                    <div className="font-bold text-xl tracking-tight">{user.name}</div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 py-12">

                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">{project.title}</h1>

                <div className="flex justify-center gap-6 mb-12 text-sm font-sans text-gray-500">
                    <span className="uppercase tracking-widest">{new Date().getFullYear()}</span>
                    <span className="w-px bg-gray-300"></span>
                    <span className="uppercase tracking-widest">Web Development</span>
                </div>

                <div className="mb-12 shadow-xl rounded-lg overflow-hidden border border-gray-100">
                    {project.liveLink ? (
                        <div className="aspect-video w-full relative">
                            <iframe
                                src={project.liveLink}
                                className="w-full h-full"
                                title={project.title}
                                loading="lazy"
                            />
                        </div>
                    ) : (
                        <div className="aspect-video w-full bg-gray-100 flex items-center justify-center text-gray-400">
                            No Preview Available
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                    <div className="md:col-span-8">
                        <h2 className="text-xl font-bold mb-4 font-sans">About the Project</h2>
                        <p className="text-lg leading-relaxed text-gray-600 mb-8">
                            {project.description}
                        </p>
                    </div>
                    <div className="md:col-span-4 space-y-8 font-sans">
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Technologies</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.tech.map(t => (
                                    <span key={t} className="bg-gray-100 px-2 py-1 rounded text-sm text-gray-600 border border-gray-200">{t}</span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Links</h3>
                            <div className="flex flex-col gap-2">
                                {project.liveLink && (
                                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:underline">
                                        <ExternalLink size={16} /> Live Demo
                                    </a>
                                )}
                                {project.githubLink && (
                                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-700 hover:text-black">
                                        <Github size={16} /> Source Code
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            </main>

            <footer className="bg-white border-t border-gray-200 py-12 text-center text-gray-400 text-sm font-sans mt-12">
                &copy; {new Date().getFullYear()} {user.name}. All Rights Reserved.
            </footer>

        </div>
    );
}
