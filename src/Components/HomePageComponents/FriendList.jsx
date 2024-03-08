import { Avatar, Box, IconButton, Typography } from "@mui/material";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

const FriendList = (props) => {
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      mb={2}
    >
      <Box display={"flex"} gap={1} alignItems={"center"}>
        <Avatar
          sx={{
            bgcolor: "grey",
            border: "5px solid #181818",
            borderRadius: "20px",
          }}
          src={props.image}
        ></Avatar>
        <Typography>{props.username}</Typography>
      </Box>
      <Box>
        <IconButton>
          <PersonRemoveIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default FriendList;
