import { Box } from "@mui/material";
import ProfileCard from "./ProfileCard";

const Sidebar = () => {
  return (
    <Box px={2} sx={{ display: { xs: "none", lg: "block" }, flex: 2 }}>
      <Box>
        <ProfileCard />
      </Box>
    </Box>
  );
};

export default Sidebar;
