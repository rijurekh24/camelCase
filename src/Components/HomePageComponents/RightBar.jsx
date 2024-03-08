import { Box, Typography } from "@mui/material";
import React from "react";
import FriendListCard from "./FriendListCard";
const RightBar = () => {
  return (
    <Box px={2} sx={{ display: { xs: "none", md: "block" }, flex: 2 }}>
      <Box>
        <FriendListCard></FriendListCard>
      </Box>
    </Box>
  );
};

export default RightBar;
