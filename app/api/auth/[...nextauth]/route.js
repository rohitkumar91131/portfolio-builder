import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import User from "@/models/User";
import connectDB from "@/lib/db"; // Ensure we have a db connector for Mongoose operations in callbacks if needed

export const authOptions = {
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            allowDangerousEmailAccountLinking: true,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async session({ session, token }) {
            if (session?.user) {
                session.user.id = token.sub; // Add user ID to session
                // Fetch extended user data (username, template)
                try {
                    await connectDB();
                    const dbUser = await User.findOne({ email: session.user.email });
                    console.log("DEBUG: Session Fetch - dbUser image:", dbUser?.image);
                    if (dbUser) {
                        session.user.username = dbUser.username;
                        session.user.template = dbUser.template;
                        session.user.bio = dbUser.bio;
                        session.user.website = dbUser.website; // Make sure User model has website in root or socialLinks
                        session.user.socialLinks = dbUser.socialLinks || {};
                        if (dbUser.image) session.user.image = dbUser.image; // Override Google image with DB image
                        session.user.backgroundImage = dbUser.backgroundImage;
                        session.user.blurDataURL = dbUser.blurDataURL;
                    }
                } catch (error) {
                    console.error("Error fetching user data for session", error);
                }
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.sub = user.id;
            }
            return token;
        }
    },
    pages: {
        signIn: '/auth/signin',
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
