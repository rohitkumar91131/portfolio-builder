"use client";

import { useRef, useLayoutEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";
import { ArrowRight, Code, Sparkles } from "lucide-react";

export default function LandingHero() {
  const containerRef = useRef(null);
  const title1Ref = useRef(null);
  const title2Ref = useRef(null);
  const subRef = useRef(null);
  const btnRef = useRef(null);
  const visualRef = useRef(null);

  const { data: session } = useSession();
  const router = useRouter();

  const handleBuildPortfolio = () => {
    if (session) {
      router.push("/dashboard");
    } else {
      signIn(undefined, { callbackUrl: "/dashboard" });
    }
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // ... existing animation code ...
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gray-50 dark:bg-black"
    >
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
        {/* Text Content */}
        <div className="text-center lg:text-left">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
            <span ref={title1Ref} className="block text-gray-900 dark:text-white">
              Craft Your
            </span>
            <span
              ref={title2Ref}
              className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              Developer Identity.
            </span>
          </h1>
          <p
            ref={subRef}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed"
          >
            The ultimate portfolio builder for developers. Create a stunning, high-performance portfolio in minutes. No coding required—unless you want to.
          </p>
          <div ref={btnRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              onClick={handleBuildPortfolio}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 transform hover:-translate-y-1"
            >
              Build My Portfolio <ArrowRight size={20} />
            </button>
            <Link
              href="/demo"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 rounded-full font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              View Demo
            </Link>
          </div>
        </div>

        {/* Visual Content */}
        <div ref={visualRef} className="relative hidden lg:block h-[600px] w-full">
          <div className="absolute inset-0 bg-gradient-to-tr from-gray-100 to-white dark:from-gray-900 dark:to-black rounded-3xl border border-gray-200 dark:border-gray-800 shadow-2xl p-6 overflow-hidden transform rotate-3 hover:rotate-0 transition duration-700">
            {/* Mockup Header */}
            <div className="flex items-center gap-2 mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="h-2 w-32 bg-gray-200 dark:bg-gray-800 rounded-full ml-4" />
            </div>

            {/* Mockup Body */}
            <div className="space-y-4">
              <div className="h-8 w-2/3 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
              <div className="h-4 w-full bg-gray-100 dark:bg-gray-800/50 rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-gray-100 dark:bg-gray-800/50 rounded animate-pulse" />

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="h-32 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/30 p-4">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-lg mb-2" />
                  <div className="h-4 w-20 bg-blue-200 dark:bg-blue-900/50 rounded" />
                </div>
                <div className="h-32 bg-purple-50 dark:bg-purple-900/10 rounded-xl border border-purple-100 dark:border-purple-900/30 p-4">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-800 rounded-lg mb-2" />
                  <div className="h-4 w-20 bg-purple-200 dark:bg-purple-900/50 rounded" />
                </div>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-10 -left-8 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl floating-icon">
            <Code className="text-blue-500" size={32} />
          </div>
          <div className="absolute bottom-20 -right-8 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl floating-icon" style={{ animationDelay: "1s" }}>
            <Sparkles className="text-yellow-500" size={32} />
          </div>
        </div>
      </div>
    </section>
  );
}
