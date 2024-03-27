import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Divider from "@mui/material/Divider";
import PersonIcon from "@mui/icons-material/Person";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { authContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import Api from "../../Utils/api";
import { Avatar, Typography } from "@mui/material";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 10,
    backgroundColor: "rgb(100,100,100,0.3)",
    backdropFilter: "blur(10px)",
    minWidth: 180,
    color: "#fff",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function NavButton() {
  const ctx = useContext(authContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        disableRipple
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{
          backgroundColor: {
            xs: "transparent",
            md: "backgroundColor.secondary",
          },
          color: "textColor.main",
          borderRadius: "15px",
          textTransform: "none",
          padding: "5px 10px",
          fontSize: "0.9rem",
          ":hover": {
            backgroundColor: {
              xs: "transparent",
              md: "primary.main",
            },
            color: "backgroundColor.main",
          },
        }}
      >
        {ctx.profile.profile_pic ? (
          <Avatar
            src={ctx.profile.profile_pic}
            sx={{
              width: { xs: 40, md: 30 },
              height: { xs: 40, md: 30 },
              border: "5px solid ",
              borderColor: "borderColor.main",
              borderRadius: "35px",
              fontSize: "1.2rem",
              color: "primary.main",
              bgcolor: "#111",
              mr: { xs: 0, md: 1 },
            }}
          ></Avatar>
        ) : (
          <Avatar
            sx={{
              width: { xs: 40, md: 30 },
              height: { xs: 40, md: 30 },
              border: "5px solid ",
              borderColor: "borderColor.main",
              borderRadius: "35px",
              fontSize: "1.2rem",
              color: "primary.main",
              bgcolor: "#111",
              mr: { xs: 0, md: 1 },
            }}
          >
            {ctx.user.first_name ? ctx.user.first_name.charAt(0) : ""}
          </Avatar>
        )}
        <Typography display={{ xs: "none", md: "block" }}>
          {" "}
          {ctx.user.first_name}
        </Typography>
      </Button>
      <StyledMenu
        sx={{ zIndex: 10000, mt: 1 }}
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
          backgroundColor: "black",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        disableScrollLock
      >
        <MenuItem
          onClick={() => {
            navigate(`/profile/${ctx.user.username}`);
            handleClose();
          }}
          disableRipple
        >
          <PersonIcon />
          Profile
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <ManageAccountsIcon />
          My account
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem
          onClick={() => {
            Api.get("/auth/logout").then((res) => {
              ctx.setUser(null);
              navigate("/signin");
            });
          }}
          disableRipple
        >
          <LogoutIcon />
          Log Out
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
