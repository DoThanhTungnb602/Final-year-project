import { CgSpinner } from "react-icons/cg";
import { cn } from "~/lib/utils";

export const Spinner = ({ className }: { className?: string }) => {
  return <CgSpinner className={cn("animate-spin w-6 h-6", className)} />;
};
