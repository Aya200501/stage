import { z } from "zod";

export const NotificationFormSchema = z.object({
  recipients: z
    .array(z.string())
    .min(1, "Please select at least one recipient"),
  subject: z.string().min(3, "The subject must be at least 3 characters long"),
  message: z.string().min(3, "The message must be at least 3 characters long"),
});

export type NotificationFormType = z.infer<typeof NotificationFormSchema>;

export const NotificationFormDefaultValues: NotificationFormType = {
  recipients: [],
  subject: "",
  message: "",
};
