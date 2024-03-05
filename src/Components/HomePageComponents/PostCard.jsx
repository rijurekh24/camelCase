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
const PostCard = () => {
  return (
    <Card
      sx={{
        zIndex: "-1",
        bgcolor: "#232323",
        borderRadius: "5px",
        marginBottom: 2,
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
          >
            R
          </Avatar>
        }
        action={
          <IconButton style={{ color: "white" }}>
            <MoreVert />
          </IconButton>
        }
        title={
          <Typography variant="body1" color="#999">
            @rijurekh24
          </Typography>
        }
        subheader={
          <Typography variant="body2" color="white">
            Rijurekh Ghosh{" "}
            <Typography sx={{ color: "#01ab81", ml: 1 }} display="inline">
              • 1hr ago
            </Typography>
          </Typography>
        }
      />
      <CardContent>
        <Typography variant="body2" color="white">
          Hello there (●'◡'●)
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        image="https://media.licdn.com/dms/image/D5612AQFlxMRpK-On8g/article-cover_image-shrink_720_1280/0/1670602482212?e=2147483647&v=beta&t=1HWOX81_1_mfqzP2kdHty9dnCVgb-dmVsMuYhBKCnRQ"
      />

      <CardActions disableSpacing>
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
                backgroundColor: "#01ab81",
                border: "1px solid #01ab81",
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
              border: "5px solid #181818",
              borderRadius: "20px",
            }}
          >
            R
          </Avatar>
          <TextField
            id="filled-basic"
            label="add a comment"
            variant="filled"
            autoComplete="off"
            fullWidth
            sx={{
              ":hover": {},
              bgcolor: "#232323",
              ml: 1,
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
