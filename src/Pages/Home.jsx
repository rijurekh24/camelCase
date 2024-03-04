import React from "react";
import Navbar from "../Components/Navbar";
import { Box, Container, Grid, Stack } from "@mui/material";
import Feed from "../Components/HomePageComponents/Feed";
import SideBar from "../Components/HomePageComponents/SideBar";
import RightBar from "../Components/HomePageComponents/RightBar";

const Home = () => {
  return (
    <Box
      // maxWidth={"xl"}
      sx={{ backgroundColor: "#181818", minHeight: "100vh" }}
    >
      <Navbar />
      <Box>
        <Stack direction={"row"} justifyContent={"space-evenly"}>
          <Grid container>
            <Grid item lg={2}>
              <SideBar />
            </Grid>
            <Grid item xs={12} md={8}>
              <Feed />
            </Grid>
            <Grid item lg={2}>
              <RightBar />
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </Box>
  );
};

export default Home;
