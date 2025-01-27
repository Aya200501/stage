/* eslint-disable @typescript-eslint/no-explicit-any */
import { flatten, TableWidgetData } from "@/utils";
import { memo } from "react";
import { format } from "date-fns";
import { Formatter } from "../formatter";
import { useGlobalContext } from "@/Context";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import { useConfirmDialog } from "@/components/confirm-dialog";

export const TableRow = memo(
  ({
    item,
    mappings,
    onDeleted,
  }: {
    item: any;
    mappings: TableWidgetData["mappings"];
    onDeleted: (id: string) => void;
  }) => {
    const { currentGroup, user, backendApi } = useGlobalContext();
    const ability =
      currentGroup?.getAbilityWithModel("USER", user?.isSuperAdmin) ?? 0;

    const { confirm } = useConfirmDialog();

    const handleDelete = async (data: any) => {
      const id = data._id;
      console.log({ data });
      if (!id) return;
      try {
        await backendApi.DeleteById("history", id);
        onDeleted(id);
        toast.success("Deleted successfully");
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete");
      }
    };
    return (
      <div
        className="grid gap-2 py-3 items-center [&>*]:px-2"
        style={{
          gridTemplateColumns: `repeat(${
            mappings.length + (ability === 3 ? 2 : 1)
          }, 1fr)`,
        }}
      >
        {mappings.map((m) => {
          const value =
            flatten(item)[
              (m.telemetryName === "screenshot" ? "" : "results.") +
                m.telemetryName
            ];
          return (
            <div key={m.telemetryName} className="truncate">
              <Formatter value={value} displayFormat={m.displayFormat} />
            </div>
          );
        })}
        <div>{format(new Date(item.createdAt), "PP p")}</div>
        {ability === 3 && (
          <div className="grid place-content-start">
            <Button
              variant={"ghost"}
              size={"icon"}
              onClick={() => {
                confirm({
                  // title: "Delete",
                  // description: "Are you sure you want to delete this item?",
                  onConfirm: () => handleDelete(item),
                });
              }}
            >
              <Trash2Icon size={20} />
            </Button>
          </div>
        )}
      </div>
    );
  }
);
