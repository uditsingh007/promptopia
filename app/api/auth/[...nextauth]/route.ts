import NextAuth, { Session, Profile } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async session({ session }: { session: Session }) {
      const sessionUser = await User.findOne({ email: session?.user?.email });
      session.user.id = sessionUser?._id.toString();
      return session;
    },
    // @ts-ignore
    async signIn({ profile }: { profile: Profile }) {
      try {
        await connectToDB();
        const existingUser = await User.findOne({ email: profile.email });
        if (!existingUser) {
          await User.create({
            email: profile.email,
            username: profile.name?.replaceAll(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }
        return true;
      } catch (error: any) {
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
