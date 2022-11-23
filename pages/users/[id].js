import React, { useEffect } from "react";
import { useQuery, dehydrate, QueryClient, useMutation } from "react-query";
import {
  GetSingleUser,
  GetAllUsers,
  GetSpeceficUsersBlog,
} from "../../APIs/api";
import { useRouter } from "next/router";
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

export async function getStaticProps({ params }) {
  const queryClient = new QueryClient();
  const { id } = params;
  await queryClient.prefetchQuery(["data"], GetSingleUser(id));
  await queryClient.prefetchQuery(["data"], GetSpeceficUsersBlog(id));
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export async function getStaticPaths() {
  const data = await GetAllUsers();
  const paths = data.map((user) => {
    return {
      params: {
        id: user._id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

const SingleUser = () => {
  const router = useRouter();
  const id = router.query.id;
  const { data, isLoading } = useQuery({
    queryKey: ["data"],
    queryFn: () => GetSingleUser(id),
  });
  const mutation = useMutation({
    mutationFn: (id) => GetSpeceficUsersBlog(id),
  });

  useEffect(() => {
    mutation.mutate(id);
  }, []);

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
  if (mutation.isLoading)
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
  const user = data;
  const blogs = mutation.data;

  return (
    <Card
      sx={{
        backgroundColor: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: { md: "calc(100% - 9em)", sm: "calc(100% - 9em)", xs: "100%" },
      }}
      className="font"
      square={true}
    >
      <CardMedia
        component="img"
        className="h-[7em]"
        image={"../images/seacup.jpg"}
      />
      <img
        src={"http://localhost:4000/" + user.avatar}
        onError={(e) => (e.target.src = "../images/unknown.jpg")}
        className="h-[6.5em] w-[6.5em] rounded-full mt-[-6.75em] mb-[1em] mr-auto ml-[.5em]"
      />
      <Paper
        sx={{
          padding: "1em",
          backgroundColor: "white",
          width: { md: "60%", sm: "80%", xs: "100%" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          mr: "auto",
          ml: "1em",
        }}
        elevation={5}
        className="font"
      >
        <Box sx={{ display: "flex", gap: "1em" }}>
          <Box>
            <FormLabel
              className="font"
              sx={{ fontSize: "1.25em", fontWeight: "bold" }}
            >
              Username
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
              {user.username}
            </Typography>
          </Box>
          <Box>
            <FormLabel
              className="font"
              sx={{ fontSize: "1.25em", fontWeight: "bold" }}
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
              {user.name}
            </Typography>
          </Box>
          <FormLabel sx={{ fontSize: "1.25em", fontWeight: "bold" }}>
            Score:
          </FormLabel>
          <Typography component={"p"} sx={{ fontSize: "1.25em", ml: "-.5em" }}>
            {user.averageScore.toFixed(2)}
          </Typography>
        </Box>
        <Box sx={{ mr: "auto", width: "100%" }}>
          <FormLabel sx={{ fontSize: "1.25em", fontWeight: "bold" }}>
            Bio
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
            {user.bio}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: "1em", ml: "auto" }}>
          <Box sx={{ display: "flex", gap: ".5em" }}>
            <FormLabel sx={{ fontSize: ".75em", fontWeight: "bold" }}>
              Created At
            </FormLabel>
            <Typography component={"p"} sx={{ fontSize: ".75em" }}>
              {moment(user.createdAt).utc().format("YYYY-MM-DD")}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: ".5em" }}>
            <FormLabel sx={{ fontSize: ".75em", fontWeight: "bold" }}>
              Updated At
            </FormLabel>
            <Typography component={"p"} sx={{ fontSize: ".75em" }}>
              {moment(user.updatedAt).utc().format("YYYY-MM-DD")}
            </Typography>
          </Box>
        </Box>
      </Paper>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "1em",
          padding: ".5em",
        }}
      >
        {blogs.map((blog) => {
          return (
            <Card sx={{ width: 270 }} key={blog._id}>
              <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={blog.imgurl}
                onError={(e) => (e.target.src = "../images/books.jpeg")}
              />
              <CardContent sx={{ width: 270 }}>
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
                  {blog.title}
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
                  {
                    blog.content
                      .split("<p>")
                      .toString()
                      .split("</p>")
                      .toString()
                      .split(",")[1]
                  }
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  onClick={() => router.push(`/blogs/${blog._id}`)}
                  className="font"
                  size="small"
                >
                  Learn More
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </Box>
    </Card>
  );
};

export default SingleUser;
