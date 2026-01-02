import React from "react";
import { useFetchUser } from "../hooks/api/useFetchUser";
import { useLocation, useNavigate } from "react-router";
import { PRIVATE_ROUTES } from "../constants/routes";

function AuthGuard({ children }: React.PropsWithChildren) {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("accessToken");

  const { isError, data, isSuccess, isPending } = useFetchUser();

  React.useEffect(() => {
    if (isPending) return;

    if (!token || isError) {
      if (isError) {
        localStorage.removeItem("accessToken");
      }

      if (!PRIVATE_ROUTES.includes(location.pathname)) {
        navigate("/login", { replace: true });
      }
      return;
    }

    if (isSuccess && data) {
      if (PRIVATE_ROUTES.includes(location.pathname)) {
        navigate("/dashboard", { replace: true });
      }
    }
  }, [isPending, isError, isSuccess, data, navigate, location.pathname, token]);

  if (isPending && token) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h3>Loading User...</h3>
      </div>
    );
  }

  return <>{children}</>;
}

export default AuthGuard;
