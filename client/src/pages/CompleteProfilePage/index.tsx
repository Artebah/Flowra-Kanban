import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler, useController } from "react-hook-form";
import { completeProfileSchema, type CompleteProfileFields } from "./schema";
import Input from "@/components/Input";
import Button from "@/components/Button";
import AvatarUpload from "./AvatarUpload";
import { useCompleteProfile } from "@/hooks/api/auth/useCompleteProfile";
import { useUser } from "@/store/auth/selectors";

function CompleteProfilePage() {
  const user = useUser();
  const completeProfile = useCompleteProfile();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CompleteProfileFields>({
    resolver: zodResolver(completeProfileSchema),
  });

  const { field: avatarField } = useController({ name: "avatar", control });

  const onSubmit: SubmitHandler<CompleteProfileFields> = ({
    avatar,
    username,
  }) => {
    if (user) {
      completeProfile.mutate({
        dto: { avatar: uploadedAvatar, username },
        userId: user.id,
      });
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
