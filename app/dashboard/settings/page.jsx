"use client";

import { Download, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import DeleteAccount from "@/components/dashboard/settings/DeleteAccount";

export default function SettingsPage() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [exporting, setExporting] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleExport = async () => {
        setExporting(true);
        try {
            const res = await fetch("/api/user/profile");
            const data = await res.json();

            if (data.success && data.data) {
                const jsonString = JSON.stringify(data.data, null, 2);
                const blob = new Blob([jsonString], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = `portfolio-data-${new Date().toISOString().split('T')[0]}.json`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                toast.success("Data exported successfully");
            } else {
                toast.error("Failed to fetch data for export");
            }
        } catch (error) {
            console.error("Export error:", error);
            toast.error("An error occurred during export");
        } finally {
            setExporting(false);
        }
    };

    if (!mounted) return null;

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
                            <button
                                onClick={handleExport}
                                disabled={exporting}
                                className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition disabled:opacity-50"
                            >
                                <Download size={18} />
                                {exporting ? "Exporting..." : "Export JSON"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Danger Zone */}
                <DeleteAccount />

            </div>
        </div>
    );
}
