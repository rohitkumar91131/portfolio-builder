"use client";

import { signIn } from "next-auth/react";
import { Github, Mail } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function SignIn() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".signin-card", {
                y: 20,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black relative overflow-hidden px-4">
            {/* Background Gradients */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]" />
            </div>

            <div className="signin-card w-full max-w-md bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200 dark:border-gray-800 p-8 rounded-3xl shadow-2xl relative z-10">
                <div className="text-center mb-8">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                        P
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back</h1>
                    <p className="text-gray-500 dark:text-gray-400">Sign in to manage your portfolio</p>
                </div>

                <div className="space-y-4">
                    {/* Error Handling */}
                    {typeof window !== "undefined" && new URLSearchParams(window.location.search).get("error") === "OAuthAccountNotLinked" && (
                        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-600 dark:text-red-400 mb-4">
                            <p className="font-semibold mb-2">Account Linking Error</p>
                            <p className="mb-4">
                                This email is already associated with another account (likely created via seed data or email/password).
                                For security, NextAuth prevents automatic merging.
                            </p>
                            <div className="space-y-2">
                                <p className="font-medium text-xs uppercase tracking-wider opacity-70">Development Fix:</p>
                                <button
                                    onClick={async () => {
                                        const email = prompt("Enter your email to reset the conflicting account:");
                                        if (!email) return;
                                        try {
                                            const res = await fetch(`/api/auth/reset?email=${email}`);
                                            const data = await res.json();
                                            if (res.ok) {
                                                alert(data.message);
                                                window.location.href = "/auth/signin";
                                            } else {
                                                alert(data.error || "Failed to reset");
                                            }
                                        } catch (e) {
                                            alert("Error resetting account");
                                        }
                                    }}
                                    className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold transition-colors"
                                >
                                    Reset/Delete Conflicting Account
                                </button>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                        className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-750 transition-all hover:scale-[1.02]"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Continue with Google
                    </button>

                    <button
                        onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
                        className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-[#24292F] text-white rounded-xl font-medium hover:bg-[#24292F]/90 transition-all hover:scale-[1.02]"
                    >
                        <Github className="w-5 h-5" />
                        Continue with GitHub
                    </button>
                </div>

                <div className="mt-8 text-center">
                    <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-300 transition-colors">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
