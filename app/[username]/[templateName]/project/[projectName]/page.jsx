
import React from 'react';
import { notFound } from 'next/navigation';
import connectDB from "@/lib/db";
import User from "@/models/User";
import Project from '@/models/Project';

// Placeholder for template-specific project views
// In a real scenario, these would be separate components imported from the templates folder
import ChaosProjectDetail from '@/components/templates/chaos/ChaosProjectDetail';
import ModernProjectDetail from '@/components/templates/modern/ModernProjectDetail';
import BentoProjectDetail from '@/components/templates/bento/BentoProjectDetail';
import MinimalProjectDetail from '@/components/templates/minimal/MinimalProjectDetail';
import ClassicProjectDetail from '@/components/templates/original/ClassicProjectDetail'; // Folder is 'original'
import ParallaxProjectDetail from '@/components/templates/parallax/ParallaxProjectDetail';
import CorporateProjectDetail from '@/components/templates/corporate/CorporateProjectDetail';
import MagazineProjectDetail from '@/components/templates/magazine/MagazineProjectDetail';
import RetroProjectDetail from '@/components/templates/retro/RetroProjectDetail';
import HorizontalProjectDetail from '@/components/templates/horizontal/HorizontalProjectDetail';

export async function generateMetadata({ params }) {
    const { username, projectName } = await params;
    const decodedProjectName = decodeURIComponent(projectName);
    return {
        title: `${decodedProjectName} | ${decodeURIComponent(username)}`,
    };
}

export default async function TemplateProjectPage({ params }) {
    const { username, templateName, projectName } = await params;
    const decodedUsername = decodeURIComponent(username);
    const decodedProjectName = decodeURIComponent(projectName);

    await connectDB();

    const userDoc = await User.findOne({ username: decodedUsername }).lean();
    const projectDoc = await Project.findOne({
        title: { $regex: new RegExp(`^${decodedProjectName}$`, 'i') }
    }).lean();

    if (!userDoc || !projectDoc) {
        notFound();
    }

    const user = JSON.parse(JSON.stringify(userDoc));
    const project = JSON.parse(JSON.stringify(projectDoc));

    // Pass user and project data to the specific template component
    // We can either have specific components or a generic one that takes style props
    // For now, let's implement a switch case to render the correct view

    switch (templateName.toLowerCase()) {
        case 'chaos':
            return <ChaosProjectDetail user={user} project={project} />;
        case 'modern':
        case 'modern-portfolio': // Alias handling
            return <ModernProjectDetail user={user} project={project} />;
        case 'bento':
            return <BentoProjectDetail user={user} project={project} />;
        case 'minimal':
            return <MinimalProjectDetail user={user} project={project} />;
        case 'classic':
        case 'original':
            return <ClassicProjectDetail user={user} project={project} />;
        case 'parallax':
            return <ParallaxProjectDetail user={user} project={project} />;
        case 'corporate':
            return <CorporateProjectDetail user={user} project={project} />;
        case 'magazine':
            return <MagazineProjectDetail user={user} project={project} />;
        case 'retro':
            return <RetroProjectDetail user={user} project={project} />;
        case 'horizontal':
            return <HorizontalProjectDetail user={user} project={project} />;
        default:
            // Fallback to a generic view or specific default
            return <div className="p-10">Template Project View Not Implemented for {templateName}</div>;
    }
}
