import React, { useState } from "react";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import { AddBoxOutlined } from "@mui/icons-material";
import { useMutation } from "react-query";
import axios from "axios";
import { getCookie } from "cookies-next";
import Comments from "./comments";

export default function InteractiveList({ data }) {
  const [text, setText] = useState("");
  const token = getCookie("ut");

  const customConfig = {
    headers: {
      "Content-Type": "application/json",
      auth: `ut ${token}`,
    },
  };
  const mutation = useMutation({
    mutationFn: async () =>
      await axios.post(
        "http://localhost:4000/comment/submit",
        {
          text: text,
          blogId: data._id,
        },
        customConfig
      ),
  });

  const addComment = () => {
    mutation.mutate();
    setText("");
  };

  return (
    <Box sx={{ flexGrow: 1, width: "70%" }}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          gap: "1em",
        }}
      >
        <TextField
          id="filled-basic"
          label="comment"
          variant="filled"
          sx={{ minWidth: "85%" }}
          onChange={(e) => setText(e.target.value)}
        />
        <AddBoxOutlined
          color="primary"
          sx={{
            fontSize: "2em",
            cursor: "pointer",
            "&:hover": { color: "blue" },
          }}
          onClick={addComment}
        />
      </Box>
      <Comments id={data._id} />
    </Box>
  );
}
