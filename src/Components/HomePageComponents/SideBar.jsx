import { Box, Typography } from "@mui/material";
import React from "react";
import ProfileCard from "./ProfileCard";

const Sidebar = () => {
  return (
    <Box px={2} sx={{ display: { xs: "none", md: "block" }, flex: 2 }}>
      <Box>
        <ProfileCard />
      </Box>
    </Box>
  );
};

export default Sidebar;
