import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Avatar, Divider, InputBase } from "@mui/material";
import Api from "../../../Utils/api";
import { useNavigate } from "react-router-dom";

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
  "&:focus": {
    outline: "none",
  },
};

const LikeModal = ({ open, onClose, postId }) => {
  const [likes, setLikes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredLikes, setFilteredLikes] = useState([]);
  const navigate = useNavigate();
  const fetchLikes = () => {
    Api.get(`/posts/get?id=${postId}`).then((res) => {
      setLikes(res.data.post.likes);
      console.log(res.data.post);
    });
  };

  useEffect(() => {
    if (open) {
      fetchLikes();
    }
  }, [open, postId]);

  useEffect(() => {
    const filtered = likes.filter((item) =>
      item.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredLikes(filtered);
  }, [searchQuery, likes]);

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
            Likes
            <Divider
              sx={{
                maxWidth: "100%",
                backgroundColor: "#444",
                margin: "10px auto 10px auto",
                color: "#fff",
              }}
            />
          </Typography>

          <Box
            width={"100%"}
            sx={{
              overflowY: "scroll",
              position: "sticky",
              height: 300,
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
            <InputBase
              placeholder="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              fullWidth
              sx={{ px: 2, color: "textColor.secondary", mb: 1 }}
            />
            {filteredLikes.length === 0 ? (
              <Box textAlign={"center"}>
                <Typography>No results found</Typography>
              </Box>
            ) : (
              filteredLikes.map((item) => (
                <Box
                  display={"flex"}
                  gap={1}
                  alignItems={"center"}
                  key={item}
                  px={1}
                >
                  {item.profile_pic ? (
                    <Avatar
                      src={item.profile_pic}
                      sx={{
                        width: 45,
                        height: 45,
                        border: "5px solid ",
                        borderColor: "borderColor.main",
                        borderRadius: "35px",
                        fontSize: "1.2rem",
                        color: "primary.main",
                        bgcolor: "#111",
                      }}
                    ></Avatar>
                  ) : (
                    <Avatar
                      sx={{
                        width: 45,
                        height: 45,
                        border: "5px solid ",
                        borderColor: "borderColor.main",
                        borderRadius: "35px",
                        fontSize: "1.2rem",
                        color: "primary.main",
                        bgcolor: "#111",
                      }}
                    >
                      {item.first_name ? item.first_name.charAt(0) : ""}
                    </Avatar>
                  )}
                  <Box>
                    <Typography
                      onClick={() => navigate(`/profile/${item.username}`)}
                      sx={{
                        color: "textColor.secondary",
                        fontSize: "0.9rem",
                        cursor: "pointer",
                      }}
                    >
                      @{item?.username}
                    </Typography>
                    <Typography
                      sx={{ color: "textColor.main", fontSize: "1rem" }}
                    >
                      {item?.first_name} {item?.last_name}
                    </Typography>
                  </Box>
                </Box>
              ))
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default LikeModal;
