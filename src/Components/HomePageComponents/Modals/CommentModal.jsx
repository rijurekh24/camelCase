import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Avatar, Divider, InputBase, TextField } from "@mui/material"; // Import TextField for the input box
import Api from "../../../Utils/api";
import CommentBox from "../CommentBox";
import Comments from "./Comments";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "15px",
  bgcolor: "backgroundColor.main",
  boxShadow: 24,
  color: "textColor.main",
  border: "2px solid #333",
  py: 2,
};

const CommentModal = ({ open, onClose, postId }) => {
  const [comments, setComments] = useState([]);
  Api.get(`/posts/get?id=${postId}`).then((res) => {
    console.log(res.data);
    setComments(res.data.comments);
  });
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} width={{ xs: 300, md: 400 }}>
        <Typography
          id="modal-modal-title"
          sx={{
            fontSize: "1.2rem",
            width: "100%",
            textAlign: "center",
          }}
        >
          Comments
          <Divider
            sx={{
              maxWidth: "100%",
              backgroundColor: "#444",
              margin: "10px auto 10px auto",
              color: "#fff",
            }}
          />
        </Typography>

        <Box
          maxWidth={"100%"}
          sx={{
            overflowY: "scroll",
            height: 250,
            "&::-webkit-scrollbar-track": {
              backgroundColor: "backgroundColor.main",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "primary.main",
            },
            "&::-webkit-scrollbar": {
              width: "0px",
            },
          }}
        >
          {comments.map((item) => (
            <Comments comment={item.comment} />
          ))}
        </Box>

        <CommentBox postId={postId} />
      </Box>
    </Modal>
  );
};

export default CommentModal;
