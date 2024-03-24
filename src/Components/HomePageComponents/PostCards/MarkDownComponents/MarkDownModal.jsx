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
import TextArea from "./TextArea";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function FullScreenDialog({ open, handleClose }) {
  const [input, setInput] = React.useState("");
  return (
    <React.Fragment>
      <Dialog
        sx={{ zIndex: 1000000000000 }}
        fullScreen
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
            <Button autoFocus color="inherit">
              Post
            </Button>
          </Toolbar>
        </AppBar>
        <Box
          height={"100%"}
          bgcolor={"backgroundColor.main"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          p={1}
          flexDirection={{ xs: "column", md: "row" }}
        >
          <TextArea input={input} setInput={setInput} />
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
