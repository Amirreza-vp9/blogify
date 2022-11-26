import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import { useRouter } from "next/router";
import axios from "axios";
import { getCookie } from "cookies-next";
import Comments from "../../../components/comments";
import {
  CardMedia,
  Typography,
  FormLabel,
  Box,
  Card,
  CircularProgress,
  Paper,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import moment from "moment";
import ResponsiveAppBar from "../../../components/appBar";

const SingleBlogPanel = () => {
  const token = getCookie("ut");
  const router = useRouter();
  const id = router.query?.id;
  const [delStatus, setDelStatus] = useState(false);

  const { status, fetchStatus, data } = useQuery({
    queryKey: ["data", id],
    queryFn: () => axios.get(`http://localhost:4000/blog/single-blog/${id}`),
    enabled: !!id,
  });

  const customConfig = {
    headers: {
      "Content-Type": "application/json",
      auth: `ut ${token}`,
    },
  };
  const blogId = JSON.stringify({ blogId: id });
  const mutation = useMutation({
    mutationFn: async () =>
      await axios.post(
        "http://localhost:4000/blog/delete",
        blogId,
        customConfig
      ),
    onSuccess: () => {
      router.push("/dashboard/myBlogs");
    },
  });

  const deleteBtn = () => {
    setDelStatus(true);
  };

  if (status !== "success")
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <CircularProgress />
      </Box>
    );

  const blog = data.data;

  return (
    <>
      <ResponsiveAppBar />
      <Card
        sx={{
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
        }}
        className="font"
        square={true}
      >
        <CardMedia
          component="img"
          className="h-[20em]"
          image={blog.imgurl}
          onError={(e) => (e.target.src = "../../images/library.jpeg")}
        />
        <Paper
          sx={{
            padding: "1em",
            backgroundColor: "white",
            width: "95%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
          elevation={5}
          className="font"
        >
          <Box sx={{ display: "flex", gap: "1em" }}>
            <Box>
              <FormLabel
                className="font"
                sx={{
                  fontSize: "1.25em",
                  fontWeight: "bold",
                }}
              >
                Title
              </FormLabel>
              <Typography
                component={"p"}
                sx={{
                  fontSize: "1.25em",
                  textOverflow: "initial",
                  wordWrap: "break-word",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              >
                {blog.title}
              </Typography>
            </Box>
            <FormLabel sx={{ fontSize: "1.25em", fontWeight: "bold" }}>
              Score:
            </FormLabel>
            <Typography
              component={"p"}
              sx={{ fontSize: "1.25em", ml: "-.5em" }}
            >
              {blog.averageScore.toFixed(2)}
            </Typography>
          </Box>
          <Box sx={{ mr: "auto", width: "100%" }}>
            <FormLabel sx={{ fontSize: "1.25em", fontWeight: "bold" }}>
              Content
            </FormLabel>
            <Typography
              component={"p"}
              sx={{
                fontSize: "1.25em",
                textOverflow: "initial",
                wordWrap: "break-word",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {blog.content.replace(/<[^>]+>/g, "")}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: "1em", ml: "auto" }}>
            <Box sx={{ display: "flex", gap: ".5em" }}>
              <FormLabel sx={{ fontSize: ".75em", fontWeight: "bold" }}>
                Created At
              </FormLabel>
              <Typography component={"p"} sx={{ fontSize: ".75em" }}>
                {moment(blog.createdAt).utc().format("YYYY-MM-DD")}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: ".5em" }}>
              <FormLabel sx={{ fontSize: ".75em", fontWeight: "bold" }}>
                Updated At
              </FormLabel>
              <Typography component={"p"} sx={{ fontSize: ".75em" }}>
                {moment(blog.updatedAt).utc().format("YYYY-MM-DD")}
              </Typography>
            </Box>
          </Box>
        </Paper>
        <Box
          sx={{
            display: "flex",
            gap: "2em",
            mt: "1em",
            mb: "1em",
          }}
        >
          <Button
            onClick={() => router.push(`/dashboard/${id}`)}
            variant="contained"
            className="text-blue-600 hover:text-white"
          >
            Edit
          </Button>
          <Button
            onClick={deleteBtn}
            variant="contained"
            className="text-blue-600 hover:text-white"
          >
            Delete
          </Button>
        </Box>
        {delStatus && (
          <Snackbar open={delStatus} onClose={() => setDelStatus(false)}>
            <Alert
              onClose={() => setDelStatus(false)}
              severity="info"
              sx={{ width: "100%" }}
            >
              <Typography component={"p"}>
                Are you sure to delete this blog ?
              </Typography>
              <Button
                variant="contained"
                className="text-blue-600 hover:text-white"
                onClick={() => mutation.mutate()}
              >
                yes
              </Button>
            </Alert>
          </Snackbar>
        )}
        <Comments id={blog._id} />
      </Card>
    </>
  );
};

export default SingleBlogPanel;
