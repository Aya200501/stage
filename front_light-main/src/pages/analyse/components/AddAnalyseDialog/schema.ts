import { z } from "zod";


export const AddEditAnalyseSchema = z.object({
  name: z.string().min(3, "The analyse name must be at least 3 characters long"),
  description: z.string().optional(),
  aiCode: z.string().optional(),
  configs: z.array(z.enum(["scale-up", "scale-down", "rotate", "crop", "polygon", "polyline"])).optional(),
  parents: z.array(z.object({
    value: z.string(),
    label: z.string(),
  })).optional(),

});

export type AddEditAnalyseType = z.infer<typeof AddEditAnalyseSchema>;


export const AddEditAnalyseDefaultValues: AddEditAnalyseType = {
  name: "",
  description: "",
  aiCode: "",
  configs: [],
  parents: undefined,
};
