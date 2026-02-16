
"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Github, Calendar, User, Tag } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MagazineProjectDetail({ user, project }) {
    const containerRef = useRef(null);
    const { name } = user;
    const [firstName, ...restName] = name ? name.split(" ") : ["User", "Name"];
    const lastName = restName.join(" ");

    useGSAP(() => {
        gsap.from(".headline", {
            y: 50,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
            stagger: 0.1
        });

        gsap.from(".reveal-image", {
            scale: 1.1,
            opacity: 0,
            duration: 1.5,
            ease: "power2.out",
            delay: 0.5
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="bg-[#f4f1ea] text-black min-h-screen font-serif selection:bg-black selection:text-white">

            {/* Navigation */}
            <header className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center border-b border-black bg-[#f4f1ea]/90 backdrop-blur-sm">
                <Link href={`/${user.username}/magazine`} className="group flex items-center gap-2 font-sans text-sm uppercase tracking-widest hover:underline">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Issue
                </Link>
                <div className="font-bold tracking-tighter text-xl uppercase">THE ARCHIVE</div>
                <div className="text-sm uppercase tracking-widest hidden md:block">{new Date().getFullYear()} COLLECTION</div>
            </header>

            <main className="pt-24 px-4 md:px-12 lg:px-24">

                {/* Hero / Headline */}
                <div className="border-b-2 border-black pb-12 mb-12">
                    <div className="flex justify-between items-end mb-4 font-sans text-xs uppercase tracking-widest opacity-60">
                        <span>Project No. 01</span>
                        <span>{project.tech.slice(0, 3).join(" / ")}</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase leading-none tracking-tighter headline">
                        {project.title}
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
                    {/* Left Column: Metadata */}
                    <div className="lg:col-span-3 space-y-12 font-sans border-r-0 lg:border-r border-black pr-0 lg:pr-12">

                        <div>
                            <h3 className="font-bold uppercase tracking-widest text-xs mb-4 border-b border-black pb-1">Client / Purpose</h3>
                            <p className="text-lg">Personal Project</p>
                        </div>

                        <div>
                            <h3 className="font-bold uppercase tracking-widest text-xs mb-4 border-b border-black pb-1">Services</h3>
                            <ul className="space-y-1">
                                <li>Web Development</li>
                                <li>UI/UX Design</li>
                                <li>Frontend Engineering</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold uppercase tracking-widest text-xs mb-4 border-b border-black pb-1">Date</h3>
                            <p>{new Date().getFullYear()}</p>
                        </div>

                        <div className="pt-8">
                            {project.liveLink && (
                                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-black text-white py-4 uppercase font-bold tracking-widest hover:bg-neutral-800 transition-colors mb-4">
                                    Visit Site
                                </a>
                            )}
                            {project.githubLink && (
                                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="block w-full text-center border border-black hover:bg-black hover:text-white transition-colors py-4 uppercase font-bold tracking-widest">
                                    Source Code
                                </a>
                            )}
                        </div>

                    </div>

                    {/* Right Column: Content */}
                    <div className="lg:col-span-9">

                        <div className="aspect-[16/9] w-full bg-neutral-200 mb-12 overflow-hidden border border-black reveal-image">
                            {project.liveLink ? (
                                <iframe
                                    src={project.liveLink}
                                    className="w-full h-full"
                                    title={project.title}
                                    loading="lazy"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center font-sans uppercase tracking-widest text-neutral-400">
                                    Image Unavailable
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-lg md:text-xl leading-relaxed">
                            <div className="first-letter:text-7xl first-letter:font-bold first-letter:mr-3 first-letter:float-left">
                                {project.description}
                            </div>
                            <div>
                                <p>
                                    This digital experience was crafted with precision, utilizing <strong>{project.tech.join(", ")}</strong> to ensure optimal performance and engagement. The design philosophy centers on minimalism while maximizing visual impact.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

            </main>

            <footer className="border-t border-black py-12 text-center font-sans text-xs uppercase tracking-widest">
                &copy; {new Date().getFullYear()} {user.name} / All Rights Reserved
            </footer>

        </div>
    );
}
