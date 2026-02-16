"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Twitter, Instagram, Globe, Mail, Move, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, Draggable);

export default function ChaosPortfolio({ user }) {
    const containerRef = useRef(null);
    const { name, bio, socialLinks, projects, education, experience } = user;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useGSAP(() => {
        // Draggable Elements
        Draggable.create(".draggable", {
            bounds: containerRef.current,
            inertia: true,
            edgeResistance: 0.65,
            onDragStart: function () {
                gsap.to(this.target, { scale: 1.1, zIndex: 100, boxShadow: "20px 20px 0px rgba(0,0,0,1)", duration: 0.2 });
            },
            onDragEnd: function () {
                gsap.to(this.target, { scale: 1, zIndex: 1, boxShadow: "10px 10px 0px rgba(0,0,0,1)", duration: 0.2 });
            }
        });

        // Random rotation for elements on load
        gsap.utils.toArray(".scatter").forEach(el => {
            gsap.set(el, { rotation: gsap.utils.random(-15, 15) });
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
        <div ref={containerRef} className="bg-[#FFFF00] min-h-screen text-black font-mono overflow-hidden relative selection:bg-black selection:text-[#FFFF00]">

            {/* Background Chaos */}
            <div className="fixed inset-0 pointer-events-none opacity-10 font-bold text-[20vw] leading-none break-all select-none">
                PORTFOLIO PORTFOLIO PORTFOLIO CHAOS CHAOS CHAOS
            </div>

            {/* Navigation (Brutalist Menu) */}
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="fixed top-8 right-8 z-50 bg-black text-white px-6 py-2 font-bold text-xl hover:bg-white hover:text-black border-4 border-black transition-colors shadow-[8px_8px_0px_#fff]"
            >
                {isMenuOpen ? "CLOSE" : "MENU"}
            </button>

            {isMenuOpen && (
                <div className="fixed inset-0 bg-black/90 z-40 flex items-center justify-center">
                    <div className="flex flex-col gap-8 text-6xl md:text-8xl font-black text-white uppercase text-center">
                        <a href="#hero" onClick={() => setIsMenuOpen(false)} className="hover:text-[#FFFF00] hover:italic">Start</a>
                        <a href="#work" onClick={() => setIsMenuOpen(false)} className="hover:text-[#FFFF00] hover:italic">Work</a>
                        <a href="#about" onClick={() => setIsMenuOpen(false)} className="hover:text-[#FFFF00] hover:italic">Info</a>
                    </div>
                </div>
            )}

            {/* Draggable Hero Header */}
            <div className="draggable absolute top-[20%] left-[10%] bg-white border-4 border-black p-8 shadow-[10px_10px_0px_#000] rotate-[-5deg] cursor-move z-10 max-w-2xl">
                <div className="absolute -top-6 -left-6 bg-black text-white px-4 py-1 font-bold transform -rotate-12">
                    <Move size={16} className="inline mr-2" /> DRAG ME
                </div>
                <h1 className="text-6xl md:text-8xl font-black uppercase leading-none mb-4">
                    {name}
                </h1>
                <p className="text-xl font-bold bg-black text-white inline-block px-2">
                    {bio}
                </p>
            </div>

            {/* Draggable Profile Image */}
            <div className="draggable absolute top-[40%] right-[15%] w-64 h-80 bg-blue-600 border-4 border-black p-2 shadow-[10px_10px_0px_#000] rotate-[5deg] cursor-move z-10">
                <div className="w-full h-full relative grayscale contrast-125 border-2 border-black">
                    <Image
                        src={user.image || "https://github.com/shadcn.png"}
                        alt={name}
                        fill
                        className="object-cover"
                    />
                </div>
            </div>

            {/* Infinite Marquee */}
            <div className="absolute top-[60%] w-full bg-black text-white py-4 border-y-4 border-white rotate-[-2deg] scale-110 z-0">
                <div className="marquee-inner whitespace-nowrap text-4xl font-bold uppercase">
                    <span>AVAILABLE FOR WORK • CREATIVE DEVELOPER • DESIGNER • {name} • AVAILABLE FOR WORK • CREATIVE DEVELOPER • DESIGNER • {name} • </span>
                    <span>AVAILABLE FOR WORK • CREATIVE DEVELOPER • DESIGNER • {name} • AVAILABLE FOR WORK • CREATIVE DEVELOPER • DESIGNER • {name} • </span>
                </div>
            </div>

            {/* Projects scattered around */}
            <div id="work" className="absolute top-[120vh] w-full px-8 pb-32">
                <h2 className="text-[10vw] font-black leading-none mb-24 text-center bg-white border-4 border-black inline-block p-4 shadow-[15px_15px_0px_#000]">
                    SELECTED CHAOS
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-32">
                    {projects?.map((project, i) => (
                        <div key={project._id || i} className="scatter bg-white border-4 border-black p-6 shadow-[10px_10px_0px_#000] hover:shadow-[20px_20px_0px_#000] transition-shadow group relative">
                            <div className="absolute -top-8 -right-8 bg-[#ff00ff] text-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-2xl border-4 border-black">
                                {i + 1}
                            </div>

                            <div className="h-48 bg-black mb-6 border-2 border-black relative overflow-hidden">
                                <div className={`absolute inset-0 ${project.color || 'bg-blue-500'} opacity-80`} />
                                <Link href={`/${user.username}/chaos/project/${encodeURIComponent(project.title)}`} className="absolute inset-0 flex items-center justify-center text-white font-bold text-2xl opacity-0 group-hover:opacity-100 uppercase tracking-widest bg-black/80 transition-all">
                                    View
                                </Link>
                            </div>

                            <h3 className="text-3xl font-black uppercase mb-2 underline decoration-4 decoration-[#FFFF00]">{project.title}</h3>
                            <p className="font-bold text-sm mb-4 leading-tight">{project.description}</p>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tech.map(t => (
                                    <span key={t} className="bg-black text-white px-2 py-1 text-xs font-bold uppercase">{t}</span>
                                ))}
                            </div>

                            <div className="flex gap-4 mt-2">
                                {project.githubLink && (
                                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase underline decoration-2 hover:bg-black hover:text-white transition-colors p-1">
                                        Source Code
                                    </a>
                                )}
                                {project.liveLink && (
                                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase underline decoration-2 hover:bg-black hover:text-white transition-colors p-1">
                                        Live Demo
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Social Links (Fixed Bottom Left) */}
            <div className="fixed bottom-8 left-8 z-50 flex flex-col gap-4">
                {socialLinks?.github && <SocialLink href={socialLinks.github} icon={<Github />} bg="bg-[#ff00ff]" />}
                {socialLinks?.linkedin && <SocialLink href={socialLinks.linkedin} icon={<Linkedin />} bg="bg-[#00ffff]" />}
                {socialLinks?.twitter && <SocialLink href={socialLinks.twitter} icon={<Twitter />} bg="bg-[#ffff00]" />}
                <SocialLink href={`mailto:${user.email}`} icon={<Mail />} bg="bg-white" />
            </div>

        </div>
    );
}

function SocialLink({ href, icon, bg }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-12 h-12 ${bg} border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all`}
        >
            {React.cloneElement(icon, { size: 24, strokeWidth: 3 })}
        </a>
    );
}
