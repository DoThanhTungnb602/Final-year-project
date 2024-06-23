import { ProblemForm } from "~/components/pages/problemset/problem-form";
import { api } from "~/trpc/server";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const problem = await api.problem.getPublicProblemById(id);

  return <>{problem && <ProblemForm problem={problem} _mode="view" />}</>;
}
