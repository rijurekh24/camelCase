import { Button, InputAdornment, InputBase } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useRef, useState } from "react";
import Api from "../../../Utils/api";
import { MentionsInput, Mention } from "react-mentions";

const CommentBox = ({ postId, fetchComment, inputRef }) => {
  const [comment, setComment] = useState("");
  const handleInputChange = (e) => {
    setComment(e.target.value);
  };

  const handleClick = () => {
    Api.post("/posts/add-comment", { post_id: postId, comment: comment })
      .then((res) => {
        setComment("");
        fetchComment();
      })
      .catch(() => {});
  };

  const isCommentEmptyOrSpaces = !comment.trimStart();

  return (
    <InputBase
      placeholder="add a comment"
      value={comment}
      onChange={handleInputChange}
      inputRef={inputRef}
      sx={{
        py: 1,
        px: 2,
        color: "textColor.secondary",
        width: "100%",
        backgroundColor: "backgroundColor.main",
        borderRadius: "15px",
      }}
      endAdornment={
        !isCommentEmptyOrSpaces && (
          <InputAdornment position="end">
            <Button
              variant="contained"
              onClick={handleClick}
              endIcon={<SendIcon />}
              sx={{
                fontSize: "0.9rem",
                textTransform: "none",
                background: "transparent",
                p: 0,
                boxShadow: 0,
                color: "textColor.secondary",
                ":hover": {
                  background: "transparent",
                  boxShadow: 0,
                },
                "&::placeholder": {
                  pl: 6,
                },
              }}
            />
          </InputAdornment>
        )
      }
    />
  );
};

export default CommentBox;
