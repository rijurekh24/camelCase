import {
  Box,
  Button,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
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

  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [open, setOpen] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [totalVotes, setTotalVotes] = useState(0);
  const [highestPercentageIndex, setHighestPercentageIndex] = useState(null);

  useEffect(() => {
    if (
      props.poll &&
      props.poll.voters &&
      props.poll.voters.hasOwnProperty(ctx.user._id)
    ) {
      setHasVoted(true);
      setSelectedOptionIndex(props.poll.voters[ctx.user._id]);
    }

    const votesCount = props.options.reduce(
      (total, option) => total + option.votes,
      0
    );
    setTotalVotes(votesCount);

    let maxPercentage = 0;
    let highestIndex = null;
    let multipleHighest = false;
    props.options.forEach((opt, idx) => {
      const percentage = (opt.votes / totalVotes) * 100;
      if (percentage > maxPercentage) {
        maxPercentage = percentage;
        highestIndex = idx;
        multipleHighest = false;
      } else if (percentage === maxPercentage) {
        multipleHighest = true;
      }
    });
    setHighestPercentageIndex(multipleHighest ? null : highestIndex);
  }, [props.poll, ctx.user._id, props.options, totalVotes]);

  const handleOptionChange = (event) => {
    setSelectedOptionIndex(parseInt(event.target.value));
  };

  const handleVote = () => {
    Api.post("/posts/vote-poll/", {
      option: selectedOptionIndex,
      user: ctx.user._id,
      poll: props.pollId,
    }).then((res) => {
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
          {props.options?.map((opt, idx) => (
            <Box display={"flex"} gap={1} width={"100%"} my={2} key={idx}>
              <Typography width={50}>
                {Math.floor((opt.votes / totalVotes) * 100)}%
              </Typography>
              <Box width={"80%"}>
                <Typography mb={1}>
                  {opt.option}{" "}
                  {hasVoted && selectedOptionIndex === idx && (
                    <i class="fa-solid fa-circle-check"></i>
                  )}
                </Typography>
                <Box
                  width={`${(opt.votes / totalVotes) * 100}%`}
                  height={"0.5rem"}
                  borderRadius={"15px"}
                  bgcolor={
                    idx === highestPercentageIndex ? "#7090e8" : "#27ae60"
                  }
                ></Box>
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
