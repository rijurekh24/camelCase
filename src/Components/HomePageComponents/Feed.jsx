import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import PostCard from "./PostCard";
import Post from "./Post";
import { authContext } from "../../Context/AuthContext";

const Feed = () => {
  const ctx = useContext(authContext);
  useEffect(() => {
    ctx.fetchPost();
  }, []);

  console.log(ctx.postData);
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      sx={{
        flex: 5,
        px: "4px",
      }}
    >
      <Box width={{ xs: "100%", lg: "75%" }}>
        <Post />
        {ctx.postData.map((item, index) => (
          <PostCard
            key={item._id}
            name={`${item.user.first_name} ${item.user.last_name}`}
            username={item.user.username}
            image={item.img}
            caption={item.caption}
            date={item.date}
            postId={item._id}
            likes={item.likes}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Feed;
