"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Download, LoaderIcon, ChevronDown } from "lucide-react"; 
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

// 1. Import the PDF generator and your new Document
import { pdf } from "@react-pdf/renderer";
import { ResumeDocument } from "./ResumeDocument";

const Hero = () => {
  const containerRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useGSAP(() => {
    gsap.from(".hero-animate", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out"
    });
  }, { scope: containerRef });

  // 2. The Logic to Build and Download
  const handleGenerateCV = async (e) => {
    e.preventDefault(); // Stop default link behavior
    setIsDownloading(true);

    try {
      // A. Fetch Data from your existing APIs
      const [eduRes, projRes] = await Promise.all([
        fetch("/api/education"),
        fetch("/api/projects")
      ]);

      const eduData = await eduRes.json();
      const projData = await projRes.json();

      if (!eduData.success || !projData.success) throw new Error("Failed to fetch data");

      // B. Sort Education (Current first logic)
      const sortedEdu = eduData.data.sort((a, b) => {
        const getYearValue = (yearStr) => {
          if (!yearStr) return 0;
          const str = yearStr.toLowerCase();
          if (str.includes("present") || str.includes("current")) return 9999; 
          return parseInt(str.replace(/\D/g, '')) || 0;
        };
        return getYearValue(b.endYear) - getYearValue(a.endYear);
      });

      // C. Generate PDF Blob
      const blob = await pdf(
        <ResumeDocument education={sortedEdu} projects={projData.data} />
      ).toBlob();

      // D. Force Download in Browser
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = "Rohit_Kumar_CV.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (error) {
      console.error("Error generating CV:", error);
      alert("Could not generate CV at this time.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section 
      ref={containerRef} 
      className="relative flex flex-col items-center justify-center h-screen px-4 text-center transition-colors duration-300"
    >
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <h1 className="hero-animate text-5xl md:text-7xl font-bold mb-6">
        Hi, I’m <span className="text-blue-600 dark:text-blue-500">Rohit Kumar</span>
      </h1>

      <p className="hero-animate text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl">
        I build modern, scalable web apps with <span className="font-semibold text-black dark:text-white">React, Next.js, Node.js & WebRTC</span>.
      </p>

      <div className="hero-animate flex flex-wrap justify-center gap-4">
        <Link 
          href="#projects"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          View My Work
        </Link>
        
        <Link 
          href="#contact"
          className="px-6 py-3 border border-gray-300 text-gray-700 hover:border-black hover:text-black dark:border-gray-500 dark:text-gray-300 dark:hover:border-white dark:hover:text-white rounded-lg font-medium transition-colors"
        >
          Contact Me
        </Link>

        {/* 3. Attach the new handler */}
        <button 
          onClick={handleGenerateCV}
          disabled={isDownloading}
          className={`flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white rounded-lg font-medium transition-colors ${isDownloading ? 'cursor-wait opacity-80' : ''}`}
        >
          {isDownloading ? (
            <LoaderIcon size={20} className="animate-spin" />
          ) : (
            <Download size={20} />
          )}
          <span>{isDownloading ? "Building CV..." : "Download CV"}</span>
        </button>
      </div>

      <div className="hero-animate absolute bottom-8 flex flex-col items-center gap-2">
        <span className="text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide">Scroll Down</span>
        <ChevronDown size={24} className="text-gray-500 dark:text-gray-400 animate-bounce" />
      </div>
    </section>
  );
};

export default Hero;