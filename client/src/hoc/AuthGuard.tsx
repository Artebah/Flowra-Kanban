import React from "react";
import { useFetchMe } from "../hooks/api/auth/useFetchMe";
import { routes } from "../constants/routes";
import { useLocation, useNavigate } from "react-router";
import { useIsAuthPage } from "../hooks/useIsAuthPage";
import { useUser } from "../store/auth/selectors";
import { setNavigate } from "../utils/navigationRef";

function AuthGuard({ children }: React.PropsWithChildren) {
  const { isLoading: isLoadingMe } = useFetchMe();
  const user = useUser();
  const navigate = useNavigate();
  const isAuthPage = useIsAuthPage();
  const location = useLocation();

  const isCompleteProfilePage = React.useMemo(
    () => location.pathname === routes.completeProfile,
    [location]
  );
  const isHomePage = React.useMemo(
    () => location.pathname === routes.home,
    [location]
  );

  React.useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  React.useEffect(() => {
    if (isLoadingMe) {
      return;
    }

    if (!user) {
      console.log(1);
      if (!isAuthPage) {
        console.log(2);
        navigate(routes.login);
      }
      return;
    }

    if (!user.isProfileCompleted) {
      if (!isCompleteProfilePage) {
        console.log(3);
        navigate(routes.completeProfile);
      }
    } else {
      if (!isHomePage) {
        console.log(4);
        navigate(routes.home);
      }
    }
  }, [
    isAuthPage,
    isCompleteProfilePage,
    isHomePage,
    isLoadingMe,
    navigate,
    user,
  ]);

  if (isLoadingMe) {
    return (
      <div className="fixed size-full flex justify-center items-center">
        <span className="loading loading-spinner loading-xl text-secondary" />
      </div>
    );
  }

  return <>{children}</>;
}

export default AuthGuard;
