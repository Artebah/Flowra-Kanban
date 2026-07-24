import * as zod from "zod";

export const completeProfileSchema = zod.object({
  username: zod.string().nonempty("Username is required"),
  avatar: zod.string().url("Must be a valid URL").nonempty("Avatar URL is required"),
});

export type CompleteProfileFields = zod.infer<typeof completeProfileSchema>;
