import NextAuth from "next-auth";

import { auth } from "~/server/auth";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const handler = NextAuth(auth);
export { handler as GET, handler as POST };
