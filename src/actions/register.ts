"use server";

import { z } from "zod";

import { RegisterSchema } from "~/schemas";
import { api } from "~/trpc/server";

export async function register(values: z.infer<typeof RegisterSchema>) {
  await api.auth.register(values);
}
