
"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";

export default function ChaosProjectDetail({ user, project }) {
    const containerRef = useRef(null);

    useGSAP(() => {
        // Random rotation for elements on load
        gsap.utils.toArray(".scatter").forEach(el => {
            gsap.set(el, { rotation: gsap.utils.random(-10, 10) });
        });

        // Marquee Effect
        gsap.to(".marquee-inner", {
            xPercent: -50,
            repeat: -1,
            duration: 10,
            ease: "linear"
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="bg-[#FFFF00] min-h-screen text-black font-mono overflow-hidden relative selection:bg-black selection:text-[#FFFF00] pb-20">
            {/* Background Chaos */}
            <div className="fixed inset-0 pointer-events-none opacity-5 font-bold text-[20vw] leading-none break-all select-none z-0">
                CHAOS CHAOS CHAOS PROJECT PROJECT PROJECT
            </div>

            {/* Header / Navigation */}
            <div className="relative z-10 pt-12 px-6">
                <Link
                    href={`/${user.username}/chaos#work`}
                    className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 font-bold uppercase border-4 border-white hover:bg-white hover:text-black hover:border-black transition-all shadow-[4px_4px_0px_#000]"
                >
                    <ArrowLeft size={20} />
                    Back to Chaos
                </Link>
            </div>

            <main className="relative z-10 max-w-6xl mx-auto px-6 pt-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* Left: Title & Info */}
                    <div className="space-y-8">
                        <div className="scatter bg-white border-4 border-black p-8 shadow-[10px_10px_0px_#000]">
                            <h1 className="text-5xl md:text-7xl font-black uppercase leading-none mb-4 underline decoration-[#ff00ff] decoration-8">
                                {project.title}
                            </h1>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.tech.map(t => (
                                    <span key={t} className="bg-black text-white px-3 py-1 text-sm font-bold uppercase">{t}</span>
                                ))}
                            </div>
                            <p className="text-xl font-bold leading-tight">
                                {project.description}
                            </p>
                        </div>

                        <div className="flex flex-col gap-4">
                            {project.liveLink && (
                                <a
                                    href={project.liveLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="scatter bg-[#00ffff] border-4 border-black p-4 font-black text-2xl uppercase text-center shadow-[8px_8px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-2"
                                >
                                    <ExternalLink size={28} /> Live Demo
                                </a>
                            )}
                            {project.githubLink && (
                                <a
                                    href={project.githubLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="scatter bg-[#ff00ff] border-4 border-black p-4 font-black text-2xl uppercase text-center shadow-[8px_8px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-2"
                                >
                                    <Github size={28} /> Source Code
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Right: Preview (Draggable style visual) */}
                    <div className="relative">
                        <div className="scatter bg-black p-2 border-4 border-white shadow-[15px_15px_0px_#000] rotate-2">
                            {project.liveLink ? (
                                <div className="w-full aspect-video bg-white overflow-hidden border-2 border-white relative group">
                                    <iframe
                                        src={project.liveLink}
                                        className="w-full h-full"
                                        title={project.title}
                                        loading="lazy"
                                    />
                                    {/* Overlay to prevent interaction until clicked (optional) */}
                                    <div className="absolute inset-0 pointer-events-none border-4 border-transparent group-hover:border-[#FFFF00] transition-colors" />
                                </div>
                            ) : (
                                <div className="w-full aspect-video bg-white flex items-center justify-center border-2 border-white">
                                    <span className="font-bold text-gray-400">NO PREVIEW</span>
                                </div>
                            )}
                        </div>

                        <div className="absolute -bottom-10 -right-10 bg-[#FFFF00] border-4 border-black px-4 py-2 font-black text-xl rotate-[-5deg] shadow-[5px_5px_0px_#fff]">
                            PREVIEW_MODE
                        </div>
                    </div>

                </div>
            </main>

            {/* Marquee Footer */}
            <div className="fixed bottom-0 w-full bg-black text-white py-2 border-t-4 border-white z-20">
                <div className="marquee-inner whitespace-nowrap text-xl font-bold uppercase">
                    <span>PROJECT DETAILS • {project.title} • CHAOS MODE • PROJECT DETAILS • {project.title} • CHAOS MODE • </span>
                    <span>PROJECT DETAILS • {project.title} • CHAOS MODE • PROJECT DETAILS • {project.title} • CHAOS MODE • </span>
                </div>
            </div>

        </div>
    );
}
