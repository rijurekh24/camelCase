import { Box, Typography } from "@mui/material";
import FriendList from "./FriendList";
import { useContext, useState } from "react";
import { authContext } from "../../Context/AuthContext";

const FriendListCard = () => {
  const ctx = useContext(authContext);
  const [displayCount, setDisplayCount] = useState(3);

  const handleShowMore = () => {
    // Increase the display count to show all elements
    setDisplayCount(ctx.user.following.length);
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
      <Typography variant="h6" mb={2}>
        Following
      </Typography>

      <ul>
        {ctx.user.following.slice(0, displayCount).map((item, index) => (
          <FriendList
            key={index}
            name={item.first_name}
            username={item.username}
            image="profile-photo"
          />
        ))}
      </ul>
      {displayCount < ctx.user.following.length && (
        <button onClick={handleShowMore}>Show More</button>
      )}
    </Box>
  );
};

export default FriendListCard;
