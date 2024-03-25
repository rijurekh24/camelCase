import * as React from "react";
import { Dropdown } from "@mui/base/Dropdown";
import { Menu } from "@mui/base/Menu";
import { MenuButton as BaseMenuButton } from "@mui/base/MenuButton";
import { MenuItem as BaseMenuItem, menuItemClasses } from "@mui/base/MenuItem";
import { styled } from "@mui/system";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import ProfilePhotoUploadModal from "../HomePageComponents/Modals/ProfilePhotoUploadModal";

const ProfilePicPopUp = ({ fetchProfile }) => {
  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <>
      <Box>
        <ProfilePhotoUploadModal
          open={open}
          handleClose={closeModal}
          fetchProfile={fetchProfile}
        />
      </Box>
      <Typography onClick={openModal}>
        <i
          className="fa-solid fa-pen-to-square "
          style={{
            color: "#eee",
            fontSize: "1rem",
            backgroundColor: "#1a1f26",
            padding: "5px",
            borderRadius: "50%",
            cursor: "pointer",
          }}
        ></i>
      </Typography>
    </>
  );
};

export default ProfilePicPopUp;

//   return (
//     <Dropdown>
//       <MenuButton>
//         <Typography>
//           <i
//             className="fa-solid fa-pen-to-square "
//             style={{
//               color: "#eee",
//               fontSize: "1rem",
//               backgroundColor: "#1a1f26",
//               padding: "5px",
//               borderRadius: "50%",
//               cursor: "pointer",
//             }}
//           ></i>
//         </Typography>
//         <ProfilePhotoUploadModal
//           open={open}
//           handleClose={closeModal}
//           fetchProfile={fetchProfile}
//         />
//       </MenuButton>
//       <Menu slots={{ listbox: Listbox }}>
//         <MenuItem>
//           <Typography>
//             <i className="fa-regular fa-user"></i> View Photo
//           </Typography>
//         </MenuItem>
//         <MenuItem onClick={openModal}>
//           <Typography>
//             <i className="fa-solid fa-upload"></i> Upload Photo
//           </Typography>
//         </MenuItem>
//       </Menu>
//     </Dropdown>
//   );
// }

// const blue = {
//   50: "#F0F7FF",
//   100: "#C2E0FF",
//   200: "#99CCF3",
//   300: "#66B2FF",
//   400: "#3399FF",
//   500: "#007FFF",
//   600: "#0072E6",
//   700: "#0059B3",
//   800: "#004C99",
//   900: "#003A75",
// };

// const grey = {
//   50: "#F3F6F9",
//   100: "#E5EAF2",
//   200: "#DAE2ED",
//   300: "#C7D0DD",
//   400: "#B0B8C4",
//   500: "#9DA8B7",
//   600: "#6B7A90",
//   700: "#434D5B",
//   800: "#303740",
//   900: "#1C2025",
// };

// const Listbox = styled("ul")(
//   ({ theme }) => `
//   font-family: 'IBM Plex Sans', sans-serif;
//   font-size: 0.875rem;
//   box-sizing: border-box;
//   padding: 6px;
//   margin: 12px 0;
//   min-width: 200px;
//   border-radius: 12px;
//   overflow: auto;
//   outline: 0px;
//   background: #222831;
//   border: 1px solid #333;
//   color: #fff;
//   z-index: 1;
//   position:relative;
//     bottom:20px;
//   left:50%;
//   `
// );

// const MenuItem = styled(BaseMenuItem)(
//   ({ theme }) => `
//   list-style: none;
//   padding: 8px;
//   border-radius: 8px;
//   cursor: pointer;
//   user-select: none;

//   &:last-of-type {
//     border-bottom: none;
//   }

//   &:focus {
//     background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
//     color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
//   }

//   &.${menuItemClasses.disabled} {
//     color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
//   }
//   `
// );

// const MenuButton = styled(BaseMenuButton)(
//   ({ theme }) => `
//     background-color: transparent;
//     border:none;
//     outline:none;
//   `
// );
