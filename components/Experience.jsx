"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, Calendar, MapPin } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const ExperienceSkeleton = () => (
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

export default function Experience({ experience }) {
    const containerRef = useRef(null);
    const lineRef = useRef(null);
    const [internalData, setInternalData] = useState([]);
    const [loading, setLoading] = useState(!experience);

    // If props are passed, use them. Otherwise fetch.
    const dataToUse = experience || internalData;

    useEffect(() => {
        if (experience) return;

        const fetchData = async () => {
            try {
                const res = await fetch("/api/experience");
                const data = await res.json();
                if (data.success) {
                    // Sort by startDate descending
                    const sorted = data.data.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
                    setInternalData(sorted);
                }
            } catch (error) {
                console.error("Error fetching experience:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [experience]);

    useGSAP(() => {
        if (loading || dataToUse.length === 0) return;

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

        const items = gsap.utils.toArray(".exp-item");
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
    }, { scope: containerRef, dependencies: [loading, dataToUse] });

    return (
        <section ref={containerRef} className="py-20 px-4 bg-gray-50/50 dark:bg-gray-900/50">
            <div className="max-w-4xl mx-auto">
                <div className="mb-16 text-center">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Experience
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        My professional career path.
                    </p>
                </div>

                <div className="relative ml-4 md:ml-10 space-y-12">
                    {!loading && (
                        <div
                            ref={lineRef}
                            className="absolute left-0 top-0 bottom-0 w-1 bg-gray-200 dark:bg-gray-800 origin-top"
                        ></div>
                    )}

                    {loading ? (
                        <>
                            <ExperienceSkeleton />
                            <ExperienceSkeleton />
                            <ExperienceSkeleton />
                        </>
                    ) : (
                        dataToUse.map((item) => (
                            <div key={item._id} className="exp-item relative pl-8 md:pl-12 opacity-0">
                                <div className="absolute -left-[22px] top-0 flex items-center justify-center w-11 h-11 rounded-full border-4 border-white dark:border-gray-900 bg-blue-600 text-white shadow-lg z-10">
                                    <Briefcase size={20} />
                                </div>

                                <div className="bg-white dark:bg-black p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow hover:scale-[1.02] duration-300">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                            {item.position}
                                        </h3>
                                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1 md:mt-0 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full w-fit">
                                            <Calendar size={14} />
                                            <span>
                                                {new Date(item.startDate).getFullYear()} -
                                                {item.current ? "Present" : new Date(item.endDate).getFullYear()}
                                            </span>
                                        </div>
                                    </div>

                                    <h4 className="text-blue-600 dark:text-blue-400 font-medium mb-1">
                                        {item.company}
                                    </h4>

                                    {item.location && (
                                        <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
                                            <MapPin size={14} />
                                            {item.location}
                                        </div>
                                    )}

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
