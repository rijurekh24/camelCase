import Navbar from "../Components/Navbar";
import { Box, Stack } from "@mui/material";
import Feed from "../Components/HomePageComponents/Feed";
import SideBar from "../Components/HomePageComponents/SideBar";
import RightBar from "../Components/HomePageComponents/RightBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  return (
    <Box sx={{ backgroundColor: "backgroundColor.main", minHeight: "100dvh" }}>
      <ToastContainer
        position="bottom-right"
        autoClose={false}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition:Bounce
      />
      <Box>
        <Stack direction={"row"} gap={{ lg: 5, xl: 2 }}>
          <SideBar />
          <Feed />
          <RightBar />
        </Stack>
      </Box>
    </Box>
  );
};

export default Home;
