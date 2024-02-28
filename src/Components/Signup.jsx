import React from "react";
import "../assets/signup.css";
import { Box, Button, Grid, TextField } from "@mui/material";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Signup = () => {
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
                  mx: 2,
                  fontWeight: "bold",
                }}
                display={{ md: "none", lg: "block" }}
              >
                CoderDost
              </Typography>
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
                    <TextField
                      id="filled-basic"
                      label="First Name"
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
                      InputProps={{
                        style: { color: "white" },
                      }}
                      InputLabelProps={{
                        style: { color: "#888" },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      id="filled-basic"
                      label="Last Name"
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
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="filled-basic"
                      label="Username"
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
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="filled-basic"
                      label="Email address"
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
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      id="filled-basic"
                      label="Password"
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
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      id="filled-basic"
                      label="Confirm Password"
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
                  <Grid item xs={12}>
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
