"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Twitter, Instagram, Globe, Mail, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function MagazinePortfolio({ user }) {
    const containerRef = useRef(null);
    const { name, bio, socialLinks, projects, education, experience } = user;
    const [firstName, ...restName] = name ? name.split(" ") : ["User", "Name"];
    const lastName = restName.join(" ");

    useGSAP(() => {
        // Hero specific animations
        gsap.from(".magazine-title", {
            y: 100,
            opacity: 0,
            duration: 1.5,
            ease: "power4.out",
            stagger: 0.2
        });

        gsap.from(".hero-line", {
            scaleX: 0,
            duration: 1.5,
            ease: "power4.out",
            delay: 0.5
        });

        // Reveal animations for articles/projects
        gsap.utils.toArray(".article-card").forEach(article => {
            gsap.from(article, {
                opacity: 0,
                y: 50,
                duration: 1,
                scrollTrigger: {
                    trigger: article,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="bg-[#f0f0f0] text-black min-h-screen font-serif selection:bg-black selection:text-white">

            {/* Header / Nav */}
            <header className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center mix-blend-difference text-white">
                <div className="font-bold tracking-tighter text-xl">ISSUE 01</div>
                <div className="text-sm uppercase tracking-widest">{new Date().getFullYear()} COLLECTION</div>
            </header>

            {/* Cover / Hero */}
            <section className="min-h-screen pt-24 px-4 md:px-12 flex flex-col relative border-b-4 border-black pb-12">
                <div className="hero-line w-full h-1 bg-black mb-8 origin-left" />

                <div className="flex-grow flex flex-col justify-between">
                    <div>
                        <h1 className="text-[12vw] leading-[0.85] font-black tracking-tighter uppercase mb-4">
                            <span className="magazine-title block">{firstName}</span>
                            <span className="magazine-title block ml-[10vw] italic font-serif">{lastName}</span>
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-12 items-end">
                        <div className="md:col-span-5 relative h-[50vh] md:h-[60vh] border-2 border-black p-2">
                            <div className="relative w-full h-full grayscale hover:grayscale-0 transition-all duration-700">
                                <Image
                                    src={user.image || "https://github.com/shadcn.png"}
                                    alt={name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        <div className="md:col-span-7 flex flex-col justify-between h-full">
                            <p className="text-xl md:text-3xl font-sans font-light leading-snug w-full border-t-2 border-black pt-6">
                                {bio}
                            </p>

                            <div className="mt-12">
                                <h3 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-black pb-2 inline-block">Table of Contents</h3>
                                <ul className="space-y-2 font-sans text-lg">
                                    <li><a href="#projects" className="hover:underline">01. Selected Works</a></li>
                                    <li><a href="#experience" className="hover:underline">02. Career Timeline</a></li>
                                    <li><a href="#education" className="hover:underline">03. Education</a></li>
                                    <li><a href="#contact" className="hover:underline">04. Contact</a></li>
                                </ul>
                            </div>

                            <div className="flex gap-4 mt-8">
                                {socialLinks?.github && <SocialLink href={socialLinks.github} icon={<Github />} />}
                                {socialLinks?.linkedin && <SocialLink href={socialLinks.linkedin} icon={<Linkedin />} />}
                                {socialLinks?.twitter && <SocialLink href={socialLinks.twitter} icon={<Twitter />} />}
                                {socialLinks?.instagram && <SocialLink href={socialLinks.instagram} icon={<Instagram />} />}
                                {socialLinks?.website && <SocialLink href={socialLinks.website} icon={<Globe />} />}
                                <SocialLink href={`mailto:${user.email}`} icon={<Mail />} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Projects (Editorial Style) */}
            <section id="projects" className="py-24 px-4 md:px-12 border-b-2 border-black">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-y-24 gap-x-12">

                    {/* Section Label */}
                    <div className="md:col-span-3">
                        <div className="sticky top-24">
                            <h2 className="text-6xl font-black uppercase transform -rotate-90 origin-top-left translate-y-32">Projects</h2>
                        </div>
                    </div>

                    <div className="md:col-span-9 space-y-32">
                        {projects?.map((project, i) => (
                            <article key={project._id || i} className="article-card group">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                                    <div className="text-8xl font-black text-neutral-300">
                                        {(i + 1).toString().padStart(2, '0')}
                                    </div>
                                    <div className="flex flex-col justify-end">
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.tech.map(t => (
                                                <span key={t} className="bg-black text-white px-2 py-1 text-xs uppercase font-bold tracking-wider">{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t-4 border-black pt-6">
                                    <h3 className="text-5xl md:text-7xl font-bold mb-6 serif group-hover:italic transition-all duration-300">
                                        {project.title}
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="relative aspect-video bg-neutral-200 border-2 border-black overflow-hidden">
                                            <div className={`absolute inset-0 ${project.color || 'bg-neutral-800'}`} />
                                            <Link href={`/${user.username}/magazine/project/${encodeURIComponent(project.title)}`} className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white font-bold uppercase tracking-widest">
                                                Read Case Study
                                            </Link>
                                        </div>
                                        <div className="flex flex-col justify-between">
                                            <p className="text-xl leading-relaxed font-sans opacity-80">
                                                {project.description}
                                                <span className="block mt-4 w-12 h-1 bg-black" />
                                            </p>

                                            <div className="flex gap-4 mt-8 font-sans font-bold uppercase text-sm tracking-widest">
                                                {project.githubLink && <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="underline hover:no-underline decoration-2">Source Code</a>}
                                                {project.liveLink && <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="underline hover:no-underline decoration-2">Live Demo</a>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section >

            {/* Experience & Education Grid */}
            < section id="experience" className="border-b-2 border-black grid grid-cols-1 md:grid-cols-2 bg-white" >
                <div className="p-12 md:p-24 border-b md:border-b-0 md:border-r border-black">
                    <h2 className="text-4xl font-black uppercase mb-12 flex items-center gap-4">
                        <span className="w-4 h-4 bg-black block"></span>
                        Experience
                    </h2>
                    <div className="space-y-12">
                        {experience?.map((job, i) => (
                            <div key={job._id || i} className="group">
                                <div className="text-xs font-bold uppercase tracking-widest mb-1 opacity-60">
                                    {new Date(job.startDate).getFullYear()} — {job.current ? "Present" : new Date(job.endDate).getFullYear()}
                                </div>
                                <h3 className="text-2xl font-bold serif group-hover:underline decoration-2 underline-offset-4">{job.position}</h3>
                                <div className="text-lg font-sans italic opacity-80 mb-4">{job.company}</div>
                                <p className="font-sans text-sm leading-relaxed max-w-sm">
                                    {job.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div id="education" className="p-12 md:p-24 bg-neutral-100">
                    <h2 className="text-4xl font-black uppercase mb-12 flex items-center gap-4">
                        <span className="w-4 h-4 border-2 border-black block"></span>
                        Education
                    </h2>
                    <div className="space-y-12">
                        {education?.map((edu, i) => (
                            <div key={edu._id || i}>
                                <div className="text-xs font-bold uppercase tracking-widest mb-1 opacity-60">
                                    {edu.startYear} — {edu.endYear}
                                </div>
                                <h3 className="text-2xl font-bold serif">{edu.institution}</h3>
                                <div className="text-lg font-sans mb-4">{edu.degree}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section >

            <footer id="contact" className="py-24 px-4 md:px-12 bg-black text-white text-center">
                <h2 className="text-[10vw] font-black uppercase leading-none mb-8">
                    Get in touch.
                </h2>
                <div className="text-2xl font-serif italic mb-12">
                    Open for interesting collaborations and assignments.
                </div>
                <a href={`mailto:${user.email}`} className="inline-block border-2 border-white px-12 py-4 text-xl uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300">
                    Email Me
                </a>
                <div className="mt-24 text-xs opacity-50 uppercase tracking-widest">
                    &copy; {new Date().getFullYear()} {firstName} {lastName}  —  Issue 01
                </div>
            </footer>

        </div >
    );
}

function SocialLink({ href, icon }) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="p-3 border-2 border-black rounded-full hover:bg-black hover:text-white transition-all">
            {React.cloneElement(icon, { size: 20 })}
        </a>
    );
}
