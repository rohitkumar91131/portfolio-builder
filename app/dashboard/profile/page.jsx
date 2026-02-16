"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Loader2, Save } from "lucide-react";
import { ProfileSkeleton } from "@/components/dashboard/Skeletons";
import { toast } from "sonner";
import ImageUpload from "@/components/ImageUpload"; // Import
import { useRouter } from "next/navigation"; // Added for router.refresh()

export default function ProfilePage() {
    const { data: session, update } = useSession();
    const [loading, setLoading] = useState(true); // Start as loading to avoid flash
    const router = useRouter(); // Initialize useRouter

    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        bio: "",
        image: "", // Profile Image
        backgroundImage: "", // New Background Image
        blurDataURL: "", // New Blur Data URL
        backgroundBlurDataURL: "", // New Background Blur Data URL
        socialLinks: {
            github: "",
            linkedin: "",
            twitter: "",
            website: "",
            instagram: ""
        }
    });

    // Generate a tiny blur data URL from the uploaded image
    const generateBlurDataURL = async (imageUrl) => {
        try {
            // Helper to get a tiny version from Cloudinary if possible, or just use the generic one
            // Cloudinary trick: transform to w_10, blur
            // NOTE: This assumes Cloudinary URL structure. If raw file, this might fail, but ImageUpload gives Cloudinary URL.
            if (!imageUrl.includes("cloudinary")) return "";

            const blurUrl = imageUrl.replace("/upload/", "/upload/w_10,e_blur:1000,q_1/");
            const response = await fetch(blurUrl);
            const blob = await response.blob();

            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(blob);
            });
        } catch (e) {
            console.error("Failed to gen blur url", e);
            return "";
        }
    };

    const handleProfileImageChange = async (url) => {
        setFormData(prev => ({ ...prev, image: url }));
        if (url) {
            const dataUrl = await generateBlurDataURL(url);
            setFormData(prev => ({ ...prev, blurDataURL: dataUrl }));
        }
    };

    const handleBackgroundImageChange = async (url) => {
        setFormData(prev => ({ ...prev, backgroundImage: url }));
        if (url) {
            const dataUrl = await generateBlurDataURL(url);
            setFormData(prev => ({ ...prev, backgroundBlurDataURL: dataUrl }));
        }
    };

    // Load initial data
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const res = await fetch("/api/user/profile");
                const data = await res.json();

                if (data.success && data.user) {
                    const dbUser = data.user;
                    setFormData({
                        name: dbUser.name || "",
                        username: dbUser.username || "",
                        email: dbUser.email || "",
                        bio: dbUser.bio || "",
                        image: dbUser.image || "",
                        backgroundImage: dbUser.backgroundImage || "",
                        blurDataURL: dbUser.blurDataURL || "",
                        backgroundBlurDataURL: dbUser.backgroundBlurDataURL || "",
                        socialLinks: {
                            github: dbUser.socialLinks?.github || "",
                            linkedin: dbUser.socialLinks?.linkedin || "",
                            twitter: dbUser.socialLinks?.twitter || "",
                            website: dbUser.socialLinks?.website || "",
                            instagram: dbUser.socialLinks?.instagram || ""
                        }
                    });
                }
            } catch (e) {
                console.error("Failed to fetch profile", e);
                toast.error("Failed to load profile data");
            } finally {
                setLoading(false);
            }
        };

        if (session?.user) {
            fetchProfile();
        }
    }, [session]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log("DEBUG: Submitting Profile Form Data:", formData);

        try {
            const res = await fetch("/api/user/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Failed to update");

            await update({
                name: formData.name,
                image: formData.image,
                bio: formData.bio,
                website: formData.socialLinks.website,
                socialLinks: {
                    github: formData.socialLinks.github,
                    linkedin: formData.socialLinks.linkedin,
                    twitter: formData.socialLinks.twitter,
                    instagram: formData.socialLinks.instagram
                },
                backgroundImage: formData.backgroundImage,
                blurDataURL: formData.blurDataURL,
            });

            toast.success("Profile updated successfully!");
            router.refresh();
        } catch (error) {
            toast.error("Failed to update profile");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (!session || (loading && !formData.email)) {
        return <ProfileSkeleton />;
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Profile Settings</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Manage your public profile information.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">

                {/* Basic Info */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-800 pb-2">Basic Info</h2>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Display Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            placeholder="Your Name"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                            placeholder="Tell us a little about yourself..."
                        />
                    </div>
                </div>

                {/* Profile and Background Images */}
                <div className="space-y-4 pt-4">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-800 pb-2">Images</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Profile Image</label>
                            <ImageUpload
                                value={formData.image}
                                onChange={handleProfileImageChange}
                                blurDataURL={formData.blurDataURL}
                                label="Upload Profile Pic"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Background/Hero Image</label>
                            <ImageUpload
                                value={formData.backgroundImage}
                                onChange={handleBackgroundImageChange}
                                blurDataURL={formData.backgroundBlurDataURL}
                                label="Upload Background"
                            />
                        </div>
                    </div>
                </div >

                {/* Social Links */}
                < div className="space-y-4 pt-4" >
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-800 pb-2">Social Links</h2>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">GitHub URL</label>
                            <input
                                type="url"
                                name="github"
                                value={formData.github}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
                                placeholder="https://github.com/..."
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">LinkedIn URL</label>
                            <input
                                type="url"
                                name="linkedin"
                                value={formData.linkedin}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
                                placeholder="https://linkedin.com/in/..."
                            />
                        </div>
                    </div>
                </div >

                <div className="pt-4 flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        Save Changes
                    </button>
                </div>

            </form >
        </div >
    );
}
