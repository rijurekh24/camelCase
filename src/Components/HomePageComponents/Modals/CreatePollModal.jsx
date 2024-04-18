import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Avatar,
  Divider,
  IconButton,
  InputBase,
  TextField,
} from "@mui/material";
import { authContext } from "../../../Context/AuthContext";
import DeleteIcon from "@mui/icons-material/Delete";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "backgroundColor.secondary",
  borderRadius: "15px",
  boxShadow: 24,
  p: 2,
  color: "textColor.main",
  border: "2px solid #333",
  outline: "none",
};

function CreatePollModal({ open, handleClose }) {
  const ctx = useContext(authContext);
  const [caption, setCaption] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [duration, setDuration] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleTextChange = (event) => {
    setCaption(event.target.value);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    if (options.length < 5) {
      setOptions([...options, ""]);
    }
  };

  const handleDeleteOption = (index) => {
    if (options.length > 2) {
      const newOptions = [...options];
      newOptions.splice(index, 1);
      setOptions(newOptions);
    }
  };

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  const handleClick = () => {};

  React.useEffect(() => {
    const isQuestionEmpty = caption.trim() === "";
    const areOptionsEmpty = options.some((option) => option.trim() === "");
    setIsButtonDisabled(isQuestionEmpty || areOptionsEmpty);
  }, [caption, options]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      margin={2}
      disableScrollLock
      sx={{
        zIndex: 99999999,
      }}
    >
      <Box sx={style} width={{ xs: 280, sm: 500 }}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography
            id="modal-modal-title"
            sx={{
              fontSize: "1.2rem",
              width: "100%",
              textAlign: "center",
            }}
          >
            Create Poll
            <Divider
              sx={{
                maxWidth: "100%",
                backgroundColor: "#444",
                margin: "10px auto 10px auto",
                color: "#fff",
              }}
            />
          </Typography>
          <Box display={"flex"} alignItems={"center"} width={"100%"}>
            {ctx.profile.profile_pic ? (
              <Avatar
                src={ctx.profile.profile_pic}
                sx={{
                  width: 35,
                  height: 35,
                  border: "5px solid ",
                  borderColor: "borderColor.main",
                  fontSize: "1.2rem",
                  color: "primary.main",
                  bgcolor: "#111",
                  mr: 1,
                }}
              ></Avatar>
            ) : (
              <Avatar
                sx={{
                  width: 35,
                  height: 35,
                  border: "5px solid ",
                  borderColor: "borderColor.main",
                  fontSize: "1.2rem",
                  color: "primary.main",
                  bgcolor: "#111",
                  mr: 1,
                }}
              >
                {ctx.user.first_name ? ctx.user.first_name.charAt(0) : ""}
              </Avatar>
            )}
            <Typography fontSize={"1rem"}>
              {ctx.user.first_name} {ctx.user.last_name}
            </Typography>
          </Box>
          <InputBase
            placeholder={"write question..."}
            fullWidth
            autoComplete="off"
            autoFocus
            multiline
            value={caption}
            onChange={handleTextChange}
            sx={{
              mb: 2,
              mt: 1,
              color: "textColor.main",
            }}
          />
          <Box mb={2} width={"100%"}>
            <Box width={"100%"} display={"flex"} flexDirection={"column"}>
              <Typography mb={1}>Enter your options</Typography>
              {options.map((option, index) => (
                <Box
                  key={index}
                  display={"flex"}
                  alignItems={"center"}
                  width={"100%"}
                >
                  <TextField
                    sx={{
                      bgcolor: "backgroundColor.main",
                      width: "100%",
                      mb: 1,
                    }}
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={() => handleDeleteOption(index)}
                          disabled={options.length <= 2}
                          sx={{
                            cursor:
                              options.length <= 2 ? "not-allowed" : "pointer",
                            color:
                              options.length <= 2 ? "text.disabled" : "#dc381f",
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      ),
                      style: { color: "#fff" },
                    }}
                  />
                </Box>
              ))}
              {options.length < 5 && (
                <Button onClick={handleAddOption}>Add More options</Button>
              )}
            </Box>
          </Box>
          <TextField
            placeholder="Poll Duration (Days)"
            value={duration}
            onChange={handleDurationChange}
            fullWidth
            type="number"
            sx={{
              mb: 1,
              "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                {
                  display: "none",
                },
              "& input[type=number]": {
                bgcolor: "backgroundColor.main",
                width: "100%",
              },
            }}
            InputProps={{
              style: { color: "white" },
            }}
          />

          <Button
            fullWidth
            onClick={handleClick}
            disabled={isButtonDisabled}
            sx={{
              backgroundColor: isButtonDisabled ? "gray" : "primary.main",
              color: isButtonDisabled ? "textColor.main" : "#000",
              color: "textColor.main",
              padding: "10px",
              cursor: isButtonDisabled ? "not-allowed" : "pointer",
              //   borderRadius: "15px",
              ":hover": {
                backgroundColor: isButtonDisabled
                  ? "text.disabled"
                  : "primary.main",
              },
            }}
          >
            Upload
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default CreatePollModal;
