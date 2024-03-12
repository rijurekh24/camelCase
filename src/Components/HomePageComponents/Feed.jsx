import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import Post from "./Post";
import Api from "../../Utils/api";

const Feed = () => {
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    Api.get("/posts/get-all").then((res) => {
      setPostData(res.data.posts);
    });
  }, []);

  return (
    <Box
      sx={{
        flex: 4,
      }}
    >
      <Post />

      {postData.map((item) => (
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
