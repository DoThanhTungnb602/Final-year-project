"use client";

import * as z from "zod";
import { Button } from "~/components/ui/button";
import { FaPen } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { ProfileSettingsSchema } from "~/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

export default function ProfileSettingPage() {
  const [isNameEditable, setIsNameEditable] = useState(false);
  const [isPasswordEditable, setIsPasswordEditable] = useState(false);

  const form = useForm<z.infer<typeof ProfileSettingsSchema>>({
    resolver: zodResolver(ProfileSettingsSchema),
    defaultValues: {
      name: "",
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={() => {}} className="space-y-8">
        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <div className="space-y-2">
                <CardTitle>Name</CardTitle>
                <CardDescription>Update your name</CardDescription>
              </div>
              {isNameEditable ? (
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="h-10 w-10 rounded-full p-2"
                  onClick={() => setIsNameEditable(false)}
                >
                  <FaCheck className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="h-10 w-10 rounded-full p-2"
                  onClick={() => {
                    setIsNameEditable(true);
                    setTimeout(() => form.setFocus("name"), 0);
                  }}
                >
                  <FaPen className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardFooter className="border-t px-6 py-4">
            <div className="flex w-full gap-2">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your name"
                        className="flex-1"
                        disabled={!isNameEditable}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <div className="space-y-2">
                <CardTitle>Password</CardTitle>
                <CardDescription>Update your password</CardDescription>
              </div>
              {isPasswordEditable ? (
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="h-10 w-10 rounded-full p-2"
                  onClick={() => setIsPasswordEditable(false)}
                >
                  <FaCheck className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="h-10 w-10 rounded-full p-2"
                  onClick={() => {
                    setIsPasswordEditable(true);
                    setTimeout(() => form.setFocus("currentPassword"), 0);
                  }}
                >
                  <FaPen className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardHeader>

          <CardFooter className="flex flex-col gap-3 border-t px-6 py-4">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Current password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={!isPasswordEditable}
                      placeholder="Enter your current password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={!isPasswordEditable}
                      placeholder="Enter your new password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmNewPassword"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Confirm new password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={!isPasswordEditable}
                      placeholder="Confirm your new password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
