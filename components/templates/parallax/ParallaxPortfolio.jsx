"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Twitter, Instagram, Globe, Mail, ArrowUpRight, ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxPortfolio({ user }) {
    const containerRef = useRef(null);
    const { name, bio, socialLinks, projects, education, experience } = user;

    useGSAP(() => {
        // Parallax Effect for Hero Image
        gsap.to(".hero-image", {
            yPercent: 50,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero-section",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        // Parallax Effect for Hero Text (moves slower)
        gsap.to(".hero-text", {
            yPercent: -50,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero-section",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        // Horizontal Scroll for Projects
        const projectsContainer = document.querySelector(".projects-container");
        if (projectsContainer) {
            gsap.to(projectsContainer, {
                x: () => -(projectsContainer.scrollWidth - window.innerWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: ".projects-section",
                    start: "top top",
                    end: () => "+=" + projectsContainer.scrollWidth,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1
                }
            });
        }

        // Reveal Animations for Sections
        gsap.utils.toArray(".reveal-section").forEach(section => {
            gsap.from(section, {
                opacity: 0,
                y: 100,
                duration: 1,
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="bg-neutral-900 text-white overflow-hidden">

            {/* Hero Section with Parallax */}
            <header className="hero-section relative h-screen flex items-center justify-center overflow-hidden">
                {/* Background Image Parallax Layer */}
                <div className="hero-image absolute inset-0 z-0">
                    <Image
                        src={user.backgroundImage || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"}
                        alt="Background"
                        fill
                        className="object-cover opacity-30"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neutral-900" />
                </div>

                {/* Content Parallax Layer */}
                <div className="hero-text relative z-10 text-center space-y-6 p-4">
                    <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white/10 shadow-2xl mb-8">
                        <Image
                            src={user.image || "https://github.com/shadcn.png"}
                            alt={name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase mix-blend-overlay opacity-80">
                        {name}
                    </h1>
                    <p className="text-xl md:text-2xl font-light text-neutral-300 max-w-2xl mx-auto">
                        {bio}
                    </p>

                    <div className="flex justify-center gap-6 pt-8">
                        {socialLinks?.github && <SocialLink href={socialLinks.github} icon={<Github />} />}
                        {socialLinks?.linkedin && <SocialLink href={socialLinks.linkedin} icon={<Linkedin />} />}
                        {socialLinks?.twitter && <SocialLink href={socialLinks.twitter} icon={<Twitter />} />}
                        {socialLinks?.instagram && <SocialLink href={socialLinks.instagram} icon={<Instagram />} />}
                        {socialLinks?.website && <SocialLink href={socialLinks.website} icon={<Globe />} />}
                        <SocialLink href={`mailto:${user.email}`} icon={<Mail />} />
                    </div>
                </div>
            </header>

            {/* Horizontal Scroll Projects Section */}
            <section className="projects-section h-screen bg-neutral-900 relative flex items-center overflow-hidden">
                <div className="absolute top-10 left-10 z-20">
                    <h2 className="text-4xl font-bold uppercase tracking-widest text-white/20">Selected Works</h2>
                </div>
                <div className="projects-container flex gap-20 px-20">
                    {/* Intro Card */}
                    <div className="w-[50vw] md:w-[30vw] flex-shrink-0 flex flex-col justify-center">
                        <p className="text-2xl md:text-4xl leading-tight font-light">
                            A curated selection of projects that define my journey in design and development. Scroll to explore &rarr;
                        </p>
                    </div>

                    {projects?.map((project, i) => (
                        <div key={project._id || i} className="w-[80vw] md:w-[60vw] h-[70vh] flex-shrink-0 bg-neutral-800 rounded-3xl overflow-hidden relative group border border-neutral-700">
                            <div className={`absolute inset-0 bg-gradient-to-br ${project.color || 'from-blue-900 to-black'} opacity-50`} />

                            <div className="absolute inset-0 p-12 flex flex-col justify-end transform transition-transform duration-700 group-hover:scale-105">
                                <div className="space-y-4 max-w-2xl relative z-10">
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="text-6xl font-black text-white/10">{(i + 1).toString().padStart(2, '0')}</span>
                                        <div className="flex gap-2">
                                            {project.githubLink && (
                                                <a href={project.githubLink} target="_blank" onClick={(e) => e.stopPropagation()} className="p-2 bg-white/10 rounded-full hover:bg-white hover:text-black transition-colors relative z-20">
                                                    <Github size={20} />
                                                </a>
                                            )}
                                            {project.liveLink && (
                                                <a href={project.liveLink} target="_blank" onClick={(e) => e.stopPropagation()} className="p-2 bg-white/10 rounded-full hover:bg-white hover:text-black transition-colors relative z-20">
                                                    <ExternalLink size={20} />
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    <h3 className="text-4xl md:text-5xl font-bold leading-tight">{project.title}</h3>
                                    <p className="text-lg text-neutral-300 line-clamp-3">{project.description}</p>

                                    <div className="flex flex-wrap gap-2 pt-4">
                                        {project.tech.map((t) => (
                                            <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm backdrop-blur-sm">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Hover Image Reveal or Gradient Shift could go here */}
                            <Link href={`/${user.username}/parallax/project/${encodeURIComponent(project.title)}`} className="absolute inset-0 z-0" />
                        </div>
                    ))}

                    {/* Outro Card */}
                    <div className="w-[50vw] md:w-[30vw] flex-shrink-0 flex items-center justify-center bg-white/5 rounded-3xl border border-white/10">
                        <Link href="/projects" className="text-2xl hover:underline underline-offset-8">View All Projects &rarr;</Link>
                    </div>
                </div>
            </section>

            {/* Vertical Scroll Experience & Education */}
            <section className="bg-black py-32 px-6 md:px-12">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">

                    {/* Experience */}
                    <div className="reveal-section space-y-12">
                        <h2 className="text-3xl font-bold uppercase tracking-widest text-emerald-500 mb-12">Experience</h2>
                        {experience?.map((job) => (
                            <div key={job._id} className="relative pl-8 border-l border-neutral-800">
                                <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-emerald-500 rounded-full" />
                                <span className="text-xs font-mono text-emerald-500/80 mb-2 block">
                                    {new Date(job.startDate).getFullYear()} — {job.current ? "Present" : new Date(job.endDate).getFullYear()}
                                </span>
                                <h3 className="text-2xl font-bold">{job.position}</h3>
                                <p className="text-lg text-neutral-400 mt-1 mb-4">{job.company}</p>
                                <p className="text-neutral-500 leading-relaxed">{job.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Education */}
                    <div className="reveal-section space-y-12">
                        <h2 className="text-3xl font-bold uppercase tracking-widest text-blue-500 mb-12">Education</h2>
                        {education?.map((edu) => (
                            <div key={edu._id} className="relative pl-8 border-l border-neutral-800">
                                <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-blue-500 rounded-full" />
                                <span className="text-xs font-mono text-blue-500/80 mb-2 block">
                                    {edu.startYear} — {edu.endYear}
                                </span>
                                <h3 className="text-2xl font-bold">{edu.institution}</h3>
                                <p className="text-lg text-neutral-400 mt-1 mb-4">{edu.degree}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* Footer */}
            <footer className="h-[50vh] bg-neutral-900 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-neutral-900 to-neutral-900" />
                <div className="relative z-10 text-center space-y-8">
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">Let&apos;s Create Together</h2>
                    <a href={`mailto:${user.email}`} className="inline-block px-8 py-4 bg-white text-black text-lg font-bold rounded-full hover:scale-105 transition-transform">
                        Get In Touch
                    </a>
                </div>
            </footer>

        </div>
    );
}

function SocialLink({ href, icon }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-white/5 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all duration-300"
        >
            {React.cloneElement(icon, { size: 24 })}
        </a>
    );
}
