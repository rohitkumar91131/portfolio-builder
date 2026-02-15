import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LandingHero from "@/components/landing/LandingHero";
import Features from "@/components/landing/Features";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black selection:bg-blue-500/30">
      <Navbar />
      <LandingHero />
      <Features />
      <Footer />
    </main>
  );
}