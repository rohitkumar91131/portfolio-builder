"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Twitter, Globe, Mail, ExternalLink, ArrowUpRight, Instagram } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ModernPortfolio({ user }) {
    const containerRef = useRef(null);
    const leftPanelRef = useRef(null);
    const rightPanelRef = useRef(null);

    const { name, bio, socialLinks, projects, education, experience } = user;

    useGSAP(() => {
        // Animate Left Panel Content on Load
        gsap.from(".left-content > *", {
            y: 20,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
        });

        // Animate Right Panel Content on Load
        gsap.from(".right-content > *", {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            delay: 0.5,
            ease: "power3.out",
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="flex h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 overflow-hidden font-sans">
            {/* Sidebar / Left Panel */}
            <aside className="w-full md:w-1/3 lg:w-1/4 h-full p-8 md:p-12 border-r border-neutral-200 dark:border-neutral-800 flex flex-col justify-between relative bg-white dark:bg-neutral-950 z-10">
                <div className="left-content">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden mb-8 border-4 border-neutral-100 dark:border-neutral-800">
                        <Image
                            src={user.image || "https://github.com/shadcn.png"}
                            alt={name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
                        {name}
                    </h1>
                    <p className="text-xl lg:text-2xl text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">
                        {bio}
                    </p>
                </div>

                <div className="left-content flex flex-wrap gap-4">
                    {socialLinks?.github && (
                        <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-neutral-100 dark:bg-neutral-900 rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
                            <Github size={24} />
                        </a>
                    )}
                    {socialLinks?.linkedin && (
                        <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-neutral-100 dark:bg-neutral-900 rounded-full hover:bg-blue-600 hover:text-white transition-all">
                            <Linkedin size={24} />
                        </a>
                    )}
                    {socialLinks?.twitter && (
                        <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="p-3 bg-neutral-100 dark:bg-neutral-900 rounded-full hover:bg-sky-500 hover:text-white transition-all">
                            <Twitter size={24} />
                        </a>
                    )}
                    {socialLinks?.instagram && (
                        <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="p-3 bg-neutral-100 dark:bg-neutral-900 rounded-full hover:bg-pink-600 hover:text-white transition-all">
                            <Instagram size={24} />
                        </a>
                    )}
                    {socialLinks?.website && (
                        <a href={socialLinks.website} target="_blank" rel="noopener noreferrer" className="p-3 bg-neutral-100 dark:bg-neutral-900 rounded-full hover:bg-emerald-600 hover:text-white transition-all">
                            <Globe size={24} />
                        </a>
                    )}
                    <a href={`mailto:${user.email}`} className="p-3 bg-neutral-100 dark:bg-neutral-900 rounded-full hover:bg-red-500 hover:text-white transition-all">
                        <Mail size={24} />
                    </a>
                </div>

                <div className="left-content hidden lg:block text-sm text-neutral-400">
                    &copy; {new Date().getFullYear()} {name}. All rights reserved.
                </div>
            </aside >

            {/* Right Panel - Scrollable */}
            <div ref={rightPanelRef} className="w-full md:w-2/3 lg:w-3/4 h-full overflow-y-auto no-scrollbar scroll-smooth">
                <div className="right-content space-y-24 max-w-3xl mx-auto pt-8 pb-32 px-6">

                    {/* Experience Section */}
                    <section id="experience" className="space-y-8">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-8">Experience</h2>
                        <div className="space-y-12">
                            {experience?.map((job) => (
                                <div key={job._id} className="group flex gap-6 hover:bg-neutral-100 dark:hover:bg-neutral-900/50 p-6 -mx-6 rounded-xl transition-colors cursor-default">
                                    <div className="w-1/4 text-sm text-neutral-500 dark:text-neutral-400 font-mono mt-1">
                                        {new Date(job.startDate).getFullYear()} — {job.current ? "Present" : new Date(job.endDate).getFullYear()}
                                    </div>
                                    <div className="w-3/4 space-y-2">
                                        <h3 className="text-xl font-semibold flex items-center gap-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {job.position}
                                            <span className="text-neutral-400">@</span>
                                            <span>{job.company}</span>
                                        </h3>
                                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                            {job.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Projects Section */}
                    <section id="projects" className="space-y-8">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-8">Projects</h2>
                        <div className="grid gap-8">
                            {projects?.map((project) => (
                                <div key={project._id} className="group relative border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden bg-white dark:bg-neutral-900 hover:shadow-2xl hover:shadow-neutral-200 dark:hover:shadow-neutral-900 transition-all duration-300">

                                    <Link href={`/${user.username}/modern/project/${encodeURIComponent(project.title)}`} className="block" aria-label={`View details for ${project.title}`}>
                                        <div className="p-8 space-y-4">
                                            <div className="flex justify-between items-start">
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${project.color || 'bg-blue-100 dark:bg-blue-900/30'}`}>
                                                    <ArrowUpRight className="text-current" />
                                                </div>
                                                <div className="flex gap-2">
                                                    {project.githubLink && (
                                                        <div onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(project.githubLink, '_blank'); }} className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors cursor-pointer z-10 relative">
                                                            <Github size={18} />
                                                        </div>
                                                    )}
                                                    {project.liveLink && (
                                                        <div onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(project.liveLink, '_blank'); }} className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors cursor-pointer z-10 relative">
                                                            <ExternalLink size={18} />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                                <ArrowUpRight size={20} />
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors px-8">
                                            {project.title}
                                        </h3>

                                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed px-8 pb-4">
                                            {project.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 px-8 pb-8">
                                            {project.tech.map((t, i) => (
                                                <span key={i} className="px-3 py-1 text-xs font-medium rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Education Section */}
                    <section id="education" className="space-y-8 pb-24">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-8">Education</h2>
                        <div className="relative border-l border-neutral-200 dark:border-neutral-800 ml-3 space-y-12">
                            {education?.map((edu) => (
                                <div key={edu._id} className="relative pl-8 ml-3">
                                    <div className={`absolute -left-[21px] top-1 w-4 h-4 rounded-full border-2 border-white dark:border-black ${edu.color ? edu.color.replace('bg-', 'bg-') : 'bg-blue-500'}`} />
                                    <div className="space-y-1">
                                        <span className="text-xs font-mono text-neutral-500 dark:text-neutral-500 uppercase">
                                            {edu.startYear} — {edu.endYear}
                                        </span>
                                        <h3 className="text-lg font-bold">{edu.institution}</h3>
                                        <div className="text-base text-neutral-700 dark:text-neutral-300 font-medium">{edu.degree}</div>
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
                                            {edu.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <footer className="lg:hidden text-center text-sm text-neutral-400 pb-8">
                        &copy; {new Date().getFullYear()} {name}. All rights reserved.
                    </footer>

                </div>
            </div>
        </div>
    );
}
