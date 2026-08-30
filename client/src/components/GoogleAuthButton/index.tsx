"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import GoogleIcon from "@/assets/google-icon-logo.svg?react";
import Button from "../Button";

interface GoogleAuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  mode?: "login" | "register";
}

export function GoogleAuthButton({
  mode = "login",
  className,
  ...props
}: GoogleAuthButtonProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleGoogleAuth = () => {
    setIsLoading(true);
    const apiUrl = import.meta.env.VITE_API_URL;

    window.location.href = `${apiUrl}/auth/google`;
  };

  const text =
    mode === "register" ? "Sign up with Google" : "Login with Google";

  return (
    <Button
      type="button"
      variant="outline"
      disabled={isLoading}
      onClick={handleGoogleAuth}
      className={cn("mx-auto mt-4 gap-2 font-medium", className)}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <GoogleIcon className="h-4 w-4" />
      )}
      <span>{text}</span>
    </Button>
  );
}
