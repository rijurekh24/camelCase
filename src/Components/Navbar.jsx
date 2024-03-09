import React, { useContext } from "react";
import Api from "../Utils/api";
import { authContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import {
  Typography,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  TextField,
  Stack,
  Input,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import Badge from "@mui/material/Badge";
import { Home, Message, Notifications } from "@mui/icons-material";
import NavButton from "./HomePageComponents/NavButton";
const Navbar = () => {
  // const ctx = useContext(authContext);
  // const navigate = useNavigate();
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
            <Badge color="primary" variant="dot" sx={{ color: "#01ab81" }}>
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
