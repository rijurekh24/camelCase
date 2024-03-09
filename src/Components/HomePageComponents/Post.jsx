import { useState } from "react";
import { Button, IconButton, Typography } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import PollIcon from "@mui/icons-material/Poll";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Avatar, Box, TextField } from "@mui/material";
import { Send } from "@mui/icons-material";
import PostModal from "./PostModal";
const Post = () => {
  const [textInput, setTextInput] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

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
    setTextInput("");
  };
  return (
    <Box
      sx={{
        bgcolor: "#232323",
        borderRadius: "25px",
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
            borderColor: "backgroundColor.main",
            borderRadius: "20px",
          }}
          src="https://pics.craiyon.com/2023-09-20/c98875fa1d9e4981b377031bc56a8a6a.webp"
        ></Avatar>
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
            fullWidth
            autoComplete="off"
            multiline
            value={textInput}
            onChange={handleInputChange}
            sx={{
              bgcolor: "#232323",
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
            sx={{
              backgroundColor: "#202020",
              color: "textColor.main",
              borderRadius: "25px",
              textTransform: "none",
              fontSize: "0.7rem",
              ":hover": {
                backgroundColor: "#202020",
              },
            }}
          >
            <IconButton>
              <InsertPhotoIcon sx={{ color: "primary.main" }} />
            </IconButton>
            <Typography pr={2} display={{ xs: "none", md: "block" }}>
              Photo
            </Typography>
          </Button>
          <Button
            onClick={openModal}
            sx={{
              backgroundColor: "#202020",
              color: "textColor.main",
              borderRadius: "25px",
              fontSize: "0.7rem",
              textTransform: "none",
              ":hover": {
                backgroundColor: "#202020",
              },
            }}
          >
            <IconButton>
              <PlayCircleIcon sx={{ color: "#4F93F8" }} />
            </IconButton>
            <Typography pr={2} display={{ xs: "none", md: "block" }}>
              Video
            </Typography>
          </Button>
          <Button
            sx={{
              backgroundColor: "#202020",
              color: "textColor.main",
              textTransform: "none",
              borderRadius: "25px",
              fontSize: "0.7rem",
              ":hover": {
                backgroundColor: "#202020",
              },
            }}
          >
            <IconButton>
              <PollIcon sx={{ color: "#E67575" }} />
            </IconButton>
            <Typography pr={2} display={{ xs: "none", md: "block" }}>
              Poll
            </Typography>
          </Button>
          <Button
            sx={{
              backgroundColor: "#202020",
              color: "textColor.main",
              borderRadius: "25px",
              textTransform: "none",
              fontSize: "0.7rem",
              ":hover": {
                backgroundColor: "#202020",
              },
            }}
          >
            <IconButton>
              <CalendarMonthIcon sx={{ color: "#EEBE65" }} />
            </IconButton>
            <Typography pr={2} display={{ xs: "none", md: "block" }}>
              Schedule
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Post;
