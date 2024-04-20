"use client";

import { signIn } from "next-auth/react";

import { Button } from "~/components/ui/button";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { DEFAULT_LOGIN_REDIRECT } from "~/routes";

enum Provider {
  Google = "google",
  Github = "github",
}

export default function Social() {
  const handleClick = async (provider: Provider) => {
    await signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="mt-5 flex gap-3">
      <Button
        size="sm"
        variant="outline"
        className="w-full"
        onClick={() => handleClick(Provider.Google)}
      >
        <FcGoogle className="size-5" />
      </Button>
      <Button
        size="sm"
        variant="outline"
        className="w-full"
        onClick={() => handleClick(Provider.Github)}
      >
        <FaGithub className="size-5" />
      </Button>
    </div>
  );
}
