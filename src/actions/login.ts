"use server";

import { z } from "zod";
import { LoginSchema } from "~/schemas";
import { api } from "~/trpc/server";

export async function login(values: z.infer<typeof LoginSchema>) {
  const result = await api.auth.login(values);
  console.log(result);
}
