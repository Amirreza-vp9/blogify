import React from "react";
import { List, ListItem, Typography, FormLabel, Box } from "@mui/material";
import { useQuery } from "react-query";
import axios from "axios";

const Comments = ({ id }) => {
  const { data, isLoading, refetch } = useQuery({
    queryFn: () => axios.get(`http://localhost:4000/comment/by-blog/${id}`),
  });

  if (isLoading) return;

  refetch();

  return (
    <List
      sx={{
        width: "100%",
        background: "gray",
        padding: ".5em",
        mb: 3,
        display: "flex",
        flexDirection: "column",
        gap: "1em",
      }}
    >
      {data.data
        .slice(0)
        .reverse()
        .map((item) => {
          return (
            <ListItem
              key={data.data._id}
              sx={{
                background: "white",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  textOverflow: "initial",
                  wordWrap: "break-word",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              >
                <FormLabel>{item.user.name}</FormLabel>
                <Typography>{item.text}</Typography>
              </Box>
            </ListItem>
          );
        })}
    </List>
  );
};

export default Comments;
