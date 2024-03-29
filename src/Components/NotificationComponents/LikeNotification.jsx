import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { format, register } from "timeago.js";
const LikeNotification = ({ image, likedBy, date, id }) => {
  register("custom", (number, index) => {
    return [
      ["just now", "right now"],
      ["%ss", "in %ss"],
      ["1m", "in 1m"],
      ["%sm", "in %sm"],
      ["1h", "in 1h"],
      ["%sh", "in %sh"],
      ["1d", "in 1d"],
      ["%sd", "in %sd"],
      ["1w", "in 1w"],
      ["%sw", "in %sw"],
      ["1mo", "in 1mo"],
      ["%smo", "in %smo"],
      ["1yr", "in 1yr"],
      ["%syr", "in %syr"],
    ][index];
  });
  return (
    <Box py={1} width={"100%"}>
      <Box
        display={"flex"}
        alignItems={"center"}
        gap={2}
        px={2}
        py={1}
        sx={{
          transition: "0.3s",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "backgroundColor.secondary",
          },
        }}
      >
        <Avatar
          src={likedBy?.profile_pic}
          sx={{ backgroundColor: "black", color: "primary.main" }}
        ></Avatar>
        <Box>
          <Typography color={"textColor.main"}>
            {likedBy?.username} liked your post
          </Typography>
          <Typography color={"textColor.secondary"}>
            {format(date, "custom")}
          </Typography>
        </Box>
        <Avatar
          sx={{ borderRadius: 0, width: 45, height: 45, ml: "auto" }}
          src={image}
        />
      </Box>
    </Box>
  );
};

export default LikeNotification;
