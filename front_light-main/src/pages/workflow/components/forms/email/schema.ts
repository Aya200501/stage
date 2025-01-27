import { z } from "zod";

export const FormSchema = z.object({
  recipients: z
    .array(z.object({ id: z.string(), email: z.string() }).or(z.object({ 
      id: z.string(), phoneNumber: z.string()
     }).or(z.string()))),
  subject: z.string().optional(),
  message: z.string().min(3, "The message must be at least 3 characters long"),
});

export type FormType = z.infer<typeof FormSchema>;

export const FormDefaultValues: FormType = {
  recipients: [],
  subject: "",
  message: "",
};
