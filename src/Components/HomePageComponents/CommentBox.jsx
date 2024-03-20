import { Button, InputAdornment, InputBase, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import Textfield from "../Textfield";
import Api from "../../Utils/api";

const CommentBox = ({ postId }) => {
  const [comment, setComment] = useState("");

  const handleInputChange = (e) => {
    setComment(e.target.value);
  };

  const handleClick = () => {
    Api.post("/posts/add-comment", { post_id: postId, comment: comment })
      .then((res) => {
        console.log(res.data);
        setComment("");
      })
      .catch(() => {});
  };

  return (
    <InputBase
      placeholder="add a comment"
      value={comment}
      onChange={handleInputChange}
      sx={{
        p: 1,
        color: "textColor.secondary",
        width: "100%",
        backgroundColor: "backgroundColor.main",
        borderRadius: "15px",
      }}
      endAdornment={
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
            }}
          />
        </InputAdornment>
      }
    />
  );
};

export default CommentBox;