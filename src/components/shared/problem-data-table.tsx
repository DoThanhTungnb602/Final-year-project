"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableRow } from "~/components/ui/table";

import { PublicProblems } from "~/server/api/client";

const fallbackData: PublicProblems[] = [];

interface ProblemDataTableProps<TData extends { id?: string }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function ProblemDataTable<TData extends { id?: string }, TValue>({
  columns,
  data,
}: ProblemDataTableProps<TData, TValue>) {
  const table = useReactTable({
    getRowId: (row, index) => row.id ?? index.toString(),
    data: data ?? fallbackData,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="flex w-full flex-col justify-between overflow-auto rounded-md border">
      <Table>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
