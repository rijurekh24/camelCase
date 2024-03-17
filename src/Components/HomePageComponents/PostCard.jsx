import { MoreVert } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { format } from "timeago.js";
import { useState } from "react";
const PostCard = (props) => {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [increment, setIncrement] = useState(true);

  const handleLike = () => {
    setClicked(!clicked);
    if (increment) {
      setLikeCount(likeCount + 1);
    } else {
      setLikeCount(likeCount - 1);
    }
    setIncrement(!increment);
  };

  return (
    <Card
      sx={{
        zIndex: "-1",
        backgroundColor: "backgroundColor.secondary",
        borderRadius: { xs: "0", lg: "15px" },
        marginBottom: { xs: "1px", lg: 2 },
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{
              bgColor: "grey",
              border: "5px solid",
              borderColor: "borderColor.main",
              borderRadius: "20px",
              color: "primary.main",
              backgroundColor: "#111",
            }}
          >
            {props.name ? props.name.charAt(0) : ""}
          </Avatar>
        }
        action={
          <IconButton sx={{ color: "textColor.main" }}>
            <MoreVert />
          </IconButton>
        }
        title={
          <Typography
            variant="body1"
            color="textColor.secondary"
            onClick={() => navigate(`/profile/${props.username}`)}
            sx={{ cursor: "pointer" }}
          >
            @{props.username}
          </Typography>
        }
        subheader={
          <Typography variant="body2" color="textColor.main">
            {props.name}{" "}
            <Typography sx={{ color: "primary.main", ml: 1 }} display="inline">
              • <span>{format(props.date)}</span>
            </Typography>
          </Typography>
        }
      />
      <CardContent>
        <Typography variant="body2" color="textColor.main">
          {props.caption}
        </Typography>
      </CardContent>
      {props.image && (
        <Box
          sx={{
            height: "23rem",
            bgColor: "#333",
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <img
            src={props.image}
            alt="image"
            height={"100%"}
            width={"100%"}
            style={{ objectFit: "contain" }}
          />
        </Box>
      )}

      <Divider variant="middle" color="#333" />
      <CardActions>
        <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
          <IconButton aria-label="add to favorites">
            <Typography color={"textColor.secondary"} fontSize={"1.4rem"}>
              <i
                className={` ${clicked ? " fa-solid" : "fa-regular"} fa-heart`}
                style={{
                  color: clicked ? "#DC381F" : "#999",
                }}
                onClick={handleLike}
              ></i>
            </Typography>
            <Typography ml={1} color={"textColor.secondary"}>
              {likeCount}
            </Typography>
          </IconButton>

          <IconButton aria-label="comment">
            <Typography color={"textColor.secondary"} fontSize={"1.4rem"}>
              <i class="fa-regular fa-comment"></i>
            </Typography>
            <Typography ml={1} color={"textColor.secondary"}>
              {commentCount}
            </Typography>
          </IconButton>

          <IconButton aria-label="share">
            <Typography color={"textColor.secondary"} fontSize={"1.4rem"}>
              <i class="fa-regular fa-paper-plane"></i>
            </Typography>
          </IconButton>

          <IconButton aria-label="save">
            <Typography color={"textColor.secondary"} fontSize={"1.4rem"}>
              <i class="fa-regular fa-bookmark"></i>
            </Typography>
          </IconButton>
        </Box>
        {/* <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              sx={{
                backgroundColor: "primary.main",
                border: "1px solid primary.main",
                padding: "2px 10px",
                color: "#222",
                fontSize: "0.8rem",
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor: "#01ab90",
                },
              }}
            >
              Hire me
            </Button>
          </Box> */}
      </CardActions>
    </Card>
  );
};

export default PostCard;
