import { Avatar, Box, Typography } from "@mui/material";
import { format, register } from "timeago.js";
import { useNavigate } from "react-router-dom";
import { MentionsInput, Mention } from "react-mentions";
import { useState } from "react";
import ReplyBox from "../../ReplyBox";

const Comments = ({
  username,
  comment,
  name,
  date,
  dp,
  commentId,
  postId,
  fetchComment,
}) => {
  const navigate = useNavigate();
  const [hide, setHide] = useState(false);
  register("custom", (number, index) => {
    return [
      ["just now", "right now"],
      ["%ss", "in %ss"],
      ["1m", "in 1m"],
      ["%sm", "in %sm"],
      ["1h", "in 1h"],
      ["%sh", "in %sh"],
      ["1d", "in 1d"],
      ["%sd", "in %sd"],
      ["1w", "in 1w"],
      ["%sw", "in %sw"],
      ["1mo", "in 1mo"],
      ["%smo", "in %smo"],
      ["1yr", "in 1yr"],
      ["%syr", "in %syr"],
    ][index];
  });
  const showReplyBox = () => {
    setHide(!hide);
  };

  return (
    <Box>
      <Box display={"flex"} gap={1} alignItems={"center"} mb={1}>
        <Box>
          {dp ? (
            <Avatar
              src={dp}
              sx={{
                width: 30,
                height: 30,
                bgColor: "grey",
                border: "2px solid",
                borderColor: "borderColor.main",
                borderRadius: "50%",
                color: "primary.main",
                backgroundColor: "#111",
                fontSize: "0.9rem",
              }}
            ></Avatar>
          ) : (
            <Avatar
              sx={{
                width: 30,
                height: 30,
                bgColor: "grey",
                border: "2px solid",
                borderColor: "borderColor.main",
                borderRadius: "50%",
                color: "primary.main",
                backgroundColor: "#111",
                fontSize: "0.9rem",
              }}
            >
              {name ? name.charAt(0) : ""}
            </Avatar>
          )}
        </Box>
        <Box>
          <Box display={"flex"} gap={1}>
            <Typography
              sx={{
                color: "textColor.secondary",
                wordBreak: "break-all",
                fontSize: "0.9rem",
              }}
            >
              <Typography
                sx={{ cursor: "pointer" }}
                onClick={() => navigate(`/profile/${username}`)}
                component={"span"}
              >
                @{username}
              </Typography>
              <Typography
                component={"span"}
                sx={{ color: "textColor.main", pl: 1, fontSize: "0.9rem" }}
              >
                {comment}
              </Typography>
            </Typography>
          </Box>

          <Box display={"flex"} gap={2} sx={{ wordBreak: "break-all" }}>
            <Typography
              sx={{ color: "textColor.secondary", fontSize: "0.7rem" }}
            >
              {format(date, "custom")}
            </Typography>
            <Box>
              <Typography
                sx={{
                  color: "textColor.secondary",
                  fontSize: "0.7rem",
                  cursor: "pointer",
                }}
                onClick={showReplyBox}
              >
                reply
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          pl: { xs: 3, md: 4 },
          borderLeft: "1px solid #eee3",
        }}
      >
        {hide && (
          <ReplyBox
            postId={postId}
            commentId={commentId}
            isReply={true}
            fetchComment={fetchComment}
            username={username}
          />
        )}
      </Box>
    </Box>
  );
};

export default Comments;
