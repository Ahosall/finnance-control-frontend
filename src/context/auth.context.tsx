import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import UsersService from "../services/users.service";

interface IAuthUser {
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

const AuthContext = createContext<TAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IAuthUser | null>(null);
  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem("token") || null
  );

  const usersApi = new UsersService();

  useEffect(() => {
    if (token) {
      usersApi
        .getMyUser(token)
        .then((res) => setUser(res.data))
        .catch(() => logout());
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    const res = await usersApi.loginUser(email, password);
    const { token, user } = res.data;

    localStorage.setItem("token", token);
    setToken(token);
    setUser(user);
  };

  const logout = async () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
