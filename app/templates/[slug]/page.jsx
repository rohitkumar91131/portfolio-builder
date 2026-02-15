"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// Import Template Components
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Contact from "@/components/Contact";

// Placeholder imports for new templates (we will create these next)
import ModernPortfolio from "@/components/templates/modern/ModernPortfolio";
// import BentoPortfolio from "@/components/templates/bento/BentoPortfolio";

export default function DynamicTemplate() {
    const { slug } = useParams();
    const [data, setData] = useState({ projects: [], education: [] });
    const [loading, setLoading] = useState(true);

    // Fetch Data Once for All Templates
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [projRes, eduRes] = await Promise.all([
                    fetch("/api/projects"),
                    fetch("/api/education")
                ]);
                const projData = await projRes.json();
                const eduData = await eduRes.json();

                setData({
                    projects: projData.success ? projData.data : [],
                    education: eduData.success ? eduData.data : []
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

    // Render Logic
    const renderTemplate = () => {
        switch (slug) {
            case "classic":
                return (
                    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
                        {/* Classic reuses the root components which fetch their own data usually, 
                         but checking components/Hero.jsx: it's static/hardcoded or fetches? 
                         Let's check. If they fetch themselves, we don't need to pass data.
                         If they are static, we might need to update them to accept props.
                         
                         For now, Classic uses the existing components as-is.
                      */}
                        <Hero />
                        <Projects />
                        <Education />
                        <Contact />
                    </div>
                );
            case "modern":
                return <ModernPortfolio projects={data.projects} education={data.education} />;
            case "bento":
                return <div className="p-20 text-center text-4xl font-bold">Bento Template Coming Soon</div>;
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
