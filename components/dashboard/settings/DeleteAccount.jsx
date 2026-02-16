"use client";

import { useState, useEffect } from "react";
import { Trash2, AlertTriangle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { signOut } from "next-auth/react";

export default function DeleteAccount() {
    const [isOpen, setIsOpen] = useState(false);
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [timer, setTimer] = useState(0); // in seconds

    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    const handleRequestOTP = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/auth/delete-account/request-otp", {
                method: "POST",
            });

            if (res.ok) {
                toast.success("Verification code sent to your email");
                setIsOpen(true);
                setTimer(180); // 3 minutes
                setOtp("");
            } else {
                const data = await res.json();
                toast.error(data.error || "Failed to send code");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyAndDelete = async () => {
        if (!otp || otp.length < 6) {
            toast.error("Please enter a valid 6-digit code");
            return;
        }

        setVerifying(true);
        try {
            const res = await fetch("/api/auth/delete-account/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ otp }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Account deleted successfully");
                setIsOpen(false);
                // Sign out and redirect to home
                signOut({ callbackUrl: "/" });
            } else {
                toast.error(data.error || "Failed to verify code");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setVerifying(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-red-100 dark:border-red-900/20 shadow-sm">
            <h2 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h2>

            <div className="flex items-center justify-between">
                <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                        Delete Account
                    </h3>
                    <p className="text-sm text-gray-500">
                        Permanently remove your account and all data.
                    </p>
                </div>
                <button
                    onClick={handleRequestOTP}
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 border border-red-100 rounded-lg hover:bg-red-100 transition disabled:opacity-50"
                >
                    {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <Trash2 size={18} />
                    )}
                    Delete Account
                </button>
            </div>

            {/* OTP Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800 animate-in fade-in zoom-in duration-200">
                        <div className="p-6">
                            <div className="flex items-center gap-3 text-red-600 mb-4">
                                <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-full">
                                    <AlertTriangle size={24} />
                                </div>
                                <h3 className="text-xl font-bold">Confirm Deletion</h3>
                            </div>

                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                This action cannot be undone. All your projects, education, and
                                experience data will be permanently lost.
                                <br />
                                <br />
                                Enter the 6-digit verification code sent to your email to
                                confirm.
                            </p>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Verification Code
                                    </label>
                                    <input
                                        type="text"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                                        placeholder="000000"
                                        className="w-full px-4 py-3 text-center text-2xl tracking-[0.5em] font-mono border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                    />
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">
                                        Expires in: <span className="font-medium text-gray-900 dark:text-white">{formatTime(timer)}</span>
                                    </span>
                                    <button
                                        onClick={handleRequestOTP}
                                        disabled={timer > 0 || loading}
                                        className="text-blue-600 hover:text-blue-700 disabled:text-gray-400 disabled:cursor-not-allowed font-medium"
                                    >
                                        Resend Code
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 flex justify-end gap-3 border-t border-gray-100 dark:border-gray-800">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-2 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleVerifyAndDelete}
                                disabled={verifying || otp.length !== 6}
                                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition shadow-lg shadow-red-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {verifying ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" /> Deleting...
                                    </>
                                ) : (
                                    "Verify & Delete Forever"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
