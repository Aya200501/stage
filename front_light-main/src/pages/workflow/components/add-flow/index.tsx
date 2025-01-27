import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { useStoreFlow } from "../../store";

const flowSchema = z.object({
  name: z.string().min(3, "The name must be at least 3 characters long"),
  description: z
    .string()
    .min(3, "The description must be at least 3 characters long"),
});

export type FlowType = z.infer<typeof flowSchema>;

function AddFlow({
  disabled,
  SaveFlow,
  EditFlow,
  isAddFlow = true,
}: {
  disabled: boolean;
  isAddFlow: boolean;
  SaveFlow: (data: FlowType) => void;
  EditFlow: (data: FlowType) => void;
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { cameraId } = useParams();
  const { editNodeData } = useStoreFlow();
  const form = useForm<z.infer<typeof flowSchema>>({
    resolver: zodResolver(flowSchema),
    defaultValues: {
      name: editNodeData?.name,
      description: editNodeData?.description,
    },
  });

  const onSubmit = (data: FlowType) => {
    isAddFlow ? SaveFlow(data) : EditFlow(data);
    form.reset();
    const btn = document.getElementById("close-flow");
    btn?.click();
    navigate(`/workflows/${cameraId}`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="absolute top-4 left-4 z-20 w-[6rem] first-letter:uppercase bg-emerald-500 hover:bg-emerald-500/80"
          size={"sm"}
          disabled={disabled}
        >
          {isAddFlow ? t("addFlow") : t("editFlow")}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogClose className="hidden" id="close-flow">
          Close
        </DialogClose>

        <DialogHeader>
          <DialogTitle>{isAddFlow ? t("addFlow") : t("editFlow")}</DialogTitle>
          <DialogDescription>
            {isAddFlow
              ? "Add a new flow to your workflow"
              : "Edit the flow to your workflow"}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>name</FormLabel>
                    <FormControl>
                      <Input placeholder="name" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="description" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">
                {isAddFlow ? t("addFlow") : t("edit Flow")}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddFlow;
