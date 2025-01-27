import { z } from "zod";

export const SmsFormSchema = z.object({
 
  recipients: z
    .array(z.string())
    .min(1, "Please select at least one recipient"),
  message: z.string().min(3, "The message must be at least 3 characters long"),
  json: z.string().min(3, "The subject must be at least 3 characters long"),
});

export type SmsFormType = z.infer<typeof SmsFormSchema>;

export const SmsFormDefaultValues: SmsFormType = {
  recipients: [],
  json: "",
  message: "",
};
