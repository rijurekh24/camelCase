import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import { Button, Typography } from "@mui/material";
import ProfilePhotoUploadModal from "./ProfilePhotoUploadModal";

const ViewDpModal = ({ open, closeModal, dp }) => {
  return (
    <Dialog
      open={open}
      onClose={closeModal}
      aria-labelledby="dialog-modal-title"
      aria-describedby="dialog-modal-description"
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          boxShadow: "none",
          background: "rgb(26, 31, 38)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 0.5,
          borderRadius: "15px",
        },
      }}
    >
      <Box
        width={"100%"}
        height={"100%"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box
          component="img"
          src={dp}
          width={"100%"}
          height={"100%"}
          sx={{ objectFit: "cover" }}
        />
      </Box>
      {/* <Typography
        py={2}
        bgcolor={"backgroundColor.main"}
        color={"textColor.main"}
        textAlign={"center"}
        width={"100%"}
       borderRadius={"15px"}
        sx={{ cursor: "pointer", borderRadius: "15px" }}   
 >
        Update Profile Photo
      </Typography> */}
    </Dialog>
  );
};

export default ViewDpModal;
