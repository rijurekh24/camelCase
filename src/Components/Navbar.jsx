import { Box } from "@mui/system";
import { AppBar, Toolbar, IconButton, Stack, Input } from "@mui/material";
import Badge from "@mui/material/Badge";
import { Home, Message, Notifications } from "@mui/icons-material";
import NavButton from "./HomePageComponents/NavButton";
const Navbar = () => {
  return (
    <AppBar
      sx={{
        background: "#181818",
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
            <Box flexGrow={{ xs: 1, md: 0 }}>
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
              <Input
                placeholder="# Explore"
                sx={{
                  padding: "4px 0px 4px 10px",
                  marginLeft: "2%",
                  border: "none",
                  backgroundColor: "#232323",
                  borderRadius: "25px",
                  color: "white",
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
              <Home sx={{ color: "#01ab81" }} />
            </Badge>
            <Badge>
              <Message sx={{ color: "white" }} />
            </Badge>
            <Badge
              variant="dot"
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#01ab81",
                },
              }}
            >
              <Notifications sx={{ color: "white" }} />
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
