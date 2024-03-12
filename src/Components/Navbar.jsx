import { Box } from "@mui/system";
import {
  AppBar,
  Toolbar,
  IconButton,
  Stack,
  Input,
  InputBase,
} from "@mui/material";
import Badge from "@mui/material/Badge";
import { Home, Message, Notifications } from "@mui/icons-material";
import NavButton from "./HomePageComponents/NavButton";
import { theme } from "../theme";
const Navbar = () => {
  return (
    <AppBar
      sx={{
        backgroundColor: "backgroundColor.main",
        boxShadow: "none",
        zIndex: "9999",
      }}
      position={"sticky"}
    >
      <Toolbar>
        <Box
          flexDirection={"row"}
          display={"flex"}
          justifyContent={"space-between"}
          width={"100%"}
        >
          <Stack
            flexDirection={"row"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box>
              <IconButton>
                <i
                  className="fa-regular fa-square fa-lg"
                  style={{
                    color: "#01ab81",
                  }}
                ></i>
              </IconButton>
            </Box>
            <Box display={{ xs: "none", sm: "block" }}>
              <InputBase
                placeholder="# Explore"
                sx={{
                  padding: "4px 0px 4px 10px",
                  marginLeft: "2%",
                  border: "none",
                  backgroundColor: "backgroundColor.secondary",
                  borderRadius: "25px",
                  color: "textColor.main",
                  fontSize: "0.9rem",
                }}
              />
            </Box>
          </Stack>
          <Stack
            spacing={8}
            direction={"row"}
            display={{ xs: "none", md: "flex" }}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Badge>
              <Home sx={{ color: "primary.main" }} />
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
            flexDirection={"row"}
            display={"flex"}
            justifyContent={"center"}
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
