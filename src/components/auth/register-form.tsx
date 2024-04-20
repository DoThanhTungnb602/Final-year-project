"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaCheckCircle, FaExclamationCircle, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import * as z from "zod";
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
import { RegisterSchema } from "~/schemas";
import { api } from "~/trpc/react";

import { zodResolver } from "@hookform/resolvers/zod";

export function RegisterForm() {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);

  const userCreator = api.auth.register.useMutation({
    onSuccess: (data) => {
      const { success } = data;
      if (success) {
        setSuccess(success);
        setError(undefined);
      }
    },
    onError: (error) => {
      setError(error.message);
      setSuccess(undefined);
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    userCreator.mutate(values);
  };

  return (
    <CardWrapper title="Register">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                </div>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <div className="flex w-full items-center justify-between">
                  <FormLabel>Confirm Password</FormLabel>
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
            size="sm"
            className="w-full"
            type="submit"
            disabled={userCreator.isPending}
          >
            {userCreator.isPending ? (
              <Spinner className="h-6 w-6" />
            ) : (
              "Register"
            )}
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
        Already have an account?{" "}
        <Link href="/auth/login" className="underline">
          Sign in
        </Link>
      </div>
    </CardWrapper>
  );
}
