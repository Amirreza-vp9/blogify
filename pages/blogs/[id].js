import React from "react";
import { useQuery, dehydrate, QueryClient } from "react-query";
import { GetSingleBlog, GetAllBlogs } from "../../APIs/api";
import { useRouter } from "next/router";
import InteractiveList from "../../components/comment";
import Rate from "../../components/rate";
import {
  CardMedia,
  Typography,
  FormLabel,
  Box,
  Card,
  CircularProgress,
  Paper,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import moment from "moment";
import { useSelector } from "react-redux";

export async function getStaticProps({ params }) {
  const queryClient = new QueryClient();
  const { id } = params;
  await queryClient.prefetchQuery(["posts"], GetSingleBlog(id));
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export async function getStaticPaths() {
  const data = await GetAllBlogs();
  const paths = data.map((blog) => {
    return {
      params: {
        id: blog._id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

const SingleBlog = () => {
  const router = useRouter();
  const id = router.query.id;
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["data"],
    queryFn: () => GetSingleBlog(id),
  });
  const currentUser = useSelector((state) => state.currentUser.thisUser);
  if (isLoading)
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

  const blog = data;

  refetch();

  return (
    <>
      {currentUser && (
        <Card
          sx={{
            backgroundColor: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: {
              md: "calc(100% - 9em)",
              sm: "calc(100% - 9em)",
              xs: "100%",
            },
          }}
          className="font"
          square={true}
        >
          <CardMedia
            component="img"
            className="h-[20em]"
            image={blog.imgurl}
            onError={(e) => (e.target.src = "../images/library.jpeg")}
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
              <Box>
                <FormLabel
                  className="font"
                  sx={{
                    fontSize: "1.25em",
                    fontWeight: "bold",
                  }}
                >
                  Name
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
                {
                  blog.content
                    .split("<p>")
                    .toString()
                    .split("</p>")
                    .toString()
                    .split(",")[1]
                }
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: "1em", ml: "auto" }}>
              <Rate id={blog._id} />
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
          <Box>
            <Card
              sx={{
                Width: 200,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                mt: 2,
                mb: 2,
              }}
            >
              <CardMedia
                component="img"
                alt="green iguana"
                className="h-[5em] w-[5em] rounded-full"
                image={"http://localhost:4000/" + blog.creator.avatar}
                onError={(e) => (e.target.src = "../images/unknown.jpg")}
              />
              <CardContent sx={{ width: 250 }}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  className="font"
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {blog.creator.username}
                </Typography>
                <Typography
                  className="font"
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {blog.creator.bio}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  onClick={() => router.push(`/users/${blog.creator._id}`)}
                  className="font"
                  size="small"
                >
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Box>
          <InteractiveList data={blog} />
        </Card>
      )}
    </>
  );
};

export default SingleBlog;
