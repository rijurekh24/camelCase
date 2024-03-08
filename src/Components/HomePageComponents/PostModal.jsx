import React, { useContext, useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Avatar, Divider, Stack, TextField } from "@mui/material";
import { authContext } from "../../Context/AuthContext";

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
  const ctx = useContext(authContext);
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
              fontSize: "1.4rem",
              width: "100%",
              textAlign: "center",
            }}
          >
            Create Post
            <Divider
              sx={{
                maxWidth: "100%",
                backgroundColor: "#444",
                margin: "20px auto 20px auto",
                color: "#fff",
              }}
            />
          </Typography>
          <Box display={"flex"} alignItems={"center"} width={"100%"}>
            <Avatar
              src="https://pics.craiyon.com/2023-09-20/c98875fa1d9e4981b377031bc56a8a6a.webp"
              sx={{
                width: 40,
                height: 40,
                border: "5px solid #1A1A1A",
                borderRadius: "35px",
                marginRight: "5px",
              }}
            />
            <Typography fontSize={"1.1rem"}>
              {ctx.user.first_name} {ctx.user.last_name}
            </Typography>
          </Box>
          <TextField
            id="filled-basic"
            placeholder={`What's on your mind, ${ctx.user.first_name} ?`}
            variant="filled"
            fullWidth
            autoComplete="off"
            autoFocus
            multiline
            value={text}
            onChange={handleTextChange}
            sx={{
              marginBottom: "8%",
              "& .MuiFilledInput-underline:after": {
                borderBottomColor: "#01ab81",
              },
            }}
            InputLabelProps={{
              style: { color: "#888", fontSize: 18 },
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
