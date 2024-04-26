"use client";

import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { FaList } from "react-icons/fa6";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Badge } from "~/components/ui/badge";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { useRouter } from "next/navigation";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    difficulty: 1,
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    difficulty: 1,
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    difficulty: 3,
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    difficulty: 2,
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    difficulty: 1,
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    difficulty: 2,
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    difficulty: 3,
  },
];

export function ProblemList() {
  const router = useRouter();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="space-x-2 font-semibold" size="sm">
          <FaList className="me-2" /> Problem list
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="!max-w-[600px] sm:w-[600px]">
        <SheetHeader>
          <SheetTitle>Problem List</SheetTitle>
          <SheetDescription>
            This is a list of all the problems that are available.
          </SheetDescription>
        </SheetHeader>
        <div className="my-5">
          <Table className="border">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead>Problem</TableHead>
                <TableHead className="w-[100px] text-center">
                  Difficulty
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice, index) => (
                <TableRow
                  key={invoice.invoice}
                  onClick={() => {
                    console.log("Clicked on problem");
                    router.push("/");
                  }}
                  className="cursor-pointer"
                >
                  <TableCell className="font-medium">
                    {index % 2 === 0 ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span>
                              <IoMdCheckmarkCircleOutline className="h-6 w-6 text-green-400" />
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Solved</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      <MdOutlineRadioButtonUnchecked className="h-6 w-6 text-gray-300" />
                    )}
                  </TableCell>
                  <TableCell>{invoice.paymentStatus}</TableCell>
                  <TableCell className="text-center">
                    {invoice.difficulty === 1 && (
                      <Badge className="bg-primary">Easy</Badge>
                    )}
                    {invoice.difficulty === 2 && (
                      <Badge className="bg-amber-400 hover:bg-amber-400/80">
                        Medium
                      </Badge>
                    )}
                    {invoice.difficulty === 3 && (
                      <Badge variant="destructive">Hard</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </SheetContent>
    </Sheet>
  );
}
