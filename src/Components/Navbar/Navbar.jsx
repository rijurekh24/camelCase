import { Box } from "@mui/system";
import { AppBar, Toolbar, IconButton, Stack } from "@mui/material";
import Badge from "@mui/material/Badge";
import { Home, Message, Notifications } from "@mui/icons-material";
import NavButton from "./NavButton";
import Search from "./Search";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../../Context/AuthContext";
import NotificationSideBar from "../NotificationComponents/NotificationSideBar";
import { socketContext } from "../../Context/SocketContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const ctx = useContext(authContext);
  const sCtx = useContext(socketContext);
  const [count, setCount] = useState();
  const [open, setOpen] = useState(false);
  const openDrawer = () => {
    sCtx.fetchNotification();
    setOpen(true);
  };
  const closeDrawer = () => {
    setOpen(false);
  };

  useEffect(() => {
    ctx.fetchProfile();
  }, []);

  return (
    <AppBar
      sx={{
        backgroundColor: "backgroundColor.main",
        boxShadow: "none",
        zIndex: "9999",
        width: "100%",
      }}
      position={"sticky"}
    >
      <Toolbar sx={{ height: "4rem" }}>
        <Box>
          <NotificationSideBar open={open} closeDrawer={closeDrawer} />
        </Box>
        <Box
          flexDirection={"row"}
          display={"flex"}
          justifyContent={"space-between"}
          width={"100%"}
        >
          <Stack
            flexDirection={"row"}
            display={"flex"}
            justifyContent={"flex-start"}
            alignItems={"center"}
            flex={1}
            gap={1}
          >
            <Box onClick={() => navigate("/")}>
              <IconButton>
                <i
                  className="fa-regular fa-square fa-lg"
                  style={{
                    color: "#76ABAE",
                  }}
                ></i>
              </IconButton>
            </Box>
            <Box display={{ xs: "none", sm: "block" }} flex={1}>
              <Search />
            </Box>
          </Stack>
          <Stack
            spacing={{ xs: 5, md: 8 }}
            direction={"row"}
            display={{ xs: "flex", md: "flex" }}
            justifyContent={"center"}
            alignItems={"center"}
            flex={1}
          >
            <Badge>
              <Home
                sx={{
                  color: location.pathname === "/" ? "primary.main" : "white",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/")}
              />
            </Badge>
            <Badge>
              <Message sx={{ color: "textColor.main" }} />
            </Badge>
            <Badge
              badgeContent={sCtx?.newNotCount}
              onClick={() => {
                if (!open) {
                  openDrawer();
                } else {
                  closeDrawer();
                }
              }}
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "primary.main",
                },
              }}
            >
              <Notifications
                sx={{ color: "textColor.main", cursor: "pointer" }}
              />
            </Badge>
          </Stack>
          <Stack
            flex={1}
            flexDirection={"row"}
            display={"flex"}
            justifyContent={"flex-end"}
            alignItems={"center"}
          >
            <NavButton />
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
