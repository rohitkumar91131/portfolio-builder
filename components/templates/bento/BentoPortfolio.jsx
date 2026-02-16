"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Twitter, Mail, MapPin, Building, Calendar, ExternalLink, ArrowUpRight, Instagram, Globe } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function BentoPortfolio({ user }) {
    const containerRef = useRef(null);
    const { name, bio, socialLinks, projects, education, experience } = user;

    useGSAP(() => {
        gsap.from(".bento-item", {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="min-h-screen bg-gray-100 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 p-4 md:p-8">

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 auto-rows-[200px] gap-4">

                {/* Profile Card */}
                <div className="bento-item md:col-span-4 md:row-span-4 bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-sm border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between relative overflow-hidden group">
                    <div className="relative z-10">
                        <div className="w-20 h-20 rounded-full overflow-hidden mb-6 border-2 border-zinc-100 dark:border-zinc-800">
                            <Image
                                src={user.image || "https://github.com/shadcn.png"}
                                alt={name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight mb-2">{name}</h1>
                        <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-sm">
                            {bio}
                        </p>
                    </div>
                    <div className="absolute top-0 right-0 p-8 opacity-10 grayscale group-hover:grayscale-0 group-hover:opacity-20 transition-all duration-500">
                        {/* Abstract shape or larger avatar could go here */}
                    </div>
                    <div className="flex gap-3 z-10 mt-6">
                        <SocialLink href={socialLinks?.github} icon={<Github size={20} />} />
                        <SocialLink href={socialLinks?.linkedin} icon={<Linkedin size={20} />} />
                        <SocialLink href={socialLinks?.twitter} icon={<Twitter size={20} />} />
                        <SocialLink href={socialLinks?.instagram} icon={<Instagram size={20} />} />
                        <SocialLink href={socialLinks?.website} icon={<Globe size={20} />} />
                        <SocialLink href={`mailto:${user.email}`} icon={<Mail size={20} />} />
                    </div>
                </div>

                {/* Map / Location Card */}
                <div className="bento-item col-span-1 md:col-span-2 lg:col-span-2 bg-emerald-500 text-white rounded-3xl p-6 border border-emerald-600 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
                    <div className="relative z-10">
                        <h2 className="text-lg font-medium opacity-90">Based in</h2>
                        <p className="text-3xl font-bold">India</p>
                    </div>
                    <div className="relative z-10 self-end">
                        <MapPin className="w-12 h-12 opacity-80" />
                    </div>
                </div>

                {/* Experience 1 */}
                {experience?.[0] && (
                    <div className="bento-item col-span-1 md:col-span-2 lg:col-span-2 bg-white dark:bg-neutral-900 rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800 flex flex-col justify-center">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
                                <Building size={24} />
                            </div>
                            <span className="text-xs font-mono bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded text-neutral-500">
                                {new Date(experience[0].startDate).getFullYear()} - {experience[0].current ? 'Now' : new Date(experience[0].endDate).getFullYear()}
                            </span>
                        </div>
                        <h3 className="font-bold text-lg">{experience[0].position}</h3>
                        <p className="text-neutral-500 dark:text-neutral-400 text-sm whitespace-nowrap overflow-hidden text-ellipsis">{experience[0].company}</p>
                    </div>
                )}

                {/* Project 1 - Featured (Large) */}
                {projects?.[0] && (
                    <div className="bento-item col-span-1 md:col-span-2 lg:col-span-2 row-span-2 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-3xl p-0 border border-neutral-800 dark:border-neutral-200 relative overflow-hidden group">
                        <div className="absolute inset-0 h-full w-full bg-gradient-to-b from-transparent to-black/80 dark:to-white/10 z-10" />

                        <div className="p-8 h-full flex flex-col justify-end relative z-20">
                            <div className="mb-auto flex justify-end">
                                <div className="w-10 h-10 rounded-full bg-white/20 dark:bg-black/10 backdrop-blur-md flex items-center justify-center">
                                    <ArrowUpRight size={20} />
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold mb-2">{projects[0].title}</h3>
                            <p className="text-neutral-300 dark:text-neutral-600 line-clamp-2 text-sm">{projects[0].description}</p>
                        </div>

                        {/* Hover Reveal Link */}
                        <Link href={`/${user.username}/bento/project/${encodeURIComponent(projects[0].title)}`} className="absolute inset-0 z-30" />
                    </div>
                )}

                {/* Education 1 */}
                {education?.[0] && (
                    <div className="bento-item col-span-1 md:col-span-2 bg-blue-600 text-white rounded-3xl p-6 border border-blue-700 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                            <Calendar size={24} className="opacity-70" />
                            <span className="text-xs font-mono opacity-80">{education[0].endYear}</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg leading-tight">{education[0].institution}</h3>
                            <p className="text-sm opacity-80 mt-1">{education[0].degree}</p>
                        </div>
                    </div>
                )}

                {/* Remaining Projects (Dynamic) */}
                {projects?.slice(1).map((project) => (
                    <div key={project._id} className="bento-item col-span-1 md:col-span-2 bg-white dark:bg-neutral-900 rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800 group hover:border-blue-500 transition-colors relative">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`w-10 h-10 rounded-lg ${project.color || 'bg-gray-100 dark:bg-gray-800'} flex items-center justify-center`}>
                                <ArrowUpRight size={20} className="text-current opacity-70" />
                            </div>
                        </div>
                        <h3 className="font-bold text-lg">{project.title}</h3>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2 line-clamp-2">{project.description}</p>

                        <div className="flex gap-3 mt-4 relative z-20">
                            {project.githubLink && (
                                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-neutral-500 hover:text-blue-600 transition-colors">
                                    <Github size={18} />
                                </a>
                            )}
                            {project.liveLink && (
                                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-neutral-500 hover:text-blue-600 transition-colors">
                                    <ExternalLink size={18} />
                                </a>
                            )}
                        </div>
                        <Link href={`/${user.username}/bento/project/${encodeURIComponent(project.title)}`} className="absolute inset-0 z-10" />
                    </div>
                ))}

                {/* Tech Stack / Skills (Static for now, but could be dynamic) */}
                <div className="bento-item col-span-1 md:col-span-2 bg-neutral-100 dark:bg-neutral-900 rounded-3xl p-6 flex flex-wrap gap-2 content-start">
                    {['React', 'Next.js', 'Node.js', 'MongoDB', 'Tailwind', 'GSAP', 'TypeScript'].map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-white dark:bg-black rounded-full text-xs font-bold border border-neutral-200 dark:border-neutral-800">
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Filler / Contact */}
                <div className="bento-item col-span-1 md:col-start-1 md:col-end-3 lg:col-start-5 lg:col-end-7 bg-black dark:bg-white text-white dark:text-black rounded-3xl p-8 flex items-center justify-center text-center group cursor-pointer">
                    <Link href={`mailto:${user.email}`} className="space-y-2">
                        <h3 className="text-2xl font-bold group-hover:scale-110 transition-transform duration-300">Let's Talk</h3>
                        <p className="text-sm text-neutral-400 dark:text-neutral-600">Have a project in mind?</p>
                    </Link>
                </div>

            </div>

            <div className="mt-8 text-center text-neutral-400 text-sm">
                &copy; {new Date().getFullYear()} {user.name} - Let&apos;s build something great.
            </div>
        </div>
    );
}

function SocialLink({ href, icon }) {
    if (!href) return null;
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors text-neutral-700 dark:text-neutral-300">
            {icon}
        </a>
    );
}
