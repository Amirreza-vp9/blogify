import React, { useEffect, useState } from "react";
import ResponsiveAppBar from "../../../components/appBar";
import { useQuery, dehydrate, QueryClient } from "react-query";
import { GetMyBlogs } from "../../../APIs/api";
import { useRouter } from "next/router";
import {
  Container,
  Grid,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Link from "next/link";
import { getCookie } from "cookies-next";

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["data"], GetMyBlogs);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const myBlogs = () => {
  const title = "MY BLOGS";
  const token = getCookie("ut");
  const { data, isLoading } = useQuery({
    queryKey: ["data"],
    queryFn: GetMyBlogs,
  });
  const router = useRouter();
  const [status, setStatus] = useState(false);
  useEffect(() => {
    if (token) return setStatus(true);
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

  console.log(data);

  if (!status)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <Card
          sx={{
            height: "15em",
            width: "15em",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "5em",
            flexDirection: "column",
          }}
        >
          <Typography varient={"h3"} component={"h3"} color="secondary">
            You need to login
          </Typography>
          <Box sx={{ display: "flex", gap: "1em" }}>
            <Link className="hover:text-blue-700 text-blue-600" href={"/"}>
              Back to home
            </Link>
            <Link className="hover:text-blue-700 text-blue-600" href={"/login"}>
              Login
            </Link>
          </Box>
        </Card>
      </Box>
    );

  return (
    <>
      <ResponsiveAppBar title={title} />
      <Container
        sx={{
          padding: "1em",
        }}
      >
        <Grid
          container
          className="font"
          gap="1em"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {data.map((blog) => {
            return (
              <Card
                key={blog._id}
                sx={{
                  width: 200,
                  p: 2,
                  backgroundColor: "#242424",
                  color: "whitesmoke",
                  border: "4px outset whitesmoke",
                  transition: ".25s",
                  "&:hover": {
                    transform: "scale(1.06)",
                    opacity: ".9",
                  },
                  cursor: "pointer",
                }}
                onClick={() => router.push(`/dashboard/myBlogs/${blog._id}`)}
              >
                <CardMedia
                  component="img"
                  className="bg-gray-900 w-[10em] h-[10em]"
                  image={blog.imgurl}
                  onError={(e) => (e.target.src = "../images/books.jpeg")}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "bold" }}
                    className="font"
                  >
                    Title
                  </Typography>
                  <Typography
                    className="font"
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    }}
                  >
                    {blog.title}
                  </Typography>
                  <Typography
                    className="font"
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "bold" }}
                  >
                    Score
                  </Typography>
                  <Typography className="font" variant="body2">
                    {blog.averageScore.toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </Grid>
      </Container>
    </>
  );
};

export default myBlogs;
