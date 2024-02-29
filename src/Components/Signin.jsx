import React, { useState } from "react";
import "../assets/signup.css";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import Api from "../Utils/api";

const Signin = () => {
  const [visible, setVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const EndAdorment = ({ visible, setVisible }) => {
    return (
      <InputAdornment position="end" sx={{ color: "white" }}>
        <IconButton onClick={() => setVisible(!visible)}>
          {visible ? (
            <VisibilityIcon sx={{ color: "White" }} />
          ) : (
            <VisibilityOffIcon sx={{ color: "White" }} />
          )}
        </IconButton>
      </InputAdornment>
    );
  };

  const handleSignIn = () => {
    Api.post("/login/", {
      username,
      password,
    })
      .then((response) => {
        console.log(response.data.user);
      })
      .catch((error) => {
        console.log(error.response.data.msg);
      });
  };
  return (
    <Box
      className="signupPage"
      style={{
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
              sx={{
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
                ></i>{" "}
                CoderDost
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} lg={6} md={6} py={4}>
          <Grid container justifyContent={"center"} alignItems={"center"}>
            <Grid item xs={10} md={6}>
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
                  Welcome Back
                </Typography>
                <Typography sx={{ color: "#666", fontSize: "0.8rem", mb: 2 }}>
                  SIGN IN TO YOUR ACCOUNT
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      id="filled-basic"
                      label="Enter Username"
                      variant="filled"
                      fullWidth
                      sx={{
                        ":hover": {
                          border: 0,
                          outline: 0,
                        },
                        borderRadius: 1,
                        bgcolor: "#232323",
                        "& .MuiFilledInput-underline:after": {
                          border: 0,
                          borderBottomColor: "red",
                        },

                        "&:hover .MuiFilledInput-underline:before": {
                          border: 0,
                          borderColor: "transparent",
                        },
                      }}
                      InputLabelProps={{
                        style: { color: "#888" },
                      }}
                      InputProps={{
                        style: { color: "white" },
                      }}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="filled-basic"
                      label="Enter Password"
                      variant="filled"
                      type={!visible ? "password" : "text"}
                      fullWidth
                      sx={{
                        ":hover": {
                          border: 0,
                          outline: 0,
                        },
                        borderRadius: 1,
                        bgcolor: "#232323",
                        "& .MuiFilledInput-underline:after": {
                          border: 0,
                          borderBottomColor: "red",
                        },

                        "&:hover .MuiFilledInput-underline:before": {
                          border: 0,
                          borderColor: "transparent",
                        },
                      }}
                      InputLabelProps={{
                        style: { color: "#888" },
                      }}
                      InputProps={{
                        style: { color: "white" },
                        endAdornment: (
                          <EndAdorment
                            visible={visible}
                            setVisible={setVisible}
                          />
                        ),
                      }}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                      onClick={handleSignIn}
                    >
                      Sign in
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
                        className="fa-brands fa-google fa-2xl"
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
                    >
                      Continue with Github{" "}
                      <i
                        className="fa-brands fa-github fa-2xl"
                        style={{ marginLeft: "4%" }}
                      ></i>
                    </Button>
                  </Grid>
                  <Grid item xs={12} sx={{ textAlign: "center" }}>
                    <Typography sx={{ color: "white" }}>
                      Already have an account?{" "}
                      <Link
                        to="/signup"
                        style={{
                          color: "#01ab81",
                          cursor: "pointer",
                          textDecoration: "none",
                        }}
                      >
                        Sign up
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

export default Signin;
