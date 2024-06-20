"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useModalStore } from "~/hooks/use-modal-store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { JoinClassSchema } from "~/schemas";
import {
  Form,
  FormField,
  FormItem,
  FormDescription,
  FormControl,
  FormMessage,
  FormLabel,
} from "~/components/ui/form";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const JoinClassModal = () => {
  const { isOpen, onClose, type } = useModalStore();
  const router = useRouter();
  const form = useForm<z.infer<typeof JoinClassSchema>>({
    resolver: zodResolver(JoinClassSchema),
    defaultValues: {
      inviteCode: "",
    },
  });
  const isModalOpen = isOpen && type === "joinClass";

  const joinClassMutation = api.class.enroll.useMutation({
    onSuccess: (data) => {
      onClose();
      toast.success(data.message);
      router.push(`/clasess/${data.id}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = async (values: z.infer<typeof JoinClassSchema>) => {
    joinClassMutation.mutate({
      inviteCode: values.inviteCode,
    });
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Join new class</DialogTitle>
              <DialogDescription>
                Please enter the invite code to join a new class.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <FormField
                control={form.control}
                name="inviteCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Invite Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter invite code" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                size="sm"
                disabled={joinClassMutation.isPending}
                type="submit"
              >
                Join
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
