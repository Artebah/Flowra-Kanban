import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler, useController } from "react-hook-form";
import { useRef, useState } from "react";
import { completeProfileSchema, type CompleteProfileFields } from "./schema";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { UserIcon } from "lucide-react";

function AvatarUpload({
  onChange,
  error,
}: {
  value?: File;
  onChange: (file: File | undefined) => void;
  error?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    onChange(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFile(e.target.files?.[0]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file?.type.startsWith("image/")) handleFile(file);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(undefined);
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={[
          "relative group w-28 h-28 rounded-full cursor-pointer",
          "flex items-center justify-center overflow-hidden",
          "border-2 border-dashed transition-all duration-200",
          isDragging
            ? "border-blue-400 bg-blue-50 scale-105"
            : preview
              ? "border-transparent"
              : "border-zinc-300 hover:border-blue-400 bg-white hover:bg-blue-50",
          error ? "border-red-400" : "",
        ].join(" ")}
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt="Avatar preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1">
              <UserIcon />
              <span className="text-white text-xs font-medium">Change</span>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-1.5 px-2 text-center">
            <div className="w-10 h-10 rounded-full bg-zinc-200 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
              <UserIcon className="text-gray-dim group-hover:text-blue-500 transition-colors" />
            </div>
            <span className="text-[10px] leading-tight text-gray-dim group-hover:text-blue-500 transition-colors">
              Upload photo
            </span>
          </div>
        )}
      </div>

      {preview && (
        <button
          type="button"
          onClick={handleRemove}
          className="text-xs text-white hover:text-red-400 transition-colors underline underline-offset-2"
        >
          Remove photo
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={handleChange}
      />

      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}

function CompleteProfilePage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CompleteProfileFields>({
    resolver: zodResolver(completeProfileSchema),
  });

  const { field: avatarField } = useController({ name: "avatar", control });

  const onSubmit: SubmitHandler<CompleteProfileFields> = (data) => {};

  return (
    <div className="flex justify-center pt-24">
      <div className="shadow-gray-700 shadow-[0_0_10px] bg-gray-700 rounded-4xl px-4 pt-8 py-16 w-full max-w-[600px]">
        <h1 className="text-center font-bold text-4xl mb-10">
          Complete Profile
        </h1>
        <form
          className="max-w-[400px] mx-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-6 flex justify-center">
            <AvatarUpload
              value={avatarField.value}
              onChange={avatarField.onChange}
              error={errors.avatar?.message}
            />
          </div>

          <div className="mb-6">
            <label className="mb-2 inline-block" htmlFor="username">
              Username
            </label>
            <Input
              id="username"
              {...register("username")}
              className="w-full"
              placeholder="Enter your username"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="mt-6">
            <Button type="submit" variant="info" className="w-full">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CompleteProfilePage;
