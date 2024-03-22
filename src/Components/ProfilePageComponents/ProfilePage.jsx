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
import ProfilePicPopUp from "./ProfilePicPopUp";
import { ToastContainer } from "react-toastify";
import CoverPhotoUploadModal from "../HomePageComponents/Modals/CoverPhotoUploadModal";

const ProfilePage = () => {
  const [isFollowed, setIsFollowed] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const { username } = useParams();
  const ctx = useContext(authContext);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
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
        <Box
          bgcolor={"backgroundColor.secondary"}
          width={{ xs: "100%", md: "50%" }}
        >
          <Skeleton variant="rectangular" width="100%" height={150} />
          <Box
            px={{ xs: 2, md: 2 }}
            display={"flex"}
            alignItems={"center"}
            gap={2}
            mt={2}
          >
            <Skeleton variant="circular" width={90} height={90} />
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
      <ToastContainer
        position="bottom-right"
        autoClose={false}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition:Bounce
      />
      <Box
        bgcolor={"backgroundColor.secondary"}
        width={{ xs: "90%", md: "50%" }}
        padding={"20px"}
        borderRadius={"15px"}
      >
        <Box sx={{ position: "relative", width: "100%", height: 150 }}>
          <Box
            component="img"
            src={
              profileData.bg_pic
                ? profileData.bg_pic
                : "https://scontent.frdp1-1.fna.fbcdn.net/v/t31.18172-8/16819286_741171146050826_4557200543484548208_o.png?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=1mA0jEmUkYAAX9mrPY1&_nc_ht=scontent.frdp1-1.fna&oh=00_AfBqFGnIXofSsojoe1-Gr_l4pU8A6G60E2eQp1RPLiUX5A&oe=66254623"
            }
            alt="cover_photo"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "15px",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              padding: "5px 10px",
              fontSize: "12px",
              cursor: "pointer",
            }}
          >
            <CoverPhotoUploadModal open={open} handleClose={closeModal} />
            {profileData._id == ctx.user._id && (
              <Box onClick={openModal}>
                <i
                  class="fa-solid fa-camera "
                  style={{
                    color: "#eee",
                    fontSize: "1.2rem",
                    backgroundColor: "#1a1f26",
                    padding: "5px",
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                ></i>
              </Box>
            )}
          </Box>
        </Box>

        <Box display={"flex"} alignItems={"center"} gap={2} mt={2}>
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
                  {profileData._id == ctx.user._id && <ProfilePicPopUp />}
                </Typography>
              }
            >
              <Avatar
                src={profileData.profile_pic}
                sx={{
                  width: { xs: 55, md: 75 },
                  height: { xs: 55, md: 75 },
                  border: "7px solid ",
                  borderColor: "borderColor.main",
                  borderRadius: "35px",
                  fontSize: "1.4rem",
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
                  {profileData._id == ctx.user._id && <ProfilePicPopUp />}
                </Typography>
              }
            >
              <Avatar
                sx={{
                  width: { xs: 55, md: 75 },
                  height: { xs: 55, md: 75 },
                  border: "7px solid ",
                  borderColor: "borderColor.main",
                  borderRadius: "35px",
                  fontSize: { xs: "1.4rem", md: "1.8rem" },
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
