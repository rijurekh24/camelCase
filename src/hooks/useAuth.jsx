import { useContext } from "react";
import { authContext } from "../Context/AuthContext";

const useAuth = () => {
  const ctx = useContext(authContext);

  return {
    user: ctx.user,
    setUser: ctx.setUser,
  };
};

export default useAuth;
