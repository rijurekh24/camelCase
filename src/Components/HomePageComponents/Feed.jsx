import { Box } from "@mui/material";
import React from "react";
import PostCard from "./PostCard";
import Post from "./Post";

const Feed = () => {
  return (
    <Box
      sx={{
        flex: 4,
      }}
      px={{ xs: 0, md: 5, lg: 10, xl: 15 }}
    >
      <Post />
      <PostCard
        name="Uzumaki Naruto"
        username="naruto123"
        image="https://i1.sndcdn.com/artworks-000139163741-dk8qn7-t500x500.jpg"
      />
      <PostCard
        name="Eren Yeager"
        username="yeager_10"
        image="https://i.pinimg.com/474x/b6/6d/22/b66d22a8b57900e75cbab27192cd58a3.jpg"
      />
      <PostCard
        name="Kamado Tanjiro"
        username="tanjiro_7"
        image="https://i-ogp.pximg.net/c/540x540_70/img-master/img/2020/05/23/00/00/03/81773326_p0_square1200.jpg"
      />
    </Box>
  );
};

export default Feed;
