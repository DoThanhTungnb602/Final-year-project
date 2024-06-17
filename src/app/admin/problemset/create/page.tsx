import { ProblemForm } from "~/components/pages/problemset/problem-form";

export default async function Page() {
  return (
    <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
      <ProblemForm _mode="create" />
    </div>
  );
}
