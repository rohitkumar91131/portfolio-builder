import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import { ThemeToggle } from "@/components/ThemeToggle"; // Optional: if we want theme toggle here too, or rely on layout
// Note: ThemeToggle is usually in a fixed navbar or layout. The original page didn't have it explicitly as it might have been in layout or Hero?
// Actually original app/page.js didn't import ThemeToggle, so I'll stick to the original imports.

export default function DemoPage() {
    return (
        <main className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
            {/* We might want a back button overlaid or just let them explore */}
            <div className="fixed top-4 right-4 z-50">
                {/* If ThemeToggle was global, good. If not, we might need it. 
                 But based on previous file reads, ThemeToggle was a component. 
                 I'll add a simple 'Back to Home' link for context if needed, but for now just the portfolio. */}
            </div>
            <Hero />
            <Projects />
            <Education />
            <Contact />
        </main>
    );
}
