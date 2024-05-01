"use client";

import {
  Book,
  Bot,
  Code2,
  Settings2,
  SquareTerminal,
  Home,
} from "lucide-react";

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
        <CustomTooltip content="Playground" side="right">
          <Button
            variant="ghost"
            size="icon"
            className={cn("rounded-lg", pathname === "/playground" && "bg-muted")}
            aria-label="Playground"
            asChild
          >
            <Link href="/playground">
              <SquareTerminal className="size-5" />
            </Link>
          </Button>
        </CustomTooltip>
        <CustomTooltip content="Models" side="right">
          <Button
            variant="ghost"
            size="icon"
            className={cn("rounded-lg", pathname === "/models" && "bg-muted")}
            aria-label="Models"
          >
            <Link href="/">
              <Bot className="size-5" />
            </Link>
          </Button>
        </CustomTooltip>
        <CustomTooltip content="API" side="right">
          <Button
            variant="ghost"
            size="icon"
            className={cn("rounded-lg", pathname === "/api" && "bg-muted")}
            aria-label="API"
          >
            <Link href="/">
              <Code2 className="size-5" />
            </Link>
          </Button>
        </CustomTooltip>
        <CustomTooltip content="Documentation" side="right">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "rounded-lg",
              pathname === "/documentation" && "bg-muted",
            )}
            aria-label="Documentation"
          >
            <Link href="/">
              <Book className="size-5" />
            </Link>
          </Button>
        </CustomTooltip>
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
            <Link href="/settings/profile">
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
