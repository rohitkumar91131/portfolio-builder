"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "../ThemeToggle";
import AuthButtons from "../auth/AuthButtons";

export default function Navbar() {
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const linksRef = useRef([]);
  const [isOpen, setIsOpen] = useState(false);

  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
      delay: 0.2,
    });
  }, { scope: navRef });

  useGSAP(() => {
    if (isOpen) {
      gsap.to(menuRef.current, {
        x: 0,
        duration: 0.6,
        ease: "power4.out",
      });
      gsap.fromTo(
        linksRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.2,
        }
      );
    } else {
      gsap.to(menuRef.current, {
        x: "100%",
        duration: 0.6,
        ease: "power4.in",
      });
    }
  }, { dependencies: [isOpen], scope: menuRef });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Templates", href: "/templates" },
    { name: "Demo", href: "/demo" },
    { name: "Features", href: "/#features" },
  ];

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-white/70 dark:bg-black/70 border-b border-gray-200 dark:border-gray-800"
    >
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            P
          </div>
          <span className="text-xl font-bold tracking-tight">Portfolio</span>
        </Link>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600 dark:text-gray-400">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <div className="hidden md:block">
          <AuthButtons />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-600 dark:text-gray-400"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        ref={menuRef}
        className="fixed inset-0 top-[65px] bg-white dark:bg-black z-40 md:hidden translate-x-full border-l border-gray-200 dark:border-gray-800"
      >
        <div className="flex flex-col p-8 gap-6">
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              href={link.href}
              ref={(el) => (linksRef.current[index] = el)}
              className="text-2xl font-semibold text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div
            ref={(el) => (linksRef.current[navLinks.length] = el)}
            className="pt-4 border-t border-gray-100 dark:border-gray-900"
          >
            <AuthButtons />
          </div>
        </div>
      </div>
    </nav>
  );
}
