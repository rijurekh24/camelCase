import { Box } from "@mui/material";
import FriendListCard from "./FriendListCard";
import { useState } from "react";

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
        top: "70px",
        height: "calc(100vh - 49.6px)",
        "&::-webkit-scrollbar-track": {
          background: "#181818",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#01ab81",
        },
        "&::-webkit-scrollbar": {
          width: showScrollbar ? "2px" : "0px",
          transition: "width 0.5s",
        },
      }}
      onScroll={handleScroll}
    >
      <Box>
        <FriendListCard></FriendListCard>
      </Box>
    </Box>
  );
};

export default RightBar;
