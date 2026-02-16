
"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalProjectDetail({ user, project }) {
    const containerRef = useRef(null);

    useGSAP(() => {
        const panels = gsap.utils.toArray(".detail-panel");
        gsap.to(panels, {
            xPercent: -100 * (panels.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: ".detail-scroll-container",
                pin: true,
                scrub: 1,
                end: () => "+=" + document.querySelector(".detail-scroll-container").offsetWidth
            }
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="overscroll-none bg-zinc-900 text-white font-sans h-screen overflow-hidden">

            <nav className="fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-center mix-blend-difference">
                <Link href={`/${user.username}/horizontal`} className="flex items-center gap-2 hover:text-indigo-400 transition-colors">
                    <ArrowLeft size={20} /> Back
                </Link>
                <div className="font-bold tracking-widest uppercase">{project.title}</div>
            </nav>

            <div className="detail-scroll-container h-full flex flex-nowrap w-[300%]">

                {/* Panel 1: Overview */}
                <section className="detail-panel w-screen h-full flex items-center justify-center bg-zinc-900 flex-shrink-0 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 to-zinc-900/50" />
                    <div className="max-w-5xl px-12 z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="text-indigo-500 font-bold uppercase tracking-widest mb-4">Project Overview</div>
                            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-none">
                                {project.title}
                            </h1>
                            <div className="flex gap-4">
                                {project.liveLink && (
                                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-full transition-colors flex items-center gap-2">
                                        Visit Live <ExternalLink size={20} />
                                    </a>
                                )}
                                {project.githubLink && (
                                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="px-8 py-4 border border-zinc-600 hover:bg-white hover:text-black font-bold rounded-full transition-colors flex items-center gap-2">
                                        Source Code <Github size={20} />
                                    </a>
                                )}
                            </div>
                        </div>
                        <div className="text-xl md:text-2xl text-zinc-400 leading-relaxed font-light">
                            {project.description}
                        </div>
                    </div>
                    <div className="absolute bottom-12 right-12 animate-pulse flex items-center gap-2 text-zinc-500">
                        Scroll Right <ArrowLeft className="rotate-180" />
                    </div>
                </section>

                {/* Panel 2: Visuals/Tech */}
                <section className="detail-panel w-screen h-full flex items-center justify-center bg-zinc-800 flex-shrink-0">
                    <div className="w-full max-w-7xl px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8 order-2 md:order-1">
                            <h2 className="text-4xl font-bold mb-8">Technology Stack</h2>
                            <div className="flex flex-wrap gap-4">
                                {project.tech.map(t => (
                                    <div key={t} className="px-6 py-3 bg-zinc-900 rounded-xl border border-zinc-700 text-lg font-medium">
                                        {t}
                                    </div>
                                ))}
                            </div>
                            <div className="mt-12 p-8 bg-zinc-900/50 rounded-2xl border border-zinc-700/50">
                                <h3 className="text-xl font-bold mb-4 text-indigo-400">Key Features</h3>
                                <ul className="space-y-3 text-zinc-400 list-disc list-inside">
                                    <li>Responsive interactions and animations</li>
                                    <li>Optimized performance and SEO</li>
                                    <li>Clean, modular code architecture</li>
                                </ul>
                            </div>
                        </div>
                        <div className="order-1 md:order-2 h-[50vh] bg-black rounded-3xl overflow-hidden border-4 border-zinc-700 shadow-2xl relative group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 mix-blend-overlay pointer-events-none z-10" />
                            {project.liveLink ? (
                                <iframe
                                    src={project.liveLink}
                                    className="w-full h-full"
                                    title={project.title}
                                    loading="lazy"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-zinc-600 font-bold uppercase tracking-widest">
                                    Preview not available
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Panel 3: Conclusion / CTA */}
                <section className="detail-panel w-screen h-full flex items-center justify-center bg-indigo-600 flex-shrink-0 text-center">
                    <div className="max-w-4xl px-8">
                        <h2 className="text-5xl md:text-7xl font-black mb-12">
                            Want to build something similar?
                        </h2>
                        <Link href={`/${user.username}/horizontal#contact`} className="inline-block px-12 py-6 bg-white text-indigo-600 text-xl font-bold rounded-full hover:scale-105 transition-transform shadow-xl">
                            Get in Touch
                        </Link>
                    </div>
                </section>

            </div>
        </div>
    );
}
