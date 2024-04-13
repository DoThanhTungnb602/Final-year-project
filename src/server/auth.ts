import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "~/server/db";
import NextAuth, { DefaultSession } from "next-auth";
import authConfig from "~/server/auth.config";
import { type Adapter } from "next-auth/adapters";
import { Role } from "@prisma/client";

declare module "next-auth" {
  interface User {
    role: Role;
  }
  interface Session {
    user: {
      role: Role;
    } & DefaultSession["user"];
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    user?: {
      name: string;
      sex: string;
    };
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          role: token.role as Role,
        },
      };
    },
  },
  adapter: PrismaAdapter(db) as Adapter,
  session: { strategy: "jwt" },
  ...authConfig,
});
