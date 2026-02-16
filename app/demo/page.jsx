"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import { useSession } from "next-auth/react";

export default function DemoPage() {
    const { data: session } = useSession();
    const [data, setData] = useState({ projects: [], education: [], experience: [], user: null });
    const [loading, setLoading] = useState(true);

    const DEMO_USER = "rk34190100";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [projRes, eduRes, expRes, userRes] = await Promise.all([
                    fetch(`/api/projects?username=${DEMO_USER}`),
                    fetch(`/api/education?username=${DEMO_USER}`),
                    fetch(`/api/experience?username=${DEMO_USER}`),
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
                console.error("Failed to fetch demo data", e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="h-screen flex items-center justify-center">Loading Demo...</div>;

    const displayUser = session?.user || data.user;

    // Fallback if no user found even via public API
    if (!displayUser) return <div className="h-screen flex items-center justify-center">Demo User Not Found</div>;

    return (
        <main className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
            <Hero user={displayUser} />
            <Projects projects={data.projects} />
            <Education education={data.education} />
            <Contact user={displayUser} />
        </main>
    );
}
