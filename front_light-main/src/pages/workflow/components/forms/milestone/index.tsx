/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useGlobalContext } from "@/Context";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import useLocalStorage from "@/hooks/use-local-storage";
import { z } from "zod";
import axios from "axios";
import { env } from "@/lib/env";
import * as qs from "qs";
import { FormSchema, FormDefaultValues, FormType } from "./schema";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const MileStoneForm = ({
  onSubmitForm,
  inputs,
}: {
  onSubmitForm: (values: any) => void;
  inputs?: any;
}) => {
  const [mailStonToken, setMailStonToken] = useLocalStorage(
    "mailStonToken",
    z.string().default("")
  );

  const form = useForm<FormType>({
    resolver: zodResolver(FormSchema),
    defaultValues: inputs || FormDefaultValues,
  });

  const { data, isLoading } = useSWR("/mailstonType", async () => {
    const res = await axios.post(
      `http://${env.VITE_MAILSTON_IP}/api/IDP/connect/token`,
      qs.stringify({
        grant_type: "password",
        username: "userapi",
        password: "123456789Ya@",
        client_id: "GrantValidatorClient",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    setMailStonToken(res.data.access_token);
    const cameras = await axios.get(
      `http://${env.VITE_MAILSTON_IP}/api/rest/v1/cameras`,
      {
        headers: {
          Authorization: `Bearer ${mailStonToken}`,
        },
      }
    );
    const eventHistory = await axios.get(
      `http://${env.VITE_MAILSTON_IP}/api/rest/v1/eventTypes`,
      {
        headers: {
          Authorization: `Bearer ${mailStonToken}`,
        },
      }
    );
    console.log("eventHistory: ", eventHistory);
    return {
      cameras: cameras.data,
      eventHistory: eventHistory.data,
    };
  });

  const { cameraId } = useParams();
  const { theme } = useGlobalContext();

  // const { data: users = [] } = useSWR(
  //   "/users",
  //   async () => {
  //     if (!cameraId) return;
  //     const { results } = await backendApi.findMany<User>("user", {
  //       select: { fullName: true, id: true, attributes: true },
  //       pagination: { page: 1, perPage: 100 },
  //     });
  //     return results;
  //   },
  //   {
  //     onSuccess: (data) => {
  //       setSelectedRecipients(
  //         (data || [])
  //           ?.filter((user: any) => {
  //             return inputs?.recipients?.some(
  //               (selected: string) => selected === user.id
  //             );
  //           })
  //           .map((user: any) => ({
  //             value: user.id,
  //             label: user.fullName,
  //           }))
  //       );
  //       return data;
  //     },
  //   }
  // );

  const onSubmit = async () => {
    if (form.formState.isSubmitting || !cameraId) return;
    onSubmitForm(form.getValues());
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">Loading...</div>
    );
  }

  const eventHistory = data?.eventHistory || [];
  return (
    <div className="flex h-full gap-2 flex-col">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1">
          <div className="flex flex-1 flex-col space-y-4  h-full">
            <div className="flex-1 space-y-4">
              <FormField
                control={form.control}
                name="typeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel></FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className={cn(theme, "bg-input")}>
                          <SelectValue placeholder="Select a Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className={theme}>
                        {eventHistory.length === 0 ? (
                          <div className="flex items-center justify-center h-20 text-sm text-gray-300 first-letter:uppercase">
                            No data found
                          </div>
                        ) : (
                          eventHistory.map((event: any) => (
                            <SelectItem key={event.id} value={event.id}>
                              {event.displayName}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Text message</FormLabel>
                    <FormControl className="bg-input">
                      <Textarea
                        placeholder="Text message"
                        {...field}
                        rows={5}
                        className="resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end ">
              <Button type="submit" className="w-[8rem]">
                Save & continue
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default MileStoneForm;
