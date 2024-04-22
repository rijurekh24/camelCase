import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useState } from "react";

const PollRadio = (props) => {
  return (
    <Radio
      sx={{ color: "text.secondary" }}
      checkedIcon={<CheckCircleIcon />}
      icon={<RadioButtonUncheckedIcon style={{ color: "#fff" }} />}
      {...props}
    />
  );
};

const Poll = (props) => {
  const options = ["option 1", "option 2", "option 3"];
  const participants = [
    {
      name: "Arnab Chatterjee",
      img: "http://res.cloudinary.com/dc1xi4aeb/image/upload/v1711487442/kgy6byipnifdvcsvmyde.jpg",
      voted: 0,
    },
    {
      name: "Rijurekh Ghosh ",
      img: "http://res.cloudinary.com/dc1xi4aeb/image/upload/v1711562335/mim7zjylcbsxjwg1loxx.jpg",
      voted: 1,
    },
    {
      name: "Shiman dey",
      img: "http://res.cloudinary.com/dc1xi4aeb/image/upload/v1711570828/rzzda74agczeyhdhpoxb.jpg",
      voted: 1,
    },
    {
      name: "Aritra Bose",
      img: "http://res.cloudinary.com/dc1xi4aeb/image/upload/v1711316016/cg8nljdzbutpmcs1tdbd.jpg",
      voted: 2,
    },
  ];

  const [open, setOpen] = useState(false);

  return (
    <Box
      p={2}
      boxShadow={"0 4px 9px -2px #0002"}
      bgcolor={"#0d1117"}
      color={"textColor.main"}
      position={"relative"}
      overflow={"hidden"}
      maxHeight={"16rem"}
    >
      <Box
        width={"100%"}
        sx={{ transition: "0.3s ease-out" }}
        position={"absolute"}
        height={"100%"}
        overflow={"auto"}
        top={0}
        left={0}
        ml={open ? "0" : "-100%"}
        bgcolor={"primary.light"}
        color={"textColor.main"}
        zIndex={99}
      >
        <Stack p={2} gap={2} mt={3}>
          {participants.map((p, i) => (
            <Box key={i} display={"flex"} gap={1} alignItems={"center"}>
              <Avatar
                key={i}
                alt={p.name}
                sx={{ height: 27, width: 27 }}
                src={p.img}
              />
              <Typography fontSize={"0.9rem"}>
                <span style={{ fontWeight: 500 }}>{p.name}</span> voted for{" "}
                {options[p.voted]}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>

      {open && (
        <Box
          display={"flex"}
          justifyContent={"right"}
          p={1}
          position={"absolute"}
          overflow={"auto"}
          top={0}
          right={"1rem"}
          zIndex={200}
          color={"textColor.main"}
        >
          <IconButton size="small" onClick={() => setOpen(false)}>
            <ChevronLeftIcon sx={{ color: "#fff" }} />
          </IconButton>
        </Box>
      )}

      <Typography fontWeight={600} fontSize={"1.1rem"} color={"textColor.main"}>
        {props.question}
      </Typography>

      <RadioGroup sx={{ mt: 1 }}>
        {props.options.map((opt, idx) => (
          <FormControlLabel
            key={idx}
            value={opt.option}
            control={<PollRadio />}
            label={opt.option}
            componentsProps={{
              typography: {
                sx: { color: "#fff", fontWeight: 400 },
              },
            }}
          />
        ))}
      </RadioGroup>

      <Box display={"flex"} gap={1} alignItems={"center"} mt={2}>
        <Typography fontSize={"0.9rem"} color={"textColor.main"}>
          Total Votes: {participants.length}
        </Typography>
        <FiberManualRecordIcon
          sx={{ fontSize: "5px", color: "text.disabled" }}
        />

        <Typography fontSize={"0.9rem"} color={"textColor.main"}>
          5d Left
        </Typography>

        <Button variant="contained" sx={{ ml: "auto" }}>
          Vote
        </Button>
      </Box>
    </Box>
  );
};

export default Poll;
