import { Box } from "@mui/material";
import React from "react";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

const TextArea = () => {
  const [input, setInput] = React.useState("");
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      p={1}
      gap={1}
      height={"100%"}
    >
      <Box flex={"1"} height={"100%"} width={"100%"}>
        <textarea
          placeholder="write your markdown code here..."
          autoFocus
          style={{
            height: "100%",
            width: "100%",
            outline: "none",
            backgroundColor: "#0D1117",
            border: "none",
            color: "#eee",
          }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </Box>
      <Box
        flex={"1"}
        height={"100%"}
        width={"100%"}
        bgcolor={"#11151c"}
        color={"textColor.main"}
        fontFamily={"roboto"}
        overflow={"auto"}
      >
        <Box padding={2}>
          <ReactMarkdown
            source={input}
            renderers={{
              code: SyntaxHighlighter,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default TextArea;
