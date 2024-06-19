"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Copy, Check } from "lucide-react";
import { useModalStore } from "~/hooks/use-modal-store";
import { useOrigin } from "~/hooks/use-origin";
import { useState } from "react";

export const InviteModal = () => {
  const [isCopied, setIsCopied] = useState(false);
  const { isOpen, onClose, type, data } = useModalStore();
  const origin = useOrigin();

  const isModalOpen = isOpen && type === "invite";
  const { classroom } = data;
  const inviteLink = `${origin}/invite/${classroom?.id}`;

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
            <Input
              id="link"
              defaultValue={inviteLink}
              value={inviteLink}
              readOnly
            />
          </div>
          <Button size="sm" className="px-3" onClick={handleCopy}>
            {isCopied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            <span className="sr-only">Copy</span>
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
