import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Box, Divider, InputBase } from "@mui/material";
import Editor from "./Editor";
import { authContext } from "../../../../Context/AuthContext";
import Api from "../../../../Utils/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MDEditor, { selectWord } from "@uiw/react-md-editor";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ open, handleClose }) {
  const ctx = React.useContext(authContext);
  const [value, setValue] = React.useState("");
  const [caption, setCaption] = React.useState("");
  const toastId = React.useRef(null);
  const handleTextChange = (event) => {
    setCaption(event.target.value);
  };

  const handlePost = () => {
    toastId.current = toast.loading("Uploading markdown...");
    if (value) {
      handleClose();
      Api.post("/posts/create-new", {
        caption: caption,
        username: ctx.user.username,
        img: value,
        user: ctx.user._id,
        type: "Markdown",
      })
        .then((res) => {
          ctx.fetchPost();
          toast.update(toastId.current, {
            render: "Posted successfully...",
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
        })
        .catch((err) => {
          console.log(err.res.data);
        });
    }
  };

  return (
    <React.Fragment>
      <Dialog
        sx={{ zIndex: 1000000000000 }}
        fullWidth
        maxWidth="md"
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        PaperProps={{
          sx: {
            borderRadius: "15px",
            background: "transparent",
          },
        }}
      >
        <Box
          sx={{
            bgcolor: "backgroundColor.main",
            color: "textColor.main",
            padding: 0,
            width: "100%",
          }}
        >
          <Box
            width={"100%"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <IconButton
                color="inherit"
                onClick={() => {
                  handleClose();
                }}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Write your markdown
              </Typography>
            </Box>
            <Box>
              {value && (
                <Button color="inherit" onClick={handlePost}>
                  Post
                </Button>
              )}
            </Box>
          </Box>
        </Box>
        <Box backgroundColor="backgroundColor.main" px={2}>
          <InputBase
            placeholder="Description . . ."
            fullWidth
            autoComplete="off"
            autoFocus
            multiline
            value={caption}
            onChange={handleTextChange}
            sx={{
              color: "textColor.main",
              backgroundColor: "transparent",
              py: 1,
            }}
          />
        </Box>
        <Box
          height={"70vh"}
          bgcolor={"backgroundColor.main"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          p={1}
          flexDirection={{ xs: "column", md: "row" }}
        >
          <Editor value={value} setValue={setValue} />
        </Box>
        <Box></Box>
      </Dialog>
    </React.Fragment>
  );
}
