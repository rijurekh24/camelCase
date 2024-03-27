import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Divider, Typography } from "@mui/material";
import LikeNotification from "./LikeNotification";
import { useEffect } from "react";
import { useContext } from "react";
import { socketContext } from "../../Context/SocketContext";

export default function NotificationSideBar({ open, closeDrawer }) {
  const ctx = useContext(socketContext);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={closeDrawer}
      sx={{ zIndex: "10000" }}
      PaperProps={{
        sx: {
          width: { xs: 270, md: 400 },
          backgroundColor: "backgroundColor.main",
        },
      }}
    >
      <Box
        display={"flex"}
        justifyContent={"center"}
        p={1}
        flexDirection={"column"}
        alignItems={"center"}
      >
        <Typography
          sx={{
            color: "textColor.main",
            fontSize: "1.4rem",
            fontWeight: 500,
            pb: 1,
          }}
        >
          Notifications
        </Typography>

        <Divider variant="middle" color="#333" flexItem />

        {ctx.notification.map((item, index) => (
          <LikeNotification
            key={index}
            image={item.data?.post.url}
            likedBy={item?.data.liked_by}
            date={item?.date}
          />
        ))}
      </Box>
    </Drawer>
  );
}
