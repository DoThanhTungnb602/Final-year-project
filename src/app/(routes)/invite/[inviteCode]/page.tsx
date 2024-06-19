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

  const existingClass = await api.class.existingClass();

  if (existingClass) {
    redirect(`/classes/${existingClass.id}`);
  }

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
