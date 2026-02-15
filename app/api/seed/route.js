import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import Project from "@/models/Project";
import Education from "@/models/Education";
import Experience from "@/models/Experience";

export async function GET() {
    try {
        await connectDB();

        const email = "rk34190100@gmail.com";

        // 1. Find or Create User
        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                email,
                name: "Rohit Kumar",
                image: "https://github.com/shadcn.png", // Placeholder or from Google
            });
        }

        // 2. Update Profile with Demo Data
        // username should be email prefix if not set, or we force it here for the demo user
        user.username = email.split('@')[0];
        user.name = "Rohit Kumar";
        user.bio = "I am a Full Stack Developer passionate about building accessible, pixel-perfect, and performant web experiences. With a strong foundation in React, Next.js, and Node.js, I love solving complex problems and creating intuitive user interfaces. When I'm not coding, you can find me exploring new technologies or contributing to open source.";
        user.resume = "https://example.com/resume.pdf";
        user.socialLinks = {
            github: "https://github.com/rohitkumar",
            linkedin: "https://linkedin.com/in/rohitkumar",
            twitter: "https://twitter.com/rohitkumar",
            website: "https://rohitkumar.dev",
            instagram: "https://instagram.com/rohitkumar"
        };
        user.template = "modern";
        await user.save();

        // 3. Clear existing relations to avoid duplicates
        await Project.deleteMany({ user: user._id });
        await Education.deleteMany({ user: user._id });
        await Experience.deleteMany({ user: user._id });

        // Clear references in user array
        user.projects = [];
        user.education = [];
        user.experience = [];
        await user.save();

        // 4. Create Projects
        const projectsData = [
            {
                title: "Nexus E-Commerce",
                description: "A headless e-commerce storefront built with Next.js 14 and Shopify. Features include ISR, optimistic UI updates, and a custom checkout flow integration.",
                tech: ["Next.js", "Shopify API", "Tailwind CSS", "Zustand"],
                iconName: "Layout",
                color: "bg-blue-50 dark:bg-blue-900/10",
                githubLink: "https://github.com/rohitkumar/nexus",
                liveLink: "https://nexus-store.demo"
            },
            {
                title: "StreamSync",
                description: "Real-time video conferencing application allowing users to create rooms, screen share, and chat. Built using WebRTC mesh architecture for low latency.",
                tech: ["React", "WebRTC", "Socket.io", "Node.js"],
                iconName: "Video",
                color: "bg-purple-50 dark:bg-purple-900/10",
                githubLink: "https://github.com/rohitkumar/streamsync",
                liveLink: "https://streamsync.app"
            },
            {
                title: "DevMind AI",
                description: "An AI-powered developer productivity tool that analyzes code complexity and suggests refactoring improvements using a custom LLM provider.",
                tech: ["Python", "FastAPI", "OpenAI", "React"],
                iconName: "Code",
                color: "bg-green-50 dark:bg-green-900/10",
                githubLink: "https://github.com/rohitkumar/devmind",
                liveLink: "https://devmind.ai"
            },
            {
                title: "CloudMonitor",
                description: "Infrastructure monitoring dashboard visualizing metrics from AWS CloudWatch. Features customizable alerts and historical data analysis.",
                tech: ["Vue.js", "D3.js", "AWS SDK", "Serverless"],
                iconName: "Terminal",
                color: "bg-orange-50 dark:bg-orange-900/10",
                githubLink: "https://github.com/rohitkumar/cloudmonitor",
                liveLink: "https://cloudmonitor.io"
            },
            {
                title: "Portfolio Generator",
                description: "A SaaS platform allowing developers to create stunning portfolios in minutes. Includes theme switching and content management.",
                tech: ["Next.js", "MongoDB", "Prisma", "Stripe"],
                iconName: "Layout",
                color: "bg-pink-50 dark:bg-pink-900/10",
                githubLink: "https://github.com/rohitkumar/portfolio-gen",
                liveLink: "https://portfoliogen.com"
            }
        ];

        const createdProjects = await Project.insertMany(
            projectsData.map(p => ({ ...p, user: user._id }))
        );

        // 5. Create Education
        const educationData = [
            {
                degree: "Master of Science in Computer Science",
                institution: "Stanford University",
                startYear: "2024",
                endYear: "2026",
                description: "Focusing on Distributed Systems and Machine Learning. Teaching Assistant for CS144: Introduction to Computer Networking.",
                iconType: "GraduationCap",
                color: "bg-emerald-600"
            },
            {
                degree: "Bachelor of Technology in Computer Science",
                institution: "Indian Institute of Technology (IIT)",
                startYear: "2020",
                endYear: "2024",
                description: "Graduated with Distinction (GPA 9.2/10). Led the university robotics team to nationals. Published research paper on Edge Computing.",
                iconType: "School",
                color: "bg-blue-600"
            }
        ];

        const createdEducation = await Education.insertMany(
            educationData.map(e => ({ ...e, user: user._id }))
        );

        // 6. Create Experience
        const experienceData = [
            {
                company: "Google",
                position: "Software Engineer Intern",
                location: "Bangalore, India",
                startDate: new Date("2023-05-01"),
                endDate: new Date("2023-08-01"),
                current: false,
                description: "Optimized the Google Pay transaction processing pipeline, reducing latency by 15% for over 1M daily transactions. Implemented end-to-end testing strategies using Java and JUnit."
            },
            {
                company: "Innovate Tech",
                position: "Full Stack Developer",
                location: "Remote",
                startDate: new Date("2022-01-01"),
                endDate: new Date("2023-04-01"),
                current: false,
                description: "Developed and maintained a high-traffic e-learning platform serving 50k+ users. Migrated legacy monolithic architecture to microservices using Node.js and Docker."
            },
            {
                company: "Open Source Collective",
                position: "Core Contributor",
                location: "Global",
                startDate: new Date("2021-06-01"),
                endDate: new Date("2021-12-01"),
                current: false,
                description: "Contributed to various JavaScript open source libraries. Fixed critical bugs in a popular React component library used by thousands of developers."
            }
        ];

        const createdExperience = await Experience.insertMany(
            experienceData.map(e => ({ ...e, user: user._id }))
        );

        // 7. Update User with IDs
        user.projects = createdProjects.map(p => p._id);
        user.education = createdEducation.map(e => e._id);
        user.experience = createdExperience.map(e => e._id);
        await user.save();

        return NextResponse.json({
            success: true,
            message: "Seeded comphrehensive data for rk34190100@gmail.com",
            data: {
                user: user.name,
                projects: createdProjects.length,
                education: createdEducation.length,
                experience: createdExperience.length
            }
        });

    } catch (error) {
        console.error("Seeding Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
