"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Card, CardContent } from "~/components/ui/card";
import { IoDocumentText } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
import { useProblemStore } from "~/hooks/use-problem-store";
import DefaultLoadingPage from "~/components/shared/default-loading-page";
import { Badge } from "~/components/ui/badge";
import { api } from "~/trpc/react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { DataTable } from "~/components/shared/data-table";
import { ColumnDef } from "@tanstack/react-table";

// const columns: ColumnDef<PublicProblems>[] = [
//   {
//     accessorKey: "status",
//     header: "Status",
//     cell: ({ row }) => {
//       const status = row.original.status;
//       if (status === "ACCEPTED") {
//         return (
//           <CustomTooltip content="Solved" side="top">
//             <span>
//               <IoMdCheckmarkCircleOutline className="h-6 w-6 text-green-400" />
//             </span>
//           </CustomTooltip>
//         );
//       } else if (status === "ATTEMPTED") {
//         return (
//           <CustomTooltip content="Attempted" side="top">
//             <span>
//               <SiTarget className="h-6 w-6 text-gray-300" />
//             </span>
//           </CustomTooltip>
//         );
//       } else {
//         return (
//           <CustomTooltip content="UnSolved" side="top">
//             <span>
//               <MdOutlineRadioButtonUnchecked className="h-6 w-6 text-gray-300" />
//             </span>
//           </CustomTooltip>
//         );
//       }
//     },
//   },
//   {
//     accessorKey: "title",
//     header: "Title",
//     cell: ({ row }) => (
//       <Link
//         href={`/problem/${row.original.id}`}
//         className="transition hover:underline"
//       >
//         {row.original.title}
//       </Link>
//     ),
//   },
//   {
//     accessorKey: "solution",
//     header: "Solution",
//     cell: ({ row }) => (
//       <>
//         {row.original.solution ? (
//           <GrDocumentVerified className="size-5 text-green-400" />
//         ) : (
//           <MdNotInterested className="size-6 text-gray-300" />
//         )}
//       </>
//     ),
//   },
//   {
//     accessorKey: "difficulty",
//     header: "Difficulty",
//     cell: ({ row }) => {
//       const problem = row.original;
//       return (
//         <>
//           {problem.difficulty === "EASY" && (
//             <Badge className="bg-primary">Easy</Badge>
//           )}
//           {problem.difficulty === "MEDIUM" && (
//             <Badge className="bg-amber-400 hover:bg-amber-400/80">Medium</Badge>
//           )}
//           {problem.difficulty === "HARD" && (
//             <Badge variant="destructive">Hard</Badge>
//           )}
//         </>
//       );
//     },
//   },
// ];

const SubmissionsPanel = () => {
  const { problem } = useProblemStore();
  const submissionsQuery = api.submission.all.useQuery(
    {
      problemId: problem?.id ?? "",
    },
    { enabled: !!problem },
  );

  const [activeTab, setActiveTab] = useState<
    "submissions" | "submissionDetail"
  >("submissions");

  return (
    <Tabs
      defaultValue="submissions"
      className="flex h-full w-full flex-col"
      value={activeTab}
    >
      <TabsContent value="submissions" className="min-h-0 flex-1">
      </TabsContent>
      <TabsContent value="submissionDetail" className="min-h-0 flex-1">
        <Button
          onClick={() => {
            setActiveTab("submissions");
          }}
        >
          Submisstions
        </Button>
        Submission Detail
      </TabsContent>
    </Tabs>
  );
};

export default SubmissionsPanel;
