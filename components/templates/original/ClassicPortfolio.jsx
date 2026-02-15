"use client";

import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import EducationComponent from "@/components/Education";
import ExperienceComponent from "@/components/Experience";
import Contact from "@/components/Contact";

export default function ClassicPortfolio({ user }) {
    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
            <Hero user={user} />
            <Projects projects={user.projects} />
            <ExperienceComponent experience={user.experience} />
            <EducationComponent education={user.education} />
            <Contact user={user} />
        </div>
    );
}
