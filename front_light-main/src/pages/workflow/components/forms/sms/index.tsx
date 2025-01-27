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
import MultipleSelector, { Option } from "@/components/MultipleSelector";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useGlobalContext } from "@/Context";
import { User } from "@/utils";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { FormDefaultValues, FormSchema, FormType } from "../email/schema";

const SmsForm = ({
  onSubmitForm,
  inputs,
}: {
  onSubmitForm: (values: any) => void;
  inputs?: any;
}) => {
  const form = useForm<FormType>({
    resolver: zodResolver(FormSchema),
    defaultValues: inputs || FormDefaultValues,
  });
  const [selectedRecipients, setSelectedRecipients] = useState<Option[]>(
    inputs?.recipients || []
  );
  const { cameraId } = useParams();
  const { backendApi } = useGlobalContext();

  const { data: users = [] } = useSWR(
    "/users",
    async () => {
      if (!cameraId) return;
      const { results } = await backendApi.findMany<User>("user", {
        select: { fullName: true, id: true, attributes: true },
        pagination: { page: 1, perPage: 100 },
      });
      return results;
    },
    {
      onSuccess: (data) => {
        setSelectedRecipients(
          (data || [])
            ?.filter((user: any) => {
              return inputs?.recipients?.some(
                (selected: string) => selected === user.id
              );
            })
            .map((user: any) => ({
              value: user.id,
              label: user.fullName,
            }))
        );
        return data;
      },
    }
  );

  const onSubmit = (values: FormType) => {
    const usersData: {
      id: string;
      phoneNumber: string;
    }[] = users
      .filter((item) => {
        return selectedRecipients.some(
          (selected) => selected.value === item.id
        );
      })
      .map((user) => {
        const phoneNumber = user.attributes?.phoneNumbers;
        return {
          id: user.id,
          phoneNumber: (phoneNumber as string) || "NULL",
        };
      });
    onSubmitForm({
      ...values,
      recipients: usersData,
    });
  };

  return (
    <div className="flex h-full gap-2 flex-col">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1">
          <div className="flex flex-1 flex-col space-y-4  h-full">
            <div className="flex-1 space-y-4">
              <FormField
                control={form.control}
                name="recipients"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>To</FormLabel>
                    <FormControl>
                      <MultipleSelector
                        placeholder="Select recipients"
                        options={users.map((user) => ({
                          value: user.id,
                          label: user.fullName,
                        }))}
                        value={selectedRecipients}
                        onChange={(item: Option[]) => {
                          console.log({ item });
                          setSelectedRecipients(item);
                          field.onChange(item?.map((i) => i.value));
                        }}
                        emptyIndicator={
                          <p className="text-center  text-gray-600 dark:text-gray-400">
                            no results found.
                          </p>
                        }
                        className="bg-input"
                      />
                    </FormControl>
                    <FormMessage className="text-[#D22627]" />
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
                        className="
                resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Additional contact owner attributes {`JSON`}
                    </FormLabel>
                    <FormControl className="bg-input">
                      <Textarea
                        placeholder="Text message"
                        {...field}
                        rows={5}
                        className="
                resize-none"
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

export default SmsForm;
