import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#232323",
  borderRadius: "25px",
  boxShadow: 24,
  p: 4,
  color: "white",
};

function PostModal({ open, handleClose }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography id="modal-modal-title" sx={{ fontSize: "1.5rem" }}>
            Create Post
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
}

export default PostModal;
