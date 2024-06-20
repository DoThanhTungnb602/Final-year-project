"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { useModalStore } from "~/hooks/use-modal-store";
import { api } from "~/trpc/react";
import { toast } from "sonner";

export const LeaveClassModal = () => {
  const { isOpen, onClose, type, data } = useModalStore();
  const utils = api.useUtils();

  const classMutation = api.class.leave.useMutation({
    onSuccess: () => {
      toast.success("Class deleted successfully");
      utils.class.all.invalidate().catch(console.error);
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSettled: () => {
      onClose();
    },
  });

  const isModalOpen = isOpen && type === "leaveClass";

  const { classId } = data;

  const onConfirm = () => {
    if (!classId) return;
    classMutation.mutate({ classId });
  };

  return (
    <AlertDialog open={isModalOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure you want to leave this class?
          </AlertDialogTitle>
          <AlertDialogDescription>
            You will no longer have access to this class and its resources.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
