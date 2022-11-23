import React, { useRef, useState, useEffect } from "react";
import ResponsiveAppBar from "../../components/appBar";
import { Editor } from "@tinymce/tinymce-react";
import { Box, TextField, Button, Card, Typography } from "@mui/material";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import axios from "axios";
import { getCookie } from "cookies-next";
import Link from "next/link";

const CreateBlog = () => {
  let title = "CREATE BLOG";
  const [blogTitle, setBlogTitle] = useState("");
  const [blogimage, setBlogImage] = useState("");
  const editorRef = useRef(null);
  const token = getCookie("ut");
  const router = useRouter();

  const customConfig = {
    headers: {
      "Content-Type": "application/json",
      auth: `ut ${token}`,
    },
  };
  const mutation = useMutation({
    mutationFn: async () =>
      await axios.post(
        "http://localhost:4000/blog/write",
        {
          title: blogTitle,
          content: editorRef.current.getContent(),
          imgurl: blogimage,
        },
        customConfig
      ),
    onSuccess: (res) => {
      router.push(`/dashboard/myBlogs/${res.data._id}`);
      console.log(res);
      setBlogTitle("");
      setBlogImage("");
    },
  });

  const submit = () => {
    if (
      blogTitle === "" ||
      blogimage === "" ||
      editorRef.current.getContent() === ""
    ) {
      alert("Please enter all fields");
    } else {
      mutation.mutate();
    }
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
      <ResponsiveAppBar title={title} />
      <Box
        sx={{
          textAlign: "center",
          height: "100vh",
          p: 4,
          backgroundColor: "whitesmoke",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          sx={{ mb: 4 }}
          onChange={(e) => setBlogTitle(e.target.value)}
        />
        <TextField
          id="filled-basic"
          label="image url"
          variant="filled"
          sx={{ mb: 4 }}
          onChange={(e) => setBlogImage(e.target.value)}
        />
        <Editor
          onInit={(evt, editor) => (editorRef.current = editor)}
          init={{
            toolbar:
              "undo redo | formatselect | " +
              "bold italic backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body {font-family:Helvetica,Arial,sans-serif; font-size:14px;}",
          }}
        />
        <Button onClick={submit} variant="outlined" sx={{ mt: 4 }}>
          submit
        </Button>
      </Box>
    </>
  );
};

export default CreateBlog;
