import { useContext, useEffect, useState } from "react";
import Home from "./Pages/Home";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useNavigate,
} from "react-router-dom";
import Api from "./Utils/api";
import { Box } from "@mui/system";
import LoadingPage from "./Components/LoadingPage";
import { authContext } from "./Context/AuthContext";
import EmailVer from "./Pages/EmailVer";
import ProfilePage from "./Components/ProfilePageComponents/ProfilePage";

const AuthView = () => {
  const ctx = useContext(authContext);
  const [loading, setloading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    Api.get("/auth/accounts/me/")
      .then((res) => {
        ctx.setUser(res.data.user);
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
  // const [loader, setLoader] = useState(false);
  // useEffect(() => {
  //   setLoader(true);
  //   setTimeout(() => {
  //     setLoader(false);
  //   }, 1000);
  // }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthView />}>
            <Route element={<Home />} index />
            <Route path="profile/:username" element={<ProfilePage />} />
          </Route>

          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="emailverification" element={<EmailVer />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
