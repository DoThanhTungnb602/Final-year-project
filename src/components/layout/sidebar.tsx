import {
  Book,
  Bot,
  Code2,
  Settings2,
  SquareTerminal,
  SquareUser,
} from "lucide-react";

import { Button } from "~/components/ui/button";
import { ModeToggle } from "../shared/mode-toggle";
import Link from "next/link";
import CustomTooltip from "~/components/shared/custom-tooltip";

type Props = {};

const Sidebar = (props: Props) => {
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
        <CustomTooltip content="Playground" side="right">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-lg bg-muted"
            aria-label="Playground"
          >
            <SquareTerminal className="size-5" />
          </Button>
        </CustomTooltip>
        <CustomTooltip content="Models" side="right">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-lg"
            aria-label="Models"
          >
            <Bot className="size-5" />
          </Button>
        </CustomTooltip>
        <CustomTooltip content="API" side="right">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-lg"
            aria-label="API"
          >
            <Code2 className="size-5" />
          </Button>
        </CustomTooltip>
        <CustomTooltip content="Documentation" side="right">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-lg"
            aria-label="Documentation"
          >
            <Book className="size-5" />
          </Button>
        </CustomTooltip>
        <CustomTooltip content="Settings" side="right">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-lg"
            aria-label="Settings"
          >
            <Settings2 className="size-5" />
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
