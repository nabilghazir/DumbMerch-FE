import { z } from "zod";

export const categorySchema = z
    .object({
        name: z
            .string().min(3, "Name must be at least 3 characters")
    })
    .required();

export type CategoryFormData = z.infer<typeof categorySchema>;

export type CategoryUpdateFormData = z.infer<typeof categorySchema>;