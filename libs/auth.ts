import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import UserSchema from "@/modals/User";
import { connectDB } from "./mongodb";

interface ExtendedProfile {
  picture?: string;
  email?: string;
  name?: string;
  sub?: string;
}
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
        fullname: {},
      },
      async authorize(credentials, req) {
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  // callbacks: {
  //   async session({ session, token }) {
  //     return session;
  //   },
  //   async signIn({ profile }) {
  //     const extendedProfile = profile as ExtendedProfile;
  //     console.log(extendedProfile);
  //     try {
  //       await connectDB();
  //       console.log("connected to database");
  //       const userExits = await UserSchema.findOne({
  //         email: extendedProfile?.email,
  //       });

  //       if (!userExits) {
  //         const user = await UserSchema.create({
  //           id: extendedProfile?.sub,
  //           email: extendedProfile?.email,
  //           name: extendedProfile?.name,
  //           image: extendedProfile?.picture,
  //         });
  //       }
  //       return true;
  //     } catch (error) {
  //       console.log(error);
  //       return false;
  //     }
  //     return true;
  //   },
  // },
};
