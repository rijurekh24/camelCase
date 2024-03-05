import React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  Avatar,
  Typography,
  CardContent,
  Box,
  Button,
} from "@mui/material";

const ProfileCard = () => {
  return (
    <Card
      sx={{
        backgroundColor: "#232323",
        color: "white",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CardMedia
        component="img"
        height="130"
        image="https://static.vecteezy.com/system/resources/previews/007/162/596/non_2x/beautiful-blue-mountain-landscape-with-sunrise-and-sunset-in-mountains-background-dark-night-time-outdoor-and-hiking-concept-sun-in-the-sky-good-for-wallpaper-site-banner-cover-poster-free-vector.jpg"
        alt="Cover Photo"
      />
      <Avatar
        src="profile-picture.jpg"
        sx={{
          width: 80,
          height: 80,
          border: "5px solid #181818",
          borderRadius: "35px",
        }}
      />
      <CardHeader
        title={<Typography variant="h5">Rijurekh Ghosh</Typography>}
        subheader={
          <Typography
            variant="body1"
            sx={{ color: "#999", fontSize: "0.8rem" }}
          >
            @rijurekh24
          </Typography>
        }
      />
      <CardContent>
        <Typography color="white">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis
          magna vel turpis ultrices consequat.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
