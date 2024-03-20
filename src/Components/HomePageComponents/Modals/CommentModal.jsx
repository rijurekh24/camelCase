import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton"; // Import Skeleton component
import Api from "../../../Utils/api";
import CommentBox from "../CommentBox";
import Comments from "./Comments";

const CommentModal = ({ open, onClose, postId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false); // State for loading indicator

  const fetchComment = () => {
    setLoading(true); // Set loading state to true
    Api.get(`/posts/get?id=${postId}`).then((res) => {
      setComments(res.data.post.comments);
      setLoading(false); // Set loading state to false once comments are fetched
    });
  };

  useEffect(() => {
    if (open) {
      fetchComment();
    }
  }, [open, postId]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="dialog-modal-title"
      aria-describedby="dialog-modal-description"
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: "15px", background: "transparent" } }}
    >
      <Box
        sx={{
          backgroundColor: "backgroundColor.secondary",
          borderRadius: "15px",
        }}
      >
        <DialogTitle id="dialog-modal-title" sx={{ textAlign: "center" }}>
          <Typography color={"textColor.main"}>Comments</Typography>
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
            display: "flex",
            flexDirection: "column",
            gap: 1,
            height: 250,
            "&::-webkit-scrollbar-track": {
              backgroundColor: "backgroundColor.main",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "primary.main",
            },
            "&::-webkit-scrollbar": {
              width: "2px",
            },
          }}
        >
          {loading ? ( // Render skeleton loading state if loading is true
            <>
              <Skeleton variant="text" width={100} height={30} />
              <Skeleton variant="text" width={200} height={10} />
              <Skeleton variant="text" width={150} height={10} />
              <Skeleton variant="text" width={250} height={10} />
            </>
          ) : (
            <>
              {comments?.length > 0 ? (
                comments.map((item, index) => (
                  <Box mb={1} key={index}>
                    <Comments
                      comment={item.comment}
                      username={item.commentator.username}
                      name={item.commentator.first_name}
                      date={item.date}
                    />
                    <Box
                      sx={{
                        pl: { xs: 3, md: 4 },
                        borderLeft: "1px solid #eee3",
                      }}
                    >
                      {item.replies.map((inItem, idx) => (
                        <Comments
                          key={idx}
                          comment={inItem.comment}
                          username={inItem.commentator.username}
                          name={inItem.commentator.first_name}
                          date={inItem.date}
                        />
                      ))}
                    </Box>
                  </Box>
                ))
              ) : (
                <Box
                  display={"flex"}
                  width={"100%"}
                  height={"100%"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Typography color="textColor.main">No Comments</Typography>
                </Box>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <CommentBox postId={postId} fetchComment={fetchComment} />
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default CommentModal;
