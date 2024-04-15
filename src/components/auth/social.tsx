"use client";

import { signIn } from "next-auth/react";

import { Button } from "~/components/ui/button";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { DEFAULT_LOGIN_REDIRECT } from "~/routes";

export default function Social() {
  const handleClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="mt-5 flex gap-3">
      <Button
        size="sm"
        variant="outline"
        className="w-full"
        onClick={() => handleClick("google")}
      >
        <FcGoogle className="size-5" />
      </Button>
      <Button
        size="sm"
        variant="outline"
        className="w-full"
        onClick={() => handleClick("github")}
      >
        <FaGithub className="size-5" />
      </Button>
    </div>
  );
}
