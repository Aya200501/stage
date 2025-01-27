import { z } from "zod";

export const WhatssapFormSchema = z.object({
  recipients: z
    .array(z.string())
    .min(1, "Please select at least one recipient"),
  json: z.string().min(3, "The subject must be at least 3 characters long"),
  message: z.string().min(3, "The message must be at least 3 characters long"),
});

export type WhatssapFormType = z.infer<typeof WhatssapFormSchema>;

export const WhatssapFormDefaultValues: WhatssapFormType = {
  recipients: [],
  message: "",
  json: "",
};
