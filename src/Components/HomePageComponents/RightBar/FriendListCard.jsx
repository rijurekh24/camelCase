import { Box, Button, Typography } from "@mui/material";
import FriendList from "./FriendList";
import { useContext, useState } from "react";
import { authContext } from "../../../Context/AuthContext";

const FriendListCard = () => {
  const ctx = useContext(authContext);
  const [displayCount, setDisplayCount] = useState(3);

  const handleShowMore = () => {
    setDisplayCount(ctx.user.followers.length);
  };

  return (
    <Box
      p={2}
      sx={{
        backgroundColor: "backgroundColor.secondary",
        color: "textColor.main",
        borderRadius: "15px",
        marginBottom: 2,
      }}
    >
      <Typography fontSize={"1.1rem"} mb={2}>
        Followers
      </Typography>

      <ul>
        {ctx.user.followers.slice(0, displayCount).map((item, index) => (
          <FriendList
            key={index}
            name={`${item.first_name} ${item.last_name}`}
            username={item.username}
            dp={item.profile_pic}
          />
        ))}
      </ul>
      <Box display={"flex"} justifyContent={"center"}>
        {displayCount < ctx.user.followers.length && (
          <Button
            onClick={handleShowMore}
            sx={{
              backgroundColor: "none",
              color: "primary.main",
              textTransform: "none",
              borderRadius: "10px",
              ":hover": {
                backgroundColor: "none",
              },
              "&.MuiButtonBase-root:hover": {
                bgcolor: "transparent",
              },
            }}
          >
            Show More
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default FriendListCard;
