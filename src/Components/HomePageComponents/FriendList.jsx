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
            border: "5px solid ",
            borderColor: "borderColor.main",
            borderRadius: "20px",
          }}
          src={props.image}
        ></Avatar>
        <Typography>{props.username}</Typography>
      </Box>
      {/* <Box>
        <IconButton>
          <PersonRemoveIcon sx={{ color: "textColor.main" }} />
        </IconButton>
      </Box> */}
    </Box>
  );
};

export default FriendList;
