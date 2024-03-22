import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Divider, InputBase } from "@mui/material";
import { authContext } from "../../../Context/AuthContext";
import FriendList from "../FriendList";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "15px",
  bgcolor: "backgroundColor.main",
  boxShadow: 24,
  color: "textColor.main",
  border: "2px solid #333",
  py: 2,
};

const FollowersModal = ({ open, onClose }) => {
  const ctx = useContext(authContext);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFollowers = ctx.user.followers.filter((follower) => {
    const fullName = `${follower.first_name} ${follower.last_name}`;
    return (
      fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      follower.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} width={{ xs: 300 }}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography
            id="modal-modal-title"
            sx={{
              fontSize: "1.2rem",
              width: "100%",
              textAlign: "center",
            }}
          >
            Followers
            <Divider
              sx={{
                maxWidth: "100%",
                backgroundColor: "#444",
                margin: "10px auto 10px auto",
                color: "#fff",
              }}
            />
          </Typography>
          <InputBase
            placeholder="Search"
            fullWidth
            sx={{ px: 2, color: "textColor.secondary", mb: 2 }}
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <Box
            width={"100%"}
            sx={{
              overflowY: "scroll",
              position: "sticky",
              height: 250,
              "&::-webkit-scrollbar-track": {
                backgroundColor: "backgroundColor.main",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "primary.main",
              },
              "&::-webkit-scrollbar": {
                width: "0px",
              },
            }}
          >
            {filteredFollowers.map((item, index) => (
              <FriendList
                key={index}
                name={`${item.first_name} ${item.last_name}`}
                username={item.username}
                dp={item.profile_pic}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default FollowersModal;
