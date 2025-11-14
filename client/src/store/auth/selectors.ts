import { useAuthStore } from "./useAuthStore";

export const useUser = () => useAuthStore((s) => s.user);
export const useSetUser = () => useAuthStore((s) => s.setUser);
export const useClearUser = () => useAuthStore((s) => s.clearUser);
