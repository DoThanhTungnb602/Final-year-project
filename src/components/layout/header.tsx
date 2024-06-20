"use client";

import { UserInfo } from "~/components/shared/user-info";
import { ProblemSidebar } from "./problem-sidebar";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const isRenderProblemSidebar =
    pathname.startsWith("/problem") ||
    pathname.startsWith("/test") ||
    pathname.startsWith("/exercise");

  return (
    <header className="sticky top-0 z-10 flex h-[57px] shrink-0 items-center justify-between gap-1 border-b bg-background px-4">
      {isRenderProblemSidebar ? <ProblemSidebar /> : <div></div>}
      <UserInfo />
    </header>
  );
};

export default Header;
