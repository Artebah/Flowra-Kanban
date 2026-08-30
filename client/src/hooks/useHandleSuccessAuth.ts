import { routes } from "@/constants/routes";
import { useSetUser } from "@/store/auth/selectors";
import type { AuthResponse } from "@/types/api/auth";
import { useNavigate } from "react-router";

export const useHandleSuccessAuth = () => {
  const setUser = useSetUser();
  const navigate = useNavigate();

  return (authResponse: AuthResponse) => {
    setUser(authResponse.user);
    localStorage.setItem("accessToken", authResponse.accessToken);
    localStorage.setItem("refreshToken", authResponse.refreshToken);

    navigate(routes.home);
  };
};
