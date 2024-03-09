import { useState } from "react";
import "../assets/signup.css";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Textfield from "../Components/Textfield";
import Api from "../Utils/api";
import validator from "validator";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    con_password: "",
  });

  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    con_password: "",
  });

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleClick = (e) => {
    e.preventDefault();

    setErrors({
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      con_password: "",
    });

    let hasErrors = false;

    const requiredFields = [
      "first_name",
      "last_name",
      "username",
      "email",
      "password",
      "con_password",
    ];
    requiredFields.forEach((textField) => {
      if (!user[textField]) {
        setErrors((prev) => ({
          ...prev,
          [textField]: "This field is required.",
        }));
        hasErrors = true;
      }
    });

    const passwordCheck =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (user.password && !passwordCheck.test(user.password)) {
      setErrors((prev) => ({
        ...prev,
        password: (
          <ul>
            <li>Password must contain at least one uppercase letter (A-Z)</li>
            <li>Password must contain at least one lowercase letter (a-z)</li>
            <li>Password must contain at least one number (0-9)</li>
            <li>
              Password must contain at least one special character (@$!%*?&)
            </li>
            <li>Minimum length should be 8</li>
          </ul>
        ),
      }));
      hasErrors = true;
    }

    if (user.con_password && user.password !== user.con_password) {
      setErrors((prev) => ({
        ...prev,
        con_password: "Passwords do not match.",
      }));
      hasErrors = true;
    }

    if (user.email && !validator.isEmail(user.email)) {
      setErrors((prev) => ({
        ...prev,
        email: "email is not valid",
      }));
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

    setIsLoading(true);

    Api.post("/auth/register/", user)
      .then((response) => {
        //console.log("Response from API:", response.data);
        navigate(`/emailverification?email=${user.email}`);
        setIsLoading(false);
      })
      .catch((error) => {
        //console.log(error.response.data);
        if (
          error.response &&
          error.response.data &&
          error.response.data.msg === "username already exists"
        ) {
          setErrors((prev) => ({
            ...prev,
            username: "Username already exists.",
          }));
        }

        if (
          error.response &&
          error.response.data &&
          error.response.data.msg === "email already exists"
        ) {
          setErrors((prev) => ({
            ...prev,
            email: "Email already exists.",
          }));
        }

        setIsLoading(false);
      });
  };

  return (
    <Box
      sx={{
        backgroundColor: "backgroundColor.main",
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
                borderRadius: "10px",
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
                camelCase
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
            <Grid item md={9} xs={10}>
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    color: "primary.main",
                    fontWeight: "bold",
                  }}
                  display={{ sm: "block", md: "none" }}
                >
                  <i
                    className="fa-regular fa-square"
                    style={{ color: "#01ab81", marginRight: "1%" }}
                  ></i>
                  camelCase
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
                      err={!!errors.first_name}
                      helperTxt={errors.first_name}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Textfield
                      label={"Last name"}
                      name="last_name"
                      handleChange={handleInputs}
                      err={!!errors.last_name}
                      helperTxt={errors.last_name}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Textfield
                      label={"Username"}
                      name="username"
                      handleChange={handleInputs}
                      err={!!errors.username}
                      helperTxt={errors.username}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Textfield
                      label={"Email address"}
                      name="email"
                      handleChange={handleInputs}
                      err={!!errors.email}
                      helperTxt={errors.email}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Textfield
                      label={"Password"}
                      name="password"
                      handleChange={handleInputs}
                      err={!!errors.password}
                      helperTxt={errors.password}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Textfield
                      label={"Confirm Password"}
                      name="con_password"
                      handleChange={handleInputs}
                      err={!!errors.con_password}
                      helperTxt={errors.con_password}
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
                        color: "white",
                        backgroundColor: "primary.main",
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
                        <CircularProgress
                          size={"2em"}
                          sx={{ color: "white" }}
                        />
                      ) : (
                        "Sign up"
                      )}
                    </Button>
                  </Grid>
                  {/* <Grid item xs={12}>
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
                  </Grid> */}
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
