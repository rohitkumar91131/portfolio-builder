"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Github, Linkedin, Twitter, Instagram, Globe, Mail, ExternalLink, ArrowRight } from "lucide-react";

export default function RetroPortfolio({ user }) {
    const { name, bio, socialLinks, projects, education, experience } = user;
    const [input, setInput] = useState("");
    const [history, setHistory] = useState([
        { type: "output", content: `Welcome to ${name}'s Terminal v1.0.0` },
        { type: "output", content: "Type 'help' to see available commands." },
    ]);
    const inputRef = useRef(null);
    const containerRef = useRef(null);

    // Auto-scroll to bottom
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [history]);

    // Focus input on click
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const commands = {
        help: {
            description: "List available commands",
            action: () => {
                return (
                    <div className="grid grid-cols-[100px_1fr] gap-2">
                        <span className="text-yellow-400">about</span> Display user information
                        <span className="text-yellow-400">projects</span> List all projects
                        <span className="text-yellow-400">experience</span> Show work history
                        <span className="text-yellow-400">education</span> Show education details
                        <span className="text-yellow-400">socials</span> List social media links
                        <span className="text-yellow-400">clear</span> Clear terminal
                        <span className="text-yellow-400">all</span> Run detailed diagnostics (show everything)
                    </div>
                );
            }
        },
        about: {
            description: "Display user information",
            action: () => (
                <div className="space-y-2">
                    <div className="text-xl font-bold text-green-400">{name}</div>
                    <div className="text-neutral-300">{bio}</div>
                </div>
            )
        },
        socials: {
            description: "List social media links",
            action: () => (
                <div className="flex flex-wrap gap-4">
                    {socialLinks?.github && <SocialLink href={socialLinks.github} label="GitHub" icon={<Github size={16} />} />}
                    {socialLinks?.linkedin && <SocialLink href={socialLinks.linkedin} label="LinkedIn" icon={<Linkedin size={16} />} />}
                    {socialLinks?.twitter && <SocialLink href={socialLinks.twitter} label="Twitter" icon={<Twitter size={16} />} />}
                    {socialLinks?.instagram && <SocialLink href={socialLinks.instagram} label="Instagram" icon={<Instagram size={16} />} />}
                    {socialLinks?.website && <SocialLink href={socialLinks.website} label="Website" icon={<Globe size={16} />} />}
                    <SocialLink href={`mailto:${user.email}`} label="Email" icon={<Mail size={16} />} />
                </div>
            )
        },
        projects: {
            description: "List all projects",
            action: () => (
                <div className="space-y-6">
                    {projects?.map((p, i) => (
                        <div key={i} className="border-l-2 border-green-500/30 pl-4">
                            <h3 className="text-lg font-bold text-green-300 flex items-center gap-2">
                                <Link href={`/${user.username}/retro/project/${encodeURIComponent(p.title)}`} className="hover:underline hover:bg-green-500 hover:text-black transition-colors px-1 -ml-1">
                                    {p.title}
                                </Link>
                                {p.liveLink && <a href={p.liveLink} target="_blank" className="text-xs text-blue-400 hover:underline">[LIVE]</a>}
                                {p.githubLink && <a href={p.githubLink} target="_blank" className="text-xs text-blue-400 hover:underline">[CODE]</a>}
                            </h3>
                            <p className="text-neutral-400 text-sm mb-2">{p.description}</p>
                            <div className="flex flex-wrap gap-2 text-xs">
                                {p.tech.map(t => <span key={t} className="text-yellow-600">[{t}]</span>)}
                            </div>
                        </div>
                    ))}
                </div>
            )
        },
        experience: {
            description: "Show work history",
            action: () => (
                <div className="space-y-4">
                    {experience?.map((exp, i) => (
                        <div key={i}>
                            <div className="flex justify-between text-green-300">
                                <span className="font-bold">{exp.position} @ {exp.company}</span>
                                <span className="text-xs opacity-70">
                                    {new Date(exp.startDate).getFullYear()} - {exp.current ? "NOW" : new Date(exp.endDate).getFullYear()}
                                </span>
                            </div>
                            <p className="text-neutral-400 text-sm">{exp.description}</p>
                        </div>
                    ))}
                </div>
            )
        },
        education: {
            description: "Show education details",
            action: () => (
                <div className="space-y-4">
                    {education?.map((edu, i) => (
                        <div key={i}>
                            <div className="flex justify-between text-green-300">
                                <span className="font-bold">{edu.institution}</span>
                                <span className="text-xs opacity-70">
                                    {edu.startYear} - {edu.endYear}
                                </span>
                            </div>
                            <p className="text-neutral-400 text-sm">{edu.degree}</p>
                        </div>
                    ))}
                </div>
            )
        },
        all: {
            description: "Show everything",
            action: () => (
                <div className="space-y-8">
                    <div>--- ABOUT ---</div>
                    {commands.about.action()}
                    <div>--- EXPERIENCE ---</div>
                    {commands.experience.action()}
                    <div>--- PROJECTS ---</div>
                    {commands.projects.action()}
                    <div>--- EDUCATION ---</div>
                    {commands.education.action()}
                    <div>--- SOCIALS ---</div>
                    {commands.socials.action()}
                </div>
            )
        },
        clear: {
            description: "Clear terminal",
            action: () => "CLEAR_SIGNAL"
        }
    };

    const handleCommand = (e) => {
        if (e.key === 'Enter') {
            const cmd = input.trim().toLowerCase();

            if (!cmd) {
                setHistory(prev => [...prev, { type: "command", content: "" }]);
                setInput("");
                return;
            }

            const newHistory = [...history, { type: "command", content: cmd }];

            if (commands[cmd]) {
                const result = commands[cmd].action();
                if (result === "CLEAR_SIGNAL") {
                    setHistory([]);
                } else {
                    newHistory.push({ type: "output", content: result });
                    setHistory(newHistory);
                }
            } else {
                newHistory.push({
                    type: "output",
                    content: <span className="text-red-400">Command not found: {cmd}. Type &apos;help&apos; for available commands.</span>
                });
                setHistory(newHistory);
            }

            setInput("");
        }
    };

    return (
        <div
            className="min-h-screen bg-black text-green-500 font-mono p-4 md:p-10 cursor-text selection:bg-green-900 selection:text-white"
            onClick={() => inputRef.current?.focus()}
        >
            <div className="max-w-4xl mx-auto border border-green-900/50 bg-black rounded-lg shadow-[0_0_20px_rgba(0,255,0,0.1)] p-6 min-h-[80vh] flex flex-col relative overflow-hidden">
                {/* CRT Scanline Effect */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none z-20 opacity-20" />

                {/* Header */}
                <div className="flex justify-between border-b border-green-900/50 pb-2 mb-4 text-xs tracking-wider opacity-60">
                    <span>USER: {user.username || "GUEST"}</span>
                    <span>SYS: ONLINE</span>
                    <span>{new Date().toLocaleTimeString()}</span>
                </div>

                {/* Terminal Window */}
                <div className="flex-grow overflow-auto space-y-2 relative z-10 custom-scrollbar" ref={containerRef}>
                    {history.map((entry, index) => (
                        <div key={index} className="break-words">
                            {entry.type === "command" ? (
                                <div className="flex items-center gap-2 text-neutral-400">
                                    <span className="text-green-500">➜</span>
                                    <span>~</span>
                                    <span className="text-white">{entry.content}</span>
                                </div>
                            ) : (
                                <div className="pl-6 text-green-400 text-sm md:text-base leading-relaxed">
                                    {entry.content}
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Active Input Line */}
                    <div className="flex items-center gap-2 pt-2">
                        <span className="text-green-500">➜</span>
                        <span className="text-blue-400">~</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleCommand}
                            className="bg-transparent border-none outline-none flex-grow text-white caret-green-500"
                            autoFocus
                            autoComplete="off"
                        />
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #001100;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #004400;
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #006600;
                }
            `}</style>
        </div>
    );
}

function SocialLink({ href, label, icon }) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:bg-green-900/30 px-2 py-1 rounded transition-colors text-green-300">
            {icon}
            <span>{label}</span>
        </a>
    );
}
