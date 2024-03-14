import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import { authContext } from "../../Context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const ProfileCard = () => {
  const ctx = useContext(authContext);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/profile");
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
        src="https://e0.pxfuel.com/wallpapers/52/580/desktop-wallpaper-shade-of-green-landscape-forest-firewatch-nature-digital-art-mountains-video-games-ar-landscape-minimalist-minimal.jpg"
        sx={{
          width: "100%",
          height: 130,
          objectFit: "cover",
          // borderTopLeftRadius: "25px",
          // borderTopRightRadius: "25px",
        }}
      />

      <Box p={2}>
        <Box
          display={"flex"}
          justifyContent={"space-around"}
          alignItems={"center"}
          mb={3}
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
              src="https://pics.craiyon.com/2023-09-20/c98875fa1d9e4981b377031bc56a8a6a.webp"
              sx={{
                width: 85,
                height: 85,
                border: "7px solid ",
                borderColor: "borderColor.main",
                borderRadius: "35px",
              }}
            />
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
          <Typography sx={{ fontSize: "1.2rem", color: "textColor.main" }}>
            {ctx.user.first_name} {ctx.user.last_name}
          </Typography>
          <Typography
            mb={3}
            sx={{
              color: "textColor.secondary",
              fontSize: "0.9rem",
            }}
          >
            @{ctx.user.username}
          </Typography>
          <Typography color="textColor.main" mb={3} fontSize={"0.9rem"}>
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
