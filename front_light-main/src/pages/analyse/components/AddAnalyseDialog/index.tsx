import {
  Dialog,
  DialogClose,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { ImagePlus, Pencil, PlusIcon, SaveIcon, Undo2Icon } from "lucide-react";
import { useState } from "react";
import MultipleSelector, { Option } from "@/components/MultipleSelector";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGlobalContext } from "@/Context";
import { toast } from "sonner";
import useSWR, { useSWRConfig } from "swr";
import { AnalyseType } from "@/utils/api-types";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddEditAnalyseSchema, AddEditAnalyseDefaultValues } from "./schema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { FormInput } from "@/components/FormInput";
import { z } from "zod";
import { useTranslation } from "react-i18next";

const OPTIONS: Option[] = [
  { label: "Scale Up", value: "scale-up" },
  { label: "Scale Down", value: "scale-down" },
  { label: "Rotate", value: "rotate" },
  { label: "Crop", value: "crop" },
  { label: "Draw Polygon", value: "polygon" },
  { label: "Draw Polyline", value: "polyline" },
];

interface AddAnalyseDialog {
  type?: "new" | "edit";
  defaultValues?: z.infer<typeof AddEditAnalyseSchema>;
  mutateKey: string;
  disabled: boolean;
  iconUrl?: string;
  analyseId?: string;
  triggerClassName?: string;
}

export const AddAnalyseDialog = ({
  type = "new",
  mutateKey,
  disabled,
  defaultValues = AddEditAnalyseDefaultValues,
  iconUrl = "",
  analyseId = "",
  triggerClassName,
}: AddAnalyseDialog) => {
  const { t } = useTranslation();
  const form = useForm<FieldValues>({
    resolver: zodResolver(AddEditAnalyseSchema),
    defaultValues: defaultValues,
  });

  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [selectedParent, setSelectedParent] = useState<Option[]>(
    type === "edit" ? defaultValues?.parents || [] : []
  );
  const [selectedConfigs, setSelectedConfigs] = useState<Option[]>(
    type === "edit"
      ? (defaultValues.configs || [])
          .map((config) => OPTIONS.find((o) => o.value === config))
          .filter((option): option is Option => option !== undefined)
      : []
  );

  const { backendApi } = useGlobalContext();
  const { mutate } = useSWRConfig();

  const reset = () => {
    setImage(null);
    if (type === "new") {
      setSelectedConfigs([]);
      setSelectedParent([]);
    }
    form.reset();
    setOpen(false);
  };

  const {
    data: analyses,
    isLoading: isLoadingAnalyse,
    error: errorAnalyse,
  } = useSWR("all_analyse", async () => {
    const { results } = await backendApi.findMany<AnalyseType>("analyse", {
      where: {
        parents: {
          none: {},
        },
      },
    });
    return results;
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    const formData = new FormData();

    const configs = { analyseConfigs: data.configs };
    formData.append("name", data.name);
    if (data.description) formData.append("description", data.description);
    formData.append("configSchema", JSON.stringify(configs));
    if (data.aiCode) formData.append("aiCode", data.aiCode);
    formData.append(
      "parents",
      JSON.stringify((data?.parents || []).map((p: Option) => p.value))
    );
    if (image) {
      formData.append("iconFile", image);
    }
    if (type === "new") {
      try {
        mutate(mutateKey, async (data: unknown) => {
          const analyses = data as AnalyseType[];
          const result = await backendApi.create("analyse", formData);
          toast.success("Analyse created successfully");
          reset();
          return [...analyses, result];
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        if (!analyseId) return;
        mutate(mutateKey, async (data: unknown) => {
          const analyses = data as AnalyseType[];
          const result = await backendApi.update(
            "analyse",
            analyseId,
            formData
          );
          toast.success("Analyse updated successfully");
          reset();
          return (analyses || [])?.map((a) =>
            a.id === analyseId ? result : a
          );
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && reset()}>
      <DialogTrigger asChild>
        <Button
          disabled={disabled}
          className={cn(
            "gap-2",
            type === "edit" &&
              "absolute right-2 top-11 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-40 size-8 !p-0",
            disabled && "hidden",
            triggerClassName
          )}
          onClick={() => setOpen(true)}
          variant={type === "new" ? "default" : "ghost"}
          size={type === "new" ? "default" : "icon"}
        >
          {type === "new" ? (
            <>
              <PlusIcon size={18} />
              <span className="first-letter:uppercase">{t("add analyze")}</span>
            </>
          ) : (
            <Pencil size={16} />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full text-sm max-w-screen-sm h-full sm:max-h-[calc(100svh_-_4rem)] flex flex-col max-sm:px-4 ">
        <DialogHeader className="dark:text-white space-y-4 h-fit sm:px-4 text-left">
          <DialogClose
            className="absolute top-0 right-0 m-4"
            onClick={() => reset()}
          />
          <DialogTitle className="first-letter:uppercase">
            {type === "new" ? t("add analyze") : t("edit analyze")}
          </DialogTitle>
          <DialogDescription className="dark:text-white">
            {type === "new"
              ? t("add a new Analyse to the list")
              : t("edit the Analyse details")}
          </DialogDescription>
        </DialogHeader>
        {isLoadingAnalyse ? (
          <div className="flex items-center justify-center h-full w-full">
            <h3 className="text-2xl font-medium">{t("loading")}</h3>
          </div>
        ) : errorAnalyse ? (
          <div className="flex items-center justify-center h-full w-full">
            <h3 className="text-2xl font-medium">{t("an error occurred")}</h3>
          </div>
        ) : (
          <Form {...form}>
            <form
              className="flex flex-col flex-1 h-full overflow-auto"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <ScrollArea className="flex flex-col gap-4 h-full overflow-auto">
                <div className="grid grid-cols gap-4 sm:px-4">
                  <FormInput
                    control={form.control}
                    name="name"
                    label="Name"
                    placeholder="Analyse Name"
                  />
                  <FormInput
                    control={form.control}
                    name="description"
                    label="Description"
                    placeholder="Analyse Description"
                  />
                  <FormInput
                    control={form.control}
                    name="aiCode"
                    label="AI Code"
                    placeholder="Analyse AI Code"
                  />
                  <div className="flex flex-col space-y-2">
                    <div className="text-sm font-medium text-[#F5F7FA]">
                      selected parent Analyse
                    </div>
                    <FormField
                      name="parents"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <MultipleSelector
                              placeholder="Select parent Analyse"
                              defaultOptions={
                                analyses?.map((a) => ({
                                  label: a.name,
                                  value: a.id,
                                })) || []
                              }
                              value={selectedParent}
                              onChange={(item: Option[]) => {
                                setSelectedParent(item);
                                field.onChange(item);
                              }}
                              emptyIndicator={
                                <p className="text-center  text-gray-600 dark:text-gray-400">
                                  no results found.
                                </p>
                              }
                            />
                          </FormControl>
                          <FormMessage className="text-[#D22627]" />
                        </FormItem>
                      )}
                    />
                  </div>
                  {(!selectedParent || selectedParent?.length === 0) && (
                    <div className="flex flex-col space-y-2">
                      <div className="text-sm font-medium text-[#F5F7FA]">
                        Analyse config
                        <span className="text-red-500">*</span>
                      </div>
                      <FormField
                        control={form.control}
                        name="configs"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <MultipleSelector
                                canRemove={type !== "edit"}
                                defaultOptions={OPTIONS}
                                placeholder="Select Analyse Configs"
                                value={selectedConfigs}
                                onChange={(item: Option[]) => {
                                  setSelectedConfigs(item);
                                  field.onChange(item?.map((i) => i.value));
                                }}
                                emptyIndicator={
                                  <p className="text-center  text-gray-600 dark:text-gray-400">
                                    no results found.
                                  </p>
                                }
                              />
                            </FormControl>
                            <FormMessage className="text-[#D22627]" />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  <div className="space-y-2 flex flex-col">
                    <span className="text-sm font-medium">Analyse Icon</span>
                    <Label className="w-full flex items-center justify-center sm:min-h-52 border-2 border-dashed border-[#979797] cursor-pointer rounded-md aspect-video">
                      <Input
                        className="mt-4 hidden"
                        type="file"
                        name="iconFile"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setImage(file);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      {image || iconUrl ? (
                        <div className="grid place-items-center px-1 overflow-hidden">
                          <img
                            src={image ? URL.createObjectURL(image) : iconUrl}
                            alt="icon"
                            className="object-contain rounded-md overflow-hidden size-[clamp(4rem,20vw,17rem)]"
                            onError={(e) => {
                              e.currentTarget.src = "/icons/noImage.svg";
                            }}
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col gap-5 h-full justify-center items-center text-[#979797]">
                          <ImagePlus size={60} />
                          <span className="first-letter:uppercase">
                            {t("click to upload icon")}
                          </span>
                        </div>
                      )}
                    </Label>
                  </div>
                </div>
              </ScrollArea>
              <div className="flex justify-end [&>button]:w-24  [&>button]:gap-2 gap-4 mt-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={reset}
                  type="button"
                >
                  <Undo2Icon size={16} />
                  <span className="first-letter:uppercase">{t("cancel")}</span>
                </Button>
                <Button size="sm" type="submit">
                  <SaveIcon size={16} />
                  <span className="first-letter:uppercase">{t("save")}</span>
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};
