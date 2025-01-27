import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { models } from "@/utils";

export const RolesTableHeader = () => {
  return (
    <TableHeader className="sticky top-0 z-10 bg-muted text-muted-foreground [&_tr]:border-0">
      <TableRow className="bg-transparent hover:bg-transparent">
        <TableHead
          className={cn(
            "text-sm font-semibold text-muted-foreground 2xl:text-base capitalize dark:bg-[#1D1F24] rounded-l-lg"
          )}
        >
          Role
        </TableHead>
        {models
          .filter((el) => el.name != "WORKFLOW")
          .map((model) => (
            <TableHead
              key={model.name}
              className="text-sm font-semibold text-muted-foreground 2xl:text-base capitalize dark:bg-[#1D1F24]"
            >
              {model.name}
            </TableHead>
          ))}
        <TableHead className="text-sm font-semibold text-muted-foreground 2xl:text-base capitalize dark:bg-[#1D1F24] rounded-r-lg"></TableHead>
      </TableRow>
    </TableHeader>
  );
};
