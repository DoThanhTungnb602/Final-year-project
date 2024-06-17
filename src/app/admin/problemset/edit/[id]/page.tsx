import { ProblemForm } from "~/components/pages/problemset/problem-form";
import { api } from "~/trpc/server";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const problem = await api.problem.getById(id);

  return (
    <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
      {problem && <ProblemForm problem={problem} />}
    </div>
  );
}
