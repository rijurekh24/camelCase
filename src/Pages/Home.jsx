import Navbar from "../Components/Navbar";
import { Box, Stack } from "@mui/material";
import Feed from "../Components/HomePageComponents/Feed";
import SideBar from "../Components/HomePageComponents/SideBar";
import RightBar from "../Components/HomePageComponents/RightBar";

const Home = () => {
  return (
    <Box sx={{ backgroundColor: "#181818", minHeight: "100vh" }}>
      <Navbar />
      <Box mt={1}>
        <Stack direction={"row"} gap={{ lg: 5, xl: 10 }}>
          <SideBar />
          <Feed />
          <RightBar />
        </Stack>
      </Box>
    </Box>
  );
};

export default Home;
