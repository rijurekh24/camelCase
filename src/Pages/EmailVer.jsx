import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Emailsent from "../assets/Images/email-sent.png";
import { useLocation } from "react-router-dom";
import Api from "../Utils/api";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const EmailVer = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userEmail = searchParams.get("email");
  const [isDisabled, setIsDisabled] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };
  const sendVerificationEmail = () => {
    setIsDisabled(true);
    Api.post("/auth/accounts/activation/", { email: userEmail })
      .then((res) => {
        // console.log("success");
        handleOpenSnackbar();
      })
      .catch((err) => {
        // console.log(err.response);
      });
  };

  useEffect(() => {
    let timer;
    if (isDisabled) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isDisabled]);

  useEffect(() => {
    if (countdown === 0) {
      setIsDisabled(false);
      setCountdown(30);
    }
  }, [countdown]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{ minHeight: "100vh", backgroundColor: "#181818" }}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Grid
        container
        flexDirection={"column"}
        minHeight={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid item xs={10} md={4} textAlign={"center"}>
          <Typography
            variant="h5"
            sx={{
              color: "#01ab81",
              fontWeight: "bold",
              fontSize: "2.2rem",
            }}
          >
            <i
              className="fa-regular fa-square"
              style={{ color: "#01ab81", marginRight: "2%" }}
            ></i>
            camelCase
          </Typography>

          <Typography
            color={"white"}
            mt={6}
            sx={{ fontSize: "1.2rem", letterSpacing: "2px" }}
          >
            Great, now verify your email
          </Typography>
          <Box
            component={"img"}
            src={Emailsent}
            sx={{ width: "60%", mb: 2 }}
          ></Box>
          <Typography color={"white"} mt={2}>
            Check your registered email{" "}
            <Typography sx={{ color: "#01ab81", display: "inline-block" }}>
              {userEmail}
            </Typography>{" "}
            inbox and click the verification link inside to complete your
            registration. This link will expire shortly, so verify soon!
          </Typography>
          <Typography fontWeight={500} color={"white"} mt={3}>
            Link expired ?{" "}
            <Typography
              style={{
                color: isDisabled ? "#888" : "#01ab81",
                textDecoration: "none",
                cursor: isDisabled ? "not-allowed" : "pointer",
                display: "inline-block",
              }}
              onClick={!isDisabled ? sendVerificationEmail : null}
            >
              Resend Verification Email
            </Typography>
          </Typography>
          {isDisabled && (
            <Typography sx={{ color: "white" }}>
              {" "}
              (Resend in {countdown} seconds)
            </Typography>
          )}
          <Snackbar
            open={openSnackbar}
            autoHideDuration={5000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            sx={{
              "& .MuiSnackbarContent-root": { backgroundColor: "#01ab81" },
            }}
          >
            <MuiAlert
              elevation={6}
              variant="filled"
              onClose={handleCloseSnackbar}
              severity="success"
              sx={{ backgroundColor: "#01ab81", mb: 2 }}
            >
              Verification email sent successfully!
            </MuiAlert>
          </Snackbar>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmailVer;
