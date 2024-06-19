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
import { Label } from "~/components/ui/label";
import { Copy, Check, RefreshCw } from "lucide-react";
import { useModalStore } from "~/hooks/use-modal-store";
import { useOrigin } from "~/hooks/use-origin";
import { useState } from "react";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import { toast } from "sonner";

export const InviteModal = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onClose, onOpen, type, data } = useModalStore();
  const origin = useOrigin();

  const inviteCodeMutation = api.class.generateInviteCode.useMutation({
    onSuccess: (data) => {
      toast.success("Invite link generated");
      onOpen({
        type: "invite",
        data: {
          classroom: data,
        },
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const isModalOpen = isOpen && type === "invite";
  const { classroom } = data;
  const inviteLink = `${origin}/invite/${classroom?.inviteCode}`;

  const handleCopy = () => {
    navigator.clipboard
      .writeText(inviteLink)
      .then(() => {
        setIsCopied(true);
      })
      .catch((error) => {
        console.error("Failed to copy invite link", error);
      });

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const handleGenerateInviteCode = () => {
    setIsLoading(true);
    if (!classroom) return;
    inviteCodeMutation.mutate({ id: classroom?.id });
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Invite link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to join this class.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" value={inviteLink} readOnly disabled={isLoading} />
          </div>
          <Button
            size="sm"
            className="px-3"
            onClick={handleCopy}
            disabled={isLoading}
          >
            {isCopied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            <span className="sr-only">Copy</span>
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <Button variant="link" size="sm" onClick={handleGenerateInviteCode}>
            Generate a new link
            <RefreshCw
              className={cn("ml-2 size-4", isLoading && "animate-spin")}
            />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
