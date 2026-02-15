import { notFound } from "next/navigation";
import connectDB from "@/lib/db";
import User from "@/models/User";
import Project from "@/models/Project";
import Education from "@/models/Education";
import Experience from "@/models/Experience";
import ClassicPortfolio from "@/components/templates/original/ClassicPortfolio";
import ModernPortfolio from "@/components/templates/modern/ModernPortfolio";
import BentoPortfolio from "@/components/templates/bento/BentoPortfolio";
import MinimalPortfolio from "@/components/templates/minimal/MinimalPortfolio";




export async function generateMetadata({ params }) {
    const { username } = await params;
    const decodedUsername = decodeURIComponent(username);
    await connectDB();
    const user = await User.findOne({ username: decodedUsername });

    if (!user) {
        return {
            title: "User Not Found",
        };
    }

    return {
        title: `${user.name} | Portfolio`,
        description: user.bio,
    };
}

export default async function PublicPortfolio({ params }) {
    const { username } = await params;
    const decodedUsername = decodeURIComponent(username);

    await connectDB();

    // Fetch User and populate data
    // Note: We need to populate the virtuals or just fetch separate queries
    // Since our models use IDs in User array, we can use populate
    const userDoc = await User.findOne({ username: decodedUsername })
        .populate("projects")
        .populate("education")
        .populate("experience")
        .lean();

    if (!userDoc) {
        notFound();
    }

    // Serialize generic objects (dates, ObjectIds) to common types
    const user = JSON.parse(JSON.stringify(userDoc));

    const { template } = user;

    // Template Mapping
    switch (template) {
        case "modern":
            return <ModernPortfolio user={user} />;
        case "bento":
            return <BentoPortfolio user={user} />;
        case "minimal":
            return <MinimalPortfolio user={user} />;
        case "classic":
        default:
            return <ClassicPortfolio user={user} />;
    }
}
