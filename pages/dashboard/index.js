import React, { useEffect, useState } from "react";
import Dashboard from "../../components/dashboardLayout/Dashboard";
import { getCookie } from "cookies-next";
import { Box } from "@mui/system";
import { Card, Typography } from "@mui/material";
import Link from "next/link";

const DashboardLayout = () => {
  const token = getCookie("ut");
  const [status, setStatus] = useState(false);
  useEffect(() => {
    if (token) return setStatus(true);
  }, []);
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
      <Dashboard />
    </>
  );
};

export default DashboardLayout;
