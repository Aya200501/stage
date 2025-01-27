import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface DataTableHeaderProps {
  columns: string[];
}

export const DataTableHeader = ({ columns }: DataTableHeaderProps) => {
  return (
    <TableHeader className="sticky top-0 z-10 bg-muted text-muted-foreground [&_tr]:border-0">
      <TableRow className="bg-transparent hover:bg-transparent">
        {columns.map((column, index) => (
          <TableHead
            key={column}
            className={cn(
              "text-sm font-semibold text-muted-foreground 2xl:text-base capitalize dark:bg-[#1D1F24]",
              index === 0 && "rounded-l-lg",
              index === columns.length - 1 && "rounded-r-lg"
            )}
          >
            {column}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
};
