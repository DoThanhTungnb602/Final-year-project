import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "~/server/db";
import NextAuth, { DefaultSession } from "next-auth";
import authConfig from "~/server/auth.config";
import { type Adapter } from "next-auth/adapters";
import { Role } from "@prisma/client";
import { getUserById } from "~/data/user";

export type ExtendedUser = DefaultSession["user"] & {
  role: Role;
  isOAuth: boolean;
};

declare module "next-auth" {
  interface User {
    role: Role;
    isOAuth: boolean;
  }
  interface Session {
    user: {
      role: Role;
      isOAuth: boolean;
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
    async jwt({ token, user, trigger, session, account }) {
      if (trigger === "update") {
        if (session?.url) {
          token.picture = session.url;
        }
        if (session?.name) {
          token.name = session.name;
        }
      }
      if (user) {
        const isOAuth = account?.provider !== "credentials";
        token.isOAuth = isOAuth;
        token.id = user.id;
        token.name = user.name;
        token.role = user.role;
        token.picture = user.image;
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
          image: token.picture as string,
          name: token.name as string,
          isOAuth: token.isOAuth as boolean,
        },
      };
    },
  },
  adapter: PrismaAdapter(db) as Adapter,
  session: { strategy: "jwt" },
  ...authConfig,
});
