import * as zod from "zod";

export const createBoardSchema = zod.object({
  title: zod.string().nonempty("Title is required"),
  coverImage: zod.file().optional(),
});

export type CreateBoardFields = zod.infer<typeof createBoardSchema>;
