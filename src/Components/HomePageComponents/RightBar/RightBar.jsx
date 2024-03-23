import { Box } from "@mui/material";
import FriendListCard from "./FriendListCard";
import { useContext, useState } from "react";

const RightBar = () => {
  const [showScrollbar, setShowScrollbar] = useState(false);

  const handleScroll = () => {
    setShowScrollbar(true);
    setTimeout(() => {
      setShowScrollbar(false);
    }, 2000);
  };
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
          backgroundColor: "backgroundColor.main",
        },
        "&::-webkit-scrollbar": {
          width: showScrollbar ? "0px" : "0px",
          // transition: "width 0.5s",
        },
      }}
      onScroll={handleScroll}
    >
      <Box>
        <FriendListCard />
      </Box>
    </Box>
  );
};

export default RightBar;
