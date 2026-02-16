"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    User,
    Briefcase,
    GraduationCap,
    FolderGit2,
    Settings,
    LayoutTemplate,
    LogOut,
    Sparkles,
    Home
} from "lucide-react";

import { signOut } from "next-auth/react";

const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Profile", href: "/dashboard/profile", icon: User },
    { name: "Experience", href: "/dashboard/experience", icon: Briefcase },
    { name: "Education", href: "/dashboard/education", icon: GraduationCap },
    { name: "Projects", href: "/dashboard/projects", icon: FolderGit2 },
    { name: "Templates", href: "/dashboard/templates", icon: LayoutTemplate },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar({ isOpen, onClose, user, isLoading }) {
    const pathname = usePathname();

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar Container */}
            <aside className={`
        fixed left-0 top-0 h-screen w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 
        flex flex-col z-50 pt-20 transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
                <div className="flex-1 px-4 space-y-2 py-4">
                    <div className="lg:hidden flex justify-end mb-4 pr-2">
                        <button onClick={onClose} className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                            <span className="sr-only">Close sidebar</span>
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {isLoading ? (
                        <div className="mb-6 px-4 animate-pulse">
                            <div className="h-12 w-full bg-gray-200 dark:bg-gray-800 rounded-xl shadow-sm"></div>
                        </div>
                    ) : user?.email ? (
                        <div className="mb-6 px-4">
                            <Link
                                href={`/${user.username || user.email?.split('@')[0]}`}
                                target="_blank"
                                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center text-white font-bold text-sm">
                                        P
                                    </div>
                                    <span className="font-bold flex items-center gap-1">
                                        View Portfolio
                                        <Sparkles className="w-3 h-3 text-yellow-300" />
                                    </span>
                                </div>
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </Link>
                        </div>
                    ) : null}

                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => onClose?.()} // Close sidebar on navigation (mobile)
                                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors ${isActive
                                    ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                                    }`}
                            >
                                <Icon size={20} />
                                {item.name}
                            </Link>
                        );
                    })}
                </div>

                <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                    <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl w-full transition-colors"
                    >
                        <LogOut size={20} />
                        Sign Out
                    </button>
                </div>
            </aside>
        </>
    );
}
