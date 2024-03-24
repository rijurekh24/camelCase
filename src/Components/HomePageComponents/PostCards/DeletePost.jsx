import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useContext } from "react";
import { authContext } from "../../../Context/AuthContext";
import Api from "../../../Utils/api";
import { useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const options = ["DELETE"];

export default function DeletePost({
  open,
  handleClose,
  setAnchorEl,
  anchorEl,
  postId,
}) {
  const ctx = useContext(authContext);
  const toastId = useRef(null);
  const handleClick = () => {
    toastId.current = toast.loading("Deleting Post...");
    Api.delete(`/posts/?id=${postId}`)
      .then((res) => {
        ctx.fetchPost();
        toast.update(toastId.current, {
          render: "Deleted successfully...",
          type: "error",
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
        console.log(err.res.data);
      });
  };
  return (
    <div>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        PaperProps={{
          style: {
            width: "15ch",
            color: "white",
            background: "rgba(200,200,200,0.3)",
            boxShadow: "none",
            backdropFilter: "blur(20px)",
          },
        }}
      >
        <MenuItem
          sx={{
            "&:hover": {
              background: "transparent",
            },
          }}
          onClick={handleClick}
        >
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
}
