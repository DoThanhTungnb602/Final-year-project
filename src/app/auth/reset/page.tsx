"use client";

import Link from "next/link";
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
import { ResetSchema } from "~/schemas";

import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/trpc/react";

export default function ResetPage() {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);

  const resetPassword = api.auth.reset.useMutation({
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

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    resetPassword.mutate(values);
  };

  return (
    <CardWrapper title="Reset password">
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
            disabled={resetPassword.isPending}
            size="sm"
            className="w-full"
          >
            {resetPassword.isPending ? <Spinner /> : "Send reset email"}
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/auth/login">Back to login</Link>
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
