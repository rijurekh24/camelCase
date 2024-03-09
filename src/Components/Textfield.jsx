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
        bgcolor: "backgroundColor.secondary",
        "& .MuiFilledInput-underline:after": {
          borderBottomColor: "primary.main",
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
