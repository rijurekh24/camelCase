import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import { authContext } from "../../Context/AuthContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import FollowersModal from "./Modals/FollowersModal";
import FollowingModal from "./Modals/FollowingModal";

const ProfileCard = () => {
  const ctx = useContext(authContext);
  const navigate = useNavigate();
  const [openFollowers, setOpenFollowers] = useState(false);
  const handleOpenFollowers = () => setOpenFollowers(true);
  const handleCloseFollowers = () => setOpenFollowers(false);

  const [openFollowing, setOpenFollowing] = useState(false);
  const handleOpenFollowing = () => setOpenFollowing(true);
  const handleCloseFollowing = () => setOpenFollowing(false);

  const handleClick = () => {
    navigate(`/profile/${ctx.user.username}`);
  };

  return (
    <Box
      sx={{
        backgroundColor: "backgroundColor.secondary",
        color: "textColor.main",
        borderRadius: "15px",
        marginBottom: 2,
        overflow: "hidden",
      }}
    >
      <Box>
        <FollowersModal open={openFollowers} onClose={handleCloseFollowers} />
        <FollowingModal open={openFollowing} onClose={handleCloseFollowing} />
      </Box>
      {ctx.user.bg_pic ? (
        <Box
          component="img"
          src={ctx.user.bg_pic}
          sx={{
            width: "100%",
            height: 140,
            objectFit: "cover",
          }}
        />
      ) : (
        <Box
          component="img"
          src="https://c4.wallpaperflare.com/wallpaper/792/460/915/1920x1080-px-code-coding-programming-simple-background-anime-ah-my-goddess-hd-art-wallpaper-preview.jpg"
          sx={{
            width: "100%",
            height: 140,
            objectFit: "cover",
          }}
        />
      )}

      <Box px={2} pb={2} pt={1}>
        <Box
          display={"flex"}
          justifyContent={"space-around"}
          alignItems={"center"}
          mb={2}
          gap={{ lg: 15 }}
        >
          <Box
            textAlign={"center"}
            onClick={handleOpenFollowers}
            sx={{ cursor: "pointer" }}
          >
            <Typography
              sx={{
                fontSize: "1.1rem",
              }}
            >
              {ctx.user.followers.length}
            </Typography>
            <Typography
              sx={{
                color: "textColor.secondary",
                fontSize: "0.7rem",
              }}
            >
              Followers
            </Typography>
          </Box>
          <Box position={"absolute"} top={90}>
            {ctx.user.profile_pic ? (
              <Avatar
                src={ctx.user.profile_pic}
                sx={{
                  width: 90,
                  height: 90,
                  border: "7px solid ",
                  borderColor: "borderColor.main",
                  borderRadius: "35px",
                  fontSize: "1.8rem",
                  color: "primary.main",
                  bgcolor: "#111",
                }}
              ></Avatar>
            ) : (
              <Avatar
                sx={{
                  width: 90,
                  height: 90,
                  border: "7px solid ",
                  borderColor: "borderColor.main",
                  borderRadius: "35px",
                  fontSize: "1.8rem",
                  color: "primary.main",
                  bgcolor: "#111",
                }}
              >
                {ctx.user.first_name ? ctx.user.first_name.charAt(0) : ""}
              </Avatar>
            )}
          </Box>
          <Box
            textAlign={"center"}
            onClick={handleOpenFollowing}
            sx={{ cursor: "pointer" }}
          >
            <Typography
              sx={{
                fontSize: "1.1rem",
              }}
            >
              {ctx.user.following.length}
            </Typography>
            <Typography
              sx={{
                color: "textColor.secondary",
                fontSize: "0.7rem",
              }}
            >
              Following
            </Typography>
          </Box>
        </Box>
        <Box
          width={"100%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
          textAlign={"center"}
        >
          <Typography sx={{ fontSize: "1.1rem", color: "textColor.main" }}>
            {ctx.user.first_name} {ctx.user.last_name}
          </Typography>
          <Typography
            mb={2}
            sx={{
              color: "textColor.secondary",
              fontSize: "0.9rem",
            }}
          >
            @{ctx.user.username}
          </Typography>
          <Typography color="textColor.main" mb={3} fontSize={"0.8rem"}>
            Hello i am UI/UX designer. Open to new projects
            <Divider variant="middle" color="#666" sx={{ marginTop: 3 }} />
          </Typography>
          <Button
            onClick={handleClick}
            sx={{
              width: "100%",
              backgroundColor: "backgroundColor.main",
              color: "textColor.secondary",
              textTransform: "none",
              padding: "15px",
              borderRadius: "10px",
              transition: "0.5s",
              ":hover": {
                backgroundColor: "primary.main",
                color: "backgroundColor.main",
              },
            }}
          >
            My Profile
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileCard;
