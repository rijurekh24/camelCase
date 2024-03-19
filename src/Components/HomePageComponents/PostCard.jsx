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
  InputBase,
  Modal,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { format } from "timeago.js";
import { useContext, useState } from "react";
import Api from "../../Utils/api";
import { authContext } from "../../Context/AuthContext";
import { useEffect } from "react";
import LikeModal from "./Modals/LikeModal";
import CommentBox from "./CommentBox";
const PostCard = (props) => {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState();
  const [likeCount, setLikeCount] = useState(props.likes.length);
  const [commentCount, setCommentCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const ctx = useContext(authContext);
  const likes = props.likes;

  useEffect(() => {
    if (ctx.postData) {
      setLoading(false);
    }

    if (likes.some((e) => e._id == ctx.user._id)) {
      setClicked(true);
    } else {
      setClicked(false);
    }
  }, []);

  const handleLike = () => {
    if (clicked) {
      setClicked(false);
      setLikeCount((likeCount) => likeCount - 1);
    } else {
      setClicked(true);
      setLikeCount((likeCount) => likeCount + 1);
    }

    Api.post("/posts/like", { post_id: props.postId })
      .then((response) => {})
      .catch((err) => {
        log(err.response.data);
      });
  };

  if (loading) {
    return (
      <Card
        sx={{
          borderRadius: "15px",
          marginBottom: { xs: "1px", lg: 2 },
          backgroundColor: "backgroundColor.secondary",
        }}
      >
        <CardHeader
          avatar={
            <Box
              sx={{
                width: "40px",
                height: "40px",
                borderRadius: "15px",
                backgroundColor: "backgroundColor.main",
              }}
            ></Box>
          }
          title={
            <Box
              sx={{
                width: "200px",
                height: "40px",
                backgroundColor: "backgroundColor.main",
                borderRadius: "15px",
              }}
            ></Box>
          }
        />
        {/* Skeleton for CardContent */}
        <CardContent>
          <Box
            sx={{
              width: "100%",
              height: "30px",
              backgroundColor: "backgroundColor.main",
              borderRadius: "15px",
              mb: 1,
            }}
          ></Box>
          {props.image && (
            <Box
              sx={{
                width: "100%",
                height: "23rem",
                backgroundColor: "backgroundColor.main",
                borderRadius: "15px",
              }}
            ></Box>
          )}
        </CardContent>
        {/* Skeleton for CardActions */}
        <CardActions>
          <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
            <Box
              sx={{
                width: "100px",
                height: "40px",
                backgroundColor: "backgroundColor.main",
                borderRadius: "15px",
              }}
            ></Box>
            <Box
              sx={{
                width: "100px",
                height: "40px",
                backgroundColor: "backgroundColor.main",
                borderRadius: "15px",
              }}
            ></Box>
            <Box
              sx={{
                width: "100px",
                height: "40px",
                backgroundColor: "backgroundColor.main",
                borderRadius: "15px",
              }}
            ></Box>
            <Box
              sx={{
                width: "100px",
                height: "40px",
                backgroundColor: "backgroundColor.main",
                borderRadius: "15px",
              }}
            ></Box>
          </Box>
        </CardActions>
      </Card>
    );
  }

  // likemodal part

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
            <Typography
              sx={{ color: "textColor.secondary", ml: 1 }}
              display="inline"
            >
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
            backgroundColor: "#1b2129",
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

      <Divider variant="middle" color="#444" />

      <CardActions>
        <Box width={"100%"}>
          <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              width={"100%"}
            >
              <IconButton aria-label="add to favorites" disableRipple>
                <Typography color={"textColor.secondary"} fontSize={"1.3rem"}>
                  <i
                    className={` ${
                      clicked ? " fa-solid" : "fa-regular"
                    } fa-heart`}
                    style={{
                      color: clicked ? "#DC381F" : "#999",
                    }}
                    onClick={handleLike}
                  ></i>
                </Typography>
              </IconButton>

              <IconButton aria-label="comment" disableRipple>
                <Typography color={"textColor.secondary"} fontSize={"1.3rem"}>
                  <i className="fa-regular fa-comment"></i>
                </Typography>
              </IconButton>

              <IconButton aria-label="share" disableRipple>
                <Typography color={"textColor.secondary"} fontSize={"1.3rem"}>
                  <i className="fa-regular fa-paper-plane"></i>
                </Typography>
              </IconButton>
              <IconButton aria-label="repost" disableRipple>
                <Typography color={"textColor.secondary"} fontSize={"1.3rem"}>
                  <i className="fa-solid fa-repeat"></i>
                </Typography>
              </IconButton>
            </Box>
          </Box>
          <Box>
            {likeCount > 0 ? (
              <Button
                onClick={handleOpen}
                sx={{
                  fontSize: "1rem",
                  textTransform: "none",
                  p: 0,
                  ":hover": {
                    background: "transparent",
                  },
                }}
              >
                {likeCount} {likeCount > 1 ? "likes" : "like"}
              </Button>
            ) : null}
            <LikeModal open={open} onClose={handleClose} likes={likes} />
          </Box>
          <Box>
            {/* <Button
              // onClick={handleOpen}
              sx={{
                fontSize: "0.9rem",
                textTransform: "none",
                py: 0,
                color: "textColor.secondary",
                ":hover": {
                  background: "transparent",
                },
              }}
            >
              view Comments
            </Button> */}
            {/* <LikeModal open={open} onClose={handleClose} likes={likes} /> */}
          </Box>
          <CommentBox postId={props.postId} />
        </Box>
      </CardActions>
    </Card>
  );
};

export default PostCard;
