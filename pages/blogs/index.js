import React from "react";
import { Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";

const Blogs = () => {
  const router = useRouter();
  return (
    <Grid
      container
      position={"absolute"}
      justifyContent="center"
      alignItems="center"
      height={"100vh"}
      width="100vw"
      sx={{
        paddingRight: { sm: "4.5em" },
        color: "whitesmoke",
        fontSize: "2em",
      }}
      className="font"
    >
      <Grid
        item
        xs
        display={"flex"}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundImage: 'url("../images/library.jpeg")',
          backgroundSize: "cover",
          textAlign: "center",
          transition: ".5s",
          "&:hover": {
            opacity: ".7",
          },
          cursor: "pointer",
        }}
        onClick={() => router.push("/blogs/allBlogs")}
      >
        <Typography
          sx={{ fontSize: "2rem", fontWeight: "bold" }}
          component={"h3"}
        >
          ALL BLOGS
        </Typography>
      </Grid>
      <Grid
        item
        xs
        display={"flex"}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundImage: 'url("../images/thebook.jpeg")',
          backgroundPosition: "50%",
          textAlign: "center",
          backgroundSize: "cover",
          transition: ".5s",
          "&:hover": {
            opacity: ".7",
          },
          cursor: "pointer",
        }}
        onClick={() => router.push("/blogs/topBlogs")}
      >
        <Typography
          sx={{ fontSize: "2rem", fontWeight: "bold" }}
          component={"h3"}
        >
          TOP BLOGS
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Blogs;
