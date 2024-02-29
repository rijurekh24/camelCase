import React, { useState } from "react";
import "../assets/signup.css";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Textfield from "./Textfield";
import Api from "../Utils/api";

const Signup = () => {
  const [err, setErr] = useState(null);
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    con_password: "",
  });

  console.log(user);
  const handleInputs = (e) => {
    const { name, value } = e.target;

    if (name == "con_password") setErr(null);
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = (e) => {
    e.preventDefault();

    if (user.password !== user.con_password)
      return setErr("password should match");

    Api.post("/register/", user)
      .then((response) => {
        console.log("Response from API:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error.response);
      });
  };

  console.log(err);
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
                  fontWeight: "bold",
                  m: 2,
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
                  ></i>{" "}
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
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Textfield
                      label={"Last name"}
                      name="last_name"
                      handleChange={handleInputs}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Textfield
                      label={"Username"}
                      name="username"
                      handleChange={handleInputs}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Textfield
                      label={"Email address"}
                      name="email"
                      handleChange={handleInputs}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Textfield
                      label={"Password"}
                      name="password"
                      handleChange={handleInputs}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Textfield
                      label={"Confirm Password"}
                      name="con_password"
                      handleChange={handleInputs}
                      err={err != null}
                      helperTxt={err}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        mt: 2,
                        p: 1,
                        backgroundColor: "#01ab81",
                        "&:hover": {
                          backgroundColor: "#007d5e",
                        },
                      }}
                      onClick={handleClick}
                    >
                      Sign Up
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
