import { Grid } from "@mui/material";
import React from "react";
import PuffLoader from "react-spinners/PuffLoader";

const LoadingPage = () => {
  return (
    <Grid
      container
      sx={{ minHeight: "100vh", backgroundColor: "#181818" }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <PuffLoader color="#01ab81" />
    </Grid>
  );
};

export default LoadingPage;
