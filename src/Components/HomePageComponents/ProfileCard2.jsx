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
  Stack,
  Divider,
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
        borderRadius: "25px",

        margin: " 0px 15px ",
        position: "relative",
      }}
    >
      <CardMedia
        component="img"
        height="135"
        image="https://static.vecteezy.com/system/resources/previews/007/162/596/non_2x/beautiful-blue-mountain-landscape-with-sunrise-and-sunset-in-mountains-background-dark-night-time-outdoor-and-hiking-concept-sun-in-the-sky-good-for-wallpaper-site-banner-cover-poster-free-vector.jpg"
        alt="Cover Photo"
      />
      <Avatar
        src="profile-picture.jpg"
        sx={{
          width: 100,
          height: 100,
          border: "7px solid #1a1a1a",
          borderRadius: "35px",
          position: "absolute",
          top: 90,
        }}
      />
      <CardHeader
        sx={{
          position: "absolute",
          top: 60,
          left: 25,
        }}
        title={
          <Typography
            variant="h5"
            sx={{
              fontSize: "1.3rem",
              marginTop: "70px",
            }}
          >
            6969
          </Typography>
        }
        subheader={
          <Typography
            variant="body1"
            sx={{
              color: "#999",
              fontSize: "0.8rem",
            }}
          >
            Followers
          </Typography>
        }
      />

      <CardHeader
        sx={{
          position: "absolute",
          top: 60,
          right: 25,
        }}
        title={
          <Typography
            variant="h5"
            sx={{
              fontSize: "1.3rem",
              marginTop: "70px",
            }}
          >
            7852
          </Typography>
        }
        subheader={
          <Typography
            variant="body1"
            sx={{
              color: "#999",
              fontSize: "0.8rem",
            }}
          >
            Following
          </Typography>
        }
      />

      <CardHeader
        title={
          <Typography
            variant="h5"
            sx={{
              fontSize: "1.2rem",
              marginTop: "70px",
            }}
          >
            Rijurekh Ghosh
          </Typography>
        }
        subheader={
          <Typography
            variant="body1"
            sx={{
              color: "#999",
              fontSize: "1rem",
              paddingTop: "10px",
            }}
          >
            @rijurekh24
          </Typography>
        }
      />
      <CardContent>
        <Typography color="white">
          Hello i am UI/Ux designer. Open to new projects
        </Typography>
      </CardContent>
      <Divider
        variant="middle"
        sx={{
          backgroundColor: "white",
          paddingY: 2,
        }}
      />
      <Stack
        direction="row"
        spacing={2}
        sx={{
          padding: "20px",
        }}
      >
        <Button
          variant="contained"
          disableElevation
          sx={{
            width: "315px",
            backgroundColor: "#333333",
            color: "#999",
            padding: "15px",
            borderRadius: "18px",
          }}
        >
          My Profile
        </Button>
      </Stack>
    </Card>
  );
};

export default ProfileCard;
