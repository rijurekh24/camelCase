import React, { useContext, useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Avatar, CircularProgress, Divider, InputBase } from "@mui/material";
import { authContext } from "../../Context/AuthContext";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import Axios from "axios";
import Api from "../../Utils/api";

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
};

function PostModal({ open, handleClose }) {
  const ctx = useContext(authContext);
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No file selected");
  const [blobURL, setBlobURL] = useState("");
  const [caption, setCaption] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTextChange = (event) => {
    setCaption(event.target.value);
  };

  const uploadImage = ({ target: { files } }) => {
    if (files && files[0]) {
      setFileName(files[0].name);
      const imageURL = URL.createObjectURL(files[0]);
      setBlobURL(imageURL);
      setImage(files[0]);
    }
  };

  const handleClick = () => {
    setIsLoading(true);
    if (!image) {
      // console.error("No image selected");
      // return;
      Api.post("/posts/create-new", {
        username: ctx.user.username,
        caption,
        user: ctx.user._id,
      })
        .then((res) => {
          // console.log(res.data);
          handleClose();
          setIsLoading(false);
          ctx.fetchPost();
        })
        .catch((err) => {
          setIsLoading(false);
        });
    }

    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "bdafcwdk");

      Axios.post(
        "https://api.cloudinary.com/v1_1/dc1xi4aeb/image/upload",
        formData
      )
        .then((res) => {
          setIsLoading(false);
          //console.log(res.data);
          Api.post("/posts/create-new", {
            username: ctx.user.username,
            caption,
            img: res.data.url,
            user: ctx.user._id,
          })
            .then((res) => {
              //console.log(res.data);
              handleClose();
              setIsLoading(false);
              ctx.fetchPost();
            })
            .catch((err) => {
              setIsLoading(false);
              // console.log(err.response.data);
            });
        })
        .catch((error) => {
          setIsLoading(false);
          console.error("Error uploading image:", error);
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
    >
      <Box sx={style} width={{ xs: 280, sm: 300 }}>
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
            <Avatar
              src="https://pics.craiyon.com/2023-09-20/c98875fa1d9e4981b377031bc56a8a6a.webp"
              sx={{
                width: 35,
                height: 35,
                border: "5px solid ",
                borderColor: "borderColor.main",
                marginRight: "5px",
              }}
            />
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
          {/* image select section */}
          <Box mb={2} width={"100%"}>
            <form
              style={{
                border: "3px dotted #999",
                borderRadius: "20px",
                height: 200,
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "10px 0px",
              }}
              onClick={() => {
                document.querySelector(".input-field").click();
              }}
            >
              <input
                type="file"
                accept="image/*"
                className="input-field"
                hidden
                onChange={uploadImage}
              />
              {blobURL ? (
                <img src={blobURL} style={{ width: 100 }} />
              ) : (
                <CloudUploadIcon
                  fontSize="large"
                  sx={{ color: "primary.main" }}
                />
              )}
            </form>
            <Box
              width={"100%"}
              display={"flex"}
              justifyContent={"center"}
              mt={1}
            >
              <Box display={"flex"} alignItems={"center"}>
                <Typography>{fileName} </Typography>
                {image ? (
                  <DeleteIcon
                    sx={{ color: "primary.main", cursor: "pointer" }}
                    onClick={() => {
                      setFileName("No file selected");
                      setImage(null);
                      setBlobURL("");
                    }}
                  />
                ) : null}
              </Box>
            </Box>
          </Box>
          <Button
            fullWidth
            disabled={!caption && !image}
            onClick={handleClick}
            sx={{
              backgroundColor: caption || image ? "primary.main" : "gray",
              color: caption || image ? "textColor.main" : "#000",
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
