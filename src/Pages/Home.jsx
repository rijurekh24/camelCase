import React from "react";
import Navbar from "../Components/Navbar";
import { Box, Container, Stack } from "@mui/material";
import Feed from "../Components/HomePageComponents/Feed";
import SideBar from "../Components/HomePageComponents/SideBar";
import RightBar from "../Components/HomePageComponents/RightBar";

const Home = () => {
  return (
    <Container
      maxWidth={"xl"}
      sx={{ backgroundColor: "#181818", minHeight: "100vh" }}
    >
      <Navbar />
      <Box>
        <Stack direction={"row"} justifyContent={"space-evenly"}>
          <SideBar />
          <Feed />
          <RightBar />
        </Stack>
      </Box>
    </Container>
  );
};

export default Home;
