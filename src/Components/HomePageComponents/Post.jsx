import { useContext, useState } from "react";
import { Button, IconButton, Typography } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import PollIcon from "@mui/icons-material/Poll";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Avatar, Box, TextField } from "@mui/material";
import { Send } from "@mui/icons-material";
import PostModal from "./PostModal";
import { authContext } from "../../Context/AuthContext";
import Api from "../../Utils/api";
const Post = () => {
  const [textInput, setTextInput] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const ctx = useContext(authContext);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const handleInputChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleSend = () => {
    Api.post("/posts/create-new", {
      username: ctx.user.username,
      caption: textInput,
      user: ctx.user._id,
    })
      .then((res) => {
        ctx.fetchPost();
        setTextInput("");
      })
      .catch((err) => {});
  };
  return (
    <Box
      sx={{
        bgcolor: "backgroundColor.secondary",
        borderRadius: { xs: "0", lg: "15px" },
        marginBottom: 2,
        display: "flex",
        padding: "10px 15px",
        gap: 2,
        alignItems: "center",
      }}
    >
      <PostModal open={modalOpen} handleClose={closeModal} />
      <Box>
        <Avatar
          sx={{
            bgcolor: "grey",
            border: "5px solid",
            borderColor: "borderColor.main",
            borderRadius: "20px",
            color: "primary.main",
            bgcolor: "#111",
          }}
        >
          {ctx.user.first_name ? ctx.user.first_name.charAt(0) : ""}
        </Avatar>
      </Box>
      <Box width={"100%"}>
        <Box
          mb={1}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            id="filled-basic"
            label="Tell your friends about your thougts..."
            variant="filled"
            autoComplete="off"
            multiline
            fullWidth
            value={textInput}
            onChange={handleInputChange}
            sx={{
              bgcolor: "backgroundColor.secondary",
              "& .MuiFilledInput-underline:after": {
                borderBottomColor: "primary.main",
              },
            }}
            InputLabelProps={{
              style: { color: "#888" },
            }}
            InputProps={{
              sx: { color: "textColor.main", borderRadius: "20px" },
              disableUnderline: true,
              endAdornment: textInput && (
                <Send
                  sx={{ color: "textColor.main", cursor: "pointer" }}
                  onClick={handleSend}
                />
              ),
            }}
          />
        </Box>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Button
            onClick={openModal}
            disableRipple
            sx={{
              color: "textColor.main",
              borderRadius: "15px",
              textTransform: "none",
              ":hover": {
                backgroundColor: "transparent",
              },
              p: 0,
            }}
          >
            <IconButton>
              <InsertPhotoIcon
                disableRipple
                sx={{ color: "primary.main", fontSize: "1.2rem" }}
              />
            </IconButton>
            <Typography
              pr={2}
              display={{ xs: "none", md: "block" }}
              fontSize={"0.9rem"}
            >
              Photo
            </Typography>
          </Button>
          <Button
            onClick={openModal}
            sx={{
              color: "textColor.main",
              borderRadius: "15px",
              textTransform: "none",
              ":hover": {
                backgroundColor: "transparent",
              },
            }}
            disableRipple
          >
            <IconButton>
              <PlayCircleIcon
                disableRipple
                sx={{ color: "#4F93F8", fontSize: "1.2rem" }}
              />
            </IconButton>
            <Typography
              pr={2}
              display={{ xs: "none", md: "block" }}
              fontSize={"0.9rem"}
            >
              Video
            </Typography>
          </Button>
          <Button
            disableRipple
            sx={{
              color: "textColor.main",
              textTransform: "none",
              borderRadius: "15px",
              fontSize: "0.7rem",
              ":hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <IconButton>
              <PollIcon
                disableRipple
                sx={{ color: "#E67575", fontSize: "1.2rem" }}
              />
            </IconButton>
            <Typography
              pr={2}
              display={{ xs: "none", md: "block" }}
              fontSize={"0.9rem"}
            >
              Poll
            </Typography>
          </Button>
          <Button
            disableRipple
            sx={{
              color: "textColor.main",
              borderRadius: "15px",
              textTransform: "none",
              ":hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <IconButton>
              <CalendarMonthIcon
                disableRipple
                sx={{ color: "#EEBE65", fontSize: "1.2rem" }}
              />
            </IconButton>
            <Typography
              pr={2}
              display={{ xs: "none", md: "block" }}
              fontSize={"0.9rem"}
            >
              Schedule
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Post;
