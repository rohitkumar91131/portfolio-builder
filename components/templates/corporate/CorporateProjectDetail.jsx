
"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, Calendar, User, Tag } from "lucide-react";

export default function CorporateProjectDetail({ user, project }) {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">

            {/* Header */}
            <header className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link href={`/${user.username}/corporate`} className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors font-medium">
                        <ArrowLeft size={16} /> Back to Overview
                    </Link>
                    <div className="font-bold text-slate-800">{user.name}</div>
                </div>
            </header>

            {/* Title Section */}
            <div className="bg-white border-b border-slate-200 py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-2 text-blue-600 font-semibold uppercase tracking-wide text-xs mb-4">
                            <span className="w-2 h-2 rounded-full bg-blue-600" />
                            Case Study
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                            {project.title}
                        </h1>
                        <p className="text-xl text-slate-600 leading-relaxed">
                            {project.description}
                        </p>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Sidebar / Info */}
                    <div className="lg:col-span-1 space-y-8">

                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Tag size={18} className="text-slate-400" /> Technology Stack
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {project.tech.map(t => (
                                    <span key={t} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-md text-sm font-medium border border-slate-200">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Calendar size={18} className="text-slate-400" /> Year
                            </h3>
                            <div className="text-slate-700">{new Date().getFullYear()}</div>
                        </div>

                        <div className="space-y-4">
                            {project.liveLink && (
                                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between w-full p-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold shadow-sm">
                                    View Live Project <ExternalLink size={18} />
                                </a>
                            )}
                            {project.githubLink && (
                                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between w-full p-4 bg-white text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors font-medium">
                                    View Source Code <Github size={18} />
                                </a>
                            )}
                        </div>

                    </div>

                    {/* Content / Preview */}
                    <div className="lg:col-span-2 space-y-12">
                        <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
                            <div className="aspect-video w-full bg-slate-100 relative">
                                {project.liveLink ? (
                                    <iframe
                                        src={project.liveLink}
                                        className="w-full h-full"
                                        title={project.title}
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-400 font-medium">
                                        Preview Unavailable
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">Project Overview</h2>
                            <div className="prose prose-slate max-w-none text-slate-600">
                                <p>{project.description}</p>
                                <p>
                                    This project demonstrates expertise in {project.tech.slice(0, 3).join(", ")} and focuses on delivering high-quality business solutions.
                                    The architecture ensures scalability, performance, and maintainability, adhering to modern web development standards.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </main>

            <footer className="bg-white border-t border-slate-200 py-12 mt-12">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                    <div>&copy; {new Date().getFullYear()} {user.name}. All rights reserved.</div>
                    <div className="flex gap-6 font-medium">
                        <a href="#" className="hover:text-slate-900">Privacy Policy</a>
                        <a href="#" className="hover:text-slate-900">Terms of Service</a>
                    </div>
                </div>
            </footer>

        </div>
    );
}
