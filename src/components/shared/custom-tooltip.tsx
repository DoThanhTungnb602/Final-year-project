"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "~/components/ui/tooltip";

type Props = {
  children?: React.ReactNode;
  content: string;
  side: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  delayDuration?: number;
};

const CustomTooltip = ({
  children,
  content,
  side = "top",
  sideOffset = 5,
  delayDuration = 100,
}: Props) => {
  return (
    <TooltipProvider delayDuration={delayDuration}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side} sideOffset={sideOffset}>
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CustomTooltip;
