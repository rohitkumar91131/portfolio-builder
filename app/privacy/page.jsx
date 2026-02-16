import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-black selection:bg-blue-500/30">
            <Navbar />

            <div className="max-w-4xl mx-auto px-6 py-24 md:py-32">
                <h1 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">Privacy Policy</h1>
                <p className="text-xl text-gray-500 mb-12 border-l-4 border-blue-600 pl-6 leading-relaxed">
                    Your privacy is important to us. It is Portfolio's policy to respect your privacy regarding any information we may collect from you across our website.
                </p>

                <div className="space-y-12 text-gray-700 dark:text-gray-300 leading-relaxed font-sans">
                    <section>
                        <h2 className="text-2xl font-bold text-black dark:text-white mb-4">1. Information We Collect</h2>
                        <p className="mb-4">
                            We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.
                        </p>
                        <div className="bg-gray-50 dark:bg-neutral-900 p-6 rounded-2xl border border-gray-100 dark:border-neutral-800">
                            <ul className="list-disc list-inside space-y-2 text-sm">
                                <li>Email address for authentication and notifications</li>
                                <li>Username for your public portfolio URL</li>
                                <li>Portfolio data (projects, education, experience) that you explicitly provide</li>
                                <li>Images uploaded for your profile and backgrounds</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-black dark:text-white mb-4">2. Use of Data</h2>
                        <p>
                            We use the collected data for various purposes, including providing and maintaining our service, notifying you about changes, allowing you to participate in interactive features, and providing user support.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-black dark:text-white mb-4">3. Data Retention</h2>
                        <p>
                            We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-black dark:text-white mb-4">4. Third-Party Services</h2>
                        <p className="mb-4">
                            We utilize third-party services to enhance our platform. These services have their own privacy policies.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 border border-gray-100 dark:border-neutral-800 rounded-xl">
                                <span className="font-bold block mb-1">Google / NextAuth</span>
                                <span className="text-sm opacity-70">Authentication and secure login services.</span>
                            </div>
                            <div className="p-4 border border-gray-100 dark:border-neutral-800 rounded-xl">
                                <span className="font-bold block mb-1">Cloudinary</span>
                                <span className="text-sm opacity-70">Secure image hosting and optimization.</span>
                            </div>
                            <div className="p-4 border border-gray-100 dark:border-neutral-800 rounded-xl">
                                <span className="font-bold block mb-1">MongoDB Atlas</span>
                                <span className="text-sm opacity-70">Secured database hosting for user data.</span>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-black dark:text-white mb-4">5. Contact Us</h2>
                        <p>
                            If you have any questions about how we handle user data and personal information, feel free to contact us.
                        </p>
                    </section>
                </div>

                <div className="mt-24 pt-12 border-t border-gray-200 dark:border-neutral-800">
                    <p className="text-sm text-gray-400 italic">
                        Last updated: February 16, 2026
                    </p>
                </div>
            </div>

            <Footer />
        </main>
    );
}
