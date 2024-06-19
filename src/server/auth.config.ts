import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "~/data/user";
import { LoginSchema } from "~/schemas";
import bcrypt from "bcryptjs";
import { ExtendedUser } from "./auth";

export default {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUserByEmail(email);
          if (!user?.password) return null;
          // TODO: Change to hashed password when testing is done
          // const passwordMatch = await bcrypt.compare(password, user.password);
          const passwordMatch = password === user.password;
          if (passwordMatch) return user as unknown as ExtendedUser;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },
} satisfies NextAuthConfig;
