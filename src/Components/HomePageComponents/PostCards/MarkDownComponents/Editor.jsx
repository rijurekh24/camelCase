import React from "react";
import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { Box } from "@mui/material";
import rehypeSanitize from "rehype-sanitize";

const Editor = ({ value, setValue }) => {
  return (
    <Box height={"100%"} width={"100%"} data-color-mode="dark">
      <MDEditor
        height={"100%"}
        value={value}
        onChange={setValue}
        visibleDragbar={false}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
      />
    </Box>
  );
};

export default Editor;
