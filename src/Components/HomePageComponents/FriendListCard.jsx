import { Box, Typography } from "@mui/material";
import FriendList from "./FriendList";

const FriendListCard = () => {
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
        Friend List
      </Typography>
      <FriendList
        name="Uzumaki Naruto"
        username="naruto123"
        image="https://i1.sndcdn.com/artworks-000139163741-dk8qn7-t500x500.jpg"
      />
      <FriendList
        name="Eren Yeager"
        username="yeager_10"
        image="https://i.pinimg.com/474x/b6/6d/22/b66d22a8b57900e75cbab27192cd58a3.jpg"
      />
      <FriendList
        name="Kamado Tanjiro"
        username="tanjiro_7"
        image="https://i-ogp.pximg.net/c/540x540_70/img-master/img/2020/05/23/00/00/03/81773326_p0_square1200.jpg"
      />
    </Box>
  );
};

export default FriendListCard;
