import {
  Avatar,
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
import { useContext, useEffect, useState } from "react";
import Api from "../../../../Utils/api";
import { authContext } from "../../../../Context/AuthContext";

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
  const options = props.options.map((opt) => opt.option);
  const [pollSelectedData, setPollSelectedData] = useState();
  const ctx = useContext(authContext);

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

  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [open, setOpen] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    if (props.poll && props.poll.voters.includes(ctx.user._id)) {
      setHasVoted(true);
    }
    // Calculate total votes
    const votesCount = props.options.reduce(
      (total, option) => total + option.votes,
      0
    );
    setTotalVotes(votesCount);
  }, [props.poll, ctx.user._id, props.options]);

  const handleOptionChange = (event) => {
    setSelectedOptionIndex(parseInt(event.target.value));
  };

  const handleVote = () => {
    Api.post("/posts/vote-poll/", {
      option: selectedOptionIndex,
      user: ctx.user._id,
      poll: props.pollId,
    }).then((res) => {
      console.log(res.data);
      setPollSelectedData(res.data.option);
      ctx.fetchPost();
      setHasVoted(true);
    });
  };

  return (
    <Box
      p={2}
      boxShadow={"0 4px 9px -2px #0002"}
      bgcolor={"#0d1117"}
      color={"textColor.main"}
      position={"relative"}
      overflow={"hidden"}
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
        Question: {props.question}
      </Typography>

      {!hasVoted ? (
        <RadioGroup
          sx={{ mt: 1 }}
          value={selectedOptionIndex}
          onChange={handleOptionChange}
        >
          {props.options.map((opt, idx) => (
            <FormControlLabel
              key={idx}
              value={idx}
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
      ) : (
        <Box>
          {props.options.map((opt, idx) => (
            <Box display={"flex"} gap={2} width={"100%"} my={1} key={idx}>
              <Box width={50} height={50}>
                <Typography>
                  {Math.floor((opt.votes / totalVotes) * 100)}%
                </Typography>
              </Box>
              <Box width={"70%"}>
                <Typography mb={1}>{opt.option}</Typography>
                {(opt.votes / totalVotes) * 100 != 0 ? (
                  <Box
                    width={`${(opt.votes / totalVotes) * 100}%`}
                    height={"0.5rem"}
                    bgcolor={"green"}
                    borderRadius={"15px"}
                  ></Box>
                ) : null}
              </Box>
            </Box>
          ))}
        </Box>
      )}

      <Box display={"flex"} gap={1} alignItems={"center"} mt={2}>
        <Typography fontSize={"0.9rem"} color={"textColor.main"}>
          Total Votes: {totalVotes}
        </Typography>
        <FiberManualRecordIcon
          sx={{ fontSize: "5px", color: "text.disabled" }}
        />
        {!hasVoted && (
          <Button variant="contained" sx={{ ml: "auto" }} onClick={handleVote}>
            Vote
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Poll;
