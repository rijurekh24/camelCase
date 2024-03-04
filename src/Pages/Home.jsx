import React from "react";
import Navbar from "../Components/Navbar";
import { Box, Container } from "@mui/material";

const Home = () => {
  return (
    <Container
      maxWidth={"xl"}
      sx={{ backgroundColor: "#181818", minHeight: "100vh" }}
    >
      <Navbar />
    </Container>
  );
};

export default Home;
