import { Box } from "@mui/material";
import React from "react";
import Post from "./Post";
import ProfileCard from "./ProfileCard";

const Feed = () => {
  return (
    <Box
      sx={
        {
          // flex: 5,
        }
      }
      px={{ xs: 0, md: 5, lg: 10, xl: 20 }}
    >
      <Post />
      <Post />
      <Post />
      <Post />
    </Box>
  );
};

export default Feed;
