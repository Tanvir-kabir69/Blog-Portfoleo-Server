import { z } from "zod";

export const OTPSchema = z.object({
  otp: z.preprocess(
    (val) => {
      if (typeof val === "number") return String(val);
      if (typeof val === "string") return val;
      return val;
    },
    z
      .string()
      .trim()
      .regex(/^\d{6}$/, { message: "OTP must be exactly 6 digits" })
      .transform((val) => Number(val)) // Convert string → number
  ),
});

export const emailSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email({ message: "Invalid email format" }),
});

export type OTPPayload = z.infer<typeof OTPSchema>;
export type EmailPayload = z.infer<typeof emailSchema>;
