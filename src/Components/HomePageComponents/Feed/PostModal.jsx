import React, { useContext, useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Avatar, CircularProgress, Divider, InputBase } from "@mui/material";
import { authContext } from "../../../Context/AuthContext";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import Axios from "axios";
import Api from "../../../Utils/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "backgroundColor.secondary",
  borderRadius: "15px",
  boxShadow: 24,
  p: 2,
  color: "textColor.main",
  border: "2px solid #333",
  outline: "none",
};

function PostModal({ open, handleClose }) {
  const ctx = useContext(authContext);
  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState("");
  const [fileName, setFileName] = useState(" Choose Photo or Video");
  const [blobURL, setBlobURL] = useState("");
  const [caption, setCaption] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toastId = useRef(null);

  const handleTextChange = (event) => {
    setCaption(event.target.value);
  };

  const uploadMedia = ({ target: { files } }) => {
    if (files && files[0]) {
      setFileName(files[0].name);
      const mediaURL = URL.createObjectURL(files[0]);
      setBlobURL(mediaURL);
      setMedia(files[0]);

      // Determine the type of media (image or video)
      const type = files[0].type.split("/")[0];
      setMediaType(type);
    }
  };

  const handleClick = () => {
    setIsLoading(true);
    handleClose();
    if (!media) {
      toastId.current = toast.loading("Posting...");
      Api.post("/posts/create-new", {
        username: ctx.user.username,
        caption,
        user: ctx.user._id,
      })
        .then((res) => {
          setIsLoading(false);
          ctx.fetchPost();
          toast.update(toastId.current, {
            render: "Posted successfully...",
            type: "success",
            isLoading: false,
            autoClose: 2000,
            closeButton: true,
            pauseOnHover: true,
            draggable: false,
            style: {
              backgroundColor: "#222831",
              color: "white",
            },
          });
          setCaption("");
          setBlobURL("");
          setMedia(null);
        })
        .catch((err) => {
          setIsLoading(false);
        });
    }

    if (media) {
      toastId.current = toast.loading("Uploading media...");
      const formData = new FormData();
      formData.append("file", media);
      formData.append("upload_preset", "bdafcwdk");
      setIsLoading(true);
      handleClose();
      const cloudinaryUploadEndpoint =
        mediaType === "image"
          ? "https://api.cloudinary.com/v1_1/dc1xi4aeb/image/upload"
          : "https://api.cloudinary.com/v1_1/dc1xi4aeb/video/upload";
      Axios.post(cloudinaryUploadEndpoint, formData)
        .then((res) => {
          setIsLoading(false);
          Api.post("/posts/create-new", {
            username: ctx.user.username,
            caption,
            img: res.data.url,
            user: ctx.user._id,
          })
            .then((res) => {
              ctx.fetchPost();
              setCaption("");
              setBlobURL("");
              setMedia(null);
              toast.update(toastId.current, {
                render: "Posted successfully...",
                type: "success",
                isLoading: false,
                autoClose: 2000,
                closeButton: true,
                pauseOnHover: true,
                draggable: false,
                style: {
                  backgroundColor: "#222831",
                  color: "white",
                },
              });
            })
            .catch((err) => {
              setIsLoading(false);
              console.error("Error creating post:", err);
            });
        })
        .catch((error) => {
          setIsLoading(false);
          console.error("Error uploading media:", error);
        });
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      margin={2}
      disableScrollLock
      sx={{
        zIndex: 99999999,
      }}
    >
      <Box sx={style} width={{ xs: 280, sm: 500 }}>
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
            Create Post
            <Divider
              sx={{
                maxWidth: "100%",
                backgroundColor: "#444",
                margin: "10px auto 10px auto",
                color: "#fff",
              }}
            />
          </Typography>
          <Box display={"flex"} alignItems={"center"} width={"100%"}>
            {ctx.profile.profile_pic ? (
              <Avatar
                src={ctx.profile.profile_pic}
                sx={{
                  width: 35,
                  height: 35,
                  border: "5px solid ",
                  borderColor: "borderColor.main",
                  fontSize: "1.2rem",
                  color: "primary.main",
                  bgcolor: "#111",
                }}
              ></Avatar>
            ) : (
              <Avatar
                sx={{
                  width: 35,
                  height: 35,
                  border: "5px solid ",
                  borderColor: "borderColor.main",
                  fontSize: "1.2rem",
                  color: "primary.main",
                  bgcolor: "#111",
                }}
              >
                {ctx.user.first_name ? ctx.user.first_name.charAt(0) : ""}
              </Avatar>
            )}
            <Typography fontSize={"1rem"}>
              {ctx.user.first_name} {ctx.user.last_name}
            </Typography>
          </Box>
          <InputBase
            placeholder={`What's on your mind, ${ctx.user.first_name} ?`}
            fullWidth
            autoComplete="off"
            autoFocus
            multiline
            value={caption}
            onChange={handleTextChange}
            sx={{
              mb: 2,
              px: 1,
              color: "textColor.main",
            }}
          />
          {/* media select section */}
          <Box mb={2} width={"100%"}>
            <form
              style={{
                border: "3px dotted #999",
                borderRadius: "15px",
                height: 300,
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#1a1f26",
                padding: "3px",
              }}
              onClick={() => {
                document.querySelector(".input-field").click();
              }}
            >
              <input
                type="file"
                accept="image/*,video/*"
                className="input-field"
                hidden
                onChange={uploadMedia}
              />
              <Box
                height={"100%"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                {blobURL ? (
                  mediaType === "image" ? (
                    <img
                      src={blobURL}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  ) : (
                    <video
                      src={blobURL}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                      controls
                    />
                  )
                ) : (
                  <CloudUploadIcon
                    fontSize="large"
                    sx={{ color: "primary.main" }}
                  />
                )}
              </Box>
            </form>
            <Box
              width={"100%"}
              display={"flex"}
              justifyContent={"center"}
              mt={1}
            >
              <Box display={"flex"} alignItems={"center"} px={1}>
                <Typography
                  sx={{ wordBreak: "break-all", textAlign: "center" }}
                >
                  {fileName}{" "}
                </Typography>
                {media ? (
                  <DeleteIcon
                    sx={{ color: "primary.main", cursor: "pointer" }}
                    onClick={() => {
                      setFileName(" Choose Photo or Video");
                      setMedia(null);
                      setBlobURL("");
                    }}
                  />
                ) : null}
              </Box>
            </Box>
          </Box>
          <Button
            fullWidth
            disabled={!caption.trimStart() && !media}
            onClick={handleClick}
            sx={{
              backgroundColor:
                caption.trim() || media ? "primary.main" : "gray",
              color: caption.trim() || media ? "textColor.main" : "#000",
              padding: "10px",
              borderRadius: "15px",
              ":hover": {
                backgroundColor: "primary.main",
              },
            }}
          >
            {isLoading ? (
              <CircularProgress size={"2em"} sx={{ color: "white" }} />
            ) : (
              "Post"
            )}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default PostModal;
