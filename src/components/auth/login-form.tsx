"use client";

import * as z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "~/schemas";

import Link from "next/link";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

import CardWrapper from "~/components/shared/card-wrapper";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { login } from "~/actions/login";
import { toast } from "react-toastify";
import { useTransition } from "react";
import { Spinner } from "~/components/shared/spinner";

export function LoginForm() {
  const [isPending, startTransition] = useTransition();

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
      if (errors) {
        if (typeof errors === "string") {
          toast.error(errors);
        } else {
          errors.email && toast.error(errors.email[0]);
          errors.password && toast.error(errors.password[0]);
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
      <div className="mt-5 flex gap-3">
        <Button size="sm" variant="outline" className="w-full" asChild>
          <Link href="/">
            <FcGoogle className="size-5" />
          </Link>
        </Button>
        <Button size="sm" variant="outline" className="w-full" asChild>
          <Link href="/">
            <FaGithub className="size-5" />
          </Link>
        </Button>
      </div>
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/auth/register" className="underline">
          Sign up
        </Link>
      </div>
    </CardWrapper>
  );
}
