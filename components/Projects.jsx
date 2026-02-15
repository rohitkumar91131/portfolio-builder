"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Github,
  ExternalLink,
  Database,
  Code,
  Video,
  Layout,
  Terminal
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ProjectSkeleton = () => (
  <div className="h-full p-8 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
    <div className="animate-pulse flex flex-col h-full justify-between">
      <div>
        <div className="w-14 h-14 bg-gray-200 dark:bg-gray-800 rounded-xl mb-6"></div>
        <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-4"></div>
        <div className="space-y-3 mb-6">
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-4/6"></div>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="h-6 w-16 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
        <div className="h-6 w-20 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
        <div className="h-6 w-12 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
      </div>
    </div>
  </div>
);

const iconMap = {
  Video: <Video size={32} className="text-blue-500" />,
  Database: <Database size={32} className="text-green-500" />,
  Code: <Code size={32} className="text-purple-500" />,
  ExternalLink: <ExternalLink size={32} className="text-orange-500" />,
  Layout: <Layout size={32} className="text-pink-500" />,
  Terminal: <Terminal size={32} className="text-gray-500" />,
  Default: <Code size={32} className="text-gray-500" />
};

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Tilt calculations
    const rotateX = ((y - centerY) / centerY) * -10; // Max tilt 10deg
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 1000,
      transformStyle: "preserve-3d"
    });

    // Glow positioning
    gsap.to(glowRef.current, {
      x: x,
      y: y,
      duration: 0.2, // Faster response for glow
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`project-card h-full flex flex-col group relative p-8 rounded-3xl border border-gray-200 dark:border-gray-800 hover:border-blue-500/50 transition-colors duration-300 ${project.color || 'bg-gray-50 dark:bg-gray-900'} overflow-hidden`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Make the whole card clickable */}
      <Link href={`/project/${encodeURIComponent(project.title)}`} className="absolute inset-0 z-0" aria-label={`View details for ${project.title}`} />

      {/* Glow Effect */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute -top-[150px] -left-[150px] w-[300px] h-[300px] bg-blue-500/20 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
      />

      <div className="relative z-10 flex flex-col h-full justify-between pointer-events-none" style={{ transform: "translateZ(20px)" }}>
        <div>
          <div className="mb-4 p-3 bg-white dark:bg-black w-fit rounded-xl shadow-sm">
            {iconMap[project.iconName] || iconMap.Default}
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {project.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((t, i) => (
            <span
              key={i}
              className="text-xs font-medium px-3 py-1 rounded-full bg-white/60 dark:bg-black/60 text-gray-800 dark:text-gray-200 backdrop-blur-sm border border-gray-200 dark:border-gray-700"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute top-6 right-6 z-20 flex gap-2 opacity-100 translate-x-0 md:opacity-0 md:translate-x-4 md:group-hover:opacity-100 md:group-hover:translate-x-0 transition-all duration-300"
        style={{ transform: "translateZ(30px)" }} // Float icons higher
      >
        <a href={project.githubLink} target="_blank" className="p-2 bg-white dark:bg-black rounded-full hover:scale-110 transition-transform shadow-md border border-gray-100 dark:border-gray-800 pointer-events-auto">
          <Github size={18} className="text-gray-900 dark:text-white" />
        </a>
        <a href={project.liveLink} target="_blank" className="p-2 bg-white dark:bg-black rounded-full hover:scale-110 transition-transform shadow-md border border-gray-100 dark:border-gray-800 pointer-events-auto">
          <ExternalLink size={18} className="text-gray-900 dark:text-white" />
        </a>
      </div>
    </div>
  );
};

export default function Projects({ projects }) {
  const containerRef = useRef(null);
  const [internalProjects, setInternalProjects] = useState([]);
  const [loading, setLoading] = useState(!projects);

  const displayProjects = projects || internalProjects;

  useEffect(() => {
    if (projects) return;

    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        if (data.success) {
          setInternalProjects(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [projects]);

  useGSAP(() => {
    if (loading || displayProjects.length === 0) return;

    const cards = gsap.utils.toArray(".project-card-wrapper");

    gsap.set(cards, { y: 100, opacity: 0 });

    ScrollTrigger.batch(cards, {
      onEnter: (elements) => {
        gsap.to(elements, {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power4.out",
        });
      },
      onLeaveBack: (elements) => {
        gsap.to(elements, {
          y: 100,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
        });
      },
      start: "top 85%",
    });
  }, { scope: containerRef, dependencies: [loading, displayProjects] });

  return (
    <section
      ref={containerRef}
      className="py-20 px-4 transition-colors duration-300 perspective-2000"
      id="projects"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A selection of tools, libraries, and applications I've built to solve
            real problems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading ? (
            <>
              <ProjectSkeleton />
              <ProjectSkeleton />
              <ProjectSkeleton />
            </>
          ) : (
            displayProjects.map((project, index) => (
              <div key={project._id || index} className="project-card-wrapper h-full">
                <ProjectCard project={project} index={index} />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}