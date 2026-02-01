import Button from "../Button";
import { useCreateBoard } from "../../hooks/api/boards/useCreateBoard";
import Modal from "../Modal";
import Input from "../Input";
import Dropzone from "../Dropzone";
import { useForm, type SubmitHandler } from "react-hook-form";
import { createBoardSchema, type CreateBoardFields } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

function CreateBoardButton() {
  const { mutate } = useCreateBoard();
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreateBoardFields>({
    resolver: zodResolver(createBoardSchema),
  });

  const onSubmit: SubmitHandler<CreateBoardFields> = async (data) => {
    mutate({ title: data.title });
  };

  const handleImageDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setValue("coverImage", file);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Button variant="primary">Create new board</Button>

      <Modal open onClose={() => {}}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              className="mb-2 inline-block text-gray-300 font-medium"
              htmlFor="title"
            >
              Board Title
            </label>
            <Input
              id="title"
              {...register("title")}
              className="w-full"
              placeholder="Enter board title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <Dropzone
              label="Cover Image"
              helperText="PNG, JPG, GIF up to 5MB"
              onDrop={handleImageDrop}
              preview={preview}
              error={errors.coverImage?.message}
            />
          </div>

          <div>
            <Button type="submit" variant="primary" className="w-full">
              Create new board
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default CreateBoardButton;
