import { useForm, type SubmitHandler } from "react-hook-form";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { loginSchema, type LoginFields } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { LoginDto } from "../../types/api/auth";
import { isEmail } from "../../utils/isEmail";
import { useLogin } from "../../hooks/api/useLogin";

function LoginPage() {
  const login = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit: SubmitHandler<LoginFields> = async (data) => {
    const loginDto: LoginDto = {
      email: isEmail(data.emailOrUsername) ? data.emailOrUsername : undefined,
      username: isEmail(data.emailOrUsername)
        ? undefined
        : data.emailOrUsername,
      password: data.password,
    };

    login.mutate(loginDto);
  };

  return (
    <div className="flex justify-center pt-24">
      <div className="shadow-gray-700 shadow-[0_0_10px] bg-gray-700 rounded-4xl px-4 pt-8 py-16 w-full max-w-[600px]">
        <h1 className="text-center font-bold text-4xl mb-10">Login</h1>
        <form
          className="max-w-[400px] mx-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-6">
            <label className="mb-2 inline-block" htmlFor="emailOrUsername">
              Email or username
            </label>
            <Input
              id="emailOrUsername"
              {...register("emailOrUsername")}
              className="w-full"
              placeholder="Enter your email or username"
            />
            {errors.emailOrUsername && (
              <p className="text-red-500 text-sm mt-1">
                {errors.emailOrUsername.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 inline-block" htmlFor="password">
              Password
            </label>
            <Input
              id="password"
              {...register("password")}
              className="w-full"
              placeholder="Enter password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
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

export default LoginPage;
