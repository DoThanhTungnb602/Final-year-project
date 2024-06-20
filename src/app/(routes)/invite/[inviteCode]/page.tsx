import { redirect } from "next/navigation";
import { api } from "~/trpc/server";

export default async function Page({
  params,
}: {
  params: {
    inviteCode: string;
  };
}) {
  const { inviteCode } = params;

  const _class = await api.class.enroll({
    inviteCode,
  });

  if (_class) {
    redirect(`/classes/${_class.id}`);
  } else {
    redirect(`/`);
  }

  return null;
}
