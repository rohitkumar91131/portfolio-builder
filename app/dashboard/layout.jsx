"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2, Sparkles } from "lucide-react";

export default function DashboardLayout({ children }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth/signin");
        }
    }, [status, router]);

    // if (status === "loading") {
    //     return (
    //         <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black">
    //             <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
    //         </div>
    //     );
    // }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black">
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 w-full z-40 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                        P
                    </div>
                    <span className="text-xl font-bold tracking-tight flex items-center gap-1">
                        Portfolio
                        <Sparkles className="w-4 h-4 text-yellow-500" />
                    </span>
                </div>
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} user={session?.user} isLoading={status === "loading"} />

            <main className="lg:pl-64 pt-20 min-h-screen transition-all duration-300">
                <div className="container mx-auto px-4 lg:px-8 py-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
