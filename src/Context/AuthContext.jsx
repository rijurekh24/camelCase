import { createContext, useState } from "react";
import Api from "../Utils/api";

const authContext = createContext();

const AuthContext = ({ children }) => {
  const [postData, setPostData] = useState([]);

  const fetchPost = () => {
    Api.get("/posts/get-all").then((res) => {
      setPostData(res.data.posts);
    });
  };

  const [user, setUser] = useState(null);
  const value = { user, setUser, fetchPost, postData };
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export default AuthContext;

export { authContext };
