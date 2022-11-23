import React from "react";
import { Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";

const Users = () => {
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
          textAlign: "center",
          height: "100vh",
          backgroundImage: 'url("../images/writers.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "50%",
          transition: ".5s",
          "&:hover": {
            opacity: ".7",
          },
          cursor: "pointer",
        }}
        onClick={() => router.push("/users/allUsers")}
      >
        <Typography
          sx={{ fontSize: "2rem", fontWeight: "bold" }}
          component={"h3"}
        >
          ALL WRITERS
        </Typography>
      </Grid>
      <Grid
        item
        xs
        display={"flex"}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          height: "100vh",
          backgroundImage: 'url("../images/topWriters.jpg")',
          backgroundSize: "cover",
          transition: ".5s",
          "&:hover": {
            opacity: ".7",
          },
          cursor: "pointer",
        }}
        onClick={() => router.push("/users/topUsers")}
      >
        <Typography
          sx={{ fontSize: "2rem", fontWeight: "bold" }}
          component={"h3"}
        >
          TOP WRITERS
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Users;
