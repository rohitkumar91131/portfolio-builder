"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { User, FileText, UploadCloud, Layout, ShieldCheck, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: <User size={28} />,
    title: "Profile Builder",
    desc: "Easily update your personal details, bio, and social links via our intuitive admin dashboard.",
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  },
  {
    icon: <Layout size={28} />,
    title: "Project Management",
    desc: "Showcase your best work. Add screenshots, tech stacks, and live links with a few clicks.",
    color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
  },
  {
    icon: <FileText size={28} />,
    title: "Education & Resume",
    desc: "Keep your career timeline up to date. Add education, certifications, and download your resume.",
    color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  },
  {
    icon: <UploadCloud size={28} />,
    title: "Instant Deployment",
    desc: "Changes reflect instantly. Your portfolio is always live and ready to impress recruiters.",
    color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
  },
  {
    icon: <ShieldCheck size={28} />,
    title: "Secure Admin Mode",
    desc: "Protected by OTP authentication. Only you can access the admin panel to make edits.",
    color: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
  },
  {
    icon: <Zap size={28} />,
    title: "Blazing Fast",
    desc: "Built on Next.js 14 and optimized for performance. Scores 100 on Lighthouse/PageSpeed.",
    color: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
  },
];

export default function Features() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, index) => {
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          delay: index * 0.1, // Stagger effect
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="features" className="py-24 bg-white dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Everything You Need to Shine
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            A complete toolkit to build, manage, and scale your personal developer brand without writing boilerplate code.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              ref={(el) => (cardRefs.current[i] = el)}
              className="p-8 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 hover:shadow-xl transition-shadow duration-300"
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${feature.color}`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
