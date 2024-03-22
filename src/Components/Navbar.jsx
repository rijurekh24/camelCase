import { Box } from "@mui/system";
import { AppBar, Toolbar, IconButton, Stack } from "@mui/material";
import Badge from "@mui/material/Badge";
import { Home, Message, Notifications } from "@mui/icons-material";
import NavButton from "./HomePageComponents/NavButton";
import Search from "./HomePageComponents/Search";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
            spacing={8}
            direction={"row"}
            display={{ xs: "none", md: "flex" }}
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
              variant="dot"
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "primary.main",
                },
              }}
            >
              <Notifications sx={{ color: "textColor.main" }} />
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
