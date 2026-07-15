import { routes } from "@/constants/routes";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { navigateTo } from "@/utils/navigationRef";

export const clearAuthAndRedirect = () => {
  useAuthStore.getState().clearUser();
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  navigateTo(routes.login);
};
