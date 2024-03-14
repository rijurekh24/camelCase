import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../../Utils/api";

const ProfilePage = () => {
  const [isFollowed, setIsFollowed] = useState(false);
  const [profileData, setProfileData] = useState([]);
  const { username } = useParams();
  useEffect(() => {
    if (username) {
      Api.get(`/auth/accounts/profile?username=${username}`)
        .then((response) => {
          setProfileData(response.data.user);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  }, [location.search, username]);

  const handleClick = () => {
    Api.post("/auth/accounts/follow/", { to: profileData._id })
      .then((response) => {
        console.log("sucessful", response.data);
        setIsFollowed(true);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <Box
      minHeight={"100vh"}
      bgcolor={"backgroundColor.main"}
      display={"flex"}
      justifyContent={"center"}
    >
      <Box bgcolor={"backgroundColor.secondary"} width={"50%"}>
        <Box
          component="img"
          src="https://e0.pxfuel.com/wallpapers/52/580/desktop-wallpaper-shade-of-green-landscape-forest-firewatch-nature-digital-art-mountains-video-games-ar-landscape-minimalist-minimal.jpg"
          alt="cover_photo"
          sx={{
            width: "100%",
            height: 150,
            objectFit: "cover",
          }}
        />
        <Box px={2} display={"flex"} alignItems={"center"} gap={4}>
          <Box
            component="img"
            src="https://pics.craiyon.com/2023-09-20/c98875fa1d9e4981b377031bc56a8a6a.webp"
            alt="profile_photo"
            width={"15%"}
            sx={{
              borderRadius: "50%",
              border: "10px solid",
              borderColor: "backgroundColor.main",
            }}
          />
          <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
            <Box>
              <Typography sx={{ fontSize: "1.4rem", color: "textColor.main" }}>
                {profileData.first_name} {profileData.last_name}
              </Typography>
              <Typography
                sx={{ fontSize: "1.1rem", color: "textColor.secondary" }}
              >
                {username}
              </Typography>
            </Box>
            <Box>
              <Button onClick={handleClick}>
                {isFollowed ? "Followed" : "Follow"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
