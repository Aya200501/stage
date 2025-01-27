import { z } from "zod";

export const FormSchema = z.object({
  typeId: z.string().refine((value) => value.length > 0, {
    message: "Please select a type",
  }),
  message: z.string().min(3, "The message must be at least 3 characters long"),
});

export type FormType = z.infer<typeof FormSchema>;

export const FormDefaultValues: FormType = {
  typeId: "",
  message: "",
};