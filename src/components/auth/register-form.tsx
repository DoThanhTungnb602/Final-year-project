"use client";

import * as z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "~/schemas";

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

import CardWrapper from "~/components/card-wrapper";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { api } from "~/trpc/react";
import { register } from "~/actions/register";
import { redirect } from "next/navigation";
import { Spinner } from "~/components/spinner";
import { toast } from "react-toastify";

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

  const userCreator = api.auth.register.useMutation({
    onSuccess: () => {
      redirect("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    // register(values);
    userCreator.mutate(values);
  };

  return (
    <CardWrapper title="Register">
      <Form {...form}>
        <form
          // onSubmit={form.handleSubmit(onSubmit)}
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-5"
        >
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
