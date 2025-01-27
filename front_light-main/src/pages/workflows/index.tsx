/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGlobalContext } from "@/Context";
import { Unauthorized } from "@/components/403";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import {
  Edit2Icon,
  MoreHorizontalIcon,
  PlusIcon,
  SearchIcon,
  Trash2Icon,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
  Tooltip,
} from "@/components/ui/tooltip";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useSWR, { mutate } from "swr";
import { env } from "@/lib/env";

const workflows: {
  id: string;
  name: string;
  description: string;
  isDisabled: boolean;
  users: { fullName: string; image: string }[];
}[] = [];

const statusOptions = {
  all: "#ABBED1",
  active: "#4CAF50",
  inactive: "#FF6163",
};

type TStatus = keyof typeof statusOptions;

function WorkflowsPage() {
  const { user, backendApi } = useGlobalContext();
  const [status, setStatus] = useState<TStatus>("all");
  const { cameraId } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data, isLoading } = useSWR(
    `/workflows?cameraId?=${cameraId}`,
    async () => {
      if (!cameraId) return [];
      const data = await backendApi.findMany("workflow", {
        select: {
          id: true,
          name: true,
          description: true,
          isDisabled: true,
        },
        where: {
          cameraAnalyse: {
            cameraId,
          },
        },
      });
      return data.results || [];
    }
  );

  // const filteredWorkflows = workflows.filter((workflow) => {
  //   if (status === "all") return true;
  //   return status === "active" ? workflow.isDisabled : !workflow.isDisabled;
  // });
  if (!user?.isSuperAdmin) {
    return <Unauthorized />;
  }

  return (
    <main className="flex h-full w-full flex-col gap-3 max-md:px-4 max-md:pb-4 md:gap-4">
      <div className="flex items-center gap-3">
        <div className="w-60 relative">
          <SearchIcon
            className="absolute bottom-1/2 left-4 translate-y-1/2 text-foreground/50"
            size={20}
          />
          <Input
            placeholder={t("search")}
            className="pl-12 bg-card placeholder:capitalize"
          />
        </div>
        {Object.entries(statusOptions)?.map(([key, value]) => (
          <Button
            key={key}
            className="bg-card text-foreground border dark:border-none hover:bg-card hover:scale-110 gap-2 hover:-rotate-2 duration-300 active:rotate-2 active:scale-95 transition-transform"
            onClick={() => setStatus(key as TStatus)}
          >
            <svg className="size-5" viewBox="0 0 24 24">
              {key === status && (
                <motion.circle
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  cx="12"
                  cy="12"
                  r="6"
                  fill={value}
                />
              )}
              <circle
                cx="12"
                cy="12"
                r="10"
                strokeWidth="2"
                fill="none"
                stroke={value}
              />
            </svg>
            <span className="capitalize font-semibold">{t(key)}</span>
          </Button>
        ))}
        <Link className="ml-auto" to={`/workflows/workflow/${cameraId}`}>
          <Button className="gap-2">
            <PlusIcon size={20} />
            <span className="first-letter:uppercase">
              {t("create workflow")}
            </span>
          </Button>
        </Link>
      </div>
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          loading
        </div>
      ) : !data || data.length === 0 || !cameraId ? (
        <div className="flex items-center justify-center h-full w-full">
          <p className="text-center text-2xl font-semibold">
            No workflows found for this camera
          </p>
        </div>
      ) : (
        <ScrollArea>
          <div
            key={status}
            className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(20rem,1fr))]"
          >
            {((data as typeof workflows) || [])?.map((workflow, index) => {
              return (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={index}
                  className="bg-card dark:bg-[#1D1F24] p-4 space-y-3 shadow-lg shadow-[#7f7f7f0f]"
                >
                  <div className="flex items-center justify-end">
                    <span className="mr-auto truncate">{workflow.name}</span>
                    <Switch
                      defaultChecked={workflow?.isDisabled}
                      className="scale-75 [&>.thumb]:bg-white data-[state=checked]:bg-sky-500"
                    />
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          size="icon"
                          className="size-9"
                          variant={"ghost"}
                        >
                          <MoreHorizontalIcon size={20} />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="flex flex-col w-min p-2">
                        <Button
                          className="gap-2 hover:text-sky-500"
                          variant="ghost"
                          onClick={() => {
                            navigate(
                              `/workflows/workflow/${cameraId}/${workflow.id}`
                            );
                          }}
                        >
                          <Edit2Icon size={16} />
                          <span className="w-12 text-left">Edit</span>
                        </Button>
                        <Button
                          className="gap-2 hover:text-red-500"
                          variant="ghost"
                          onClick={() => {
                            backendApi
                              .DeleteById("workflow", workflow.id)
                              .then(() => {
                                mutate(`/workflows?cameraId?=${cameraId}`);
                              });
                          }}
                        >
                          <Trash2Icon size={16} />
                          <span className="w-12 text-left">Delete</span>
                        </Button>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <p className="text-xs line-clamp-4 min-h-[4rem]">
                    {workflow.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {(workflow?.users || [])
                        ?.slice(0, 5)
                        .map((user, index) => (
                          <TooltipProvider key={index}>
                            <Tooltip delayDuration={150}>
                              <TooltipTrigger>
                                <Avatar className="size-10 hover:z-10 hover:scale-125 transition-transform border-2 border-background">
                                  <AvatarImage
                                    src={
                                      env.VITE_BACKEND_API +
                                      "/uploads/" +
                                      user?.image
                                    }
                                    alt={user?.fullName}
                                  />
                                  <AvatarFallback>
                                    <span>
                                      {user?.fullName?.slice(0, 2) || ""}
                                    </span>
                                  </AvatarFallback>
                                </Avatar>
                              </TooltipTrigger>
                              <TooltipContent side="top" align="center">
                                {user?.fullName}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ))}
                      {(workflow?.users || [])?.length > 5 && (
                        <Avatar className="size-8 flex items-center justify-center bg-background text-foreground">
                          <span className="font-bold">
                            +{(workflow?.users?.length || 5) - 5}
                          </span>
                        </Avatar>
                      )}
                    </div>
                    <span className="capitalize text-sm">hourly</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </ScrollArea>
      )}
    </main>
  );
}

export default WorkflowsPage;
