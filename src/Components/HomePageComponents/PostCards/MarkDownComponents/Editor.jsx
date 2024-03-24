import React from "react";
import MDEditor, { selectWord } from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { Box } from "@mui/material";

const Editor = ({ value, setValue }) => {
  return (
    <Box height={"100%"} width={"100%"}>
      <MDEditor
        height={"100%"}
        value={value}
        onChange={setValue}
        visibleDragbar={false}
      />
    </Box>
  );
};

export default Editor;
