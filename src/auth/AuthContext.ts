import { createContext } from "react";
import type { AuthUser } from "..";

export interface AuthContextValue {
  user: AuthUser | null;
  signIn: (email: string) => void;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);