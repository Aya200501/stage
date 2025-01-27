/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  applyEdgeChanges,
  applyNodeChanges,
  useReactFlow,
  addEdge,
  Node,
  Edge,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDownIcon,
  Lock,
  LockOpen,
  Maximize,
  Minimize,
  MinusCircle,
  Pencil,
  PlusCircle,
  SaveAll,
  SquareFunction,
  Trash,
  XIcon,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslation } from "react-i18next";
import useSWR from "swr";
import { useGlobalContext } from "@/Context";
import { AnalyseType, FindManyParams, getPermissionLevel } from "@/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { env } from "@/lib/env";
import CustomEdge from "./components/edges/customeEdge";
import CustomNode from "./components/nodes/customNode";
import { useStoreFlow } from "./store";
import { useDebounce } from "@/hooks/useDebounce";
import EmailForm from "./components/forms/email";
import SmsForm from "./components/forms/sms";
import NotificationForm from "./components/forms/notification";
import { useParams } from "react-router-dom";
import AddCondition from "./components/add-condition";
import ConditionNode from "./components/nodes/conditionNode";
import { toast } from "sonner";
import React from "react";
import AddFlow from "./components/add-flow";
import Loader from "../dashboard/components/loader";
import MileStoneForm from "./components/forms/milestone";

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];
const flowDataFinal = (data: {
  nodes: any[];
  edges: any[];
  name: string;
  description: string;
}) => {
  const cameraAnalyse = data.nodes?.find(
    (node) => node.type === "CameraAnalyse"
  )?.data?.id;
  return {
    name: data.name,
    description: data.description,
    attributes: {
      nodes: data.nodes,
      edges: data.edges,
    },
    cameraAnalyse,
  };
};

// eslint-disable-next-line react-refresh/only-export-components
export default function Workflow() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const { nodeSelected, nodeObjectBlock, setNodeObjectBlock, setEditNodeData } =
    useStoreFlow();
  const { backendApi } = useGlobalContext();
  const { workflowId } = useParams();
  // const { screenToFlowPosition } = useReactFlow();

  const onDragOver = (
    event: React.DragEvent<HTMLDivElement> | React.DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const NodeTypes = useMemo(
    () =>
      ({
        CameraAnalyse: CustomNode,
        Action: CustomNode,
        ConditionNode: ConditionNode,
      } as any),
    []
  );

  const EdgeTypes = useMemo(
    () =>
      ({
        CustomEdge: CustomEdge,
      } as any),
    []
  );

  const onConnect = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (params: any) => {
      setEdges((edges) =>
        addEdge(
          {
            ...params,
            type: "CustomEdge",
            markerStart: {
              type: MarkerType.ArrowClosed,
              width: 20,
              height: 20,
              color: "gray",
            },
          },
          edges
        )
      );
    },
    [setEdges]
  );

  const onNodesChange = useCallback(
    (changes: any) => {
      setNodes(applyNodeChanges(changes, nodes));
    },
    [nodes]
  );

  const onEdgesChange = useCallback(
    (changes: any) => {
      setEdges(applyEdgeChanges(changes, edges));
    },
    [edges]
  );
  const {
    setSearch,
    search,
    setActionSelected,
    actionSelected,
    setNodeSelected,
  } = useStoreFlow();

  useEffect(() => {
    setNodeSelected(null);
    setActionSelected(null);
    setNodeObjectBlock(null);
  }, []);
  const ondrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("application/json");
    const item = JSON.parse(data);
    const { type, ...res } = item;
    if (item.type === "CameraAnalyse" && nodeObjectBlock) return;
    else if (item.type === "CameraAnalyse") {
      setNodeObjectBlock(item.id);
    }
    const canvas = event.currentTarget.getBoundingClientRect();
    const position = {
      x: event.clientX - canvas.left,
      y: event.clientY - canvas.top,
    };
    if (item.type === "Action") {
      console.log({ tkharbi9: item });
      setActionSelected({
        id: (item.id || Math.random().toString().replace(".", "")) as string,
        type: type || "customNode",
        position,
        data: {
          ...res,
        },
      });
      return;
    }
    setNodes((nodes) => [
      ...(nodes || []),
      {
        id: (item?.id || Math.random().toString().replace(".", "")) as string,
        type: type || "customNode",
        position,
        data: {
          ...res,
        },
      },
    ]);
    setActionSelected(null);
  };

  const deleteNode = (id: string) => {
    const newNodes = nodes.find((node) => node.id === id);
    if (newNodes?.type === "CameraAnalyse") {
      setNodes([]);
      setEdges([]);
      setNodeObjectBlock(null);
    } else {
      setNodes((nodes) => nodes.filter((node) => node.id !== id));
      setEdges((edges) => edges.filter((edge) => edge.source !== id));
    }
    setNodeSelected(null);
  };

  const copyNode = (id: string) => {
    const node = nodes.find((node) => node.id === id);
    if (node && node?.type === "CameraAnalyse") {
      toast.error("You can't copy this config analysis");
    } else if (node) {
      setNodes((nodes) => [
        ...nodes,
        {
          ...node,
          id: "copy-" + node.id,
          position: {
            x: node.position.x + 50,
            y: node.position.y + 50,
          },
        },
      ]);
    }
    setNodeSelected(null);
  };

  const editNode = (id: string) => {
    const node = nodes.find((node) => node.id === id);
    console.log({ node });
    if (node && node?.type === "Action") {
      setActionSelected({
        ...node,
        data: {
          ...node?.data,
          inputs: {
            ...(node.data.inputs || {}),
            recipients:
              (
                (node.data.inputs as any) || {
                  recipients: [],
                }
              )?.recipients?.map((user: any) => user.id) || [],
          },
        },
      });
    }
  };

  const FlowActions = [
    {
      name: "edit",
      icon: <Pencil size={20} />,
      fnc: editNode,
    },
    {
      name: "delete",
      icon: <Trash size={20} />,
      fnc: deleteNode,
    },
    {
      name: "copy",
      icon: <SaveAll size={20} />,
      fnc: copyNode,
    },
  ];
  const { t } = useTranslation();
  const [connectionLineStyle] = React.useState<any>({
    strokeWidth: 0.8,
    stroke: "#747874",
  });
  const { isLoading } = useSWR(
    "workflow?id=" + workflowId,
    async () => {
      if (!workflowId) {
        return {
          nodes: [],
          edges: [],
        };
      }
      const res: {
        attributes: {
          nodes: Node[];
          edges: Edge[];
        };
      } = await backendApi.FindById("workflow", workflowId, {
        select: {
          attributes: true,
          name: true,
          description: true,
        },
      });
      return res;
    },
    {
      onSuccess: (attr: any) => {
        const data = attr?.attributes;
        if (data) {
          setNodes(
            data.nodes.map((node: any) => {
              return {
                id: node?.data?.id,
                type: node?.type,
                position: node?.position,
                data: node.data,
              };
            })
          );
          setEdges(data.edges);
          setEditNodeData({
            name: attr.name,
            description: attr.description,
          });
          setNodeObjectBlock(
            data.nodes.find((node: any) => node.type === "CameraAnalyse")?.data
              ?.id
          );
        }
      },
    }
  );
  return (
    <div className="flex w-full min-h-[calc(100vh-8rem)] h-full flex-row  gap-6 flex-wrap relative">
      {isLoading && (
        <div className="absolute top-0 w-full h-full bg-muted/60 z-[9999] flex items-center justify-center">
          <Loader />
        </div>
      )}
      <ScrollArea className="h-full  bg-card shadow  text-muted-foreground  transition-colors rounded-md  w-72">
        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-col gap-1">
            <span className="text-lg">Toolbox</span>
            <span className="text-xs">
              An assortment of instruments utilized for specific functions and
              purposes.
            </span>
          </div>
          <div className="w-full pt-4">
            <Input
              placeholder="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <ObjectBlock />
          <Actions />
          <Conditions />
        </div>
      </ScrollArea>
      <ReactFlow
        className="w-full flex-1  relative h-[80%] rounded-lg overflow-hidden"
        snapGrid={[10, 50]}
        snapToGrid
        nodeTypes={NodeTypes}
        edgeTypes={EdgeTypes}
        nodes={nodes}
        edges={edges}
        fitView
        onDrop={ondrop}
        minZoom={0.5}
        maxZoom={2}
        onDragOver={onDragOver}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectionLineStyle={connectionLineStyle}
      >
        <ControlFlow />
        <AddFlow
          isAddFlow={workflowId ? false : true}
          disabled={nodes.length === 0}
          SaveFlow={(data) => {
            const custom_Nodes = nodes.map((node) => ({
              type: node.type,
              position: node.position,
              data: node.data,
              id: node.id,
            }));
            const custom_Edges = edges.map((edge) => ({
              id: edge.id,
              target: edge.target,
              source: edge.source,
              targetHandle: edge.targetHandle,
              sourceHandle: edge.sourceHandle,
              type: edge.type,
              markerStart: edge.markerStart,
            }));
            const res = flowDataFinal({
              nodes: custom_Nodes,
              edges: custom_Edges,
              name: data.name,
              description: data.description,
            });

            backendApi
              .create("workflow", res)
              .then(() => {
                toast.success("Flow added successfully");
              })
              .catch((err) => {
                toast.error("Error adding flow", err);
              });
          }}
          EditFlow={(data) => {
            if (!workflowId) return;
            const custom_Nodes = nodes.map((node) => ({
              type: node.type,
              position: node.position,
              data: node.data,
              id: node.id,
            }));
            const custom_Edges = edges.map((edge) => ({
              id: edge.id,
              target: edge.target,
              source: edge.source,
              targetHandle: edge.targetHandle,
              sourceHandle: edge.sourceHandle,
              type: edge.type,
              markerStart: edge.markerStart,
            }));
            const res = flowDataFinal({
              nodes: custom_Nodes,
              edges: custom_Edges,
              name: data.name,
              description: data.description,
            });

            backendApi
              .update("workflow", workflowId, res)
              .then(() => {
                toast.success("Flow updated successfully");
              })
              .catch((err) => {
                toast.error("Error updating flow", err);
              })
              .finally(() => {
                setEditNodeData({
                  name: "",
                  description: "",
                });
              });
          }}
        />
        <Background
          gap={20}
          size={1}
          variant={"lines" as BackgroundVariant}
          color={"#7f7f7f7f"}
          style={{
            transition: "background-color 0.2s",
          }}
        />
        {actionSelected && <ActionForm nodes={nodes} setNodes={setNodes} />}
        {nodeSelected && (
          <div className="absolute top-3 left-[50%] z-20 first-letter:uppercase  min-w-[13rem] -translate-x-1/2 rounded-md flex justify-between gap-4 p-1 overflow-hidden items-center bg-muted border border-gray-500/50">
            <div className="flex ">
              {FlowActions?.map((item, index) => (
                <Button
                  key={index}
                  className={cn(
                    `flex  group items-center  px-2 py-1.5 rounded`
                  )}
                  variant={"ghost"}
                  onClick={() => {
                    // setActionSelected(null);
                    item.fnc(nodeSelected?.id);
                  }}
                >
                  <div
                    className="grid group-hover:grid-cols-[1fr]
                  transition-[grid-template-columns] ease-linear
                overflow-hidden grid-cols-[0fr] group-hover:text-primary"
                  >
                    <div className=" overflow-hidden whitespace-nowrap">
                      <span className="w-14 inline-block first-letter:uppercase ">
                        {item.name}
                      </span>
                    </div>
                  </div>
                  <span className="group-hover:text-primary">{item.icon}</span>
                </Button>
              ))}
            </div>
            <Button size={"icon"} variant={"ghost"}>
              <XIcon
                size={20}
                onClick={() => {
                  setNodeSelected(null);
                }}
              />
            </Button>
          </div>
        )}
        {nodes.length === 0 && !actionSelected && (
          <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-center  border border-dashed border-white p-6 dark:bg-muted/90 bg-gray-400/60 flex flex-col gap-4 rounded-lg ">
            <img
              src="/icons/flow.svg"
              alt="empty"
              className="w-[25rem] aspect-video"
            />
            <span className="text-lg first-letter:uppercase">
              {t("drag your first block here")}
            </span>
          </div>
        )}
      </ReactFlow>
    </div>
  );
}

function ActionForm({
  nodes,
  setNodes,
}: {
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
}) {
  const { actionSelected, setActionSelected } = useStoreFlow();

  const addNodes = (node: any) => {
    setNodes([
      ...nodes,
      {
        ...(actionSelected as {
          id: string;
          type: string;
          position: { x: number; y: number };
          data: any;
        }),
        data: {
          ...actionSelected?.data,
          inputs: {
            ...node,
            type: actionSelected?.data.name,
          },
        },
      },
    ]);
    setActionSelected(null);
  };
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        className="absolute right-4 pb-4 w-80 top-4  bottom-4  rounded-md pt-3 bg-muted border border-gray-400/50 z-50 flex flex-col gap-3 "
      >
        <div className="w-full  justify-between gap-2  flex items-center pb-2 border-b px-3">
          <img
            src={actionSelected?.data.icon}
            alt={actionSelected?.data.name}
            className="size-7"
          />
          <div className="text-lg font-semibold first-letter:uppercase">
            {actionSelected?.data.name}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto"
            onClick={(e) => {
              e.stopPropagation();
              setActionSelected(null);
            }}
          >
            <XIcon size={20} className="text-gray-400" />
          </Button>
        </div>
        <ScrollArea className="h-1 [&>*]:px-3 flex-1 overflow-auto ">
          {actionSelected?.data?.name == "email" ? (
            <EmailForm
              onSubmitForm={(values) => {
                addNodes(values);
              }}
              inputs={{
                ...actionSelected?.data?.inputs,
                recipients:
                  actionSelected?.data?.inputs?.recipients?.map(
                    (user: any) => user
                  ) || [],
              }}
            />
          ) : actionSelected?.data?.name == "sms" ? (
            <SmsForm
              onSubmitForm={(values) => {
                addNodes(values);
              }}
              inputs={{
                ...actionSelected?.data?.inputs,
                recipients:
                  actionSelected?.data?.inputs?.recipients?.map(
                    (user: any) => user
                  ) || [],
              }}
            />
          ) : actionSelected?.data?.name == "milestone" ? (
            <MileStoneForm
              onSubmitForm={(values) => {
                addNodes(values);
              }}
              inputs={{
                ...actionSelected?.data?.inputs,
                recipients:
                  actionSelected?.data?.inputs?.recipients?.map(
                    (user: any) => user
                  ) || [],
              }}
            />
          ) : (
            actionSelected?.data?.name == "appNotification" && (
              <NotificationForm
                onSubmitForm={(values) => {
                  addNodes(values);
                }}
                inputs={{
                  ...actionSelected?.data?.inputs,
                  recipients: [],
                }}
              />
            )
          )}
        </ScrollArea>
      </motion.div>
    </AnimatePresence>
  );
}

function ControlFlow() {
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const [isLocked, setIsLocked] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  return (
    <div className="absolute  bottom-4 left-[50%] divide-x h-[2.7rem]  rounded-lg bg-white dark:bg-muted/90 border border-gray-100 z-50 justify-between flex items-center -translate-x-1/2 overflow-hidden">
      <Button
        variant={"ghost"}
        size={"icon"}
        className="rounded-none"
        onClick={() => {
          zoomIn();
        }}
      >
        <PlusCircle size={18} />
      </Button>
      <Button
        variant={"ghost"}
        className="rounded-none"
        size={"icon"}
        onClick={() => {
          zoomOut();
        }}
      >
        <MinusCircle size={18} />
      </Button>
      <Button
        variant={"ghost"}
        className="rounded-none"
        size={"icon"}
        onClick={() => {
          setIsFullScreen((prev) => !prev);
          if (isFullScreen) {
            fitView();
          } else {
            fitView({ padding: 0.1 });
          }
        }}
      >
        {isFullScreen ? <Minimize size={18} /> : <Maximize size={18} />}
      </Button>
      <Button
        className="rounded-none"
        variant={"ghost"}
        size={"icon"}
        onClick={() => {
          setIsLocked((prev) => !prev);
        }}
      >
        {!isLocked ? <LockOpen size={18} /> : <Lock size={18} />}
      </Button>
    </div>
  );
}

function ObjectBlock() {
  const [collapsed, setCollapsed] = useState(true);

  const { cameraId } = useParams();
  const toggleCollapsed = () => setCollapsed((prev) => !prev);
  const { search } = useStoreFlow();
  const searchDebounce = useDebounce(search, 500);
  const { backendApi, user, groupId } = useGlobalContext();
  const { nodeObjectBlock } = useStoreFlow();
  const params: FindManyParams = {
    where: {
      id: cameraId,
      cameraAnalyses: {
        some: {
          name: {
            contains: searchDebounce,
            mode: "insensitive",
          },
        },
      },
    },
    select: {
      cameraAnalyses: {
        select: {
          id: true,
          name: true,
          category: {
            select: {
              icon: true,
            },
          },
        },
      },
    },
  };

  const keyObjectBlock = `analyse?${JSON.stringify(params)}${searchDebounce}`;
  const permissionLevel = useMemo(
    () => getPermissionLevel(user, "ANALYSE", groupId),
    [user, groupId]
  );

  const { data, isLoading, error } = useSWR(keyObjectBlock, async () => {
    if (permissionLevel === 0) return [];
    const { results } = await backendApi.findMany<AnalyseType & any>(
      "camera",
      params
    );
    return results[0]?.cameraAnalyses || [];
  });

  return (
    <div className="">
      <div className=" py-1 flex items-center gap-2">
        <span className="text-base font-semibold">Object blocks</span>
        <Button
          variant="ghost"
          size={"icon"}
          className=" ml-auto"
          onClick={toggleCollapsed}
        >
          <ChevronDownIcon
            className={cn(" transition-transform duration-500", {
              "rotate-180": !collapsed,
            })}
            size={24}
          />
        </Button>
      </div>
      <motion.div
        className="max-h-[20rem] overflow-y-auto "
        initial={false}
        animate={{
          height: collapsed ? 0 : "auto",
        }}
      >
        {isLoading ? (
          <div className="flex flex-col gap-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton
                key={i}
                className="p-1 w-full flex items-center  bg-gray-600/60 gap-4"
              >
                <Skeleton className="w-10 h-10 rounded-md" />
                <Skeleton className="flex-1 h-[1.5rem] rounded-sm" />
              </Skeleton>
            ))}
          </div>
        ) : error ? (
          <div>Error</div>
        ) : data?.length === 0 ? (
          <div className="flex-col gap-2 min-h-[3em] flex items-center justify-center">
            <span className="text-sm font-semibold text-foreground/75">
              No object blocks found
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              data?.map((item: any, index: number) => (
                <div
                  key={index}
                  className="p-2 w-full flex items-center  bg-foreground/10 gap-4 rounded-lg cursor-pointer"
                  draggable={!nodeObjectBlock}
                  onDragStart={(e) => {
                    e.dataTransfer.setData(
                      "application/json",
                      JSON.stringify({
                        name: item.name,
                        description: item.name,
                        id: item.id,
                        type: "CameraAnalyse",
                        icon:
                          env.VITE_BACKEND_API +
                          "/uploads/" +
                          item.category.icon,
                      })
                    );
                  }}
                >
                  <div className="dark:bg-muted  rounded-md bg-white  ">
                    <img
                      src={
                        env.VITE_BACKEND_API + "/uploads/" + item.category.icon
                      }
                      alt={item.name}
                      className="w-8 h-8 rounded-md"
                    />
                  </div>
                  <div className="flex-1 h-[1.5rem] flex flex-col gap-1 max-w-[9rem]">
                    <span className="text-sm font-semibold truncate text-foreground/75">
                      {item.name}
                    </span>
                  </div>
                </div>
              ))
            }
          </div>
        )}
      </motion.div>
    </div>
  );
}

const ActionsData = [
  {
    name: "email",
    icon: "/icons/email.svg",
    description: "send internal email notification",
  },
  {
    name: "sms",
    icon: "/icons/sms.svg",
    description: "send internal SMS",
  },
  {
    name: "appNotification",
    icon: "/icons/notification.svg",
    description: "send in app notification",
  },
  {
    name: "milestone",
    icon: "/icons/milestone.svg",
    description: "send milestone",
  },
];
function Actions() {
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapsed = () => setCollapsed((prev) => !prev);
  const { nodeObjectBlock } = useStoreFlow();

  return (
    <div>
      <div className=" py-1 flex items-center gap-2">
        <span className="text-base font-semibold">Actions</span>
        <Button
          variant="ghost"
          size={"icon"}
          className=" ml-auto"
          onClick={toggleCollapsed}
        >
          <ChevronDownIcon
            className={cn(" transition-transform duration-500", {
              "rotate-180": !collapsed,
            })}
            size={24}
          />
        </Button>
      </div>
      <motion.div
        className="overflow-hidden"
        initial={false}
        animate={{
          height: collapsed ? 0 : "auto",
        }}
      >
        <div className="flex-1 flex flex-col gap-2">
          {ActionsData?.map((item: any, index: number) => (
            <div
              key={index}
              className="p-2 w-full flex items-center  bg-foreground/10 gap-4 rounded-lg cursor-pointer"
              draggable={nodeObjectBlock ? true : false}
              onDragStart={(e) => {
                e.dataTransfer.setData(
                  "application/json",
                  JSON.stringify({
                    ...item,
                    name: item.name,
                    description: item.description,
                    id: Math.random().toString().replace(".", ""),
                    type: "Action",
                  })
                );
              }}
            >
              <div className="dark:bg-muted p-1 rounded-md bg-white  ">
                <img
                  src={item.icon}
                  alt={item.name}
                  className="w-6 h-6 rounded-md  text-white"
                />
              </div>
              <div className="flex-1 h-[1.5rem] flex flex-col gap-1 max-w-[9rem]">
                <span className="text-sm font-semibold truncate text-foreground/75">
                  {item.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function Conditions() {
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapsed = () => setCollapsed((prev) => !prev);
  const { nodeObjectBlock } = useStoreFlow();
  const [config, setConfig] = useState<
    | {
        label: string;
        telemetry: string;
        operator: string;
        value: string;
        duration: number;
        repeat: number;
      }[]
    | null
  >(null);

  return (
    <div>
      <div className=" py-1 flex items-center gap-2">
        <span className="text-base font-semibold">Config Alerts</span>
        <Button
          variant="ghost"
          size={"icon"}
          className=" ml-auto"
          onClick={toggleCollapsed}
        >
          <ChevronDownIcon
            className={cn(" transition-transform duration-500", {
              "rotate-180": !collapsed,
            })}
            size={24}
          />
        </Button>
      </div>

      <motion.div
        className="overflow-hidden"
        initial={false}
        animate={{
          height: collapsed ? 0 : "auto",
        }}
      >
        <div className="flex flex-col gap-2">
          <AddCondition
            onAddCondition={(condition) => {
              setConfig((prev) => [...(prev || []), condition]);
            }}
          />
          {config?.map((item: any, index: number) => (
            <div
              key={index}
              className="p-2 w-full flex items-center  bg-foreground/10 gap-4 rounded-lg cursor-pointer"
              draggable={nodeObjectBlock ? true : false}
              onDragStart={(e) => {
                e.dataTransfer.setData(
                  "application/json",
                  JSON.stringify({
                    name: item.label,
                    description: item.label,
                    id: Math.random().toString().replace(".", ""),
                    type: "ConditionNode",
                    inputs: {
                      ...item,
                    },
                  })
                );
              }}
            >
              <div className="dark:bg-muted p-1 rounded-md bg-white  ">
                <SquareFunction />
              </div>
              <div className="flex-1 h-[1.5rem] flex flex-col gap-1 max-w-[9rem]">
                <span className="text-sm font-semibold truncate text-foreground/75">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
