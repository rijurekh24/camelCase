import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Box } from "@mui/material";
import Editor from "./Editor";
import MDEditor, { selectWord } from "@uiw/react-md-editor";
import { authContext } from "../../../../Context/AuthContext";
import Api from "../../../../Utils/api";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ open, handleClose }) {
  const ctx = React.useContext(authContext);
  const [value, setValue] = React.useState("");
  const [preview, setPreview] = React.useState("");

  const handlePreview = () => {
    setPreview(value);
  };

  const handlePost = () => {
    Api.post("/posts/create-new", {
      username: ctx.user.username,
      img: preview,
      user: ctx.user._id,
      type: "Markdown",
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.res.data);
      });
  };

  return (
    <React.Fragment>
      <Dialog
        sx={{ zIndex: 1000000000000 }}
        // fullScreen
        fullWidth
        maxWidth="md"
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar
          sx={{
            position: "relative",
            bgcolor: "backgroundColor.main",
            color: "textColor.main",
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                handleClose();
              }}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              MarkDown Editor
            </Typography>
            <Button autoFocus color="inherit" onClick={handlePost}>
              Post
            </Button>
            <Button color="inherit" onClick={handlePreview}>
              Preview
            </Button>
          </Toolbar>
        </AppBar>
        <Box
          height={"80vh"}
          bgcolor={"backgroundColor.main"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          p={1}
          flexDirection={{ xs: "column", md: "row" }}
        >
          <Editor value={value} setValue={setValue} />
        </Box>
        <Box>
          <MDEditor.Markdown
            source={preview || value} // Render the preview if available, otherwise render the original content
            style={{ whiteSpace: "pre-wrap" }}
          />
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
