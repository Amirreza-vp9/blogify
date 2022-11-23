import React from "react";
import { useQuery, dehydrate, QueryClient } from "react-query";
import { GetTopBlogs } from "../../../APIs/api";
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
import { useRouter } from "next/router";

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["data"], GetTopBlogs());
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const TopUsers = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["data"],
    queryFn: GetTopBlogs,
  });
  const router = useRouter();

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

  return (
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
          paddingRight: { lg: "0", md: "8em", sm: "8em", xs: "0" },
        }}
      >
        {data.map((blog) => {
          return (
            <Card
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
              onClick={() => router.push(`/blogs/${blog._id}`)}
              key={blog._id}
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
                  sx={{
                    fontWeight: "bold",
                  }}
                  className="font"
                >
                  Title
                </Typography>
                <Typography
                  className="font"
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
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
  );
};

export default TopUsers;
