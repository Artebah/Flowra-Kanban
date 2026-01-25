import React from "react";
import { useFetchMe } from "../hooks/api/useFetchMe";
import { AUTH_ROUTES, isPrivate, routes } from "../constants/routes";
import { useLocation, useNavigate } from "react-router";
import { AxiosError } from "axios";
import { useLogout } from "../hooks/useLogout";
import { useSetUser } from "../store/auth/selectors";

function AuthGuard({ children }: React.PropsWithChildren) {
  const { data, isError, error, isLoading } = useFetchMe();
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthPage = React.useMemo(
    () => AUTH_ROUTES.includes(location.pathname),
    [location]
  );
  const setUser = useSetUser();
  const logout = useLogout();

  React.useEffect(() => {
    if (isError) {
      if (error instanceof AxiosError && error.status === 401) {
        logout();
      }
    }
  }, [isError, error, logout]);

  React.useEffect(() => {
    if (data) {
      if (isAuthPage) {
        navigate(routes.home);
      }

      setUser(data);
    }
  }, [data, setUser, navigate, isAuthPage]);

  if (isLoading && isPrivate) {
    return (
      <div className="fixed size-full flex justify-center items-center">
        <span className="loading loading-spinner loading-xl text-secondary" />
      </div>
    );
  }

  return <>{children}</>;
}

export default AuthGuard;
