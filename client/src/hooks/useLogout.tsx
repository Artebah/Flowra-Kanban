import { useClearUser } from "../store/auth/selectors";
import { useNavigate } from "react-router";
import { routes } from "../constants/routes";
import React from "react";
import { useIsAuthPage } from "./useIsAuthPage";

export const useLogout = () => {
  const clearUser = useClearUser();
  const navigate = useNavigate();
  const isAuthPage = useIsAuthPage();

  const logout = React.useCallback(() => {
    clearUser();

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    if (!isAuthPage) {
      navigate(routes.login);
    }
  }, [clearUser, navigate, isAuthPage]);

  return logout;
};
