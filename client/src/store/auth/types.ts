import type { User } from "../../types/api/auth";

export interface IAuthStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}
