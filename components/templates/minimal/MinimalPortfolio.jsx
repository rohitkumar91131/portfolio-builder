"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function MinimalPortfolio({ user }) {
    const containerRef = useRef(null);
    const { name, bio, socialLinks, projects, education, experience } = user;

    // Typewriter effect state
    const [displayedName, setDisplayedName] = useState("");
    const fullText = name || "User";

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setDisplayedName(fullText.substring(0, index + 1));
            index++;
            if (index > fullText.length) clearInterval(interval);
        }, 100);
        return () => clearInterval(interval);
    }, [fullText]);

    useGSAP(() => {
        const sections = gsap.utils.toArray("section");
        sections.forEach((section) => {
            gsap.fromTo(section,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-mono p-6 md:p-12 lg:p-24 selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">

            <header className="mb-24">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter">
                    {displayedName}
                    <span className="animate-pulse">_</span>
                </h1>
                <p className="text-sm md:text-base max-w-2xl leading-relaxed opacity-80">
                    {/* // {bio} */}
                </p>

                <nav className="flex gap-6 mt-8 text-sm uppercase tracking-wide">
                    {socialLinks?.github && <a href={socialLinks.github} target="_blank" className="hover:underline Decoration-2 underline-offset-4">[ Github ]</a>}
                    {socialLinks?.linkedin && <a href={socialLinks.linkedin} target="_blank" className="hover:underline Decoration-2 underline-offset-4">[ LinkedIn ]</a>}
                    {socialLinks?.twitter && <a href={socialLinks.twitter} target="_blank" className="hover:underline Decoration-2 underline-offset-4">[ Twitter ]</a>}
                    {socialLinks?.instagram && <a href={socialLinks.instagram} target="_blank" className="hover:underline Decoration-2 underline-offset-4">[ Instagram ]</a>}
                    {socialLinks?.website && <a href={socialLinks.website} target="_blank" className="hover:underline Decoration-2 underline-offset-4">[ Website ]</a>}
                    <a href={`mailto:${user.email}`} className="hover:underline Decoration-2 underline-offset-4">[ Email ]</a>
                </nav>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* Left Column: Index / Navigation (Optional or just spacer) */}
                <div className="hidden lg:block lg:col-span-3 text-xs opacity-50 sticky top-24 h-fit">
                    <ul className="space-y-2">
                        <li>01. EXPERIENCE</li>
                        <li>02. PROJECTS</li>
                        <li>03. EDUCATION</li>
                    </ul>
                </div>

                {/* Right Column: Content */}
                <div className="lg:col-span-9 space-y-32">

                    {/* Experience */}
                    <section>
                        <h2 className="text-xs font-bold uppercase tracking-widest mb-12 border-b border-black dark:border-white pb-2 w-full">01. Experience</h2>
                        <div className="space-y-16">
                            {experience?.map((job) => (
                                <div key={job._id} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div className="text-xs opacity-60">
                                        {new Date(job.startDate).getFullYear()} — {job.current ? "NOW" : new Date(job.endDate).getFullYear()}
                                    </div>
                                    <div className="md:col-span-3">
                                        <h3 className="text-xl font-bold mb-1">{job.position}</h3>
                                        <div className="text-sm mb-4 opacity-80">at {job.company}, {job.location}</div>
                                        <p className="text-sm leading-relaxed opacity-70 border-l-2 border-black/10 dark:border-white/10 pl-4">
                                            {job.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Projects */}
                    <section>
                        <h2 className="text-xs font-bold uppercase tracking-widest mb-12 border-b border-black dark:border-white pb-2 w-full">02. Selected Projects</h2>
                        <div className="grid grid-cols-1 gap-12">
                            {projects?.map((project, idx) => (
                                <div key={project._id} className="group relative border border-black/10 dark:border-white/10 p-6 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300">
                                    <div className="flex justify-between items-start mb-6">
                                        <span className="text-xs font-bold">{(idx + 1).toString().padStart(2, '0')}</span>
                                        <ArrowUpRight size={16} />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                                    <p className="text-sm mb-6 leading-relaxed opacity-80 group-hover:opacity-100">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.tech.map((t) => (
                                            <span key={t} className="text-xs border border-current px-2 py-1 rounded-full">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex gap-4 relative z-20">
                                        {project.githubLink && (
                                            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-xs font-bold hover:underline">
                                                [ SOURCE ]
                                            </a>
                                        )}
                                        {project.liveLink && (
                                            <a href={project.liveLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-xs font-bold hover:underline">
                                                [ LIVE ]
                                            </a>
                                        )}
                                    </div>
                                    <Link href={`/${user.username}/minimal/project/${encodeURIComponent(project.title)}`} className="absolute inset-0 z-10" />
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Education */}
                    <section>
                        <h2 className="text-xs font-bold uppercase tracking-widest mb-12 border-b border-black dark:border-white pb-2 w-full">03. Education</h2>
                        <div className="space-y-12">
                            {education?.map((edu) => (
                                <div key={edu._id} className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-dashed border-black/20 dark:border-white/20 pb-4">
                                    <div>
                                        <h3 className="text-lg font-bold">{edu.institution}</h3>
                                        <div className="text-sm opacity-80">{edu.degree}</div>
                                    </div>
                                    <div className="text-xs opacity-60 mt-2 md:mt-0">
                                        {edu.startYear} — {edu.endYear}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <footer className="pt-24 text-xs opacity-40">
                        [ END OF STREAM ]
                    </footer>

                </div>
            </div>
        </div>
    );
}
