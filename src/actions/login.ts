"use server";

import { AuthError } from "next-auth";
import { z } from "zod";
import { DEFAULT_LOGIN_REDIRECT } from "~/routes";
import { LoginSchema } from "~/schemas";
import { signIn } from "~/server/auth";

export async function login(values: z.infer<typeof LoginSchema>) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            errors: "Invalid credentials",
          };
        default: {
          return {
            errors: "An error occurred",
          };
        }
      }
    }

    throw error;
  }

  return {
    errors: "An error occurred",
  };
}
