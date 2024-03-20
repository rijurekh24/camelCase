import { Avatar, Box, Typography } from "@mui/material";
import { format, register } from "timeago.js";

const Comments = ({ username, comment, name, date }) => {
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

  return (
    <Box display={"flex"} gap={1} alignItems={"center"}>
      <Box>
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
      </Box>
      <Box>
        <Box display={"flex"} gap={1} sx={{}}>
          <Typography
            sx={{ color: "textColor.secondary", wordBreak: "break-all" }}
          >
            @{username}
            <Typography
              component={"span"}
              sx={{ color: "textColor.main", pl: 1 }}
            >
              {comment}
            </Typography>
          </Typography>
        </Box>

        <Box display={"flex"} gap={2} sx={{ wordBreak: "break-all" }}>
          <Typography sx={{ color: "textColor.secondary", fontSize: "0.8rem" }}>
            {format(date, "custom")}
          </Typography>
          <Typography sx={{ color: "textColor.secondary", fontSize: "0.8rem" }}>
            reply
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Comments;
