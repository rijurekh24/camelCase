import React, { createContext, useState } from "react";

const authContext = createContext();

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const value = { user, setUser };
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export default AuthContext;

export { authContext };
