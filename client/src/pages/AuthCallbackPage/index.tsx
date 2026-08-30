import { routes } from "@/constants/routes";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useNavigate, useSearchParams } from "react-router";

function AuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  React.useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      queryClient.invalidateQueries({ queryKey: ["authMe"] });
      navigate(routes.home);
    }
  }, [searchParams, navigate, queryClient]);

  return null;
}

export default AuthCallbackPage;
