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
import { useNavigate } from "react-router-dom";
import { format } from "timeago.js";
import { useContext, useState } from "react";
import Api from "../../../Utils/api";
import { authContext } from "../../../Context/AuthContext";
import { useEffect } from "react";
import LikeModal from "../Modals/LikeModal";
import CommentModal from "../Modals/CommentModal";
import CommentBox from "./CommentBox";
import MDEditor, { selectWord } from "@uiw/react-md-editor";
import DeletePost from "./DeletePost";

const MarkDownPostCard = (props) => {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState();
  const [likeCount, setLikeCount] = useState(props.likes.length);
  const [commentCount, setCommentCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const ctx = useContext(authContext);
  const likes = props.likes;

  //like modal box
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // comment dialog box

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    fetchComment();
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  //post option menu
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const fetchComment = () => {
    Api.get(`/posts/get?id=${props.postId}`).then((res) => {
      setCommentCount(res.data.total_comment);
    });
  };

  useEffect(() => {
    fetchComment();
  }, []);

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

  const handleLike = (e) => {
    if (clicked) {
      setClicked(false);
      setLikeCount((prev) => prev - 1);
    } else {
      setClicked(true);
      setLikeCount((prev) => prev + 1);
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

  return (
    <Box
      sx={{
        zIndex: "-1",
        backgroundColor: "backgroundColor.secondary",
        borderRadius: { xs: "0", lg: "15px" },
        marginBottom: { xs: "1px", lg: 2 },
      }}
    >
      <Box>
        <LikeModal open={open} onClose={handleClose} postId={props.postId} />
      </Box>
      <Box>
        <CommentModal
          open={openModal}
          onClose={handleCloseModal}
          postId={props.postId}
        />
      </Box>
      <Box>
        <DeletePost
          open={openMenu}
          handleClose={handleCloseMenu}
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          postId={props.postId}
          username={props.username}
        />
      </Box>
      <CardHeader
        sx={{ padding: 1 }}
        avatar={
          props.dp ? (
            <Avatar
              src={props.dp}
              sx={{
                width: 35,
                height: 35,
                border: "5px solid ",
                borderColor: "borderColor.main",
                borderRadius: "20px",
                fontSize: "1.2rem",
                color: "primary.main",
                bgcolor: "#111",
              }}
            ></Avatar>
          ) : (
            <Avatar
              sx={{
                width: 35,
                height: 35,
                border: "5px solid ",
                borderColor: "borderColor.main",
                borderRadius: "20px",
                fontSize: "1.2rem",
                color: "primary.main",
                bgcolor: "#111",
              }}
            >
              {props.name ? props.name.charAt(0) : ""}
            </Avatar>
          )
        }
        action={
          <IconButton
            sx={{ color: "textColor.main" }}
            onClick={handleClickMenu}
          >
            <MoreVert />
          </IconButton>
        }
        title={
          <Typography
            variant="body1"
            color="textColor.secondary"
            onClick={() => navigate(`/profile/${props.username}`)}
            sx={{ cursor: "pointer", width: 0 }}
          >
            @{props.username}
          </Typography>
        }
        subheader={
          <Typography variant="body2" color="textColor.main">
            {props.name}
            <Typography
              component={"span"}
              sx={{ color: "textColor.secondary", px: 1 }}
            >
              .
            </Typography>
            <Typography
              sx={{ color: "textColor.secondary" }}
              component={"span"}
            >
              {format(props.date)}
            </Typography>
          </Typography>
        }
      />
      {props.caption && (
        <CardContent>
          <Typography variant="body2" color="textColor.main">
            {props.caption}
          </Typography>
        </CardContent>
      )}

      {props.image && (
        <Box
          // onClick={() => {
          //   navigate(`/posts/${props.postId}`);
          // }}
          sx={{
            cursor: "pointer",
            maxHeight: "30rem",
            display: "flex",
            justifyContent: "center",

            backgroundColor: "#0d1117",
            maxWidth: "100%",
            overflowY: "scroll",
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
          data-color-mode="dark"
        >
          <MDEditor.Markdown
            source={props.image}
            style={{
              height: "100%",
              width: "90%",
              padding: 10,
            }}
          />
        </Box>
      )}

      <CardActions>
        <Box width={"100%"}>
          <Box>
            <Box px={1} display={"flex"} justifyContent={"space-between"}>
              <Typography
                sx={{
                  color: "textColor.secondary",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                }}
                onClick={handleOpen}
              >
                {likeCount === 0
                  ? null
                  : clicked
                  ? likeCount === 1
                    ? "Liked by you"
                    : `Liked by you and ${likeCount - 1} ${
                        likeCount > 2 ? "others" : "other"
                      }`
                  : likeCount === 1
                  ? "1 like"
                  : `${likeCount} likes`}
              </Typography>

              {commentCount > 0 ? (
                <Typography
                  sx={{
                    color: "textColor.secondary",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                  }}
                  onClick={handleOpenModal}
                >
                  {commentCount} {commentCount === 1 ? "Comment" : "Comments"}
                </Typography>
              ) : null}
            </Box>
            <Box display={"flex"} flex={1} justifyContent={"space-between"}>
              <IconButton
                aria-label="add to favorites"
                disableRipple
                onClick={handleLike}
              >
                <Typography
                  color={"textColor.secondary"}
                  fontSize={{ xs: "1.5rem", sm: "1.3rem" }}
                >
                  <i
                    className={` ${
                      clicked ? " fa-solid" : "fa-regular"
                    } fa-heart`}
                    style={{
                      color: clicked ? "#DC381F" : "#999",
                    }}
                  ></i>
                </Typography>
                <Box display={{ xs: "none", sm: "block" }}>
                  <Typography
                    sx={{
                      fontSize: "0.9rem",
                      pl: 1,
                      color: "textColor.main",
                    }}
                  >
                    Like
                  </Typography>
                </Box>
              </IconButton>
              <IconButton
                aria-label="comment"
                disableRipple
                onClick={handleOpenModal}
              >
                <Typography
                  color={"textColor.secondary"}
                  fontSize={{ xs: "1.5rem", sm: "1.3rem" }}
                >
                  <i className="fa-regular fa-comment"></i>
                </Typography>
                <Box display={{ xs: "none", sm: "block" }}>
                  <Typography
                    sx={{
                      fontSize: "0.9rem",
                      pl: 1,
                      color: "textColor.main",
                    }}
                  >
                    Comment
                  </Typography>
                </Box>
              </IconButton>

              <IconButton aria-label="share" disableRipple>
                <Typography
                  color={"textColor.secondary"}
                  fontSize={{ xs: "1.5rem", sm: "1.3rem" }}
                >
                  <i className="fa-regular fa-paper-plane"></i>
                </Typography>
                <Typography
                  display={{ xs: "none", sm: "block" }}
                  sx={{
                    fontSize: "0.9rem",
                    pl: 1,
                    color: "textColor.main",
                  }}
                >
                  Share
                </Typography>
              </IconButton>
              <IconButton aria-label="repost" disableRipple>
                <Typography
                  color={"textColor.secondary"}
                  fontSize={{ xs: "1.5rem", sm: "1.3rem" }}
                >
                  <i className="fa-solid fa-repeat"></i>
                </Typography>
                <Typography
                  display={{ xs: "none", sm: "block" }}
                  sx={{
                    fontSize: "0.9rem",
                    pl: 1,
                    color: "textColor.main",
                  }}
                >
                  Repost
                </Typography>
              </IconButton>
            </Box>

            {/* comment box */}
            <Box display={"flex"} flex={1} gap={1}>
              {props.dp ? (
                <Avatar
                  src={props.dp}
                  sx={{
                    width: 35,
                    height: 35,
                    border: "5px solid ",
                    borderColor: "borderColor.main",
                    borderRadius: "20px",
                    fontSize: "1.2rem",
                    color: "primary.main",
                    bgcolor: "#111",
                  }}
                ></Avatar>
              ) : (
                <Avatar
                  sx={{
                    width: 35,
                    height: 35,
                    border: "5px solid ",
                    borderColor: "borderColor.main",
                    borderRadius: "20px",
                    fontSize: "1.2rem",
                    color: "primary.main",
                    bgcolor: "#111",
                  }}
                >
                  {props.name ? props.name.charAt(0) : ""}
                </Avatar>
              )}
              <CommentBox postId={props.postId} fetchComment={fetchComment} />
            </Box>
          </Box>
        </Box>
      </CardActions>
    </Box>
  );
};

export default MarkDownPostCard;
