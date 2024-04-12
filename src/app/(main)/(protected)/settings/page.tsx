import { auth } from "~/server/auth";

export default async function SettingPage() {
  const session = await auth();
  return (
    <div>
      <h1>{JSON.stringify(session)}</h1>
    </div>
  );
}
