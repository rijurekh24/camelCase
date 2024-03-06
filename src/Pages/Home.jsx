import React from "react";
import Navbar from "../Components/Navbar";
import { Box, Container, Grid, Stack } from "@mui/material";
import Feed from "../Components/HomePageComponents/Feed";
import SideBar from "../Components/HomePageComponents/SideBar";
import RightBar from "../Components/HomePageComponents/RightBar";

const Home = () => {
  return (
    <Box sx={{ backgroundColor: "#181818", minHeight: "100vh" }}>
      <Navbar />
      <Box mt={3}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <SideBar />
          <Feed />
          <RightBar />
        </Stack>
      </Box>
    </Box>
  );
};

export default Home;
