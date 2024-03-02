import React, { useState } from "react";
import "../assets/signup.css";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Textfield from "./Textfield";
import Api from "../Utils/api";
import { LoadingButton } from "@mui/lab";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState({
    first_name_err: "",
    last_name_err: "",
    username_err: "",
    email_err: "",
    password_err: "",
    con_password_err: "",
  });
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    con_password: "",
  });

  function checkValidPassword(obj) {
    if (
      obj.includes("@") ||
      obj.includes("!") ||
      obj.includes("#") ||
      obj.includes("&") ||
      obj.includes("*") ||
      obj.includes(")") ||
      obj.includes("_") ||
      obj.includes("-") ||
      obj.includes("+") ||
      obj.includes("=") ||
      obj.includes("/") ||
      obj.includes(".") ||
      obj.includes("^") ||
      obj.includes("(")
    )
      return false;

    return true;
  }
  const handleInputs = (e) => {
    const { name, value } = e.target;
    if (user.first_name !== null)
      setErr((prev) => ({ ...prev, first_name_err: null }));

    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = (e) => {
    e.preventDefault();

    setIsLoading(true);
    if (user.first_name.length === 0) {
      setErr((prev) => ({
        ...prev,
        first_name_err: "first name is required",
      }));
    }
    if (user.last_name.length === 0) {
      setErr((prev) => ({
        ...prev,
        last_name_err: "last name is required",
      }));
    }

    if (user.email.length === 0) {
      setErr((prev) => ({
        ...prev,
        email_err: "email is required",
      }));
    }
    if (user.password.length === 0) {
      setErr((prev) => ({
        ...prev,
        password_err: "password is required",
      }));
    }

    if (user.con_password.length === 0) {
      setErr((prev) => ({
        ...prev,
        con_password_err: "cannot be empty",
      }));
    }

    if (user.username.length < 6) {
      setErr((prev) => ({
        ...prev,
        username_err: "username must have atleast 6 characters",
      }));
    }

    if (user.password.length < 8)
      setErr((prev) => ({
        ...prev,
        password_err: "length should be minimum 8",
      }));
    if (user.password.length !== 0 && checkValidPassword(user.password))
      setErr((prev) => ({
        ...prev,
        password_err: "password is not strong",
      }));

    if (user.con_password.length !== 0 && user.password !== user.con_password)
      setErr((prev) => ({
        ...prev,
        con_password_err: "password is not matching",
      }));

    Api.post("/auth/register/", user)
      .then((response) => {
        console.log("Response from API:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error.response);
        setIsLoading(false);
      });
  };

  return (
    <Box
      className="signupPage"
      sx={{
        backgroundColor: "#181818",
        minHeight: " 100vh",
        display: "flex",
      }}
    >
      <Grid container justifyContent={"center"} alignItems={"center"}>
        <Grid item lg={6} md={6}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              display={{ xs: "none", md: "block" }}
              style={{
                width: "97%",
                background: "linear-gradient(135deg, #01ab81, #104f3f)",
                height: "97vh",
                borderRadius: "15px",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: "white",
                  m: 2,
                  fontWeight: "bold",
                }}
                display={{ md: "none", lg: "block" }}
              >
                <i
                  className="fa-regular fa-square"
                  style={{ color: "#ffffff", marginRight: "1%" }}
                ></i>
                CoderDost
              </Typography>
              <Grid
                container
                justifyContent={"center"}
                flexDirection={"column"}
                alignItems={"center"}
                mt={10}
              >
                <Typography sx={{ color: "white", fontSize: "1.2rem" }}>
                  Latest Realease
                </Typography>
                <Typography sx={{ color: "#ddd", fontSize: "0.9em" }}>
                  Explore latest additional features
                </Typography>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} lg={6} md={6} py={4}>
          <Grid container justifyContent={"center"} alignItems={"center"}>
            <Grid item md={6} xs={10}>
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    color: "#01ab81",
                    fontWeight: "bold",
                  }}
                  display={{ sm: "block", md: "none" }}
                >
                  <i
                    className="fa-regular fa-square"
                    style={{ color: "#01ab81", marginRight: "1%" }}
                  ></i>
                  CoderDost
                </Typography>
                <Typography
                  variant="h5"
                  fontWeight={600}
                  fontSize={"2rem"}
                  sx={{ color: "white", mb: 1 }}
                >
                  Get Started
                </Typography>
                <Typography sx={{ color: "#666", fontSize: "0.8rem", mb: 2 }}>
                  CREATE YOUR FREE ACCOUNT
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Textfield
                      label={"First name"}
                      name="first_name"
                      handleChange={handleInputs}
                      err={!!err.first_name_err}
                      helperTxt={err.first_name_err}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Textfield
                      label={"Last name"}
                      name="last_name"
                      handleChange={handleInputs}
                      err={!!err.last_name_err}
                      helperTxt={err.last_name_err}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Textfield
                      label={"Username"}
                      name="username"
                      handleChange={handleInputs}
                      err={!!err.username_err}
                      helperTxt={err.username_err}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Textfield
                      label={"Email address"}
                      name="email"
                      handleChange={handleInputs}
                      err={!!err.email_err}
                      helperTxt={err.email_err}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Textfield
                      label={"Password"}
                      name="password"
                      handleChange={handleInputs}
                      err={!!err.password_err}
                      helperTxt={err.password_err}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Textfield
                      label={"Confirm Password"}
                      name="con_password"
                      handleChange={handleInputs}
                      err={!!err.con_password_err}
                      helperTxt={err.con_password_err}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      fullWidth
                      disabled={isLoading}
                      sx={{
                        mt: 2,
                        p: 1,
                        backgroundColor: "#01ab81",
                        "&:hover": {
                          backgroundColor: "#007d5e",
                        },
                        "&:disabled": {
                          backgroundColor: "#007d5e",
                        },
                      }}
                      onClick={handleClick}
                    >
                      {isLoading ? (
                        <CircularProgress sx={{ color: "white" }} />
                      ) : (
                        "Sign up"
                      )}
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        p: 1,
                        backgroundColor: "#222",
                        "&:hover": {
                          backgroundColor: "#191919",
                        },
                      }}
                    >
                      Continue with Google{" "}
                      <i
                        className="fa-brands fa-google fa-xl"
                        style={{ marginLeft: "4%" }}
                      ></i>
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        p: 1,
                        color: "white",
                        boxShadow: "none",
                        backgroundColor: "#222",
                        "&:hover": {
                          backgroundColor: "#191919",
                        },
                      }}
                      onClick={handleClick}
                    >
                      Continue with Github{" "}
                      <i
                        className="fa-brands fa-github fa-xl"
                        style={{ marginLeft: "4%" }}
                      ></i>
                    </Button>
                  </Grid>
                  <Grid item xs={12} sx={{ textAlign: "center" }}>
                    <Typography sx={{ color: "white" }}>
                      Already have an account?{" "}
                      <Link
                        to="/signin"
                        style={{
                          color: "#01ab81",
                          cursor: "pointer",
                          textDecoration: "none",
                        }}
                      >
                        Sign in
                      </Link>
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Signup;
