import { Box, Typography } from "@mui/material";
import React from "react";

const RightBar = () => {
  return (
    <Box p={2} sx={{ display: { xs: "none", md: "block" } }}>
      <Box position={"fixed"}>
        <Typography color={"white"}></Typography>
      </Box>
    </Box>
  );
};

export default RightBar;
