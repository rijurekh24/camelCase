import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Divider, Stack, TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "#232323",
  borderRadius: "25px",
  boxShadow: 24,
  p: 2,
  color: "white",
  border: "2px solid #333",
};

function PostModal({ open, handleClose }) {
  const [text, setText] = useState("");

  const handleTextChange = (event) => {
    setText(event.target.value);
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      margin={2}
    >
      <Box sx={style}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography
            id="modal-modal-title"
            sx={{
              fontSize: "1.5rem",
              width: "100%",
              textAlign: "center",
            }}
          >
            Create Post
            <Divider
              sx={{
                maxWidth: "100%",
                backgroundColor: "#444",
                margin: "20px auto 0px auto",
                color: "#fff",
              }}
            />
          </Typography>
          <TextField
            id="filled-basic"
            label="What's on your mind..."
            variant="filled"
            fullWidth
            autoComplete="off"
            multiline
            value={text}
            onChange={handleTextChange}
            sx={{
              "& .MuiFilledInput-underline:after": {
                borderBottomColor: "#01ab81",
              },
            }}
            InputLabelProps={{
              style: { color: "#888" },
            }}
            InputProps={{
              style: { color: "white", background: "none" },
              disableUnderline: true,
            }}
          />

          <Button
            fullWidth
            disabled={!text}
            sx={{
              backgroundColor: text ? "#01ab81" : "gray",
              color: text ? "#fff" : "#000",
              padding: "10px",
              borderRadius: "25px",
              ":hover": {
                backgroundColor: "#01ab81",
              },
            }}
          >
            Post
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default PostModal;
