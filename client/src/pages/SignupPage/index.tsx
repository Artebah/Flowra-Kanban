import { useForm, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { signupSchema, type SignupFields } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SignupDto } from "../../types/api/auth";
import { useSignup } from "../../hooks/api/auth/useSignup";
import { routes } from "../../constants/routes";

function SignupPage() {
  const signup = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFields>({
    resolver: zodResolver(signupSchema),
  });
  const onSubmit: SubmitHandler<SignupFields> = async (data) => {
    const signupDto: SignupDto = data;

    signup.mutate(signupDto);
  };

  return (
    <div className="flex justify-center pt-24">
      <div className="shadow-gray-700 shadow-[0_0_10px] bg-gray-700 rounded-4xl px-4 pt-8 py-16 w-full max-w-[600px]">
        <h1 className="text-center font-bold text-4xl mb-10">Sign up</h1>
        <form
          className="max-w-[400px] mx-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-6">
            <label className="mb-2 inline-block" htmlFor="email">
              Email
            </label>
            <Input
              id="email"
              {...register("email")}
              className="w-full"
              placeholder="Enter your email or username"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label className="mb-2 inline-block" htmlFor="username">
              Username
            </label>
            <Input
              id="username"
              {...register("username")}
              className="w-full"
              placeholder="Enter your username or username"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
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

        <div className="text-center mt-8">
          <p className="text-gray-300">
            Already have an account?{" "}
            <Link
              to={routes.login}
              className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-200 underline decoration-transparent hover:decoration-blue-300"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
