"use client";

import { cn } from "~/lib/utils";
import { useRouter } from "next/navigation";

type Props = {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
  className?: string;
};

const LoginButton = ({
  children,
  mode = "redirect",
  asChild,
  className,
}: Props) => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/auth/login");
  };

  if (mode === "modal") {
    // TODO: Implement modal login
    return <div>Implement modal login</div>;
  }

  return (
    <span onClick={handleClick} className={cn("cursor-pointer", className)}>
      {children}
    </span>
  );
};

export default LoginButton;
