"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Key, Loader2, ArrowRight, ShieldCheck } from "lucide-react";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState(1); // 1: Email, 2: OTP
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setMessage("");

        try {
            const res = await fetch("/api/admin/otp/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();

            if (data.success) {
                setStep(2);
                setMessage("OTP sent to your email!");
            } else {
                setError(data.error || "Failed to send OTP");
            }
        } catch (err) {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/admin/otp/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp }),
            });
            const data = await res.json();

            if (data.success) {
                router.push("/admin/dashboard");
            } else {
                setError(data.error || "Invalid OTP");
            }
        } catch (err) {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black p-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-800">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
                        <ShieldCheck size={24} />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Access</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 text-center text-sm">
                        {step === 1 ? "Enter your admin email to verify identity." : "Enter the code sent to your email."}
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-lg flex items-center gap-2">
                        ⚠️ {error}
                    </div>
                )}

                {message && (
                    <div className="mb-6 p-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm rounded-lg flex items-center gap-2">
                        ✅ {message}
                    </div>
                )}

                {step === 1 ? (
                    <form onSubmit={handleSendOtp} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                    placeholder="admin@example.com"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? <Loader2 className="animate-spin" size={18} /> : <>Send OTP <ArrowRight size={18} /></>}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOtp} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                One-Time Password
                            </label>
                            <div className="relative">
                                <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    required
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all tracking-widest text-center text-lg font-mono"
                                    placeholder="******"
                                    maxLength={6}
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? <Loader2 className="animate-spin" size={18} /> : "Verify & Login"}
                        </button>
                        <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="w-full text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                        >
                            Change Email
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
