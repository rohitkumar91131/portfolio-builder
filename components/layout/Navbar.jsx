"use client";

import { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import ThemeToggle from "../ThemeToggle";
import AuthButtons from "../auth/AuthButtons";

export default function Navbar() {
  const navRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        delay: 0.2,
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-white/70 dark:bg-black/70 border-b border-gray-200 dark:border-gray-800"
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
          P
        </div>
        <span className="text-xl font-bold tracking-tight">Portfolio</span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600 dark:text-gray-400">
        <Link href="/templates" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          Templates
        </Link>
        <Link href="/demo" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          Demo
        </Link>
        <Link href="/#features" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          Features
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <AuthButtons />
      </div>
    </nav>
  );
}
