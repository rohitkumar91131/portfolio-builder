"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Twitter, Instagram, Globe, Mail, ArrowRight, ExternalLink, Download, CheckCircle, Briefcase } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function CorporatePortfolio({ user }) {
    const containerRef = useRef(null);
    const { name, bio, socialLinks, projects, education, experience } = user;

    useGSAP(() => {
        // Subtle fade-ins for corporate feel
        gsap.utils.toArray(".fade-in").forEach(element => {
            gsap.from(element, {
                opacity: 0,
                y: 20,
                duration: 0.8,
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="bg-slate-50 text-slate-900 min-h-screen font-sans">

            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="font-bold text-xl text-slate-800 tracking-tight">{name}</div>
                    <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
                        <a href="#about" className="hover:text-blue-600 transition-colors">About</a>
                        <a href="#experience" className="hover:text-blue-600 transition-colors">Experience</a>
                        <a href="#projects" className="hover:text-blue-600 transition-colors">Projects</a>
                        <a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a>
                    </div>
                    <a href="#contact" className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                        Hire Me
                    </a>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="bg-white pt-20 pb-32 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8 fade-in">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold uppercase tracking-wide">
                            <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                            Available for work
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1]">
                            Building digital <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">solutions</span> for business growth.
                        </h1>
                        <p className="text-xl text-slate-600 max-w-lg leading-relaxed">
                            {bio}
                        </p>
                        <div className="flex gap-4 pt-4">
                            <a href="#projects" className="px-8 py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-all flex items-center gap-2">
                                View Work <ArrowRight size={16} />
                            </a>
                            <a href="#contact" className="px-8 py-3 bg-white border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-all">
                                Contact Me
                            </a>
                        </div>

                        <div className="pt-8 flex gap-6 text-slate-400">
                            {socialLinks?.linkedin && <a href={socialLinks.linkedin} className="hover:text-blue-600 transition-colors"><Linkedin size={24} /></a>}
                            {socialLinks?.github && <a href={socialLinks.github} className="hover:text-slate-900 transition-colors"><Github size={24} /></a>}
                            {socialLinks?.twitter && <a href={socialLinks.twitter} className="hover:text-blue-400 transition-colors"><Twitter size={24} /></a>}
                        </div>
                    </div>

                    <div className="relative h-[600px] w-full lg:w-[500px] ml-auto fade-in">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-slate-100 rounded-2xl transform rotate-3" />
                        <div className="absolute inset-0 bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
                            <Image
                                src={user.image || "https://github.com/shadcn.png"}
                                alt={name}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/* Trust Badge */}
                        <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg border border-slate-100 flex items-center gap-4 animate-bounce-slow">
                            <div className="bg-green-100 p-3 rounded-full text-green-600">
                                <Briefcase size={24} />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-slate-900">{experience?.length}+</div>
                                <div className="text-sm text-slate-500 font-medium">Years Experience</div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Experience Section */}
            <section id="experience" className="py-24 bg-slate-50 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16 fade-in">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Professional Experience</h2>
                        <p className="text-slate-600">A timeline of my career journey and contributions.</p>
                    </div>

                    <div className="space-y-8">
                        {experience?.map((job, i) => (
                            <div key={job._id || i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 fade-in hover:shadow-md transition-shadow">
                                <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-2">
                                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                        {job.position}
                                        <span className="text-slate-400">at</span>
                                        <span className="text-blue-600">{job.company}</span>
                                    </h3>
                                    <div className="text-sm font-medium px-3 py-1 bg-slate-100 text-slate-600 rounded-full w-fit">
                                        {new Date(job.startDate).getFullYear()} — {job.current ? "Present" : new Date(job.endDate).getFullYear()}
                                    </div>
                                </div>
                                <p className="text-slate-600 leading-relaxed">
                                    {job.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-24 bg-white px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-16 fade-in">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">Featured Projects</h2>
                            <p className="text-slate-600 max-w-xl">
                                Select case studies showcasing my technical expertise and problem-solving abilities.
                            </p>
                        </div>
                        <Link href="/projects" className="hidden md:flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700">
                            View all projects <ArrowRight size={16} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects?.map((project, i) => (
                            <div key={project._id || i} className="group bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden hover:border-blue-200 hover:shadow-lg transition-all fade-in flex flex-col h-full">
                                <div className="aspect-[4/3] bg-slate-200 relative overflow-hidden">
                                    <div className={`absolute inset-0 ${project.color || 'bg-slate-300'}`} />
                                    {/* Overlay link */}
                                    <Link href={`/project/${encodeURIComponent(project.title)}`} className="absolute inset-0 z-10" />
                                </div>

                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex gap-2 mb-4">
                                        {project.tech.slice(0, 3).map(t => (
                                            <span key={t} className="text-xs font-semibold px-2 py-1 bg-white border border-slate-200 rounded text-slate-600">
                                                {t}
                                            </span>
                                        ))}
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                                        {project.description}
                                    </p>

                                    <div className="pt-4 border-t border-slate-200 flex gap-4 mt-auto">
                                        {project.liveLink && (
                                            <a href={project.liveLink} target="_blank" className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
                                                <ExternalLink size={14} /> Live Demo
                                            </a>
                                        )}
                                        {project.githubLink && (
                                            <a href={project.githubLink} target="_blank" className="text-sm font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1">
                                                <Github size={14} /> Code
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center md:hidden">
                        <Link href="/projects" className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700">
                            View all projects <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Education Section */}
            <section className="py-24 bg-slate-50 px-6 border-y border-slate-200">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16 fade-in">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Education</h2>
                        <p className="text-slate-600">Academic background and certifications.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {education?.map((edu, i) => (
                            <div key={edu._id || i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex gap-4 fade-in">
                                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0">
                                    <CheckCircle size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">{edu.institution}</h3>
                                    <p className="text-slate-600 text-sm mb-1">{edu.degree}</p>
                                    <p className="text-slate-400 text-xs">{edu.startYear} - {edu.endYear}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA / Footer */}
            <footer id="contact" className="bg-slate-900 text-white py-24 px-6">
                <div className="max-w-4xl mx-auto text-center space-y-8 fade-in">
                    <h2 className="text-4xl font-bold tracking-tight">Ready to start your next project?</h2>
                    <p className="text-slate-400 max-w-xl mx-auto text-lg">
                        I am currently available for freelance projects and open to full-time opportunities.
                    </p>
                    <div className="flex justify-center gap-4">
                        <a href={`mailto:${user.email}`} className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors">
                            Get in Touch
                        </a>
                        {/* Resume Link Placeholder */}
                        <button className="px-8 py-3 bg-transparent border border-slate-700 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2">
                            <Download size={18} /> Download CV
                        </button>
                    </div>

                    <div className="pt-16 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
                        <div>&copy; {new Date().getFullYear()} {name}. All rights reserved.</div>
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>

        </div>
    );
}
