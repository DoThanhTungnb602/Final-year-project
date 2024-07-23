"use client";

import { UserInfo } from "~/components/shared/user-info";
import { ProblemSidebar } from "./problem-sidebar";
import { useSidebarStore } from "~/hooks/use-sidebar-store";
import Clock from "../shared/clock";

const Header = () => {
  const { isShow, test } = useSidebarStore();

  return (
    <header className="sticky top-0 z-10 flex h-[57px] shrink-0 items-center justify-between gap-1 border-b bg-background px-4">
      {isShow ? <ProblemSidebar /> : <div></div>}
      {test ? (
        <Clock startTime={test.startTime.toString()} duration={test.duration} />
      ) : (
        <div></div>
      )}
      <UserInfo />
    </header>
  );
};

export default Header;
