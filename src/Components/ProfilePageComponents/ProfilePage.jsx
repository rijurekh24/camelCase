import { Box, Button, Typography, Skeleton } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../../Utils/api";
import { authContext } from "../../Context/AuthContext";

const ProfilePage = () => {
  const [isFollowed, setIsFollowed] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const { username } = useParams();
  const ctx = useContext(authContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (username) {
      Api.get(`/auth/accounts/profile?username=${username}`)
        .then((response) => {
          setProfileData(response.data.user);
          const followerList = response.data.user.followers;
          if (followerList.includes(ctx.user._id)) {
            setIsFollowed(true);
          } else {
            setIsFollowed(false);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log(error.response.data);
          setLoading(false);
        });
    }
  }, [location.search, username]);

  const handleClick = () => {
    Api.post("/auth/accounts/follow/", { to: profileData._id })
      .then((response) => {
        const message = response.data.msg;
        if (message.includes("followed")) {
          setIsFollowed(true);
        }
        if (message.includes("unfollowed")) {
          setIsFollowed(false);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  if (loading) {
    return (
      <Box
        minHeight={"100vh"}
        bgcolor={"backgroundColor.main"}
        display={"flex"}
        justifyContent={"center"}
      >
        <Box bgcolor={"backgroundColor.secondary"} width={"50%"}>
          <Skeleton variant="rectangular" width="100%" height={150} />
          <Box px={2} display={"flex"} alignItems={"center"} gap={4} mt={2}>
            <Skeleton variant="circular" width={130} height={130} />
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              width={"100%"}
            >
              <Box>
                <Skeleton width={150} height={50} />
                <Skeleton width={100} height={20} />
              </Box>
              <Box>
                <Skeleton variant="rectangular" width={80} height={25} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }

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
        <Box px={2} display={"flex"} alignItems={"center"} gap={4} mt={2}>
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
                {isFollowed ? "Unfollow" : "Follow"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
