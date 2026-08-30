import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler, useController } from "react-hook-form";
import { completeProfileSchema, type CompleteProfileFields } from "./schema";
import Input from "@/components/Input";
import Button from "@/components/Button";
import AvatarUpload from "./AvatarUpload";
import { useCompleteProfile } from "@/hooks/api/auth/useCompleteProfile";
import { useUser } from "@/store/auth/selectors";
import { useGetUploadUrl } from "@/hooks/api/storage/useGetUploadUrl";
import axios from "axios";
import { useNavigate } from "react-router";
import { routes } from "@/constants/routes";
import React from "react";

function CompleteProfilePage() {
  const user = useUser();
  const completeProfile = useCompleteProfile();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<CompleteProfileFields>({
    resolver: zodResolver(completeProfileSchema),
  });

  const { field: avatarField } = useController({ name: "avatar", control });
  const getAvatarUploadUrl = useGetUploadUrl();

  React.useEffect(() => {
    if (user?.avatar) {
      setValue("avatar", user.avatar, {
        shouldDirty: false,
        shouldValidate: true,
      });
    }
  }, [user, setValue]);

  const onSubmit: SubmitHandler<CompleteProfileFields> = async ({
    avatar,
    username,
  }) => {
    if (user) {
      let uploadedAvatarUrl: string | undefined;

      if (avatar instanceof File) {
        const { publicUrl, uploadUrl } = await getAvatarUploadUrl.mutateAsync({
          dto: {
            fileName: avatar.name,
            fileType: avatar.type,
            folder: `users/${user.id}/avatars`,
          },
        });

        await axios({
          url: uploadUrl,
          data: avatar,
          method: "PUT",
          headers: { "Content-Type": avatar.type },
        });

        uploadedAvatarUrl = publicUrl;
      }

      await completeProfile.mutateAsync({
        dto: {
          ...(uploadedAvatarUrl ? { avatar: uploadedAvatarUrl } : {}),
          username,
        },
        userId: user.id,
      });

      navigate(routes.home);
    }
  };

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
