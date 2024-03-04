import { Box } from "@mui/material";
import React from "react";

const SideBar = () => {
  return (
    <Box
      display={{ xs: "none", md: "block" }}
      sx={{
        backgroundColor: "#232323",
        flex: 2,
        mr: 1,
        p: 6,
        borderRadius: "20px",
        color: "white",
      }}
    >
      SideBar
    </Box>
  );
};

export default SideBar;
