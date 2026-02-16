
"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxProjectDetail({ user, project }) {
    const containerRef = useRef(null);

    useGSAP(() => {
        gsap.to(".bg-image", {
            yPercent: 50,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="min-h-screen bg-slate-900 text-white overflow-x-hidden relative">

            {/* Parallax Background */}
            <div className="absolute inset-0 z-0 h-[100vh] w-full overflow-hidden">
                <div
                    className="bg-image absolute inset-0 bg-cover bg-center opacity-30"
                    style={{ backgroundImage: `url(${user.backgroundImage || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/80 to-slate-900" />
            </div>

            <nav className="fixed top-0 w-full z-50 p-6 flex justify-between items-center bg-gradient-to-b from-slate-900/80 to-transparent backdrop-blur-sm">
                <Link href={`/${user.username}/parallax`} className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                    <ArrowLeft size={20} /> Back
                </Link>
                <div className="font-bold tracking-widest uppercase text-sm border border-white/20 px-4 py-1 rounded-full backdrop-blur-md">
                    Project Details
                </div>
            </nav>

            <main className="relative z-10 pt-32 pb-24 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-24">
                    <h1 className="text-5xl md:text-8xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 animate-gradient-x">
                        {project.title}
                    </h1>
                    <div className="flex justify-center gap-3">
                        {project.tech.map(t => (
                            <span key={t} className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-sm">
                                {t}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    <div className="space-y-8 bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10">
                        <h2 className="text-2xl font-bold text-cyan-400">Overview</h2>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            {project.description}
                        </p>

                        <div className="pt-8 flex gap-4">
                            {project.liveLink && (
                                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/20">
                                    <ExternalLink size={20} /> Live Demo
                                </a>
                            )}
                            {project.githubLink && (
                                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold py-4 rounded-xl transition-all">
                                    <Github size={20} /> Code
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="aspect-video w-full rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl shadow-cyan-500/1000 relative group">
                        {project.liveLink ? (
                            <iframe
                                src={project.liveLink}
                                className="w-full h-full"
                                title={project.title}
                                loading="lazy"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-white/30 bg-black/50 backdrop-blur-sm">
                                Preview Unavailable
                            </div>
                        )}
                        {/* Reflection/Shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
                    </div>

                </div>
            </main>

        </div>
    );
}
