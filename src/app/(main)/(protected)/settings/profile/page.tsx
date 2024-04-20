"use client";

import * as z from "zod";
import { Button } from "~/components/ui/button";
import { FaPen, FaUserCircle } from "react-icons/fa";
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
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

import { Input } from "~/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadButton } from "~/lib/uploadthing";
import { toast } from "sonner";
import { useCurrentUser } from "~/hooks/use-current-user";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { api } from "~/trpc/react";
import { useSession } from "next-auth/react";
import { UpdateNameSchema, UpdatePasswordSchema } from "~/schemas";

export default function ProfileSettingPage() {
  const [isNameEditable, setIsNameEditable] = useState(false);
  const [open, setOpen] = useState(false);
  const currentUser = useCurrentUser();
  const { update } = useSession();

  const nameForm = useForm<z.infer<typeof UpdateNameSchema>>({
    resolver: zodResolver(UpdateNameSchema),
    defaultValues: {
      name: currentUser?.name || undefined,
    },
  });

  const passwordForm = useForm<z.infer<typeof UpdatePasswordSchema>>({
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const updateAvatar = api.user.updateAvatar.useMutation({
    onSuccess: async (data) => {
      const { success, url } = data;
      await update({ url });
      if (success) toast.success("Your avatar has been updated");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const updateName = api.user.updateName.useMutation({
    onSuccess: async (data) => {
      const { success, name } = data;
      await update({ name });
      setIsNameEditable(false);
      nameForm.reset({ name });
      if (success) toast.success("Your name has been updated");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const updatePassword = api.user.updatePassword.useMutation({
    onSuccess: async () => {
      passwordForm.reset();
      setOpen(false);
      toast.success("Your password has been updated");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onFormNameSubmit = (values: z.infer<typeof UpdateNameSchema>) => {
    updateName.mutate(values);
  };

  const onFormPasswordSubmit = (
    values: z.infer<typeof UpdatePasswordSchema>,
  ) => {
    updatePassword.mutate(values);
  };

  return (
    <div className="h-full w-full space-y-5 overflow-auto">
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <div className="space-y-2">
              <CardTitle>Profile Image</CardTitle>
              <CardDescription>Update your profile image</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardFooter className="border-t px-6 py-4">
          <div className="flex w-full flex-col items-center gap-5">
            <Avatar className="size-28">
              <AvatarImage
                src={currentUser?.image as string}
                alt="avatar"
                className="object-cover"
              />
              <AvatarFallback>
                <FaUserCircle className="size-28" />
              </AvatarFallback>
            </Avatar>
            {!currentUser?.isOAuth && (
              <UploadButton
                className="ut-button:bg-primary ut-button:font-semibold dark:ut-button:text-gray-900"
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  if (res[0]?.url) {
                    updateAvatar.mutate({ url: res[0]?.url });
                  }
                }}
                onUploadError={(error: Error) => {
                  console.log(error.message);
                  toast.error("Failed to upload image");
                }}
              />
            )}
          </div>
        </CardFooter>
      </Card>
      <Form {...nameForm}>
        <form
          onSubmit={nameForm.handleSubmit(onFormNameSubmit)}
          className="space-y-5"
        >
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
                      setTimeout(() => nameForm.setFocus("name"), 0);
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
                  control={nameForm.control}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your name"
                          className="flex-1"
                          readOnly={!isNameEditable}
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
          <Button
            type="submit"
            className="float-right"
            disabled={!nameForm.formState.isDirty || updateName.isPending}
          >
            Save Changes
          </Button>
        </form>
      </Form>
      {!currentUser?.isOAuth && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="link">Change password</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Password</DialogTitle>
              <DialogDescription>Update your password</DialogDescription>
            </DialogHeader>
            <Form {...passwordForm}>
              <form
                onSubmit={passwordForm.handleSubmit(onFormPasswordSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={passwordForm.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your current password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={passwordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your new password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={passwordForm.control}
                  name="confirmNewPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm new password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm your new password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="ghost">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    disabled={
                      !passwordForm.formState.isDirty ||
                      updatePassword.isPending
                    }
                  >
                    Save Changes
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
