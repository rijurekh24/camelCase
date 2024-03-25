import { Box } from "@mui/material";
import ProfileCard from "./ProfileCard";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../../../Context/AuthContext";

const Sidebar = () => {
  const [showScrollbar, setShowScrollbar] = useState(false);

  const handleScroll = () => {
    setShowScrollbar(true);
    setTimeout(() => {
      setShowScrollbar(false);
    }, 2000);
  };

  const ctx = useContext(authContext);
  useEffect(() => {
    ctx.fetchProfile();
  }, []);

  return (
    <Box
      px={2}
      sx={{
        display: { xs: "none", lg: "block" },
        flex: 2,
        overflowY: "scroll",
        position: "sticky",
        top: "73px",
        height: "calc(100dvh - 5.5rem)",
        "&::-webkit-scrollbar-track": {
          backgroundColor: "backgroundColor.main",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "primary.main",
        },
        "&::-webkit-scrollbar": {
          width: showScrollbar ? "0px" : "0px",
          // transition: "width 0.5s",
        },
      }}
      onScroll={handleScroll}
    >
      <Box>
        <ProfileCard />
      </Box>
    </Box>
  );
};

export default Sidebar;
