
import { notFound } from "next/navigation";
import connectDB from "@/lib/db";
import User from "@/models/User";
import Project from "@/models/Project";
import Education from "@/models/Education";
import Experience from "@/models/Experience";

// Import all templates
import ClassicPortfolio from '@/components/templates/original/ClassicPortfolio';
import ModernPortfolio from '@/components/templates/modern/ModernPortfolio';
import BentoPortfolio from '@/components/templates/bento/BentoPortfolio';
import MinimalPortfolio from '@/components/templates/minimal/MinimalPortfolio';
import RetroPortfolio from '@/components/templates/retro/RetroPortfolio';
import ChaosPortfolio from '@/components/templates/chaos/ChaosPortfolio';
import CorporatePortfolio from '@/components/templates/corporate/CorporatePortfolio';
import HorizontalPortfolio from '@/components/templates/horizontal/HorizontalPortfolio';
import MagazinePortfolio from '@/components/templates/magazine/MagazinePortfolio';
import ParallaxPortfolio from '@/components/templates/parallax/ParallaxPortfolio';

export async function generateMetadata({ params }) {
    const { username, templateName } = await params;
    const decodedUsername = decodeURIComponent(username);
    await connectDB();
    const user = await User.findOne({ username: decodedUsername });

    if (!user) {
        return {
            title: "User Not Found",
        };
    }

    return {
        title: `Preview: ${templateName} | ${user.name}`,
        description: `Previewing ${user.name}'s portfolio in ${templateName} style.`,
    };
}

export default async function TemplatePreviewPage({ params }) {
    const { username, templateName } = await params;
    const decodedUsername = decodeURIComponent(username);

    await connectDB();

    // Fetch User and populate data (projects, education, experience)
    const userDoc = await User.findOne({ username: decodedUsername })
        .populate("projects")
        .populate("education")
        .populate("experience")
        .lean();

    if (!userDoc) {
        notFound();
    }

    // Process user data to be JSON serializable (remove _id objects if needed, handle dates)
    const user = JSON.parse(JSON.stringify(userDoc));

    // Render the requested template
    switch (templateName.toLowerCase()) {
        case 'classic':
        case 'original':
            return <ClassicPortfolio user={user} />;
        case 'modern':
            return <ModernPortfolio user={user} />;
        case 'bento':
            return <BentoPortfolio user={user} />;
        case 'minimal':
            return <MinimalPortfolio user={user} />;
        case 'retro':
            return <RetroPortfolio user={user} />;
        case 'chaos':
            return <ChaosPortfolio user={user} />;
        case 'corporate':
            return <CorporatePortfolio user={user} />;
        case 'horizontal':
            return <HorizontalPortfolio user={user} />;
        case 'magazine':
            return <MagazinePortfolio user={user} />;
        case 'parallax':
            return <ParallaxPortfolio user={user} />;
        default:
            return notFound();
    }
}
