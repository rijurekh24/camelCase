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
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      sx={{
        flex: 5,
        px: "4px",
      }}
    >
      <Box width={{ xs: "100%", md: "75%" }}>
        <Post />

        {ctx.postData.map((item) => (
          <PostCard
            name={`${item.user.first_name} ${item.user.last_name}`}
            username={item.user.username}
            image={item.img}
            caption={item.caption}
            date={item.date}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Feed;
