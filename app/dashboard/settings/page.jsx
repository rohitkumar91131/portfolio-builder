"use client";

import { Trash2, Download, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function SettingsPage() {
    const { theme, setTheme } = useTheme();

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Manage your account preferences.</p>
            </div>

            <div className="space-y-6">

                {/* Appearance */}
                <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Appearance</h2>
                    <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Theme Preference</span>
                        <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
                            <button
                                onClick={() => setTheme("light")}
                                className={`p-2 rounded-md transition-all ${theme === 'light' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'}`}
                            >
                                <Sun size={20} />
                            </button>
                            <button
                                onClick={() => setTheme("dark")}
                                className={`p-2 rounded-md transition-all ${theme === 'dark' ? 'bg-gray-700 shadow-sm text-blue-400' : 'text-gray-500'}`}
                            >
                                <Moon size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Data Management */}
                <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Data Management</h2>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between py-2">
                            <div>
                                <h3 className="font-medium text-gray-900 dark:text-white">Export Data</h3>
                                <p className="text-sm text-gray-500">Download a copy of your portfolio data.</p>
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                                <Download size={18} />
                                Export JSON
                            </button>
                        </div>
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-red-100 dark:border-red-900/20 shadow-sm">
                    <h2 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h2>

                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">Delete Account</h3>
                            <p className="text-sm text-gray-500">Permanently remove your account and all data.</p>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 border border-red-100 rounded-lg hover:bg-red-100 transition">
                            <Trash2 size={18} />
                            Delete Account
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
