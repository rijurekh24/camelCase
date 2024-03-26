import { createContext, useState } from "react";
import Api from "../Utils/api";

const authContext = createContext();

const AuthContext = ({ children }) => {
  const [postData, setPostData] = useState([]);
  const [profile, setProfile] = useState({});

  const fetchPost = () => {
    Api.get("/posts/get-all").then((res) => {
      setPostData(res.data.posts);
    });
  };

  const fetchProfile = () => {
    Api.get(`/profile?username=${user.username}`)
      .then((res) => {
        setProfile(res.data.user);
      })
      .catch((err) => {
        console.log(err.res.data);
      });
  };

  const [user, setUser] = useState(null);
  const value = { user, setUser, fetchPost, postData, fetchProfile, profile };
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export default AuthContext;

export { authContext };
