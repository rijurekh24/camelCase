import { Box } from "@mui/material";
import React from "react";

const RightBar = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#232323",
        flex: 2,
        ml: 1,
        p: 6,
        borderRadius: "20px",
        color: "white",
      }}
    >
      Recent Activity
    </Box>
  );
};

export default RightBar;
