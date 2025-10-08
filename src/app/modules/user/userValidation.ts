import { z } from "zod";

/**
 * Gender enum must match your Prisma enum names:
 * enum Gender { MALE, FEMALE }
 */
const genderEnum = z.enum(["MALE", "FEMALE"]);

/**
 * Password rules:
 * - min 8 chars
 * - at least one uppercase, one lowercase, one number, one special
 */
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;

export const createUserSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters long" })
    // .regex(passwordRegex, {
    //   message:
    //     "Password must include uppercase, lowercase, number and special character",
    // })
    .optional(),

  // optional profile fields
  //   name: z.string().min(1, { message: "Name cannot be empty" }).optional(),
  //   address: z.string().optional(),

  // date of birth — accept ISO string from client, convert to Date
  //   dob: z
  //     .preprocess((val) => {
  //       if (!val) return undefined;
  //       // if already Date, keep it; otherwise try to parse
  //       return typeof val === "string" ? new Date(val) : val;
  //     }, z.date().optional()),

  //   gender: genderEnum.optional(),

  // client should NOT set role/isSubscribed/provider in registration normally.
  // If you want to allow them, add fields here carefully and validate.
});

/**
 * Inferred TS type from schema
 */

export const updateUserValidationSchema = z.object({
  name: z.string().min(1, "Name cannot be empty"),
  address: z.string().min(1, "Address cannot be empty"),
  gender: z.enum(["MALE", "FEMALE"]),
  dob: z
    .string()
    .datetime({ message: "Invalid date format. Use ISO string format." }),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserValidationSchema>;
