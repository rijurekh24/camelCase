import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import PostCard from "./PostCard";
import Post from "./Post";
import { authContext } from "../../Context/AuthContext";

const Feed = () => {
  const ctx = useContext(authContext);
  //console.log(ctx.postData);
  useEffect(() => {
    ctx.fetchPost();
  }, []);

  return (
    <Box
      sx={{
        flex: 4,
        px: "4px",
      }}
    >
      <Post />

      {ctx.postData.map((item) => (
        <PostCard
          name={`${item.user.first_name} ${item.user.last_name}`}
          username={item.user.username}
          image={item.img}
          caption={item.caption}
        />
      ))}
    </Box>
  );
};

export default Feed;
