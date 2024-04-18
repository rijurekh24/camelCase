import { useContext, useEffect, useRef, useState } from "react";
import {
  Button,
  Divider,
  IconButton,
  Typography,
  Popover,
  Avatar,
  Box,
  TextField,
} from "@mui/material";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import PollIcon from "@mui/icons-material/Poll";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Send } from "@mui/icons-material";
import PostModal from "./PostModal";
import MarkDownModal from "../PostCards/MarkDownComponents/MarkDownModal";
import { authContext } from "../../../Context/AuthContext";
import Api from "../../../Utils/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmojiPicker from "emoji-picker-react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import CreatePollModal from "../Modals/CreatePollModal";

const Post = () => {
  const [textInput, setTextInput] = useState("");
  const ctx = useContext(authContext);
  const toastId = useRef(null);

  // emoji box open
  const [openEmojiBox, setOpenEmojiBox] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  //media upload modal
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  //markdown upload modal
  const [mdModalOpen, setMdModalOpen] = useState(false);
  const openMdModal = () => {
    setMdModalOpen(true);
  };
  const closeMdModal = () => {
    setMdModalOpen(false);
  };

  //create poll and upload modal
  const [pollModalOpen, setPollModalOpen] = useState(false);
  const openPollModal = () => {
    setPollModalOpen(true);
  };
  const closePollModal = () => {
    setPollModalOpen(false);
  };

  const handleInputChange = (event) => {
    setTextInput(event.target.value);
  };
  const handleEmojiClick = (emoji) => {
    const emojiString = emoji.emoji;
    setTextInput(textInput + emojiString);
  };

  const handleSend = () => {
    toastId.current = toast.loading("Posting...", {
      style: {
        backgroundColor: "#222831",
        color: "#eee",
      },
    });

    Api.post("/posts/create-new", {
      username: ctx.user.username,
      caption: textInput,
      user: ctx.user._id,
    })
      .then((res) => {
        toast.update(toastId.current, {
          render: "Posted sucessfully...",
          type: "success",
          isLoading: false,
          autoClose: 2000,
          closeButton: true,
          pauseOnHover: true,
          draggable: false,
          style: {
            backgroundColor: "#222831",
            color: "white",
          },
        });
        ctx.fetchPost();
        setTextInput("");
      })
      .catch((err) => {});
  };

  const isTextInputEmptyOrSpaces = !textInput.trimStart();

  return (
    <Box
      sx={{
        backgroundColor: "backgroundColor.secondary",
        borderRadius: { xs: "0", lg: "15px" },
        marginBottom: 2,
        padding: "10px",
        marginTop: "2%",
      }}
    >
      <Popover
        open={openEmojiBox}
        anchorEl={anchorEl}
        onClose={() => setOpenEmojiBox(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <EmojiPicker
          onEmojiClick={handleEmojiClick}
          skinTonesDisabled={true}
          searchDisabled={true}
          height={350}
          suggestedEmojisMode={"recent"}
          emojiStyle={"facebook"}
          style={{
            "--epr-emoji-size": "25px",
          }}
        />
      </Popover>
      <PostModal open={modalOpen} handleClose={closeModal} />
      <MarkDownModal open={mdModalOpen} handleClose={closeMdModal} />
      <CreatePollModal open={pollModalOpen} handleClose={closePollModal} />
      <Box
        display={"flex"}
        width={"100%"}
        gap={2}
        mb={2}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {ctx.profile.profile_pic ? (
          <Avatar
            src={ctx.profile.profile_pic}
            sx={{
              width: 35,
              height: 35,
              border: "5px solid ",
              borderColor: "borderColor.main",
              borderRadius: "20px",
              fontSize: "1.2rem",
              color: "primary.main",
              bgcolor: "#111",
            }}
          ></Avatar>
        ) : (
          <Avatar
            sx={{
              width: 35,
              height: 35,
              border: "5px solid ",
              borderColor: "borderColor.main",
              borderRadius: "20px",
              fontSize: "1.2rem",
              color: "primary.main",
              bgcolor: "#111",
            }}
          >
            {ctx.user.first_name ? ctx.user.first_name.charAt(0) : ""}
          </Avatar>
        )}
        <TextField
          id="filled-basic"
          placeholder={`What's on your mind, ${ctx.user.first_name} ?`}
          variant="standard"
          autoComplete="off"
          multiline
          fullWidth
          value={textInput}
          onChange={handleInputChange}
          sx={{
            backgroundColor: "backgroundColor.secondary",
            "& .MuiFilledInput-underline:after": {
              borderBottomColor: "primary.main",
            },
          }}
          InputLabelProps={{
            style: { color: "#888" },
          }}
          InputProps={{
            sx: {
              color: "textColor.main",
              borderRadius: "20px",
              backgroundColor: "backgroundColor.main",
              p: 2,
              fontSize: "1rem",
            },
            disableUnderline: true,
            endAdornment: (
              <>
                {!isTextInputEmptyOrSpaces && (
                  <Send
                    sx={{
                      color: "textColor.secondary",
                      cursor: "pointer",
                      mr: 1,
                    }}
                    onClick={handleSend}
                  />
                )}
                <Button
                  onClick={(e) => {
                    setAnchorEl(e.currentTarget);
                    setOpenEmojiBox(!openEmojiBox);
                  }}
                  sx={{
                    minHeight: 0,
                    minWidth: 0,
                    padding: 0,
                    fontSize: "0.9rem",
                    ml: 1,
                    textTransform: "none",
                    background: "transparent",
                    boxShadow: 0,
                    color: "textColor.secondary",
                    ":hover": {
                      background: "transparent",
                      boxShadow: 0,
                    },
                  }}
                >
                  <EmojiEmotionsIcon />
                </Button>
              </>
            ),
          }}
        />
      </Box>
      <Divider variant="middle" color="#666" />
      <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
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
              sx={{ color: "#8dbd61", fontSize: "1.5rem" }}
            />
          </IconButton>
          <Typography
            pr={2}
            display={{ xs: "none", sm: "block" }}
            fontSize={"1rem"}
          >
            Media
          </Typography>
        </Button>
        <Button
          onClick={openMdModal}
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
            <i
              className="fa-brands fa-markdown"
              style={{ color: "#be375f", fontSize: "1.5rem" }}
            ></i>
          </IconButton>
          <Typography
            pr={2}
            display={{ xs: "none", sm: "block" }}
            fontSize={"1rem"}
          >
            MarkDown
          </Typography>
        </Button>
        <Button
          onClick={openPollModal}
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
              sx={{ color: "#ed8554", fontSize: "1.5rem" }}
            />
          </IconButton>
          <Typography
            pr={2}
            display={{ xs: "none", sm: "block" }}
            fontSize={"1rem"}
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
              sx={{ color: "#f5eb6d", fontSize: "1.5rem" }}
            />
          </IconButton>
          <Typography
            pr={2}
            display={{ xs: "none", sm: "block" }}
            fontSize={"1rem"}
          >
            Schedule
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default Post;
