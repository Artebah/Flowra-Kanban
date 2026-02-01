import React from "react";
import { AUTH_ROUTES } from "../constants/routes";
import { useLocation } from "react-router";

export const useIsAuthPage = () => {
  const location = useLocation();

  const isAuthPage = React.useMemo(
    () => AUTH_ROUTES.includes(location.pathname),
    [location]
  );

  return isAuthPage;
};
