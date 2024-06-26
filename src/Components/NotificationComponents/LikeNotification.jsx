import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { format, register } from "timeago.js";
import Markdownimage from "../../assets/Images/MD.jpg";
const LikeNotification = ({ image, likedBy, date, id, closeDrawer }) => {
  const navigate = useNavigate();
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
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
      gap={2}
      py={1}
      width={"100%"}
      sx={{
        transition: "0.3s",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "backgroundColor.secondary",
        },
      }}
    >
      <Box display={"flex"} alignItems={"center"} gap={1} pl={1}>
        <Avatar
          src={likedBy?.profile_pic}
          sx={{
            backgroundColor: "black",
            color: "primary.main",
          }}
        ></Avatar>
        <Box>
          <Typography color={"textColor.main"}>
            <Typography
              component={"span"}
              mr={1}
              fontWeight={600}
              onClick={() => {
                closeDrawer();
                navigate(`/profile/${likedBy?.username}`);
              }}
            >
              {likedBy?.username}
            </Typography>
            liked your post
          </Typography>
          <Typography color={"textColor.secondary"}>
            {format(date, "custom")}
          </Typography>
        </Box>
      </Box>
      <Box pr={1}>
        <Link to={`/posts/${id}`} onClick={closeDrawer}>
          {image?.includes("cloudinary") ? (
            <Avatar
              sx={{
                borderRadius: 0,
                width: 45,
                height: 45,
              }}
              src={image}
            />
          ) : (
            <Avatar
              sx={{
                borderRadius: 0,
                width: 45,
                height: 45,
              }}
              src={Markdownimage}
            />
          )}
        </Link>
      </Box>
    </Box>
  );
};

export default LikeNotification;
