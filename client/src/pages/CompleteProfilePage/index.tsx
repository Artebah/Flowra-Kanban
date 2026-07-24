import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { completeProfileSchema, type CompleteProfileFields } from "./schema";
import Input from "@/components/Input";
import { useState } from "react";
import { UserCircle } from "lucide-react";

function CompleteProfilePage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CompleteProfileFields>({
    resolver: zodResolver(completeProfileSchema),
  });

  const avatarUrl = watch("avatar");
  const [imgError, setImgError] = useState(false);

  const onSubmit: SubmitHandler<CompleteProfileFields> = (data) => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
          <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
        )}
      </div>

      <div className="mb-6">
        <label className="mb-2 inline-block" htmlFor="avatar">
          Avatar
        </label>
        <div className="flex items-center gap-4">
          <div className="shrink-0 w-16 h-16 rounded-full overflow-hidden border-2 border-gray-500 flex items-center justify-center bg-gray-800 transition-all duration-300">
            {avatarUrl && !imgError ? (
              <img
                src={avatarUrl}
                alt="Avatar preview"
                className="w-full h-full object-cover"
                onError={() => setImgError(true)}
                onLoad={() => setImgError(false)}
              />
            ) : (
              <UserCircle className="w-10 h-10 text-gray-500" />
            )}
          </div>
          <div className="flex-1">
            <Input
              id="avatar"
              {...register("avatar", { onChange: () => setImgError(false) })}
              className="w-full"
              placeholder="Paste an image URL"
            />
            {errors.avatar && (
              <p className="text-red-500 text-sm mt-1">{errors.avatar.message}</p>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

export default CompleteProfilePage;
