"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, School, Book, Calendar } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const EducationSkeleton = () => (
  <div className="relative pl-8 md:pl-12">
    <div className="absolute -left-[22px] top-0 w-11 h-11 rounded-full border-4 border-white dark:border-gray-900 bg-gray-200 dark:bg-gray-800 animate-pulse shadow-sm"></div>

    <div className="bg-white dark:bg-black p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="animate-pulse space-y-4">
        <div className="flex flex-col md:flex-row md:justify-between gap-4">
          <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4 md:w-1/2"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-full w-24"></div>
        </div>

        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/3"></div>

        <div className="space-y-2 pt-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-4/6"></div>
        </div>
      </div>
    </div>
  </div>
);

const iconMap = {
  GraduationCap: <GraduationCap size={24} className="text-white" />,
  School: <School size={24} className="text-white" />,
  Certificate: <Book size={24} className="text-white" />,
  Book: <Book size={24} className="text-white" />,
  Default: <GraduationCap size={24} className="text-white" />
};

export default function Education() {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const [educationData, setEducationData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/education");
        const data = await res.json();

        if (data.success) {
          // --- SORTING LOGIC STARTED ---
          const sortedData = data.data.sort((a, b) => {
            // Helper function to convert year string to a number
            const getYearValue = (yearStr) => {
              if (!yearStr) return 0;
              const str = yearStr.toLowerCase();
              // If it says "Present", "Current", or "Ongoing", give it a huge number
              if (str.includes("present") || str.includes("current") || str.includes("now")) {
                return 9999;
              }
              // Otherwise, extract the number (e.g. "2023" -> 2023)
              return parseInt(str.replace(/\D/g, '')) || 0;
            };

            const yearA = getYearValue(a.endYear);
            const yearB = getYearValue(b.endYear);

            // Sort Descending (Highest year first)
            return yearB - yearA;
          });
          // --- SORTING LOGIC ENDED ---

          setEducationData(sortedData);
        }
      } catch (error) {
        console.error("Error fetching education:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useGSAP(() => {
    if (loading || educationData.length === 0) return;

    // Timeline Line Animation
    if (lineRef.current) {
      gsap.fromTo(lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            end: "bottom 80%",
            scrub: 1,
          }
        }
      );
    }

    const items = gsap.utils.toArray(".edu-item");

    items.forEach((item) => {
      gsap.fromTo(item,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "elastic.out(1, 0.75)",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

  }, { scope: containerRef, dependencies: [loading, educationData] });

  return (
    <section ref={containerRef} className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Education
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            My academic journey and milestones.
          </p>
        </div>

        <div className="relative ml-4 md:ml-10 space-y-12">
          {/* Timeline Line */}
          {!loading && (
            <div
              ref={lineRef}
              className="absolute left-0 top-0 bottom-0 w-1 bg-gray-200 dark:bg-gray-800 origin-top"
            ></div>
          )}

          {loading ? (
            <>
              <EducationSkeleton />
              <EducationSkeleton />
              <EducationSkeleton />
            </>
          ) : (
            educationData.map((item) => (
              <div key={item._id} className="edu-item relative pl-8 md:pl-12 opacity-0">
                <div className={`absolute -left-[22px] top-0 flex items-center justify-center w-11 h-11 rounded-full border-4 border-white dark:border-gray-900 shadow-lg ${item.color} z-10`}>
                  {iconMap[item.iconType] || iconMap.Default}
                </div>

                <div className="bg-white dark:bg-black p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow hover:scale-[1.02] duration-300">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {item.degree}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1 md:mt-0 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full w-fit">
                      <Calendar size={14} />
                      <span>{item.startYear} - {item.endYear}</span>
                    </div>
                  </div>

                  <h4 className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                    {item.institution}
                  </h4>

                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}