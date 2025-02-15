import { createContext } from "react";

export interface IAuthUser {
  id: string;
  name: string;
  email: string;
}

type TAuthContext = {
  user: IAuthUser | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<TAuthContext | undefined>(undefined);
