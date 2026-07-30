import React from "react";
import Input from "../Input";
import Button from "../Button";
import { EyeClosedIcon, EyeIcon } from "lucide-react";

interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  (props, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className="relative">
        <Input
          ref={ref}
          type={showPassword ? "text" : "password"}
          {...props}
        />
        <Button
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-2 active:-translate-y-1/2! z-10 top-1/2 -translate-y-1/2 rounded-full size-8"
          isIconOnly
          type="button"
        >
          {showPassword ? (
            <EyeIcon className="size-5" />
          ) : (
            <EyeClosedIcon className="size-5" />
          )}
        </Button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
