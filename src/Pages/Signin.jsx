import { useState } from "react";
import "../assets/signup.css";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate, Link } from "react-router-dom";
import Api from "../Utils/api";

const Signin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

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

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSignIn = (e) => {
    e.preventDefault();

    setErrors({
      username: "",
      password: "",
    });

    let hasErrors = false;

    const requiredFields = ["username", "password"];
    requiredFields.forEach((textField) => {
      if (!user[textField]) {
        setErrors((prev) => ({
          ...prev,
          [textField]: "This field is required.",
        }));
        hasErrors = true;
      }
    });

    if (hasErrors) {
      return;
    }
    setIsLoading(true);
    setErr(null);
    Api.post("/auth/login/", user)
      .then((response) => {
        navigate("/", { replace: true });
        setIsLoading(false);
      })
      .catch((err) => {
        //console.log(err.response);
        if (
          err.response &&
          err.response.data &&
          err.response.data.msg === "email not verified"
        ) {
          navigate(`/emailverification?email=${err.response.data.email}`);
        }
        setErr(err.response.data.msg);
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
              sx={{
                width: "97%",
                background: "linear-gradient(135deg, #76ABAE, #31363F)",
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
            <Grid item xs={10} md={7}>
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
                    style={{ color: "#76ABAE", marginRight: "1%" }}
                  ></i>
                  camelCase
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
                      id="filled-basic "
                      label="Enter Username"
                      variant="filled"
                      fullWidth
                      autoComplete={"on"}
                      name="username"
                      onChange={handleInputs}
                      error={!!errors.username}
                      helperText={errors.username}
                      sx={{
                        ":hover": {},
                        borderRadius: 1,
                        bgcolor: "backgroundColor.secondary",
                        "& .MuiFilledInput-underline:after": {
                          borderBottomColor: "primary.main",
                        },
                      }}
                      InputLabelProps={{
                        style: { color: "#888" },
                      }}
                      InputProps={{
                        style: { color: "white" },
                        disableUnderline: false,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="filled-basic"
                      label="Enter Password"
                      variant="filled"
                      autoComplete="off"
                      type={!visible ? "password" : "text"}
                      fullWidth
                      name="password"
                      onChange={handleInputs}
                      error={!!errors.password}
                      helperText={errors.password}
                      sx={{
                        ":hover": {},
                        borderRadius: 1,
                        bgcolor: "backgroundColor.secondary",
                        "& .MuiFilledInput-underline:after": {
                          borderBottomColor: "primary.main",
                        },
                      }}
                      InputLabelProps={{
                        style: { color: "#888" },
                      }}
                      InputProps={{
                        style: { color: "white" },
                        disableUnderline: false,
                        endAdornment: (
                          <EndAdorment
                            visible={visible}
                            setVisible={setVisible}
                          />
                        ),
                      }}
                    />
                    <Link
                      to=""
                      style={{
                        color: "#76ABAE",
                        cursor: "pointer",
                        textDecoration: "none",
                      }}
                    >
                      <Typography mt={1}>Forget Password?</Typography>
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      fullWidth
                      disabled={isLoading}
                      sx={{
                        mt: 1,
                        p: 1,
                        color: "white",
                        backgroundColor: "primary.main",
                        "&:hover": {
                          backgroundColor: "#31363F",
                        },
                        "&:disabled": {
                          backgroundColor: "#31363F",
                        },
                      }}
                      onClick={handleSignIn}
                    >
                      {isLoading ? (
                        <CircularProgress
                          size={"2em"}
                          sx={{ color: "white" }}
                        />
                      ) : (
                        "Sign in"
                      )}
                    </Button>
                    {err && (
                      <Alert variant="standard" severity="error" sx={{ mt: 1 }}>
                        {err}
                      </Alert>
                    )}
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
                        className="fa-brands fa-google fa-2xl"
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
                        className="fa-brands fa-github fa-2xl"
                        style={{ marginLeft: "4%" }}
                      ></i>
                    </Button>
                  </Grid>
                  <Grid item xs={12} sx={{ textAlign: "center" }}>
                    <Typography sx={{ color: "white" }}>
                      Don't have an account?{" "}
                      <Link
                        to="/signup"
                        style={{
                          color: "#76ABAE",
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
