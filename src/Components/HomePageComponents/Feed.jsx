import { Box } from "@mui/material";
import React from "react";
import PostCard from "./PostCard";

const Feed = () => {
  return (
    <Box
      sx={{
        flex: 5,
      }}
      // px={{ xs: 0, md: 5, lg: 10, xl: 20 }}
    >
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
    </Box>
  );
};

export default Feed;
