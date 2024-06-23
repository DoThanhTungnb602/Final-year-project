"use client";

import { UserInfo } from "~/components/shared/user-info";

const AdminHeader = () => {
  return (
    <header className="sticky top-0 z-10 flex h-[57px] shrink-0 items-center justify-between gap-1 border-b bg-background px-4">
      <p className="text-2xl font-semibold">Dashboard</p>
      <UserInfo />
    </header>
  );
};

export default AdminHeader;
