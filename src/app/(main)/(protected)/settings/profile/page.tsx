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
import { toast } from "react-toastify";
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

const NameSchema = z.object({
  name: z.string(),
});

const PasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string(),
  confirmNewPassword: z.string(),
});

export default function ProfileSettingPage() {
  const [isNameEditable, setIsNameEditable] = useState(false);
  const currentUser = useCurrentUser();

  const nameForm = useForm<z.infer<typeof NameSchema>>({
    resolver: zodResolver(NameSchema),
    defaultValues: {
      name: "",
    },
  });

  const passwordForm = useForm<z.infer<typeof PasswordSchema>>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const updateAvatar = api.user.updateAvatar.useMutation({
    onSuccess: (data) => {
      const { success } = data;
      if (success) toast.success("Image uploaded successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <div className="h-full w-full overflow-auto">
      <Form {...nameForm}>
        <form
          onSubmit={nameForm.handleSubmit((values) => {
            console.log(values);
          })}
          className="space-y-8"
        >
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
                  <AvatarImage src={currentUser?.image as string} alt="image" />
                  <AvatarFallback>
                    <FaUserCircle className="size-28" />
                  </AvatarFallback>
                </Avatar>
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
              </div>
            </CardFooter>
          </Card>
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
          <Dialog>
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
                  onSubmit={passwordForm.handleSubmit(() => {})}
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
                    <Button type="submit">Save Changes</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
          <Button
            type="submit"
            className="float-right"
            disabled={!nameForm.formState.isDirty}
          >
            Save Changes
          </Button>
        </form>
      </Form>
    </div>
  );
}
