"use client";

import Link from "next/link";

import { Button } from "~/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";

import { ModeToggle } from "~/components/shared/mode-toggle";
import { UserInfo } from "~/components/shared/user-info";
import { FaClipboardList, FaTrophy } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";
import { Code2, Menu, Package2 } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="grid w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] h-full">
      <div className="hidden border-r md:block h-full">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center justify-between border-b px-4 lg:h-[60px] lg:px-6">
            <Link
              href="/admin"
              className="flex items-center gap-2 font-semibold"
            >
              <Code2 className="size-5" />
              <span className="">Teet Code</span>
            </Link>
            <ModeToggle />
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="#"
                className={cn(
                  "flex items-center gap-3 rounded px-3 py-2 transition-all hover:text-primary",
                  pathname === "/admin/problemset"
                    ? "bg-muted text-primary"
                    : "text-muted-foreground",
                )}
              >
                <FaClipboardList />
                Problem
              </Link>
              <Link
                href="#"
                className={cn(
                  "flex items-center gap-3 rounded px-3 py-2 transition-all hover:text-primary",
                  pathname === "/admin/class"
                    ? "bg-muted text-primary"
                    : "text-muted-foreground",
                )}
              >
                <SiGoogleclassroom />
                Class
              </Link>
              <Link
                href="#"
                className={cn(
                  "flex items-center gap-3 rounded px-3 py-2 transition-all hover:text-primary",
                  pathname === "/admin/contest"
                    ? "bg-muted text-primary"
                    : "text-muted-foreground",
                )}
              >
                <FaTrophy />
                Contest
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col h-full overflow-hidden">
        <header className="flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                  href="#"
                  className={cn(
                    "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground",
                    pathname === "/admin/problemset"
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  <FaClipboardList />
                  Problem
                </Link>
                <Link
                  href="#"
                  className={cn(
                    "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground",
                    pathname === "/admin/class"
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  <SiGoogleclassroom />
                  Class
                </Link>
                <Link
                  href="#"
                  className={cn(
                    "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground",
                    pathname === "/admin/contest"
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  <FaTrophy />
                  Contest
                </Link>
              </nav>
              <div className="mt-auto">
                <ModeToggle />
              </div>
            </SheetContent>
          </Sheet>
          <UserInfo />
        </header>
        <main className="flex flex-1 flex-col gap-3 p-4 lg:gap-4 lg:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
