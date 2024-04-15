"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import * as z from "zod";
import { login } from "~/actions/login";
import CardWrapper from "~/components/shared/card-wrapper";
import { Spinner } from "~/components/shared/spinner";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { LoginSchema } from "~/schemas";

import { zodResolver } from "@hookform/resolvers/zod";

import Social from "./social";

export function LoginForm() {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Another account already exists with the same e-mail address."
      : undefined;

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(urlError);
  const [success, setSuccess] = useState<string | undefined>(undefined);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(async () => {
      const res = await login(values);
      const errors = res?.errors;
      const success = res?.success;
      if (success) {
        setSuccess(success);
        setError(undefined);
      }
      if (errors) {
        if (typeof errors === "string") {
          setError(errors);
          setSuccess(undefined);
        } else {
          errors.email && setError(errors.email[0]);
          errors.password && setError(errors.password[0]);
          setSuccess(undefined);
        }
      }
    });
  };

  return (
    <CardWrapper title="Login">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="email@example.com"
                    {...field}
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex w-full items-center justify-between">
                  <FormLabel>Password</FormLabel>
                  <Link href="#" className="text-sm underline">
                    Forgot your password?
                  </Link>
                </div>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && (
            <div className="flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-red-500">
              <FaExclamationCircle className="size-5 shrink-0" />
              {error}
            </div>
          )}
          {success && (
            <div className="flex items-center gap-x-2 rounded-md bg-emerald-500/15 p-3 text-sm text-emerald-500">
              <FaCheckCircle className="size-5 shrink-0" />
              {success}
            </div>
          )}
          <Button
            type="submit"
            disabled={isPending}
            size="sm"
            className="w-full"
          >
            {isPending ? <Spinner /> : "Login"}
          </Button>
        </form>
      </Form>
      <Social />
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/auth/register" className="underline">
          Sign up
        </Link>
      </div>
    </CardWrapper>
  );
}
