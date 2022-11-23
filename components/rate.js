import React, { useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { getCookie } from "cookies-next";
import { Rating, Box } from "@mui/material";

const Rate = ({ id }) => {
  const [value, setValue] = useState("");
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
        "http://localhost:4000/blog/submit-rate",
        {
          blogId: id,
          score: value,
        },
        customConfig
      ),
    onSuccess: (res) => {
      console.log(res);
    },
  });

  const submitRate = () => {
    mutation.mutate();
  };

  return (
    <Box>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onClick={submitRate}
      />
    </Box>
  );
};

export default Rate;
