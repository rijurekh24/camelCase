import React, { useContext } from "react";
import Api from "../Utils/api";
import { authContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { Grid, Typography, Button } from "@mui/material";

const Home = () => {
  const ctx = useContext(authContext);
  const navigate = useNavigate();
  return (
    <Box sx={{ backgroundColor: "#181818", minHeight: "100vh" }}>
      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
        sx={{ minHeight: "100vh" }}
      >
        <Grid item lg={6}>
          <Typography color={"White"} fontSize={"1.4rem"}>
            <Box
              component={"span"}
              style={{ display: "inline", color: "#01ab81" }}
            >
              Welcome
            </Box>
            , {ctx.user.first_name} {ctx.user.last_name}
          </Typography>

          <Button
            sx={{
              display: "block",
              backgroundColor: "#01ab81",
              color: "white",
              my: 4,
              "&:hover": {
                backgroundColor: "#007d5e",
              },
            }}
            fullWidth
            onClick={() => {
              Api.get("/auth/logout").then((res) => {
                ctx.setUser(null);
                navigate("/signin");
              });
            }}
          >
            Log out
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
