
"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowLeft, ExternalLink, Github, ArrowUpRight } from "lucide-react";

export default function ModernProjectDetail({ user, project }) {
    const containerRef = useRef(null);

    useGSAP(() => {
        gsap.from(".reveal", {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="bg-white dark:bg-neutral-950 min-h-screen text-neutral-900 dark:text-neutral-50 font-sans selection:bg-neutral-900 selection:text-white">

            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 px-6 py-6 flex justify-between items-center mix-blend-difference text-black dark:text-white">
                <Link
                    href={`/${user.username}/modern`}
                    className="text-sm font-medium tracking-tight hover:underline flex items-center gap-2"
                >
                    <ArrowLeft size={16} /> Back
                </Link>
                <div className="text-sm font-bold tracking-tighter uppercase">
                    {user.name} / {project.title}
                </div>
            </nav>

            <main className="pt-32 px-6 md:px-12 lg:px-24">
                <div className="max-w-7xl mx-auto">

                    {/* Header */}
                    <header className="mb-20">
                        <h1 className="reveal text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9]">
                            {project.title}
                        </h1>
                        <div className="reveal flex flex-wrap gap-4 text-sm font-mono text-neutral-500 dark:text-neutral-400">
                            {project.tech.map(t => (
                                <span key={t} className="border border-neutral-200 dark:border-neutral-800 px-3 py-1 rounded-full">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </header>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

                        {/* Left: Description & Links */}
                        <div className="lg:col-span-4 space-y-12">
                            <div className="reveal">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">About the project</h3>
                                <p className="text-xl leading-relaxed font-light">
                                    {project.description}
                                </p>
                            </div>

                            <div className="reveal flex flex-col gap-4">
                                {project.liveLink && (
                                    <a
                                        href={project.liveLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center justify-between w-full py-4 border-b border-neutral-200 dark:border-neutral-800 hover:border-black dark:hover:border-white transition-colors"
                                    >
                                        <span className="font-medium">Live Website</span>
                                        <ArrowUpRight size={20} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </a>
                                )}
                                {project.githubLink && (
                                    <a
                                        href={project.githubLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center justify-between w-full py-4 border-b border-neutral-200 dark:border-neutral-800 hover:border-black dark:hover:border-white transition-colors"
                                    >
                                        <span className="font-medium">Source Code</span>
                                        <Github size={20} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Right: Visuals */}
                        <div className="lg:col-span-8 space-y-8 reveal">
                            <div className="aspect-video w-full bg-neutral-100 dark:bg-neutral-900 rounded-2xl overflow-hidden relative">
                                {project.liveLink ? (
                                    <iframe
                                        src={project.liveLink}
                                        className="w-full h-full border-0"
                                        title={project.title}
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-neutral-400">
                                        No preview available
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-between text-xs font-mono text-neutral-400 uppercase">
                                <span>Project Preview</span>
                                <span>{new Date().getFullYear()}</span>
                            </div>
                        </div>

                    </div>

                </div>
            </main>

            <footer className="mt-32 py-12 border-t border-neutral-100 dark:border-neutral-900 text-center text-neutral-400 text-sm">
                <p>&copy; {new Date().getFullYear()} {user.name}. All rights reserved.</p>
            </footer>

        </div>
    );
}
