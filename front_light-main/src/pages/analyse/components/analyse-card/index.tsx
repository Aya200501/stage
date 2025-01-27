import { AnalyseType, AnalyseConfigsType } from "@/utils";
import { Card } from "@/components/ui/card";
import { env } from "@/lib/env";
import { Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AddAnalyseDialog } from "../AddAnalyseDialog";
import { useConfirmDialog } from "@/components/confirm-dialog";
import { useState } from "react";
import { useSWRConfig } from "swr";
import { useGlobalContext } from "@/Context";
import { toast } from "sonner";

interface AnalyseCardProps {
  analyse: AnalyseType;
  mutateKey: string;
  ability: number;
}

export const AnalyseCard = ({
  analyse,
  ability,
  mutateKey,
}: AnalyseCardProps) => {
  const { backendApi } = useGlobalContext();
  const { mutate } = useSWRConfig();
  const [isPending, setIsPending] = useState(false);
  const { confirm } = useConfirmDialog();

  const deleteAnalyse = async (id: string) => {
    confirm({
      confirmTitle: "Are you sure?",
      confirmMessage:
        "This action cannot be undone. Are you sure you want to proceed?",
      onConfirm: async () => {
        try {
          setIsPending(true);
          await backendApi.DeleteById("analyse", id);
          mutate(mutateKey);
          toast.success("Analyse deleted successfully");
        } catch (error) {
          console.error("error", error);
        } finally {
          setIsPending(false);
        }
      },
    });
  };

  return (
    <div className="flex flex-col gap-2.5 relative">
      <div className="flex flex-col gap-0.5 group">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-medium capitalize">{analyse.name}</h3>
          <Button
            className={cn(
              "opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-40 size-8 !p-0",
              ability !== 3 && "hidden",
              analyse.disabled && "hidden"
            )}
            variant="ghost"
            onClick={() => deleteAnalyse(analyse.id)}
            disabled={isPending || ability !== 3}
          >
            <Trash2Icon size={16} className="text-red-500" />
          </Button>
          <AddAnalyseDialog
            key={JSON.stringify(analyse)}
            type="edit"
            mutateKey={mutateKey}
            disabled={ability < 2 || (analyse.disabled ?? false)}
            analyseId={analyse.id}
            defaultValues={{
              name: analyse.name ?? "",
              parents: analyse.parents?.map(
                (parent: { name: string; id: string }) => ({
                  value: parent.id ?? "",
                  label: parent.name ?? "",
                })
              ),
              description: analyse.description ?? "",
              configs: analyse.configSchema
                ?.analyseConfigs as AnalyseConfigsType[],
              aiCode: analyse.aiCode ?? "",
            }}
            iconUrl={`${env.VITE_BACKEND_API}/uploads/${analyse.icon}`}
            triggerClassName="relative top-0 right-2"
          />
        </div>
        <p className="text-sm font-medium text-gray-300 first-letter:uppercase">
          {analyse.description}
        </p>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(19rem,1fr))] gap-4">
        {analyse.children &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          analyse.children.map((child: any) => (
            <Card
              key={child.id}
              className={cn(
                "flex items-center gap-4 text-center group px-4 py-3 pr-10 relative ",
                child.disabled && "opacity-40"
              )}
            >
              <div className="size-[clamp(4rem,15vw,3.5rem)] min-w-[4rem]">
                <img
                  src={
                    child.icon
                      ? `${env.VITE_BACKEND_API}/uploads/${child.icon}`
                      : "/icons/noImage.svg"
                  }
                  alt="icon"
                  className="object-contain w-full h-full flex-1"
                  onError={(e) => {
                    e.currentTarget.src = "/icons/noImage.svg";
                  }}
                />
              </div>
              <span className="line-clamp-2 text-left text-sm font-semibold capitalize">
                {child.name}
              </span>
              <Button
                className={cn(
                  "absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-40 size-8 !p-0",
                  ability !== 3 && "hidden",
                  child.disabled && "hidden"
                )}
                variant="ghost"
                onClick={() => deleteAnalyse(child.id)}
                disabled={isPending || ability !== 3}
              >
                <Trash2Icon size={16} className="text-red-500" />
              </Button>
              <AddAnalyseDialog
                key={JSON.stringify(child)}
                type="edit"
                mutateKey={mutateKey}
                disabled={ability < 2 || (child.disabled ?? false)}
                analyseId={child.id}
                defaultValues={{
                  name: child.name ?? "",
                  parents: child.parents?.map(
                    (parent: { name: string; id: string }) => ({
                      value: parent.id ?? "",
                      label: parent.name ?? "",
                    })
                  ),
                  aiCode: child.aiCode ?? "",
                  description: child.description ?? "",
                  configs: child.configSchema
                    ?.analyseConfigs as AnalyseConfigsType[],
                }}
                iconUrl={`${env.VITE_BACKEND_API}/uploads/${child.icon}`}
              />
            </Card>
          ))}
      </div>
    </div>
  );
};
