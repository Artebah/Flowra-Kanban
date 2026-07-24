import { FILE_MAX_SIZE } from "@/constants/fileMaxSize";
import * as zod from "zod";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
];

export const completeProfileSchema = zod.object({
  username: zod.string().nonempty("Username is required"),
  avatar: zod
    .instanceof(File, { message: "Avatar is required" })
    .refine((f) => f.size <= FILE_MAX_SIZE, "Image must be under 5MB")
    .refine(
      (f) => ACCEPTED_IMAGE_TYPES.includes(f.type),
      "Only JPEG, PNG, WebP, or GIF allowed"
    ),
});

export type CompleteProfileFields = zod.infer<typeof completeProfileSchema>;
