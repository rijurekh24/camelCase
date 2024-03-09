import { Grid } from "@mui/material";
import PuffLoader from "react-spinners/PuffLoader";

const LoadingPage = () => {
  return (
    <Grid
      container
      sx={{ minHeight: "100vh", backgroundColor: "backgroundColor.main" }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <PuffLoader color="primary.main" />
    </Grid>
  );
};

export default LoadingPage;
