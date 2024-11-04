import { z } from "zod";

const regexPassword =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/;

export const registerSchema = z
    .object({
        name: z.string().min(3, "Name must be at least 3 characters"),
        email: z.string().email("Please enter a valid email"),
        password: z
            .string()
            .min(6, "Password must be at least 6 characters")
            .regex(
                regexPassword,
                "Password harus mengandung angka, huruf besar, kecil dan simbol"
            ),
    })
    .required();

export type RegisterSchema = z.infer<typeof registerSchema>;
