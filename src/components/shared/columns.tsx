"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "~/components/ui/badge";
import { GrDocumentVerified } from "react-icons/gr";
import { MdNotInterested } from "react-icons/md";
import { Checkbox } from "../ui/checkbox";
import { ProblemWithStatus } from "~/lib/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import Link from "next/link";



// export const userProblemColumns: ColumnDef<ProblemWithStatus>[] = [
//   {
//     id: "select",
//     header: ({ table }) => (
//       <Checkbox
//         checked={
//           table.getIsAllPageRowsSelected() ||
//           (table.getIsSomePageRowsSelected() && "indeterminate")
//         }
//         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//         aria-label="Select all"
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value) => row.toggleSelected(!!value)}
//         aria-label="Select row"
//       />
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },
//   {
//     accessorKey: "status",
//     header: "Status",
//     cell: ({ row }) => {
//       const status = row.original.status;
//       if (status === "ACCEPTED") {
//         return (
//           <TooltipProvider>
//             <Tooltip>
//               <TooltipTrigger asChild>
//                 <span>
//                   <IoMdCheckmarkCircleOutline className="h-6 w-6 text-green-400" />
//                 </span>
//               </TooltipTrigger>
//               <TooltipContent>
//                 <p>Solved</p>
//               </TooltipContent>
//             </Tooltip>
//           </TooltipProvider>
//         );
//       } else if (status === "ATTEMPTED") {
//         return (
//           <TooltipProvider>
//             <Tooltip>
//               <TooltipTrigger asChild>
//                 <span>
//                   <SiTarget className="h-6 w-6 text-gray-300" />
//                 </span>
//               </TooltipTrigger>
//               <TooltipContent>
//                 <p>Attempted</p>
//               </TooltipContent>
//             </Tooltip>
//           </TooltipProvider>
//         );
//       } else {
//         return (
//           <TooltipProvider>
//             <Tooltip>
//               <TooltipTrigger asChild>
//                 <span>
//                   <MdOutlineRadioButtonUnchecked className="h-6 w-6 text-gray-300" />
//                 </span>
//               </TooltipTrigger>
//               <TooltipContent>
//                 <p>UnSolved</p>
//               </TooltipContent>
//             </Tooltip>
//           </TooltipProvider>
//         );
//       }
//     },
//   },
//   {
//     accessorKey: "name",
//     header: "Problem",
//   },
//   {
//     accessorKey: "solution",
//     header: "Solution",
//     cell: ({ row }) => {
//       const solution = row.original.solution;

//       return (
//         <>
//           {solution ? (
//             <GrDocumentVerified className="h-6 w-6 text-green-400" />
//           ) : (
//             <MdNotInterested className="h-6 w-6 text-gray-300" />
//           )}
//         </>
//       );
//     },
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
