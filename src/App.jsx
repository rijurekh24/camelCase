import React, { useContext, useEffect, useState } from "react";
import Home from "./Components/Home";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useNavigate,
} from "react-router-dom";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import Api from "./Utils/api";
import { Box } from "@mui/system";
import LoadingPage from "./Components/LoadingPage";
import { authContext } from "./Context/AuthContext";

const AuthView = () => {
  const ctx = useContext(authContext);
  const [loading, setloading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    Api.get("/auth/accounts/me/")
      .then((res) => {
        ctx.setUser(res.data.user);
        // console.log(res.data);
      })
      .catch(() => {
        navigate("/signin");
      })
      .finally(() => {
        setloading(false);
      });
  }, []);

  return loading ? (
    <Box>
      <LoadingPage />
    </Box>
  ) : (
    <Outlet />
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthView />}>
          <Route element={<Home />} index />
        </Route>
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
