import { useContext, useEffect, useState } from "react";
import { Button, Divider, IconButton, Typography } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import PollIcon from "@mui/icons-material/Poll";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Avatar, Box, TextField } from "@mui/material";
import { Send } from "@mui/icons-material";
import PostModal from "./PostModal";
import { authContext } from "../../Context/AuthContext";
import Api from "../../Utils/api";
const Post = () => {
  const [textInput, setTextInput] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const ctx = useContext(authContext);
  // const [loading, setLoading] = useState(true);

  // console.log(ctx.user);
  // useEffect(() => {
  //   if (ctx.user) {
  //     setLoading(false);
  //   }
  // }, []);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const handleInputChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleSend = () => {
    Api.post("/posts/create-new", {
      username: ctx.user.username,
      caption: textInput,
      user: ctx.user._id,
    })
      .then((res) => {
        ctx.fetchPost();
        setTextInput("");
      })
      .catch((err) => {});
  };

  // if (loading) {
  //   return (
  //     <Box
  //       sx={{
  //         backgroundColor: "backgroundColor.secondary",
  //         borderRadius: "15px",
  //         padding: "10px",
  //         mb: 2,
  //       }}
  //     >
  //       <Box display={"flex"} width={"100%"} gap={2} mb={2}>
  //         {/* Skeleton for Avatar */}
  //         <Box
  //           sx={{
  //             width: "50px",
  //             height: "50px",
  //             backgroundColor: "backgroundColor.main",
  //             borderRadius: "20px",
  //           }}
  //         ></Box>

  //         {/* Skeleton for TextField */}
  //         <Box
  //           sx={{
  //             flex: "1",
  //             backgroundColor: "backgroundColor.main",
  //             borderRadius: "20px",
  //             height: "50px",
  //           }}
  //         ></Box>
  //       </Box>
  //       <Divider variant="middle" color="#333" />
  //       <Box
  //         display={"flex"}
  //         justifyContent={"space-between"}
  //         width={"100%"}
  //         mt={2}
  //       >
  //         {/* Skeleton for Button 1 */}
  //         <Box
  //           sx={{
  //             width: "70px",
  //             height: "40px",
  //             backgroundColor: "backgroundColor.main",
  //             borderRadius: "15px",
  //           }}
  //         ></Box>

  //         {/* Skeleton for Button 2 */}
  //         <Box
  //           sx={{
  //             width: "70px",
  //             height: "40px",
  //             backgroundColor: "backgroundColor.main",
  //             borderRadius: "15px",
  //           }}
  //         ></Box>

  //         {/* Skeleton for Button 3 */}
  //         <Box
  //           sx={{
  //             width: "70px",
  //             height: "40px",
  //             backgroundColor: "backgroundColor.main",
  //             borderRadius: "15px",
  //           }}
  //         ></Box>

  //         {/* Skeleton for Button 4 */}
  //         <Box
  //           sx={{
  //             width: "70px",
  //             height: "40px",
  //             backgroundColor: "backgroundColor.main",
  //             borderRadius: "15px",
  //           }}
  //         ></Box>
  //       </Box>
  //     </Box>
  //   );
  // }

  return (
    <Box
      sx={{
        backgroundColor: "backgroundColor.secondary",
        borderRadius: { xs: "0", lg: "15px" },
        marginBottom: 2,
        padding: "10px",
      }}
    >
      <PostModal open={modalOpen} handleClose={closeModal} />
      <Box display={"flex"} width={"100%"} gap={2} mb={2}>
        <Avatar
          sx={{
            border: "5px solid",
            borderColor: "borderColor.main",
            borderRadius: "20px",
            color: "primary.main",
            backgroundColor: "#111",
          }}
        >
          {ctx.user.first_name ? ctx.user.first_name.charAt(0) : ""}
        </Avatar>
        <TextField
          id="filled-basic"
          placeholder={`What's on your mind, ${ctx.user.first_name} ?`}
          variant="standard"
          autoComplete="off"
          multiline
          fullWidth
          value={textInput}
          onChange={handleInputChange}
          sx={{
            backgroundColor: "backgroundColor.secondary",
            "& .MuiFilledInput-underline:after": {
              borderBottomColor: "primary.main",
            },
          }}
          InputLabelProps={{
            style: { color: "#888" },
          }}
          InputProps={{
            sx: {
              color: "textColor.main",
              borderRadius: "20px",
              backgroundColor: "backgroundColor.main",
              p: 2,
              fontSize: "1rem",
            },
            disableUnderline: true,
            endAdornment: textInput && (
              <Send
                sx={{ color: "textColor.main", cursor: "pointer" }}
                onClick={handleSend}
              />
            ),
          }}
        />
      </Box>
      <Divider variant="middle" color="#666" />
      <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
        <Button
          onClick={openModal}
          disableRipple
          sx={{
            color: "textColor.main",
            borderRadius: "15px",
            textTransform: "none",
            ":hover": {
              backgroundColor: "transparent",
            },
            p: 0,
          }}
        >
          <IconButton>
            <InsertPhotoIcon
              disableRipple
              sx={{ color: "#8dbd61", fontSize: "1.5rem" }}
            />
          </IconButton>
          <Typography
            pr={2}
            display={{ xs: "none", sm: "block" }}
            fontSize={"1rem"}
          >
            Photo
          </Typography>
        </Button>
        <Button
          onClick={openModal}
          sx={{
            color: "textColor.main",
            borderRadius: "15px",
            textTransform: "none",
            ":hover": {
              backgroundColor: "transparent",
            },
          }}
          disableRipple
        >
          <IconButton>
            <PlayCircleIcon
              disableRipple
              sx={{ color: "#be375f", fontSize: "1.5rem" }}
            />
          </IconButton>
          <Typography
            pr={2}
            display={{ xs: "none", sm: "block" }}
            fontSize={"1rem"}
          >
            Video
          </Typography>
        </Button>
        <Button
          disableRipple
          sx={{
            color: "textColor.main",
            textTransform: "none",
            borderRadius: "15px",
            fontSize: "0.7rem",
            ":hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <IconButton>
            <PollIcon
              disableRipple
              sx={{ color: "#ed8554", fontSize: "1.5rem" }}
            />
          </IconButton>
          <Typography
            pr={2}
            display={{ xs: "none", sm: "block" }}
            fontSize={"1rem"}
          >
            Poll
          </Typography>
        </Button>
        <Button
          disableRipple
          sx={{
            color: "textColor.main",
            borderRadius: "15px",
            textTransform: "none",
            ":hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <IconButton>
            <CalendarMonthIcon
              disableRipple
              sx={{ color: "#f5eb6d", fontSize: "1.5rem" }}
            />
          </IconButton>
          <Typography
            pr={2}
            display={{ xs: "none", sm: "block" }}
            fontSize={"1rem"}
          >
            Schedule
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default Post;
