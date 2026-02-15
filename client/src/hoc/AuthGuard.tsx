import React from "react";
import { useFetchMe } from "../hooks/api/auth/useFetchMe";
import { isPrivate, routes } from "../constants/routes";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";
import { useLogout } from "../hooks/useLogout";
import { useSetUser } from "../store/auth/selectors";
import { useIsAuthPage } from "../hooks/useIsAuthPage";

function AuthGuard({ children }: React.PropsWithChildren) {
  const { data, isError, error, isLoading } = useFetchMe();
  const navigate = useNavigate();

  const isAuthPage = useIsAuthPage();
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
