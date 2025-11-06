import classNames from "classnames";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isIconOnly?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  leadingIcon?: React.ReactNode;
  variant?:
    | "outline"
    | "default"
    | "success"
    | "info"
    | "neutral"
    | "primary"
    | "secondary"
    | "accent"
    | "warning"
    | "error";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      fullWidth,
      isIconOnly,
      className,
      leadingIcon,
      variant = "default",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={classNames(
          "btn flex items-center gap-2",
          {
            "btn-ghost border-0 text-white hover:shadow-none active:translate-y-0! hover:bg-white/5 hover:border-0 active:tracking-0":
              variant === "default",
            "btn-outline border border-gray-600 text-gray-300 bg-transparent hover:bg-white/5":
              variant === "outline",
            "btn-neutral": variant === "neutral",
            "btn-primary": variant === "primary",
            "btn-secondary": variant === "secondary",
            "btn-accent": variant === "accent",
            "btn-info": variant === "info",
            "btn-success": variant === "success",
            "btn-warning": variant === "warning",
            "btn-error": variant === "error",
            "w-full": fullWidth,
            "btn-square": isIconOnly,
          },
          className
        )}
        {...props}
      >
        {leadingIcon}
        {children}
      </button>
    );
  }
);

export default Button;
