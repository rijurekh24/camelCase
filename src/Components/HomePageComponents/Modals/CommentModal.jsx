import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Divider from "@mui/material/Divider";
import Api from "../../../Utils/api";
import CommentBox from "../CommentBox";
import Comments from "./Comments";

const CommentModal = ({ open, onClose, postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (open) {
      Api.get(`/posts/get?id=${postId}`).then((res) => {
        console.log(res.data.comments);
        setComments(res.data.comments);
      });
    }
  }, [open, postId]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="dialog-modal-title"
      aria-describedby="dialog-modal-description"
      maxWidth="md"
      fullWidth
    >
      <Box>
        <DialogTitle id="dialog-modal-title" sx={{ textAlign: "center" }}>
          Comments
          <Divider
            sx={{
              maxWidth: "100%",
              backgroundColor: "#444",
              margin: "10px auto 10px auto",
              color: "#fff",
            }}
          />
        </DialogTitle>
        <DialogContent
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
          {comments.map((item, index) => (
            <Comments
              key={index}
              comment={item.comment}
              username={item.commentator.username}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <CommentBox postId={postId} />
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default CommentModal;
