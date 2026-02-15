"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function AuthButtons() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <Loader2 className="w-5 h-5 animate-spin text-gray-400" />;
    }

    if (session) {
        return (
            <div className="flex items-center gap-4">
                {session.user.image && (
                    <img src={session.user.image} alt="User" className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700" />
                )}
                <button
                    onClick={() => signOut()}
                    className="text-sm font-medium text-red-600 hover:text-red-700"
                >
                    Sign Out
                </button>
                <Link
                    href="/dashboard"
                    className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
                >
                    Dashboard
                </Link>
            </div>
        );
    }

    return (
        <button
            onClick={() => signIn()}
            className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
        >
            Sign In
        </button>
    );
}
