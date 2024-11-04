import { z } from "zod";

export const loginSchema = z
    .object({
        email: z
            .string().min(1, "Please input your email"),
        password: z
            .string()
            .min(6, "Password must be at least 6 characters")
    })
    .required();

export type LoginSchema = z.infer<typeof loginSchema>;
