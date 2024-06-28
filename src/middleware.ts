import NextAuth from "next-auth";
import authConfig from "~/server/auth.config";
const { auth: middleware } = NextAuth(authConfig);

import {
  authRoutes,
  apiAuthPrefix,
  adminRoutePrefix,
  DEFAULT_LOGIN_REDIRECT,
} from "./routes";
import { currentRole } from "./lib/auth";

export default middleware(async (request) => {
  const { nextUrl } = request;
  const isLoggedIn = !!request.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAdminRoute = nextUrl.pathname.startsWith(adminRoutePrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Allow API routes to be accessed without authentication
  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  if (isAdminRoute) {
    const isAdmin = (await currentRole()) === "ADMIN";
    if (!isAdmin) {
      return Response.redirect(new URL("/", nextUrl));
    }
  }

  return;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
};
