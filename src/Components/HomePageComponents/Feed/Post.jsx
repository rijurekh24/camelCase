import { useContext, useEffect, useRef, useState } from "react";
import { Button, Divider, IconButton, Typography } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import PollIcon from "@mui/icons-material/Poll";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Avatar, Box, TextField } from "@mui/material";
import { Send } from "@mui/icons-material";
import PostModal from "./PostModal";
import MarkDownModal from "../PostCards/MarkDownComponents/MarkDownModal";
import { authContext } from "../../../Context/AuthContext";
import Api from "../../../Utils/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Post = () => {
  const [textInput, setTextInput] = useState("");
  const ctx = useContext(authContext);
  const toastId = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const [mdModalOpen, setMdModalOpen] = useState(false);
  const openMdModal = () => {
    setMdModalOpen(true);
  };
  const closeMdModal = () => {
    setMdModalOpen(false);
  };

  const handleInputChange = (event) => {
    setTextInput(event.target.value);
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

  return (
    <Box
      sx={{
        backgroundColor: "backgroundColor.secondary",
        borderRadius: { xs: "0", lg: "15px" },
        marginBottom: 2,
        padding: "10px",
      }}
    >
      <PostModal open={modalOpen} handleClose={closeModal} />
      <MarkDownModal open={mdModalOpen} handleClose={closeMdModal} />
      <Box display={"flex"} width={"100%"} gap={2} mb={2}>
        {ctx.user.profile_pic ? (
          <Avatar
            src={ctx.user.profile_pic}
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
            endAdornment: textInput && (
              <Send
                sx={{ color: "textColor.main", cursor: "pointer" }}
                onClick={handleSend}
              />
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
