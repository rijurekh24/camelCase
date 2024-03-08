import React, { useContext } from "react";
import { authContext } from "../../Context/AuthContext";
import {
  Card,
  CardHeader,
  CardMedia,
  Avatar,
  Typography,
  CardContent,
  Button,
  Stack,
  Divider,
} from "@mui/material";

const ProfileCard = () => {
  const ctx = useContext(authContext);
  console.log(ctx);
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
        position: "relative",
      }}
    >
      <CardMedia
        component="img"
        height="135"
        image="https://e0.pxfuel.com/wallpapers/52/580/desktop-wallpaper-shade-of-green-landscape-forest-firewatch-nature-digital-art-mountains-video-games-ar-landscape-minimalist-minimal.jpg"
        alt="Cover Photo"
      />
      <Avatar
        src="https://pics.craiyon.com/2023-09-20/c98875fa1d9e4981b377031bc56a8a6a.webp"
        sx={{
          width: 95,
          height: 95,
          border: "7px solid #1A1A1A",
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
            sx={{
              fontSize: "1.3rem",
              marginTop: "70px",
            }}
          >
            {ctx.user.first_name} {ctx.user.last_name}
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
            @{ctx.user.username}
          </Typography>
        }
      />
      <CardContent>
        <Typography color="white">
          Hello i am UI/UX designer. Open to new projects
        </Typography>
        <Divider variant="middle" color="#333" sx={{ marginTop: 2 }} />
      </CardContent>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          padding: "5px 20px 20px 20px",
        }}
      >
        <Button
          variant="contained"
          disableElevation
          sx={{
            width: "315px",
            backgroundColor: "#333",
            color: "#999",
            textTransform: "none",
            padding: "15px",
            borderRadius: "18px",
            transition: "0.4s",
            ":hover": {
              backgroundColor: "#01ab81",
              color: "#181818",
            },
          }}
        >
          My Profile
        </Button>
      </Stack>
    </Card>
  );
};

export default ProfileCard;
