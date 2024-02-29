import React, { useEffect, useState } from "react";
import Home from "./Components/Home";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useNavigate,
} from "react-router-dom";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";

const AuthView = () => {
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate("/signin");
    }
  }, []);

  return <Outlet />;
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
