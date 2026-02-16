"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Twitter, Instagram, Globe, Mail, ArrowRight, ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalPortfolio({ user }) {
    const containerRef = useRef(null);
    const { name, bio, socialLinks, projects, education, experience } = user;

    useGSAP(() => {
        const sections = gsap.utils.toArray(".panel");

        gsap.to(sections, {
            xPercent: -100 * (sections.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: ".horizontal-scroll-container",
                pin: true,
                scrub: 1,
                // snap: 1 / (sections.length - 1),
                end: () => "+=" + document.querySelector(".horizontal-scroll-container").offsetWidth * (sections.length - 1) // Make scroll length dependent on width matches number of panels
            }
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="overscroll-none">
            <div className="horizontal-scroll-container h-screen flex flex-nowrap w-[600%]"> {/* Width needs to accommodate all panels. 6 sections = 600% */}

                {/* Panel 1: Hero */}
                <section className="panel w-screen h-screen flex items-center justify-center bg-zinc-900 text-white flex-shrink-0 relative">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay" />
                    <div className="text-center space-y-8 z-10 px-4">
                        <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-zinc-700">
                            <Image
                                src={user.image || "https://github.com/shadcn.png"}
                                alt={name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <h1 className="text-6xl md:text-9xl font-bold tracking-tighter">
                            {name}
                        </h1>
                        <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto">
                            {bio}
                        </p>
                        <div className="flex justify-center gap-6">
                            {socialLinks?.github && <SocialLink href={socialLinks.github} icon={<Github />} />}
                            {socialLinks?.linkedin && <SocialLink href={socialLinks.linkedin} icon={<Linkedin />} />}
                            {socialLinks?.twitter && <SocialLink href={socialLinks.twitter} icon={<Twitter />} />}
                            {socialLinks?.instagram && <SocialLink href={socialLinks.instagram} icon={<Instagram />} />}
                        </div>
                        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
                            Scroll Down to Explore &darr;
                        </div>
                    </div>
                </section>

                {/* Panel 2: Intro / About */}
                <section className="panel w-screen h-screen flex items-center justify-center bg-indigo-600 text-white flex-shrink-0">
                    <div className="max-w-4xl px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="text-5xl md:text-7xl font-bold leading-tight">
                            I create digital experiences that matter.
                        </div>
                        <div className="text-xl md:text-2xl leading-relaxed text-indigo-100">
                            Based in India, I specialize in building high-performance web applications with modern technologies. Passionate about UI/UX and clean code.
                        </div>
                    </div>
                </section>

                {/* Panel 3: Projects Intro */}
                <section className="panel w-screen h-screen flex items-center justify-center bg-zinc-100 text-black flex-shrink-0">
                    <h2 className="text-[15vw] font-black uppercase tracking-tighter leading-none text-zinc-200 select-none absolute z-0 top-1/2 transform -translate-y-1/2">
                        WORK
                    </h2>
                    <div className="relative z-10 text-center">
                        <h2 className="text-6xl font-bold mb-8">Selected Projects</h2>
                        <p className="text-2xl text-zinc-600 max-w-xl mx-auto">
                            A showcase of my recent work, featuring full-stack applications and creative frontend experiments.
                        </p>
                    </div>
                </section>

                {/* Panel 4: Projects Showcase */}
                <section className="panel w-screen h-screen flex items-center px-12 bg-zinc-900 text-white flex-shrink-0">
                    <div className="w-full flex gap-8 overflow-x-auto pb-8 snap-x">
                        {/* Note: horizontal scroll inside horizontal scroll might be tricky with GSAP pin, 
                            so we display projects in a grid or just a few featured ones side-by-side but fitted in screen */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto">
                            {projects?.slice(0, 3).map((project, i) => (
                                <div key={project._id || i} className="bg-zinc-800 rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 border border-zinc-700">
                                    <div className="h-48 bg-zinc-700 relative">
                                        <div className={`absolute inset-0 ${project.color || 'bg-blue-600'} opacity-50`} />
                                        <Link href={`/${user.username}/horizontal/project/${encodeURIComponent(project.title)}`} className="absolute inset-0 z-10" />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                                        <p className="text-zinc-400 line-clamp-2 mb-4">{project.description}</p>

                                        <div className="flex gap-4 relative z-20">
                                            {project.githubLink && (
                                                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="p-2 bg-zinc-700 rounded-full hover:bg-white hover:text-black transition-colors">
                                                    <Github size={18} />
                                                </a>
                                            )}
                                            {project.liveLink && (
                                                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="p-2 bg-zinc-700 rounded-full hover:bg-white hover:text-black transition-colors">
                                                    <ExternalLink size={18} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Panel 5: Experience & Education */}
                <section className="panel w-screen h-screen flex items-center justify-center bg-orange-500 text-white flex-shrink-0">
                    <div className="max-w-6xl w-full px-12 grid grid-cols-1 md:grid-cols-2 gap-16">
                        <div>
                            <h2 className="text-4xl font-black uppercase mb-8 border-b-4 border-white pb-4 inline-block">Experience</h2>
                            <div className="space-y-8">
                                {experience?.slice(0, 2).map((job, i) => (
                                    <div key={i}>
                                        <h3 className="text-2xl font-bold">{job.position}</h3>
                                        <div className="text-lg opacity-80">{job.company}</div>
                                        <p className="mt-2 text-sm opacity-90">{job.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h2 className="text-4xl font-black uppercase mb-8 border-b-4 border-white pb-4 inline-block">Education</h2>
                            <div className="space-y-8">
                                {education?.slice(0, 2).map((edu, i) => (
                                    <div key={i}>
                                        <h3 className="text-2xl font-bold">{edu.institution}</h3>
                                        <div className="text-lg opacity-80">{edu.degree}</div>
                                        <div className="mt-1 text-sm opacity-80">{edu.startYear} - {edu.endYear}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Panel 6: Contact */}
                <section className="panel w-screen h-screen flex items-center justify-center bg-black text-white flex-shrink-0 relative">
                    <div className="text-center space-y-12 z-10">
                        <h2 className="text-6xl md:text-8xl font-black tracking-tighter">
                            Let&apos;s Talk.
                        </h2>
                        <a href={`mailto:${user.email}`} className="inline-block px-12 py-6 bg-white text-black text-2xl font-bold rounded-full hover:bg-zinc-200 transition-colors">
                            Send Email
                        </a>
                        <div className="flex justify-center gap-8 pt-12">
                            {socialLinks?.github && <SocialLink href={socialLinks.github} icon={<Github />} />}
                            {socialLinks?.linkedin && <SocialLink href={socialLinks.linkedin} icon={<Linkedin />} />}
                            {socialLinks?.twitter && <SocialLink href={socialLinks.twitter} icon={<Twitter />} />}
                            {socialLinks?.website && <SocialLink href={socialLinks.website} icon={<Globe />} />}
                        </div>
                    </div>
                    <div className="absolute bottom-8 w-full text-center text-zinc-500">
                        &copy; {new Date().getFullYear()} {name}. All rights reserved.
                    </div>
                </section>

            </div>
        </div>
    );
}

function SocialLink({ href, icon }) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="p-4 bg-white/10 rounded-full hover:bg-white hover:text-black transition-all">
            {React.cloneElement(icon, { size: 24 })}
        </a>
    );
}
