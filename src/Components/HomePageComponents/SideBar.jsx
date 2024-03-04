import { Box, Typography } from "@mui/material";
import React from "react";
import ProfileCard from "./ProfileCard";

const Sidebar = () => {
  return (
    <Box p={2} sx={{ display: { xs: "none", md: "block" } }}>
      <Box position={"fixed"}>{/* <ProfileCard /> */}</Box>
    </Box>
  );
};

export default Sidebar;
