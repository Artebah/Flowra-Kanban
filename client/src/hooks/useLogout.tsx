import { useClearUser } from "../store/auth/selectors";
import { useNavigate } from "react-router";
import { AUTH_ROUTES, routes } from "../constants/routes";
import React from "react";

export const useLogout = () => {
  const clearUser = useClearUser();
  const navigate = useNavigate();
  const isAuthPage = React.useMemo(
    () => AUTH_ROUTES.includes(location.pathname),
    []
  );

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
