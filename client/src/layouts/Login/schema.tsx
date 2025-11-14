import * as zod from "zod";

export const loginSchema = zod.object({
  emailOrUsername: zod.string().nonempty("Email or username is required"),
  password: zod.string().nonempty("Password is required"),
});

export type LoginFields = zod.infer<typeof loginSchema>;
