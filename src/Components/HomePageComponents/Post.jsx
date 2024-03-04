import {
  Comment,
  Favorite,
  FavoriteBorder,
  MoreVert,
  Send,
  Share,
} from "@mui/icons-material";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  Divider,
  Icon,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
const Post = () => {
  return (
    <Card
      sx={{ margin: 5, zIndex: "-1", bgcolor: "#232323", borderRadius: "20px" }}
    >
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: "grey" }}>R</Avatar>}
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
          <Avatar sx={{ bgcolor: "grey", width: "200" }}>R</Avatar>
          <TextField
            placeholder="add a comment"
            fullWidth
            sx={{
              bgcolor: "#181818",
              borderRadius: "20px",
              ml: 2,
              "& input": {
                color: "#999",
                "&::placeholder": {
                  color: "#bbb",
                },
              },
              "& fieldset": {
                borderColor: "transparent",
                "&:hover": {
                  borderColor: "transparent",
                },
              },
              "&:hover fieldset": {
                borderColor: "transparent",
              },
              "&:focus-within fieldset": {
                borderColor: "transparent",
              },
              "&.Mui-focused fieldset": {
                borderColor: "transparent",
              },
            }}
            variant="outlined"
            InputProps={{
              disableOutline: true,
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default Post;
