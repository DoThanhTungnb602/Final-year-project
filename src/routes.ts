export const publicRoutes = ["/"];

export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/reset",
  "/auth/new-password",
  "/auth/verification",
];

export const protectedRoutes = ["/settings/profile"];

export const adminRoutePrefix = "/admin";

export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/settings/profile";
