import React, { useState, useEffect, useContext } from "react";
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
import { authContext } from "../../../../Context/AuthContext";
import Api from "../../../../Utils/api";

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
  const ctx = useContext(authContext);

  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [totalVotes, setTotalVotes] = useState(0);
  const [highestPercentageIndex, setHighestPercentageIndex] = useState(null);
  const [pollActive, setPollActive] = useState(true);
  const [daysLeft, setDaysLeft] = useState(props.poll.duration);
  const [postDate, setPostDate] = useState(props.postDate);

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

    const currentDate = new Date();
    const postDate = new Date(props.postDate);
    const daysElapsed = Math.floor(
      (currentDate - postDate) / (1000 * 60 * 60 * 24)
    );
    const daysLeft = props.poll.duration - daysElapsed;

    if (daysLeft <= 0) {
      setPollActive(false);
    }
  }, [
    props.poll,
    ctx.user._id,
    props.options,
    totalVotes,
    props.postDate,
    props.poll.duration,
  ]);

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
      {/* if poll is not active */}
      {!pollActive && (
        <>
          <Typography
            fontWeight={600}
            fontSize={"1.1rem"}
            color={"textColor.main"}
          >
            Question: {props.question}
          </Typography>
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
          <Box display={"flex"} gap={1} alignItems={"center"} mt={2}>
            <Typography fontSize={"0.9rem"} color={"textColor.main"}>
              Total Votes: {totalVotes}
            </Typography>
            <>
              {/* <FiberManualRecordIcon
                sx={{ fontSize: "5px", color: "textColor.main" }}
              /> */}
              <Typography
                fontSize={"0.9rem"}
                color={"red"}
                ml={"auto"}
                fontWeight={"bold"}
              >
                Final Result
              </Typography>
            </>
          </Box>
        </>
      )}

      {/* if poll is active */}
      {pollActive && (
        <>
          <Typography
            fontWeight={600}
            fontSize={"1.1rem"}
            color={"textColor.main"}
          >
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
            {!hasVoted && (
              <>
                <FiberManualRecordIcon
                  sx={{ fontSize: "5px", color: "textColor.main" }}
                />
                <Typography fontSize={"0.9rem"} color={"textColor.main"}>
                  {daysLeft} {daysLeft == 1 ? "day left" : "days left"}
                </Typography>
              </>
            )}
            {!hasVoted && (
              <Button
                variant="contained"
                sx={{ ml: "auto" }}
                onClick={handleVote}
              >
                Vote
              </Button>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default Poll;
