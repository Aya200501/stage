import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";


export const AddUserSchema = z.object({
  fullName: z.string({
    message: "Please enter a valid name",
  }).min(6, { message: "Name must be at least 6 characters" }),
  email: z.string().email({
    message: "Please enter a valid email",
  }),
  image: z.instanceof(File).optional(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
  phoneNumber: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
});

export const EditUserSchema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  image: z.instanceof(File).optional(),
  password: z.string().optional().default("").refine((val) => {
    if (val) {
      return val.length >= 8;
    }
    return true;
  }, {
    message: "Password must be at least 8 characters",
  }),
  phoneNumber: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
});

export type AddUserType = z.infer<typeof AddUserSchema>;
export type EditUserType = z.infer<typeof EditUserSchema>;


export const AddUserDefaultValues: AddUserType = {
  fullName: "",
  email: "",
  password: "",
  phoneNumber: "",
};

export const EditUserDefaultValues: EditUserType = {
  fullName: "",
  email: "",
  password: "",
  phoneNumber: "",
};