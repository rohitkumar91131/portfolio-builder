"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, Loader2, Key, Trash2 } from "lucide-react";
import Link from "next/link";

export default function EditProject() {
    const { id } = useParams();
    const router = useRouter();
    const hasFetched = useRef(false); // Prevent double fetch in strict mode

    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [pendingAction, setPendingAction] = useState(null); // 'save' | 'delete'

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        tech: "", // Comma separated for editing
        githubLink: "",
        liveLink: "",
        iconName: "Code",
        color: ""
    });

    // OTP State for saving/deleting
    const [adminEmail, setAdminEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [verifyMessage, setVerifyMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        const fetchProject = async () => {
            try {
                const res = await fetch(`/api/projects/${id}`);

                if (res.status === 404) {
                    setError("Project not found");
                    setLoading(false);
                    return;
                }

                const data = await res.json();

                if (data.success) {
                    setProject(data.data);
                    setFormData({
                        ...data.data,
                        tech: data.data.tech.join(", "),
                    });
                } else {
                    setError("Failed to load project data");
                }
            } catch (err) {
                console.error("Failed to load project", err);
                setError("Failed to load project. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchProject();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const requestOtp = async (actionType) => {
        setError("");

        if (!adminEmail) {
            setError(`Please confirm admin email to ${actionType} this project.`);
            return;
        }

        setSaving(true);

        try {
            const res = await fetch("/api/admin/otp/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: adminEmail }),
            });
            const data = await res.json();
            if (data.success) {
                setOtpSent(true);
                setPendingAction(actionType);
                setVerifyMessage(`OTP Sent! Enter it to confirm ${actionType}.`);
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError("Failed to send OTP");
        } finally {
            setSaving(false);
        }
    };

    const initiateSave = (e) => {
        e.preventDefault();
        requestOtp('save');
    };

    const initiateDelete = (e) => {
        e.preventDefault();
        requestOtp('delete');
    };

    const confirmAction = async () => {
        setSaving(true);
        setError("");

        try {
            // 1. Verify OTP
            const verifyRes = await fetch("/api/admin/otp/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: adminEmail, otp }),
            });
            const verifyData = await verifyRes.json();

            if (!verifyData.success) {
                setError("Invalid OTP");
                setSaving(false);
                return;
            }

            // 2. Perform Action (Save or Delete)
            if (pendingAction === 'save') {
                const updateRes = await fetch(`/api/projects/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        ...formData,
                        tech: formData.tech.split(",").map(t => t.trim()).filter(Boolean)
                    }),
                });

                const updateData = await updateRes.json();
                if (updateData.success) {
                    router.push("/admin/dashboard");
                } else {
                    setError(updateData.error);
                }
            } else if (pendingAction === 'delete') {
                const deleteRes = await fetch(`/api/projects/${id}`, {
                    method: "DELETE",
                });

                const deleteData = await deleteRes.json();
                if (deleteData.success) {
                    router.push("/admin/dashboard");
                } else {
                    setError(deleteData.error);
                }
            }

        } catch (err) {
            setError(`Failed to ${pendingAction} project`);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-10 text-center text-xl">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black p-6 pb-20">
            <div className="max-w-2xl mx-auto">
                <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:hover:text-gray-200 mb-6">
                    <ArrowLeft size={20} /> Back to Dashboard
                </Link>

                <h1 className="text-3xl font-bold mb-8">Edit Project</h1>

                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-8">

                    {error && <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-lg border border-red-100">{error}</div>}
                    {verifyMessage && <div className="mb-6 p-3 bg-blue-50 text-blue-600 rounded-lg border border-blue-100">{verifyMessage}</div>}

                    {!otpSent ? (
                        <form className="space-y-6">
                            {/* Fields */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Title</label>
                                <input name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded-lg bg-transparent" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded-lg bg-transparent h-32" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Tech Stack (comma separated)</label>
                                <input name="tech" value={formData.tech} onChange={handleChange} className="w-full p-2 border rounded-lg bg-transparent" required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Github Link</label>
                                    <input name="githubLink" value={formData.githubLink} onChange={handleChange} className="w-full p-2 border rounded-lg bg-transparent" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Live Link</label>
                                    <input name="liveLink" value={formData.liveLink} onChange={handleChange} className="w-full p-2 border rounded-lg bg-transparent" />
                                </div>
                            </div>

                            <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
                                <label className="block text-sm font-bold mb-2 text-blue-600">Admin Authentication</label>
                                <input
                                    type="email"
                                    placeholder="Enter Admin Email to Proceed"
                                    value={adminEmail}
                                    onChange={(e) => setAdminEmail(e.target.value)}
                                    className="w-full p-2 border rounded-lg bg-transparent mb-2"
                                    required
                                />
                                <p className="text-xs text-gray-500">Security Check: OTP Required for Saving or Deleting.</p>
                            </div>

                            <button onClick={initiateSave} disabled={saving} className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2">
                                {saving && pendingAction === 'save' ? <Loader2 className="animate-spin" /> : <>Request OTP to Save <Key size={18} /></>}
                            </button>

                            <button onClick={initiateDelete} disabled={saving} className="w-full py-3 bg-red-50 text-red-600 border border-red-100 rounded-xl font-bold hover:bg-red-100 transition flex items-center justify-center gap-2">
                                {saving && pendingAction === 'delete' ? <Loader2 className="animate-spin" /> : <>Request OTP to Delete <Trash2 size={18} /></>}
                            </button>
                        </form>
                    ) : (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                            <div className="text-center">
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${pendingAction === 'delete' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                                    {pendingAction === 'delete' ? <Trash2 size={32} /> : <Key size={32} />}
                                </div>
                                <h3 className="text-xl font-bold">
                                    {pendingAction === 'delete' ? 'Confirm Deletion' : 'Confirm Save'}
                                </h3>
                                <p className="text-gray-500">OTP Sent to {adminEmail}</p>
                            </div>

                            <input
                                type="text"
                                placeholder="Enter 6-digit OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="w-full p-4 text-center text-2xl tracking-widest border rounded-xl bg-transparent font-mono"
                                maxLength={6}
                            />

                            <button onClick={confirmAction} disabled={saving} className={`w-full py-3 text-white rounded-xl font-bold transition flex items-center justify-center gap-2 ${pendingAction === 'delete' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}>
                                {saving ? <Loader2 className="animate-spin" /> :
                                    pendingAction === 'delete' ? <>Verify & Delete Forever <Trash2 size={18} /></> : <>Verify & Save Changes <Save size={18} /></>
                                }
                            </button>

                            <button onClick={() => { setOtpSent(false); setPendingAction(null); }} className="w-full text-center text-sm text-gray-500 hover:text-gray-700">
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
