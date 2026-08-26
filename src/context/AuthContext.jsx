// src/context/AuthContext.jsx
import { createContext, useState } from "react";

import { loginUser, registerUser } from "../api/fetch";
import { getToken, removeToken, setToken } from "../utils/tokenStorage";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [token, setTokenState] = useState(() => getToken());
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const { user, token } = await loginUser(email, password);

    setToken(token);
    setTokenState(token);
    setUser(user);

    return user;
  };

  const register = async (email, password) => {
    const user = await registerUser(email, password);
    return user;
  };

  const logout = () => {
    removeToken();
    setTokenState(null);
    setUser(null);
  };

  const values = {
    user,
    token,
    isAuthenticated: Boolean(token),
    login,
    logout,
    register,
  };

  return <AuthContext value={values}>{children}</AuthContext>;
};

export { AuthContext, AuthProvider };
