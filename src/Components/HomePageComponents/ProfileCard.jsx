import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import { authContext } from "../../Context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const ProfileCard = () => {
  const ctx = useContext(authContext);
  const navigate = useNavigate();

  // console.log(ctx.user);
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
      <Box
        component="img"
        src="https://c4.wallpaperflare.com/wallpaper/792/460/915/1920x1080-px-code-coding-programming-simple-background-anime-ah-my-goddess-hd-art-wallpaper-preview.jpg"
        sx={{
          width: "100%",
          height: 140,
          objectFit: "cover",
          // borderTopLeftRadius: "25px",
          // borderTopRightRadius: "25px",
        }}
      />

      <Box px={2} pb={2} pt={1}>
        <Box
          display={"flex"}
          justifyContent={"space-around"}
          alignItems={"center"}
          mb={1}
          gap={{ sm: 2, lg: 3 }}
        >
          <Box textAlign={"center"}>
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
          <Box>
            <Avatar
              sx={{
                width: 75,
                height: 75,
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
          </Box>
          <Box textAlign={"center"}>
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
            <Divider variant="middle" color="#333" sx={{ marginTop: 3 }} />
          </Typography>
          <Button
            onClick={handleClick}
            sx={{
              width: "100%",
              backgroundColor: "#333",
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
