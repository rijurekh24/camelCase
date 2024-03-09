import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";

const ImagePostForm = () => {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No file selected");
  return (
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
          onChange={({ target: { files } }) => {
            files[0] && setFileName(files[0].name);
            if (files) setImage(URL.createObjectURL(files[0]));
          }}
        />
        {image ? (
          <img src={image} style={{ width: 100 }} />
        ) : (
          <CloudUploadIcon fontSize="large" sx={{ color: "#01ab81" }} />
        )}
      </form>
      <Box width={"100%"} display={"flex"} justifyContent={"center"} mt={1}>
        <Box display={"flex"} alignItems={"center"}>
          <Typography>{fileName} </Typography>
          {image ? (
            <DeleteIcon
              sx={{ color: "#01ab81", cursor: "pointer" }}
              onClick={() => {
                setFileName("No file selected");
                setImage(null);
              }}
            />
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

export default ImagePostForm;
