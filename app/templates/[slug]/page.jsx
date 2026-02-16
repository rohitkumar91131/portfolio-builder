"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useSession } from "next-auth/react";

// Import Template Components
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Contact from "@/components/Contact";

// Placeholder imports for new templates (we will create these next)
import ModernPortfolio from "@/components/templates/modern/ModernPortfolio";
import BentoPortfolio from "@/components/templates/bento/BentoPortfolio";
import MinimalPortfolio from "@/components/templates/minimal/MinimalPortfolio";
import ParallaxPortfolio from "@/components/templates/parallax/ParallaxPortfolio";
import RetroPortfolio from "@/components/templates/retro/RetroPortfolio";
import MagazinePortfolio from "@/components/templates/magazine/MagazinePortfolio";
import CorporatePortfolio from "@/components/templates/corporate/CorporatePortfolio";
import ChaosPortfolio from "@/components/templates/chaos/ChaosPortfolio";
import HorizontalPortfolio from "@/components/templates/horizontal/HorizontalPortfolio";

export default function DynamicTemplate() {
    const { slug } = useParams();
    const { data: session } = useSession();
    const [data, setData] = useState({ projects: [], education: [], experience: [] });
    const [loading, setLoading] = useState(true);

    // Fetch Data Once for All Templates (Static User for Demo/Preview)
    const DEMO_USER = "rk34190100";

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch public data for specific user
                const [projRes, eduRes, expRes, userRes] = await Promise.all([
                    fetch(`/api/projects?username=${DEMO_USER}`),
                    fetch(`/api/education?username=${DEMO_USER}`),
                    fetch(`/api/experience?username=${DEMO_USER}`),
                    // We might need user profile too if session is missing
                    fetch(`/api/user/profile?username=${DEMO_USER}`)
                ]);
                const projData = await projRes.json();
                const eduData = await eduRes.json();
                const expData = await expRes.json();
                const userData = await userRes.json();

                setData({
                    projects: projData.success ? projData.data : [],
                    education: eduData.success ? eduData.data : [],
                    experience: expData.success ? expData.data : [],
                    user: userData.success ? userData.data : null
                });
            } catch (e) {
                console.error("Failed to fetch data", e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="h-screen flex items-center justify-center">Loading Template...</div>;

    // Use session user if available, otherwise fall back to fetched public user data
    const displayUser = session?.user || data.user;

    if (!displayUser) return <div className="h-screen flex items-center justify-center">User not found</div>;

    // Construct User Object for Templates
    const user = {
        ...displayUser,
        projects: data.projects,
        education: data.education,
        experience: data.experience
    };

    // Render Logic
    const renderTemplate = () => {
        switch (slug) {
            case "classic":
                return (
                    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
                        {/* Classic reuses the root components */}
                        <Hero user={user} />
                        <Projects projects={data.projects} />
                        <Education education={data.education} />
                        {/* Experience component wasn't imported in original file, let's check imports */}
                        {/* Original imports: Hero, Projects, Education, Contact */}
                        {/* Check if Experience was imported? No, it wasn't. */}
                        {/* ClassicPortfolio.jsx uses ExperienceComponent. */}
                        {/* Here we are reconstructing Classic manually? 
                            The original code had:
                            <Hero />
                            <Projects />
                            <Education />
                            <Contact />
                            It didn't reuse ClassicPortfolio component? 
                            Ah, strictly speaking, ClassicPortfolio.jsx exists. 
                            The original code was valid but maybe inconsistent.
                            Since ModernPortfolio requires `user` prop, I am fixing that.
                        */}
                        <Contact user={user} />
                    </div>
                );
            case "modern":
                return <ModernPortfolio user={user} />;
            case "bento":
                return <BentoPortfolio user={user} />;
            case "minimal":
                return <MinimalPortfolio user={user} />;
            case "parallax":
                return <ParallaxPortfolio user={user} />;
            case "retro":
                return <RetroPortfolio user={user} />;
            case "magazine":
                return <MagazinePortfolio user={user} />;
            case "corporate":
                return <CorporatePortfolio user={user} />;
            case "chaos":
                return <ChaosPortfolio user={user} />;
            case "horizontal":
                return <HorizontalPortfolio user={user} />;
            default:
                return <div className="p-20 text-center">Template "{slug}" not found. <Link href="/templates" className="text-blue-500 underline">Back to Gallery</Link></div>;
        }
    };

    return (
        <div>
            {/* Floating Back Button */}
            <Link href="/templates" className="fixed top-4 left-4 z-50 p-2 bg-white/80 dark:bg-black/80 rounded-full shadow-lg backdrop-blur hover:scale-105 transition">
                <ArrowLeft size={20} />
            </Link>

            {renderTemplate()}
        </div>
    );
}
