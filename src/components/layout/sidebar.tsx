"use client";

import { Code2, Settings2, Home } from "lucide-react";
import { SiGoogleclassroom } from "react-icons/si";

import { Button } from "~/components/ui/button";
import { ModeToggle } from "../shared/mode-toggle";
import Link from "next/link";
import CustomTooltip from "~/components/shared/custom-tooltip";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="inset-y fixed left-0 z-20 flex h-full flex-col border-r">
      <div className="border-b p-2">
        <Button variant="outline" size="icon" aria-label="Home" asChild>
          <Link href="/">
            <Code2 className="size-5" />
          </Link>
        </Button>
      </div>
      <nav className="grid gap-1 p-2">
        <CustomTooltip content="Home" side="right">
          <Button
            variant="ghost"
            size="icon"
            className={cn("rounded-lg", pathname === "/" && "bg-muted")}
            aria-label="Home"
            asChild
          >
            <Link href="/">
              <Home className="size-5" />
            </Link>
          </Button>
        </CustomTooltip>
        <CustomTooltip content="Classes" side="right">
          <Button
            variant="ghost"
            size="icon"
            className={cn("rounded-lg", pathname === "/classes" && "bg-muted")}
            aria-label="Classes"
            asChild
          >
            <Link href="/classes">
              <SiGoogleclassroom className="size-5" />
            </Link>
          </Button>
        </CustomTooltip>
        {
          // <CustomTooltip content="Tasks" side="right">
          //           <Button
          //             variant="ghost"
          //             size="icon"
          //             className={cn("rounded-lg", pathname === "/tasks" && "bg-muted")}
          //             aria-label="Tasks"
          //             asChild
          //           >
          //             <Link href="/tasks">
          //               <BiTask className="size-5" />
          //             </Link>
          //           </Button>
          //         </CustomTooltip>
        }
        <CustomTooltip content="Settings" side="right">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "rounded-lg",
              pathname.startsWith("/settings") && "bg-muted",
            )}
            aria-label="Settings"
            asChild
          >
            <Link href="/settings">
              <Settings2 className="size-5" />
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

export default Sidebar;
