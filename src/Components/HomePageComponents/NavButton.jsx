import * as React from "react";
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
import { useContext } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import Api from "../../Utils/api";
import { Avatar } from "@mui/material";

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
  const [anchorEl, setAnchorEl] = React.useState(null);
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
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{
          backgroundColor: "#232323",
          color: "white",
          borderRadius: "25px",
          textTransform: "none",
          padding: "5px 20px 5px 10px",
          fontSize: "0.9rem",
          ":hover": {
            backgroundColor: "#202020",
          },
        }}
      >
        <Avatar
          src="https://pics.craiyon.com/2023-09-20/c98875fa1d9e4981b377031bc56a8a6a.webp"
          sx={{
            width: 30,
            height: 30,
            border: "5px solid #1A1A1A",
            borderRadius: "35px",
            marginRight: "5px",
          }}
        />
        {ctx.user.first_name}
      </Button>
      <StyledMenu
        sx={{ zIndex: 10000 }}
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
          backgroundColor: "black",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} disableRipple>
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
