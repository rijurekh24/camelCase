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

import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

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
                setInput("");
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
          gap={1}
          flexDirection={{ xs: "column", md: "row" }}
        >
          <Box flex={"1"} height={"100%"} width={"100%"}>
            {" "}
            <textarea
              placeholder="write your markdown code here..."
              autoFocus
              style={{
                height: "100%",
                width: "100%",
                outline: "none",
                backgroundColor: "#0D1117",
                border: "none",
                color: "#eee",
              }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </Box>
          <Box
            flex={"1"}
            height={"100%"}
            width={"100%"}
            bgcolor={"#11151c"}
            color={"textColor.main"}
            fontFamily={"roboto"}
          >
            <Box padding={2}>
              <ReactMarkdown
                components={{
                  code: SyntaxHighlighter,
                }}
                source={input}
              />
            </Box>
          </Box>
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
