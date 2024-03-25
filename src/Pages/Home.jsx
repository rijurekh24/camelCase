import { Box, Stack } from "@mui/material";
import Feed from "../Components/HomePageComponents/Feed/Feed";
import SideBar from "../Components/HomePageComponents/SideBar/SideBar";
import RightBar from "../Components/HomePageComponents/RightBar/RightBar";
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
        style={{
          zIndex: 2000000000,
        }}
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
