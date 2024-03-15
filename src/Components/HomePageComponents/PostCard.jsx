import { FavoriteBorder, MoreVert, Share } from "@mui/icons-material";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import AddLinkIcon from "@mui/icons-material/AddLink";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import TimeAgo from "timeago-react";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
const PostCard = (props) => {
  console.log(props.name.charAt(0));
  return (
    <Card
      sx={{
        zIndex: "-1",
        bgcolor: "backgroundColor.secondary",
        borderRadius: { xs: "0", lg: "15px" },
        marginBottom: { xs: "1px", lg: 2 },
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{
              bgcolor: "grey",
              border: "5px solid",
              borderColor: "borderColor.main",
              borderRadius: "20px",
            }}
          >
            {props.name ? props.name.charAt(0) : ""}
          </Avatar>
        }
        action={
          <IconButton sx={{ color: "textColor.main" }}>
            <MoreVert />
          </IconButton>
        }
        title={
          <Typography variant="body1" color="textColor.secondary">
            @{props.username}
          </Typography>
        }
        subheader={
          <Typography variant="body2" color="textColor.main">
            {props.name}{" "}
            <Typography sx={{ color: "primary.main", ml: 1 }} display="inline">
              • <span>{format(props.date)}</span>
            </Typography>
          </Typography>
        }
      />
      <CardContent>
        <Typography variant="body2" color="textColor.main">
          {props.caption}
        </Typography>
      </CardContent>
      {props.image && (
        <Box
          sx={{
            height: "25rem",
            bgcolor: "#333",
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <img
            src={props.image}
            alt="image"
            height={"100%"}
            width={"100%"}
            style={{ objectFit: "contain" }}
          />
        </Box>
      )}

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
              <FavoriteBorder sx={{ color: "textColor.secondary" }} />
            </IconButton>
            <IconButton aria-label="comment">
              <TextsmsOutlinedIcon sx={{ color: "textColor.secondary" }} />
            </IconButton>
            <IconButton aria-label="share">
              <Share sx={{ color: "textColor.secondary" }} />
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
              border: "5px solid",
              borderColor: "borderColor.main",
              borderRadius: "20px",
            }}
          >
            {props.name ? props.name.charAt(0) : ""}
          </Avatar>
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
