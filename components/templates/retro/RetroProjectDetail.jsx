
"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";

export default function RetroProjectDetail({ user, project }) {
    const [lines, setLines] = useState([
        { type: "info", content: `Loading project data for ${project.title}...` },
        { type: "success", content: "Data retrieved successfully." },
        { type: "info", content: "Rendering details..." },
    ]);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [lines]);

    return (
        <div className="min-h-screen bg-black text-green-500 font-mono p-4 md:p-8 flex flex-col">

            {/* Header / Nav */}
            <div className="border border-green-500 p-4 mb-4 flex justify-between items-center">
                <Link href={`/${user.username}/retro`} className="hover:bg-green-500 hover:text-black px-2 py-1 transition-colors">
                    &lt; BACK_TO_ROOT
                </Link>
                <div className="uppercase">
                    SYSTEM_STATUS: ONLINE | USER: {user.name.toUpperCase()}
                </div>
            </div>

            <div className="flex-grow border border-green-500 p-4 overflow-y-auto custom-scrollbar" ref={scrollRef}>
                <div className="mb-8">
                    <pre className="text-xs md:text-sm leading-none whitespace-pre-wrap">
                        {`
 ____  ____  ____  ____  ____  ___  ____ 
(  _ \\(  _ \\(  _ \\(  _ \\(  __)/ __)(_  _)
 ) __/ )   / ) (_) ) __/ ) _)( (__   )(  
(__)  (__\\_)(____/(__)  (____)\\___) (__) 
`}
                    </pre>
                </div>

                <div className="space-y-4 max-w-4xl">
                    <div className="border-b border-green-500/50 pb-2 mb-4">
                        <span className="bg-green-500 text-black px-2 py-1 font-bold">PROJECT_TITLE</span>
                        <span className="ml-4 text-xl md:text-2xl font-bold">{project.title}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <div className="mb-4">
                                <span className="bg-green-500/20 text-green-300 px-2 py-1 text-xs">DESCRIPTION</span>
                                <p className="mt-2 text-lg leading-relaxed text-green-400">
                                    {project.description}
                                </p>
                            </div>

                            <div className="mb-4">
                                <span className="bg-green-500/20 text-green-300 px-2 py-1 text-xs">TECH_STACK</span>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {project.tech.map(t => (
                                        <span key={t} className="border border-green-500 px-2 py-1 text-sm hover:bg-green-500 hover:text-black transition-colors cursor-default">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-4">
                                <span className="bg-green-500/20 text-green-300 px-2 py-1 text-xs">LINKS</span>
                                <div className="mt-2 flex flex-col gap-2">
                                    {project.liveLink && (
                                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:bg-green-500 hover:text-black w-fit px-2 py-1 transition-colors">
                                            &gt; EXECUTE_LIVE_DEMO <ExternalLink size={16} />
                                        </a>
                                    )}
                                    {project.githubLink && (
                                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:bg-green-500 hover:text-black w-fit px-2 py-1 transition-colors">
                                            &gt; VIEW_SOURCE_CODE <Github size={16} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="mb-4">
                                <span className="bg-green-500/20 text-green-300 px-2 py-1 text-xs">VISUAL_PREVIEW</span>
                                <div className="mt-2 border-2 border-green-500 h-64 w-full relative bg-green-900/10">
                                    {/* Scanlines effect */}
                                    <div className="absolute inset-0 pointer-events-none bg-[url('https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif')] opacity-10 mix-blend-overlay"></div>

                                    {project.liveLink ? (
                                        <iframe
                                            src={project.liveLink}
                                            className="w-full h-full border-0 opacity-80"
                                            title={project.title}
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-green-700">
                                            NO_SIGNAL
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-4 border-t border-green-500/30 text-xs animate-pulse">
                    _ CURSOR_ACTIVE
                </div>
            </div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #000;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #22c55e;
                }
            `}</style>

        </div>
    );
}
