import { useClearUser } from "../store/auth/selectors";
import { useNavigate } from "react-router";
import { routes } from "../constants/routes";
import React from "react";

export const useLogout = () => {
  const clearUser = useClearUser();
  const navigate = useNavigate();

  const logout = React.useCallback(() => {
    clearUser();

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    navigate(routes.login);
  }, [clearUser, navigate]);

  return logout;
};
