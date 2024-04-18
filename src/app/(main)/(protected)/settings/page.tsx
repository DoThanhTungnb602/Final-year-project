"use client";

import { useCurrentUser } from "~/hooks/use-current-user";

export default function SettingPage() {
  const currentUser = useCurrentUser();
  return (
    <div>
      <h1>{JSON.stringify(currentUser)}</h1>
    </div>
  );
}
