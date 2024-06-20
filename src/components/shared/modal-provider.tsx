"use client";

import { useEffect, useState } from "react";
import { InviteModal } from "../modals/invite-modal";
import { useCurrentRole } from "~/hooks/use-current-role";
import { DeleteClassModal } from "../modals/delete-class-modal";
import { JoinClassModal } from "../modals/join-class-modal";
import { LeaveClassModal } from "../modals/leave-class-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  const role = useCurrentRole();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {role === "ADMIN" && <InviteModal />}
      {role === "ADMIN" && <DeleteClassModal />}
      <JoinClassModal />
      <LeaveClassModal />
    </>
  );
};
