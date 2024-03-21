import {
  Box,
  Button,
  Typography,
  Skeleton,
  Avatar,
  Badge,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../../Utils/api";
import { authContext } from "../../Context/AuthContext";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const ProfilePage = () => {
  const [isFollowed, setIsFollowed] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const { username } = useParams();
  const ctx = useContext(authContext);
  const [loading, setLoading] = useState(true);
  const [followButton, setFollowButton] = useState(true);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const handleBadgeClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
  };

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
          if (response.data.user._id === ctx.user._id) {
            setFollowButton(false);
          }
        })
        .catch((error) => {
          console.log(error.response.data);
        })
        .finally(() => {
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
            <Box display={"flex"} justifyContent={"space-between"} flex={1}>
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
      bgcolor={"backgroundColor.main"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box
        bgcolor={"backgroundColor.secondary"}
        width={{ xs: "90%", md: "50%" }}
        padding={"20px"}
        borderRadius={"15px"}
      >
        <Box
          component="img"
          src={
            profileData.bg_pic
              ? profileData.bg_pic
              : "https://c4.wallpaperflare.com/wallpaper/792/460/915/1920x1080-px-code-coding-programming-simple-background-anime-ah-my-goddess-hd-art-wallpaper-preview.jpg"
          }
          alt="cover_photo"
          sx={{
            width: "100%",
            height: 150,
            objectFit: "cover",
            borderRadius: "15px",
          }}
        />
        <Box px={2} display={"flex"} alignItems={"center"} gap={4} mt={2}>
          {profileData.profile_pic ? (
            <Badge
              overlap="circular"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              badgeContent={
                <Typography
                  component={"span"}
                  sx={{
                    borderRadius: "50%",
                    padding: "2px 4px",
                    color: "textColor.main",
                  }}
                >
                  <i
                    class="fa-regular fa-pen-to-square"
                    style={{
                      backgroundColor: "#1a1f26",
                      padding: "5px",
                      borderRadius: "50%",
                      cursor: "pointer",
                    }}
                  ></i>
                </Typography>
              }
            >
              <Avatar
                src={profileData.profile_pic}
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
              />
            </Badge>
          ) : (
            <Badge
              overlap="circular"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              badgeContent={
                <Typography
                  component={"span"}
                  sx={{
                    borderRadius: "50%",
                    padding: "2px 4px",
                    color: "textColor.main",
                  }}
                >
                  <i
                    class="fa-regular fa-pen-to-square"
                    style={{
                      backgroundColor: "#1a1f26",
                      padding: "5px",
                      borderRadius: "50%",
                      cursor: "pointer",
                    }}
                  ></i>
                </Typography>
              }
            >
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
                {profileData.first_name ? profileData.first_name.charAt(0) : ""}
              </Avatar>
            </Badge>
          )}
          <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
            <Box>
              <Typography sx={{ fontSize: "1.4rem", color: "textColor.main" }}>
                {profileData.first_name} {profileData.last_name}
              </Typography>
              <Typography
                sx={{ fontSize: "1.1rem", color: "textColor.secondary" }}
              >
                @{username}
              </Typography>
            </Box>
            <Box>
              {profileData._id != ctx.user._id && (
                <Button
                  onClick={handleClick}
                  // sx={{
                  //   display:
                  //      ? "inline-block" : "none",
                  // }}
                >
                  {isFollowed ? "Unfollow" : "Follow"}
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
