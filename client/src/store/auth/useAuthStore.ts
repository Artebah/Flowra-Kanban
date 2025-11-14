import { create } from "zustand";
import type { IAuthStore } from "./types";

export const useAuthStore = create<IAuthStore>((set) => ({
  user: null,
  setUser(user) {
    set({ user });
  },
  clearUser() {
    set({ user: null });
  },
}));
