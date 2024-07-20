"use client";

import { Card, CardContent } from "~/components/ui/card";
import { RadialChart } from "../shared/radial-chart";
import { PublicSubmission } from "~/server/api/client";
import { Badge } from "~/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { cn } from "~/lib/utils";
import { DataTable } from "../shared/data-table";
import { api } from "~/trpc/react";
import Link from "next/link";
import { Separator } from "../ui/separator";

export function StatsComponent() {
  const columns: ColumnDef<PublicSubmission>[] = [
    {
      accessorKey: "problem",
      header: "Question",
      cell: ({ row }) => {
        return (
          <Link
            href={`/problem/${row.original.problem.id}`}
            className="transition-all hover:underline"
          >
            {row.original.problem.title}
          </Link>
        );
      },
    },
    {
      accessorKey: "verdict",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.verdict;
        return (
          <div>
            <p
              className={cn(
                "text-sm font-semibold",
                status === "ACCEPTED" ? "text-green-500" : "text-red-500",
              )}
            >
              {
                {
                  ACCEPTED: "Accepted",
                  WRONG_ANSWER: "Wrong Answer",
                  TIME_LIMIT_EXCEEDED: "Time Limit Exceeded",
                  RUNTIME_ERROR: "Runtime Error",
                  MEMORY_LIMIT_EXCEEDED: "Memory Limit Excceeded",
                  COMPILATION_ERROR: "Compilation Error",
                }[status]
              }
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "language",
      header: "Language",
      cell: ({ row }) => (
        <Badge variant="secondary">{row.original.language.name}</Badge>
      ),
    },
  ];

  const allSubmissionsQuery = api.submission.all.useQuery();

  const { data: allPublicProblem } = api.problem.allPublic.useQuery();

  return (
    <div className="h-full w-full space-y-5 overflow-auto">
      <Card>
        <CardContent>
          {allPublicProblem && (
            <div className="flex justify-between pt-6">
              <div>
                <div className="text-center font-semibold text-green-500">
                  Easy
                </div>
                <RadialChart
                  chartData={[
                    {
                      solved:
                        allPublicProblem?.filter(
                          (p) =>
                            p.difficulty === "EASY" && p.status === "ACCEPTED",
                        ).length ?? 0,
                      total:
                        allPublicProblem?.filter((p) => p.difficulty === "EASY")
                          .length ?? 0,
                      fill: "#22c55e",
                    },
                  ]}
                />
              </div>
              <div>
                <div className="text-center font-semibold text-yellow-500">
                  Medium
                </div>
                <RadialChart
                  chartData={[
                    {
                      solved:
                        allPublicProblem?.filter(
                          (p) =>
                            p.difficulty === "MEDIUM" &&
                            p.status === "ACCEPTED",
                        ).length ?? 0,
                      total:
                        allPublicProblem?.filter(
                          (p) => p.difficulty === "MEDIUM",
                        ).length ?? 0,
                      fill: "#eab308",
                    },
                  ]}
                />
              </div>
              <div>
                <div className="text-center font-semibold text-red-500">
                  Hard
                </div>
                <RadialChart
                  chartData={[
                    {
                      solved:
                        allPublicProblem?.filter(
                          (p) =>
                            p.difficulty === "HARD" && p.status === "ACCEPTED",
                        ).length ?? 0,
                      total:
                        allPublicProblem?.filter((p) => p.difficulty === "HARD")
                          .length ?? 0,
                      fill: "#ef4444",
                    },
                  ]}
                />
              </div>
            </div>
          )}
          <Separator />
          <h2 className="mt-6 text-center text-xl font-semibold">
            All submissions
          </h2>
          <DataTable
            columns={columns}
            pagination={true}
            data={allSubmissionsQuery.data ?? []}
          />
        </CardContent>
      </Card>
    </div>
  );
}
