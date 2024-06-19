"use client";

import { useEffect, useState } from "react";
import { InviteModal } from "../modals/invite-modal";
import { useCurrentRole } from "~/hooks/use-current-role";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  const role = useCurrentRole();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <>{role === "ADMIN" && <InviteModal />}</>;
};
