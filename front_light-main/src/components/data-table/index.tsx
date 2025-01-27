import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  tableCellClassName?: string;
  tableHeadClassName?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  tableCellClassName = "",
  tableHeadClassName = "",
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const { t } = useTranslation();

  return (
    <Table
      className={cn(
        "w-full border-separate border-spacing-y-2 p-0",
        data.length === 0 && "h-full"
      )}
    >
      <TableHeader className="sticky top-0 z-10 bg-muted text-muted-foreground [&_tr]:border-0">
        {table.getHeaderGroups().map((headerGroup, index) => (
          <TableRow key={index} className="bg-transparent hover:bg-transparent">
            {headerGroup.headers.map((header, index) => {
              return (
                <TableHead
                  key={index}
                  className={cn(
                    "text-sm font-semibold text-muted-foreground 2xl:text-base capitalize dark:bg-[#191E24]",
                    // index === 0 && "rounded-l-lg",
                    // index === headerGroup.headers.length - 1 && "rounded-r-lg",
                    tableHeadClassName
                  )}
                  style={{
                    width: `${header.column.columnDef.size}px`,
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row, index) => (
            <TableRow
              key={index}
              data-state={row.getIsSelected() && "selected"}
              className=" border-0 bg-muted px-3.5 text-muted-foreground  hover:bg-muted hover:brightness-95"
            >
              {row.getVisibleCells().map((cell, index) => (
                <TableCell
                  key={index}
                  className={cn(
                    "border-0 p-3.5 text-xs font-semibold text-muted-foreground 2xl:text-sm",
                    // index === 0 && "rounded-l-lg",
                    // index === row.getVisibleCells().length - 1 &&
                    //   "rounded-r-lg",
                    cell.column.columnDef.id === "more" && "pl-0 text-right",
                    tableCellClassName
                  )}
                  style={{
                    width: `${cell.column.columnDef.size}px`,
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={columns.length}
              className="h-full flex-1 text-center text-2xl"
            >
              {t("No results were found")}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
