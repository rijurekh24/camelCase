import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Divider, Typography } from "@mui/material";
import LikeNotification from "./LikeNotification";
import { useEffect } from "react";
import { useContext } from "react";
import { socketContext } from "../../Context/SocketContext";

export default function NotificationSideBar({ open, closeDrawer }) {
  const sCtx = useContext(socketContext);

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
        flexDirection={"column"}
        alignItems={"center"}
        overflow="auto"
      >
        <Box width={"100%"} textAlign={"center"}>
          <Typography
            sx={{
              color: "textColor.main",
              fontSize: "1.4rem",
              fontWeight: 500,
              p: 1,
            }}
          >
            Notifications
          </Typography>
        </Box>
        <Divider color="#333" flexItem />
        <Box
          overflow="auto"
          sx={{
            width: "100%",
            "&::-webkit-scrollbar-track": {
              backgroundColor: "backgroundColor.main",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "primary.main",
            },
            "&::-webkit-scrollbar": {
              width: "3px",
            },
          }}
        >
          {sCtx.notification.map((item, index) => (
            <LikeNotification
              key={index}
              image={item.data?.post?.url}
              likedBy={item?.data.liked_by}
              date={item?.date}
              id={item.data?.post?.id}
              closeDrawer={closeDrawer}
            />
          ))}
        </Box>
      </Box>
    </Drawer>
  );
}
