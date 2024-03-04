import React, { useContext } from "react";
import Api from "../Utils/api";
import { authContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import {
  Grid,
  Typography,
  Button,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";

const Navbar = () => {
  const ctx = useContext(authContext);
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ background: "transparent", boxShadow: "none" }}
      >
        <Toolbar>
          <IconButton>
            <i
              className="fa-regular fa-square fa-xl"
              style={{
                color: "#01ab81",
              }}
            ></i>
          </IconButton>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, color: "white" }}
          >
            camelCase
          </Typography>
          <Typography color={"White"} fontSize={"1.2rem"} mr={2}>
            {ctx.user.first_name} {ctx.user.last_name}
          </Typography>
          <Button
            onClick={() => {
              Api.get("/auth/logout").then((res) => {
                ctx.setUser(null);
                navigate("/signin");
              });
            }}
            sx={{
              display: "block",
              backgroundColor: "#01ab81",
              border: "1px solid #01ab81",
              transition: "0.4s",
              padding: "5px 10px",
              color: "white",
              "&:hover": {
                background: "transparent",
                color: "#01ab81",
              },
            }}
          >
            Log out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
