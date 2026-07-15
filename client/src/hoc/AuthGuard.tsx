import React from "react";
import { useFetchMe } from "../hooks/api/auth/useFetchMe";
import { routes } from "../constants/routes";
import { useNavigate } from "react-router";
import { useIsAuthPage } from "../hooks/useIsAuthPage";
import { useUser } from "../store/auth/selectors";
import { setNavigate } from "../utils/navigationRef";

function AuthGuard({ children }: React.PropsWithChildren) {
  const { isLoading } = useFetchMe();
  const user = useUser();
  const navigate = useNavigate();
  const isAuthPage = useIsAuthPage();

  React.useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  React.useEffect(() => {
    if (user && isAuthPage) {
      navigate(routes.home);
    }
  }, [user, navigate, isAuthPage]);

  if (isLoading) {
    return (
      <div className="fixed size-full flex justify-center items-center">
        <span className="loading loading-spinner loading-xl text-secondary" />
      </div>
    );
  }

  return <>{children}</>;
}

export default AuthGuard;
