"use client";

import { Code2, ClipboardList } from "lucide-react";
import { SiGoogleclassroom } from "react-icons/si";

import { Button } from "~/components/ui/button";
import { ModeToggle } from "../shared/mode-toggle";
import Link from "next/link";
import CustomTooltip from "~/components/shared/custom-tooltip";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";

const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="inset-y fixed left-0 z-20 flex h-full flex-col border-r">
      <div className="border-b p-2">
        <Button variant="outline" size="icon" aria-label="Dashboard" asChild>
          <Link href="/admin/problemset">
            <Code2 className="size-5" />
          </Link>
        </Button>
      </div>
      <nav className="grid gap-1 p-2">
        <CustomTooltip content="Problemset" side="right">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "rounded-lg",
              pathname === "/admin/problemset" && "bg-muted",
            )}
            aria-label="Problemset"
            asChild
          >
            <Link href="/admin/problemset">
              <ClipboardList className="size-5" />
            </Link>
          </Button>
        </CustomTooltip>
        <CustomTooltip content="Classes" side="right">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "rounded-lg",
              pathname === "/admin/classes" && "bg-muted",
            )}
            aria-label="Classes"
            asChild
          >
            <Link href="/admin/classes">
              <SiGoogleclassroom className="size-5" />
            </Link>
          </Button>
        </CustomTooltip>
      </nav>
      <nav className="mt-auto grid gap-1 p-2">
        <ModeToggle />
      </nav>
    </aside>
  );
};

export default AdminSidebar;
