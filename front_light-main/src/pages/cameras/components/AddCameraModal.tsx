/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogClose,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CameraMarks, addCameraFormSteps } from "@/utils/constants";
import { Timelinesection } from "@/components/Timelinesection";

import {
  useForm,
  FieldName,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";

import { Generalinformations } from "./Generalinformations";
import {
  AddCameraSchema,
  AddCameraDefaultValues,
  AddCameraType,
} from "@/utils/schemas";
import { z } from "zod";
import { NetworkSettings } from "./NetworkSettings";
import { CameraType } from "@/utils";
import { useGlobalContext } from "@/Context";

import { toast } from "sonner";
import { Pencil, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { BallLoader } from "@/components/ball-loader";
import { useCameras } from "../store";
import { useCameraLocationStore } from "./camera-locations/store";

interface AddCameraModalProps {
  triggerSize?: "small" | "large";
  disabled?: boolean;
  type?: "new" | "edit";
  defaultValues?: AddCameraType;
  cameraId?: string;
}

export const AddCameraModal = ({
  cameraId,
  type = "new",
  disabled = false,
  triggerSize = "large",
  defaultValues = AddCameraDefaultValues,
}: AddCameraModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [open, setOpen] = useState(false);
  const form = useForm<FieldValues>({
    resolver: zodResolver(AddCameraSchema),
    defaultValues: defaultValues,
  });
  const { items, setItems } = useCameras();
  const setSelectedLocations = useCameraLocationStore(
    (state) => state.setSelectedLocations
  );

  const { backendApi } = useGlobalContext();

  const replaceValues = (obj: any, cameraMark: string) => {
    const defaultRtspLink = CameraMarks.find(
      (mark) => mark.mark === cameraMark
    )?.rtspLink;

    if (!defaultRtspLink) return "";

    let newRtspLink = defaultRtspLink;

    for (const key in obj) {
      newRtspLink = newRtspLink.replace(`<${key}>`, obj[key]);
    }
    return newRtspLink;
  };

  const addCamera: SubmitHandler<FieldValues> = async (data) => {
    try {
      const selectedData = data as AddCameraType;

      const cameraObject = {
        name: selectedData.cameraName,
        model: selectedData.model,
        brand: selectedData.mark,
        description:
          selectedData.description === ""
            ? undefined
            : selectedData.description,
        groupId:
          selectedData.area !== "" ? selectedData.area : selectedData.site,
        type: selectedData.cameraType,
        ipAdress: selectedData.ipAddress,
        port: parseInt(selectedData.rtspPort),
        username: selectedData.username,
        password: selectedData.password,
        latitude: selectedData.position.lat,
        longitude: selectedData.position.lng,
        config: {
          httpPort: parseInt(selectedData.httpPort),
          onvifPort: parseInt(selectedData.onvifPort),
          rtspLinkLocal: selectedData.rtspLinkLocal
            ? selectedData.rtspLinkLocal
            : undefined,
          rtspLink:
            selectedData.mark === "other"
              ? selectedData.rtspLink
              : replaceValues(
                  {
                    user: selectedData.username,
                    pass: selectedData.password,
                    cameraip: selectedData.ipAddress,
                    port: selectedData.rtspPort,
                  },
                  selectedData.mark
                ),
        },
      };

      if (type === "edit" && cameraId) {
        try {
          const result: CameraType = await backendApi.update(
            "camera",
            cameraId,
            cameraObject,
            {
              include: {
                group: {
                  include: {
                    parent: {
                      include: {
                        parent: {
                          include: {
                            parent: true,
                          },
                        },
                      },
                    },
                  },
                },
                cameraAnalyses: {
                  select: {
                    id: true,
                    name: true,
                    analyses: {
                      select: {
                        id: true,
                        name: true,
                        icon: true,
                      },
                    },
                  },
                },
              },
            }
          );
          toast.success("Camera updated successfully");
          reset();

          setItems([
            ...items.map((item) =>
              item.id === cameraId ? { ...item, ...result } : item
            ),
          ]);
        } catch (error) {
          toast.error("Error updating camera");
          console.error(error);
        }
      } else if (type === "new") {
        try {
          const result: CameraType = await backendApi.create(
            "camera",
            cameraObject,
            {
              include: {
                group: {
                  include: {
                    parent: {
                      include: {
                        parent: {
                          include: {
                            parent: true,
                          },
                        },
                      },
                    },
                  },
                },
                cameraAnalyses: {
                  select: {
                    id: true,
                    name: true,
                    analyses: {
                      select: {
                        id: true,
                        name: true,
                        icon: true,
                      },
                    },
                  },
                },
              },
            }
          );
          toast.success("Camera created successfully");
          reset();
          if (items && Array.isArray(items)) {
            setItems([...items, result]);
          } else {
            setItems([result]);
          }
        } catch (error) {
          toast.error("Error creating camera");
          console.error(error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleNext = async () => {
    const fields = addCameraFormSteps[currentStep].fields;
    const output = await form.trigger(
      fields as FieldName<z.infer<typeof AddCameraSchema>>[],
      { shouldFocus: true }
    );
    if (!output) return;
    if (currentStep <= addCameraFormSteps.length - 1) {
      if (currentStep === addCameraFormSteps.length - 1) {
        await form.handleSubmit(addCamera)();
        return;
      }
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const reset = () => {
    setCurrentStep(0);
    setOpen(false);
    setSelectedLocations("REGION", null);
    form.reset();
  };

  const { t } = useTranslation();
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && reset()}>
      <DialogTrigger asChild>
        <Button
          disabled={disabled}
          className={cn(
            "flex items-center justify-center gap-2.5 rounded-sm bg-transparent text-lg font-semibold hover:bg-[#2196F3]/5 disabled:cursor-not-allowed",
            triggerSize === "large" &&
              "h-full  min-h-[18.7rem] flex-col gap-4 border-2 border-dashed border-[#2196F3] text-[#2196F3] text-base",
            type === "new" &&
              triggerSize === "small" &&
              "!order-1 h-10 gap-1.5 bg-[#4CAF50]/10 px-3.5 md:pr-5 py-0 text-xs text-[#4CAF50] hover:bg-[#4CAF50]/20 sm:!order-2",
            type === "edit" &&
              "gap-3 bg-[#F5F7FA]/10 text-xs text-[#F5F7FA] hover:bg-[#F5F7FA]/5 hover:text-[#F5F7FA]/70"
          )}
          onClick={() => {
            setOpen(true);
          }}
        >
          <span
            className={cn(
              "flex items-center justify-center rounded-full",
              triggerSize === "large" && "size-20 bg-[#2196F31A]"
            )}
          >
            {type === "new" ? (
              <Plus
                className={cn("size-5", triggerSize === "large" && "size-10")}
              />
            ) : (
              <Pencil className="size-5" />
            )}
          </span>
          {type === "new" ? (
            <span className="first-letter:uppercase">{t("addCamera")}</span>
          ) : (
            <span className="first-letter:uppercase">{t("editCamera")}</span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full text-sm max-w-screen-xl h-full sm:h-fit sm:max-h-[calc(100svh_-_4rem)] flex flex-col max-sm:px-4">
        <DialogHeader className="dark:text-white space-y-4 h-fit text-left">
          <DialogClose
            className="absolute top-0 right-0 m-4"
            onClick={() => reset()}
          />
          <DialogTitle className="first-letter:uppercase">
            {t("addCamera")}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-1  h-full w-full gap-6 overflow-auto">
          <div className="flex h-full w-full max-w-48 flex-col">
            {addCameraFormSteps.map((step, index) => (
              <Timelinesection
                key={index}
                index={index + 1}
                title={t(step.title)}
                description={t(step.description)}
                isActive={currentStep >= index}
                isLast={index === addCameraFormSteps.length - 1}
              />
            ))}
          </div>
          <div className="flex flex-1 w-full flex-col gap-8">
            <Form {...form}>
              <ScrollArea className="flex-1">
                <form
                  className="flex w-full flex-col gap-5 lg:gap-7 flex-1 h-full px-4"
                  onSubmit={() => form.handleSubmit(addCamera)}
                >
                  <div className="flex flex-col">
                    <h3 className="text-xl font-semibold">
                      {t(addCameraFormSteps[currentStep].title)}
                    </h3>
                    <p className="text-sm">
                      {t(addCameraFormSteps[currentStep].description)}
                    </p>
                  </div>
                  {currentStep === 0 ? (
                    <Generalinformations
                      control={form.control}
                      watch={form.watch}
                      setValue={form.setValue}
                    />
                  ) : (
                    <NetworkSettings
                      control={form.control}
                      watch={form.watch}
                    />
                  )}
                </form>
              </ScrollArea>
            </Form>
            <div className="flex w-full items-center justify-between">
              <Button
                className="bg-transparent px-10 text-[#F5F7FA] hover:bg-white/20 focus-visible:ring-0 focus-visible:ring-offset-0"
                onClick={() => reset()}
                disabled={form.formState.isSubmitting}
              >
                {t("cancel")}
              </Button>
              <div className="flex items-center gap-5">
                <Button
                  variant="ghost"
                  className={cn(
                    "hidden bg-transparent px-10 text-[#F5F7FA] hover:bg-white/20 focus-visible:ring-0 focus-visible:ring-offset-0",
                    currentStep === 1 && "block"
                  )}
                  onClick={handlePrevious}
                >
                  {t("previous")}
                </Button>
                <Button
                  className={cn(
                    "px-10 text-[#F5F7FA] focus-visible:ring-0 focus-visible:ring-offset-0 items-center justify-center relative min-w-[7rem] font-semibold capitalize"
                  )}
                  onClick={handleNext}
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <BallLoader />
                  ) : (
                    <>
                      {currentStep === addCameraFormSteps.length - 1
                        ? type === "edit"
                          ? t("edit")
                          : t("add")
                        : t("next")}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
