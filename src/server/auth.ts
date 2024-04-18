import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "~/server/db";
import NextAuth, { DefaultSession } from "next-auth";
import authConfig from "~/server/auth.config";
import { type Adapter } from "next-auth/adapters";
import { Role } from "@prisma/client";
import { getUserById } from "~/data/user";

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
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id as string);

      if (!existingUser?.emailVerified) return false;

      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
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
