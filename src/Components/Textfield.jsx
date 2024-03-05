import { TextField } from "@mui/material";

const Textfield = (props) => {
  return (
    <TextField
      id="filled-basic"
      label={props.label}
      name={props.name}
      error={props.err}
      helperText={props.helperTxt}
      onChange={(e) => props.handleChange(e)}
      variant="filled"
      autoComplete="off"
      fullWidth
      sx={{
        bgcolor: "#232323",
        "& .MuiFilledInput-underline:after": {
          borderBottomColor: "#01ab81",
        },
      }}
      InputLabelProps={{
        style: { color: "#888" },
      }}
      InputProps={{
        style: { color: "white" },
        disableUnderline: true,
      }}
    />
  );
};

export default Textfield;
