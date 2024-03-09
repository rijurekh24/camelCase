import { FavoriteBorder, MoreVert, Share } from "@mui/icons-material";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import AddLinkIcon from "@mui/icons-material/AddLink";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
const PostCard = (props) => {
  return (
    <Card
      sx={{
        zIndex: "-1",
        bgcolor: "backgroundColor.secondary",
        borderRadius: "25px",
        marginBottom: 2,
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{
              bgcolor: "grey",
              border: "5px solid #1A1A1A",
              borderRadius: "20px",
            }}
            src={props.image}
          ></Avatar>
        }
        action={
          <IconButton sx={{ color: "textColor.main" }}>
            <MoreVert />
          </IconButton>
        }
        title={
          <Typography variant="body1" color="#999">
            @{props.username}
          </Typography>
        }
        subheader={
          <Typography variant="body2" color="textColor.main">
            {props.name}{" "}
            <Typography sx={{ color: "primary.main", ml: 1 }} display="inline">
              • 1hr ago
            </Typography>
          </Typography>
        }
      />
      <CardContent>
        <Typography variant="body2" color="textColor.main">
          Hello there (●'◡'●)
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        image="https://images.cointelegraph.com/cdn-cgi/image/format=auto,onerror=redirect,quality=90,width=1434/https://s3.cointelegraph.com/uploads/2023-01/158029af-a86a-402f-a5b5-e915cc69f138.JPG"
      />

      <CardActions>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box>
            <IconButton aria-label="add to favorites">
              <FavoriteBorder sx={{ color: "#999" }} />
            </IconButton>
            <IconButton aria-label="comment">
              <TextsmsOutlinedIcon sx={{ color: "#999" }} />
            </IconButton>
            <IconButton aria-label="share">
              <Share sx={{ color: "#999" }} />
            </IconButton>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              sx={{
                backgroundColor: "primary.main",
                border: "1px solid primary.main",
                padding: "2px 10px",
                color: "#222",
                fontSize: "0.8rem",
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor: "#01ab90",
                },
              }}
            >
              Hire me
            </Button>
          </Box>
        </Box>
      </CardActions>
      <Divider variant="middle" color="#444" />
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            sx={{
              bgcolor: "grey",
              width: "200",
              border: "5px solid #1A1A1A",
              borderRadius: "20px",
            }}
            src={props.image}
          ></Avatar>
          <TextField
            id="filled-basic"
            label="add a comment"
            variant="filled"
            autoComplete="off"
            fullWidth
            sx={{
              ":hover": {},
              bgcolor: "backgroundColor.secondary",
              ml: 1,
              "& .MuiFilledInput-underline:after": {
                borderBottomColor: "primary.main",
              },
            }}
            InputLabelProps={{
              style: { color: "#888" },
            }}
            InputProps={{
              sx: { color: "textColor.main", borderRadius: "20px" },
              disableUnderline: true,
              endAdornment: (
                <InputAdornment position="end">
                  <Link style={{ color: "#aaa", marginRight: 3 }}>
                    <AddPhotoAlternateIcon />
                  </Link>
                  <Link style={{ color: "#aaa" }}>
                    <AddLinkIcon />
                  </Link>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default PostCard;
