import * as zod from "zod";

export const signupSchema = zod.object({
  email: zod.email().nonempty("Email is required"),
  username: zod.string().nonempty("Username is required"),
  password: zod
    .string()
    .nonempty("Password is required")
    .min(8, "Password must be at least 8 characters")
    .regex(/.*[A-Z].*/, "Password must contain at least 1 uppercase letter")
    .regex(/.*\d.*/, "Password must contain at least 1 number")
    .regex(
      /(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])/,
      "Password must contain at least 1 special character"
    ),
});

export type SignupFields = zod.infer<typeof signupSchema>;
