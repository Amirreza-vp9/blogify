import React, { useState, useEffect } from "react";
import {
  Input,
  Card,
  Box,
  CardMedia,
  CardContent,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import ResponsiveAppBar from "../../components/appBar";
import { useSelector } from "react-redux";
import { useMutation } from "react-query";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import Link from "next/link";

const UpdateProfile = () => {
  const [userInfo, setUserInfo] = useState({ name: "", bio: "" });
  const [file, setFile] = useState("");
  const token = getCookie("ut");
  const router = useRouter();
  let title = "UPDATE PROFILE";
  const currentUser = useSelector((state) => state.currentUser.thisUser);

  const customConfig = {
    headers: {
      "Content-Type": "application/json",
      auth: `ut ${token}`,
    },
  };
  const mutation = useMutation({
    mutationFn: async (userInfo) =>
      await axios.post(
        "http://localhost:4000/user/edit",
        userInfo,
        customConfig
      ),
    onSuccess: (res) => {
      console.log(res);
      setUserInfo("");
      router.push("/dashboard");
    },
  });

  const avatarMutation = useMutation({
    mutationFn: async (formData) =>
      await axios.post(
        "http://localhost:4000/user/update-avatar",
        formData,
        customConfig
      ),
    onSuccess: (res) => {
      console.log(res);
      router.push("/dashboard");
    },
  });

  const submit = () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("avatar", file);
    mutation.mutate(userInfo);
    avatarMutation.mutate(formData);
  };

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
      {currentUser && (
        <Card sx={{ height: "100vh", width: "100vw" }}>
          <ResponsiveAppBar title={title} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "90vh",
            }}
          >
            <Card
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "2em",
              }}
            >
              <CardMedia
                component="img"
                className="w-[10em] h-[10em] rounded-full"
                image={file}
              />
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: "2em",
                }}
              >
                <Input
                  type="file"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                />
                <TextField
                  id="standard-basic"
                  label="Name"
                  variant="standard"
                  defaultValue={currentUser.name}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, name: e.target.value })
                  }
                />
                <TextField
                  id="standard-basic"
                  label="Bio"
                  variant="standard"
                  defaultValue={currentUser.bio}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, bio: e.target.value })
                  }
                />
                <Button onClick={submit} variant="outlined">
                  submit
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Card>
      )}
    </>
  );
};

export default UpdateProfile;
