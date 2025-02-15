import { ReactNode, useEffect, useState } from "react";

import { AuthContext, IAuthUser } from "../context/auth.context";

import UsersService from "../services/users.service";

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
