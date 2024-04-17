import { Button, InputAdornment, InputBase, Popover } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useRef, useState } from "react";
import Api from "../../../Utils/api";
import { MentionsInput, Mention } from "react-mentions";
import EmojiPicker from "emoji-picker-react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

const CommentBox = ({ postId, fetchComment, inputRef }) => {
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
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

  const handleEmojiClick = (emoji) => {
    const emojiString = emoji.emoji;
    setComment(comment + emojiString);
  };

  const isCommentEmptyOrSpaces = !comment.trimStart();

  return (
    <>
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
          <>
            {!isCommentEmptyOrSpaces && (
              <InputAdornment position="end">
                <Button
                  variant="contained"
                  onClick={handleClick}
                  endIcon={<SendIcon />}
                  sx={{
                    fontSize: "0.9rem",
                    textTransform: "none",
                    background: "transparent",
                    minHeight: 0,
                    minWidth: 0,
                    padding: 0,
                    boxShadow: 0,
                    color: "textColor.secondary",
                    ":hover": {
                      background: "transparent",
                      boxShadow: 0,
                    },
                    // "&::placeholder": {
                    //   pl: 6,
                    // },
                  }}
                />
              </InputAdornment>
            )}

            <InputAdornment position="end">
              <Button
                onClick={(e) => {
                  setAnchorEl(e.currentTarget);
                  setOpen(!open);
                }}
                sx={{
                  minHeight: 0,
                  minWidth: 0,
                  padding: 0,
                  fontSize: "0.9rem",
                  ml: 1,
                  textTransform: "none",
                  background: "transparent",
                  boxShadow: 0,
                  color: "textColor.secondary",
                  ":hover": {
                    background: "transparent",
                    boxShadow: 0,
                  },
                }}
              >
                <EmojiEmotionsIcon />
              </Button>
            </InputAdornment>
          </>
        }
      />
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
      >
        <EmojiPicker
          onEmojiClick={handleEmojiClick}
          height={350}
          emojiStyle={"facebook"}
        />
      </Popover>
    </>
  );
};

export default CommentBox;
