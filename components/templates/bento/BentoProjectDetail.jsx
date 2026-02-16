
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Github, ArrowUpRight } from "lucide-react";

export default function BentoProjectDetail({ user, project }) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 text-gray-900 dark:text-gray-100 p-4 md:p-8 font-sans">
            <div className="max-w-6xl mx-auto space-y-4">

                {/* Navigation Bar */}
                <div className="bg-white dark:bg-neutral-800 rounded-3xl p-4 flex justify-between items-center shadow-sm">
                    <Link
                        href={`/${user.username}/bento`}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-neutral-700 rounded-full hover:bg-gray-200 dark:hover:bg-neutral-600 transition-colors font-medium text-sm"
                    >
                        <ArrowLeft size={16} />
                        Back to Bento
                    </Link>
                    <div className="font-bold text-lg hidden md:block">
                        {user.name} <span className="text-gray-400">/</span> {project.title}
                    </div>
                    <div className="flex gap-2">
                        {project.githubLink && (
                            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 dark:bg-neutral-700 rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
                                <Github size={20} />
                            </a>
                        )}
                        {project.liveLink && (
                            <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
                                <ExternalLink size={20} />
                            </a>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Main Project Info - Takes 2/3 width */}
                    <div className="md:col-span-2 bg-white dark:bg-neutral-800 rounded-3xl p-8 shadow-sm flex flex-col gap-6">
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight">
                            {project.title}
                        </h1>
                        <div className="flex flex-wrap gap-2">
                            {project.tech.map(t => (
                                <span key={t} className="px-3 py-1 bg-gray-100 dark:bg-neutral-700 rounded-lg text-sm font-medium">
                                    {t}
                                </span>
                            ))}
                        </div>
                        <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                            {project.description}
                        </p>
                    </div>

                    {/* Sidebar / Context - Takes 1/3 width */}
                    <div className="bg-blue-500 text-white rounded-3xl p-8 shadow-sm flex flex-col justify-between">
                        <div>
                            <div className="text-blue-200 font-medium uppercase tracking-widest text-sm mb-2">Project Type</div>
                            <div className="text-2xl font-bold">Web Application</div>
                        </div>
                        <div className="mt-8">
                            <div className="text-blue-200 font-medium uppercase tracking-widest text-sm mb-2">Year</div>
                            <div className="text-2xl font-bold">{new Date().getFullYear()}</div>
                        </div>

                        {project.liveLink && (
                            <a
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-8 flex items-center justify-between bg-white text-blue-600 px-6 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors group"
                            >
                                Visit Live Site
                                <ArrowUpRight className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </a>
                        )}
                    </div>

                    {/* Full Width Preview */}
                    <div className="md:col-span-3 bg-gray-900 rounded-3xl overflow-hidden aspect-video relative shadow-lg group">
                        {project.liveLink ? (
                            <iframe
                                src={project.liveLink}
                                className="w-full h-full border-0"
                                title={project.title}
                                loading="lazy"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-500">
                                No Preview Available
                            </div>
                        )}
                        {/* Overlay prevents iframe interaction until clicked/focused often, or just for visual polish */}
                        <a
                            href={project.liveLink}
                            target="_blank"
                            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none group-hover:pointer-events-auto"
                        >
                            <span className="bg-white text-black px-6 py-3 rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                Open Preview <ExternalLink size={18} />
                            </span>
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
}
