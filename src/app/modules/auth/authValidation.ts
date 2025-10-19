import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Email is required")
    .email("Invalid email format"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(5, "Password must be at least 5 characters long")
    .max(64, "Password cannot exceed 64 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;
