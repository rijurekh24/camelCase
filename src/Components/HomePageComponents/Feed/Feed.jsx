import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import MediaPostCard from "../PostCards/MediaPostCard";
import Post from "./Post";
import { authContext } from "../../../Context/AuthContext";
import MarkDownPostCard from "../PostCards/MarkDownPostCard";

const Feed = () => {
  const ctx = useContext(authContext);
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
      <Box width={{ xs: "100dvw", lg: "35rem" }}>
        <Post />
        {ctx.postData.map((item, index) =>
          item.type === "Media" ? (
            <MediaPostCard
              key={item._id}
              name={`${item.user.first_name} ${item.user.last_name}`}
              username={item.user.username}
              image={item.img}
              caption={item.caption}
              date={item.date}
              postId={item._id}
              likes={item.likes}
              dp={item.user.profile_pic}
            />
          ) : (
            <MarkDownPostCard
              key={item._id}
              name={`${item.user.first_name} ${item.user.last_name}`}
              username={item.user.username}
              image={item.img}
              caption={item.caption}
              date={item.date}
              postId={item._id}
              likes={item.likes}
              dp={item.user.profile_pic}
            />
          )
        )}
      </Box>
    </Box>
  );
};

export default Feed;
