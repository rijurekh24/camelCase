import { Avatar, Box, Button, Typography } from "@mui/material";
import React from "react";

const ProfilePage = () => {
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
                Rijurekh Ghosh
              </Typography>
              <Typography
                sx={{ fontSize: "1.1rem", color: "textColor.secondary" }}
              >
                @rijurekh24
              </Typography>
            </Box>
            <Box>
              <Button>
                <i
                  class="fa-regular fa-pen-to-square"
                  style={{ color: "#999", marginRight: "4px" }}
                ></i>
                Edit Profile
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
