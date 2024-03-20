import { Box, Typography } from "@mui/material";
import React from "react";

const Comments = ({ username, comment }) => {
  return (
    <Box px={2} display={"flex"} gap={1}>
      <Typography sx={{ color: "textColor.secondary" }}>@{username}</Typography>
      <Typography>{comment}</Typography>
    </Box>
  );
};

export default Comments;
