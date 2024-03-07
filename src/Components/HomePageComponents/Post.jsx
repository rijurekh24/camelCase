import React from "react";
import { Button, IconButton, Typography } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import PollIcon from "@mui/icons-material/Poll";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Icon,
  TextField,
} from "@mui/material";
const Post = () => {
  return (
    <Card
      sx={{
        bgcolor: "#232323",
        borderRadius: "25px",
        marginBottom: 2,
        display: "flex",
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{
              bgcolor: "grey",
              border: "5px solid #181818",
              borderRadius: "20px",
            }}
            src="https://pics.craiyon.com/2023-09-20/c98875fa1d9e4981b377031bc56a8a6a.webp"
          ></Avatar>
        }
      />

      <CardActions disableSpacing sx={{ width: "100%" }}>
        <Box
          sx={{
            width: "inherit",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
            }}
          >
            <TextField
              id="filled-basic"
              label="Tell your friends about your thougts..."
              variant="filled"
              fullWidth
              autoComplete="off"
              sx={{
                flexGrow: "10",
                ":hover": {},
                bgcolor: "#232323",
                "& .MuiFilledInput-underline:after": {
                  borderBottomColor: "#01ab81",
                },
              }}
              InputLabelProps={{
                style: { color: "#888" },
              }}
              InputProps={{
                style: { color: "white", borderRadius: "20px" },
                disableUnderline: true,
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button
              sx={{
                backgroundColor: "#202020",
                color: "white",
                borderRadius: "25px",
                textTransform: "none",
                padding: "0px 20px 0px 10px",
                fontSize: "0.7rem",
                ":hover": {
                  backgroundColor: "#202020",
                },
              }}
            >
              <IconButton>
                <InsertPhotoIcon sx={{ color: "#01ab81" }} />
              </IconButton>
              Photo
            </Button>
            <Button
              sx={{
                backgroundColor: "#202020",
                color: "white",
                borderRadius: "25px",
                padding: "0px 20px 0px 10px",
                fontSize: "0.7rem",
                textTransform: "none",
                ":hover": {
                  backgroundColor: "#202020",
                },
              }}
            >
              <IconButton>
                <PlayCircleIcon sx={{ color: "#4F93F8" }} />
              </IconButton>
              Video
            </Button>
            <Button
              sx={{
                backgroundColor: "#202020",
                color: "white",
                textTransform: "none",
                borderRadius: "25px",
                padding: "0px 20px 0px 10px",
                fontSize: "0.7rem",
                ":hover": {
                  backgroundColor: "#202020",
                },
              }}
            >
              <IconButton>
                <PollIcon sx={{ color: "#E67575" }} />
              </IconButton>
              Poll
            </Button>
            <Button
              sx={{
                backgroundColor: "#202020",
                color: "white",
                borderRadius: "25px",
                textTransform: "none",
                padding: "0px 20px 0px 10px",
                fontSize: "0.7rem",
                ":hover": {
                  backgroundColor: "#202020",
                },
              }}
            >
              <IconButton>
                <CalendarMonthIcon sx={{ color: "#EEBE65" }} />
              </IconButton>
              Schedule
            </Button>
          </Box>
        </Box>
      </CardActions>

      <CardContent></CardContent>
    </Card>
  );
};

export default Post;
