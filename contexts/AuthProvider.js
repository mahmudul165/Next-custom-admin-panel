import React, { createContext } from "react";
import useGlobal from "../hook/useGlobal";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const allContext = useGlobal();
  return (
    <AuthContext.Provider value={allContext}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
