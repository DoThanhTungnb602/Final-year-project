"use client";

import { Role } from "@prisma/client";
import { useCurrentUser } from "~/hooks/use-current-user";

type RoleGateProps = {
  allowRole: Role;
  children: React.ReactNode;
};

export const RoleGate = ({ allowRole, children }: RoleGateProps) => {
  const user = useCurrentUser();

  if (!user) return null;

  if (user.role !== allowRole) return null;

  return <>{children}</>;
};
