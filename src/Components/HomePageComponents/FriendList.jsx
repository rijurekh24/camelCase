import { Avatar, Box, IconButton, Typography } from "@mui/material";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { useNavigate } from "react-router-dom";

const FriendList = (props) => {
  const navigate = useNavigate();
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
            color: "primary.main",
            bgcolor: "#111",
          }}
        >
          {props.name.charAt(0)}
        </Avatar>
        <Typography
          sx={{ cursor: "pointer" }}
          onClick={() => navigate(`/profile/${props.username}`)}
        >
          {props.username}
        </Typography>
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
