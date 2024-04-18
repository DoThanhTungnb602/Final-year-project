"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { BeatLoader } from "react-spinners";
import CardWrapper from "~/components/shared/card-wrapper";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

const VerificationPage = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const verifyEmail = api.auth.verify.useMutation({
    onSuccess: (data) => {
      const { success } = data;
      if (success) {
        setSuccess(success);
      }
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const verify = useCallback(() => {
    if (success || error) {
      return;
    }
    if (!token) {
      setError("Missing token!");
      return;
    }
    verifyEmail.mutate({ token });
  }, [token, error]);

  useEffect(() => {
    verify();
  }, [verify]);

  return (
    <CardWrapper title="Verification">
      <div className="flex flex-col items-center gap-5">
        <p className="text-lg font-semibold text-zinc-600">
          Confirming your email address.
        </p>
        {!success && !error && <BeatLoader />}
        {error && (
          <div className="flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-red-500">
            <FaExclamationCircle className="size-5 shrink-0" />
            {error}
          </div>
        )}
        {success && (
          <div className="flex items-center gap-x-2 rounded-md bg-emerald-500/15 p-3 text-sm text-emerald-500">
            <FaCheckCircle className="size-5 shrink-0" />
            {success}
          </div>
        )}
        <Button asChild>
          <Link href="/auth/login">Back to login</Link>
        </Button>
      </div>
    </CardWrapper>
  );
};

export default VerificationPage;
