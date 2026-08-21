// src/context/AuthContext.jsx
import { createContext, useState } from "react";

import { getToken, removeToken, setToken } from "../utils/tokenStorage";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [token, setTokenState] = useState(() => getToken());
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    const { user, token } = {}; //TODO: login api call with email and password -> should return user obj and token
    setToken(token);
    setTokenState(token);
    setUser(user);
  };

  const register = (email, password) => {
    //TODO: register api call with email and password
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
