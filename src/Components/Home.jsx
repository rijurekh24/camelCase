import { Button } from "@mui/base";
import React, { useContext } from "react";
import Api from "../Utils/api";
import { authContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const ctx = useContext(authContext);
  const navigate = useNavigate();
  return (
    <div>
      <h1>Welcome {ctx.user.username}</h1>
      <Button
        onClick={() => {
          Api.get("/auth/logout").then((res) => {
            ctx.setUser(null);
            navigate("/signin");
          });
        }}
      >
        Log out
      </Button>
    </div>
  );
};

export default Home;
