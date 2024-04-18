"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
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
import { NewPasswordSchema } from "~/schemas";

import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/trpc/react";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const changePassword = api.auth.newPassword.useMutation();

  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    if (!token) {
      setError("Token is required");
      setSuccess(undefined);
      return;
    }
    console.log(values);
    changePassword.mutate({
      password: values.password,
      token,
    });
  };

  return (
    <CardWrapper title="Enter new password">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
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
                <FormLabel>Confirm password</FormLabel>
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
            disabled={changePassword.isPending}
            size="sm"
            className="w-full"
          >
            {changePassword.isPending ? <Spinner /> : "Reset password"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
