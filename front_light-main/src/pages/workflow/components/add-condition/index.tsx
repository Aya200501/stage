/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CirclePlus, CircleX } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import useSWR from "swr";
import { useStoreFlow } from "../../store";
import { useGlobalContext } from "@/Context";
import { DialogClose, DialogTitle } from "@radix-ui/react-dialog";
import { useRef, useState } from "react";

const formatData = (
  data: {
    name: string;
    value: string | number | boolean | Record<string, unknown>;
  }[]
) => {
  const processValue = (name: string, value: unknown): any => {
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      return Object.keys(value).flatMap((key) => {
        return processValue(
          `${name}.${key}`,
          (value as Record<string, unknown>)[key]
        );
      });
    }
    return { name };
  };
  return data.flatMap((ele) => processValue(ele.name, ele.value));
};

const formSchema = z.object({
  label: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  statements: z.array(
    z.object({
      telemetryName: z.string().min(2, {
        message: "telemetry must be at least 2 characters.",
      }),
      operator: z.string().min(1, {
        message: "operator must be at least 2 characters.",
      }),
      value: z.string(),
    }),
  ),
  duration: z
    .string({
      message: "duration must be a number.",
    })
    .transform((value) => {
      return Number(value);
    }),
  level: z.enum(["INFO", "WARNING", "CRITICAL"]),
  repeat: z
    .string({
      message: "repeat must be a number.",
    })
    .transform((value) => {
     
      return Number(value);
    }),
});

const loadingForm = () => {
  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="flex flex-col gap-6 flex-1">
        {Array.from({ length: 5 }).map((_, index) => {
          return <Skeleton key={index} className="h-12 w-full" />;
        })}
      </div>
      <div className="flex justify-end">
        <Skeleton className="h-12 w-32" />
      </div>
    </div>
  );
};



interface statementsType {
  telemetryName: string;
  operator: string;
  value: string;
}

function AddCondition({
  onAddCondition,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onAddCondition: (condition: any) => void;
}) {
  const { backendApi } = useGlobalContext();
  const { nodeObjectBlock } = useStoreFlow();
  const refClose = useRef<HTMLButtonElement>(null);
  const [statements, setStatements] = useState<statementsType[]>([
    {
      telemetryName: "",
      operator: "",
      value: "",
    },
  ]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: "",
      statements: [
        {
          telemetryName: "",
          operator: "",
          value: "",
        },
      ],
      duration: 0,
      repeat: 0,
      level: "INFO",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onAddCondition(values);
    form.reset();
    setStatements([
      {
        telemetryName: "",
        operator: "",
        value: "",
      },
    ]);
    refClose.current?.click();
  }

  const operators = [
    { value: ">", label: "superior" },
    { value: "<", label: "inferior" },
    { value: ">=", label: "superior or equal" },
    { value: "<=", label: "inferior or equal" },
    { value: "==", label: "equal" },
    { value: "!=", label: "different" },
  ];

  const level = [
    { value: "INFO", label: "info" },
    { value: "WARNING", label: "warning" },
    { value: "CRITICAL", label: "critical" },
  ];
  const { data, isLoading } = useSWR(
    `telemetry?analyseId=${nodeObjectBlock}`,
    async () => {
      const { results } = await backendApi.findMany("telemetry", {
        where: {
          cameraAnalyseId: nodeObjectBlock,
        },
        select: {
          name: true,
          value: true,
        },
      });
      return results as {
        name: string;
        value: string | number | boolean | Record<string, unknown>;
      }[];
    }
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="w-full flex gap-2"
          variant={"ghost"}
          disabled={!nodeObjectBlock}
        >
          <span>Add Config Alert</span>
          <CirclePlus size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="h-fit max-h-full overflow-y-auto">
        <div className="flex-1 flex flex-col gap-6 h-full">
          <DialogTitle className="text-lg font-bold">
            Add config Alert
          </DialogTitle>
          <div className="flex-1 p-2 h-1">
            {isLoading ? (
              loadingForm()
            ) : (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className=" h-full"
                >
                  <DialogClose className="hidden" ref={refClose} />
                  <div className="flex-1 h-[calc(100%-2rem)] flex flex-col space-y-2">
                    <FormField
                      control={form.control}
                      name="label"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>label</FormLabel>
                          <FormControl>
                            <Input placeholder="label" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {
                      <FormField
                        control={form.control}
                        name="statements"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>statements</FormLabel>
                            {statements.map((statement, index) => (
                              <div
                                key={index}
                                className="flex gap-2 items-center"
                              >
                                <Select
                                  onValueChange={(value) => {
                                    const newStatements = [...statements];
                                    newStatements[index].telemetryName = value;
                                    setStatements(newStatements);
                                    field.onChange(newStatements);
                                  }}
                                  defaultValue={statement.telemetryName}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue
                                        placeholder="
                                select a telemetry
                                "
                                      />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {formatData(data || [])?.map(
                                      (telemetry, index) => (
                                        <SelectItem
                                          key={index}
                                          value={telemetry.name}
                                        >
                                          {telemetry.name}
                                        </SelectItem>
                                      )
                                    )}
                                  </SelectContent>
                                </Select>
                                <Select
                                  onValueChange={(value) => {
                                    const newStatements = [...statements];
                                    newStatements[index].operator = value;
                                    setStatements(newStatements);
                                    field.onChange(newStatements);
                                  }}
                                  defaultValue={statement.operator}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue
                                        placeholder="select an operator"
                                      />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {operators?.map((operator) => (
                                      <SelectItem
                                        key={operator.value}
                                        value={operator.value}
                                      >
                                        {operator.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <Input
                                  placeholder="value"
                                  value={statement.value}
                                  onChange={(e) => {
                                    const newStatements = [...statements];
                                    newStatements[index].value = e.target.value;
                                    setStatements(newStatements);
                                    field.onChange(newStatements);
                                  }}
                                />
                                <Button
                                  variant="ghost"
                                  size={"icon"}
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    if (statements.length === 1) {
                                      return;
                                    }
                                    const newStatements = [...statements];
                                    newStatements.splice(index, 1);
                                    setStatements(newStatements);
                                    field.onChange(newStatements);
                                  }}
                                >
                                  <CircleX size={20} />
                                </Button>
                              </div>
                            ))}
                            <div className="">
                            <Button
                              variant="ghost"
                              type="button"
                              
                              onClick={(e) => {
                                e.preventDefault();
                                setStatements([
                                  ...statements,
                                  {
                                    telemetryName: "",
                                    operator: "",
                                    value: "",
                                  },
                                ]);
                              }}
                            >
                              Add statement
                            </Button>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    }
                    <FormField
                      control={form.control}
                      name="level"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>level</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue
                                  placeholder="
                                select a telemetry
                                "
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {level?.map((level) => (
                                <SelectItem
                                  key={level.value}
                                  value={level.value}
                                >
                                  {level.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                 

                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>duration</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="repeat"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>repeat</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" className="w-32 ">
                      Add config
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddCondition;
