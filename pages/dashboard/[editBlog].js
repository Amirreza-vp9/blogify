import React, { useRef, useState } from "react";
import ResponsiveAppBar from "../../components/appBar";
import { Editor } from "@tinymce/tinymce-react";
import { Box, TextField, Button } from "@mui/material";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import axios from "axios";
import { getCookie } from "cookies-next";
import { GetSingleBlog } from "../../APIs/api";
import { useQuery } from "react-query";

const EditBlog = () => {
  let title = "EDIT BLOG";
  const [blogTitle, setBlogTitle] = useState("");
  const [blogimage, setBlogImage] = useState("");
  const editorRef = useRef(null);
  const token = getCookie("ut");
  const router = useRouter();
  const id = router.query.editBlog;

  const { data, isLoading } = useQuery({
    queryFn: () => GetSingleBlog(id),
  });

  const customConfig = {
    headers: {
      "Content-Type": "application/json",
      auth: `ut ${token}`,
    },
  };
  const mutation = useMutation({
    mutationFn: async () =>
      await axios.post(
        "http://localhost:4000/blog/edit",
        {
          blogId: id,
          data: {
            title: blogTitle,
            content: editorRef.current.getContent(),
            imgurl: blogimage,
          },
        },
        customConfig
      ),
    onSuccess: (res) => {
      router.push(`/dashboard/myBlogs/${id}`);
      console.log(res);
      setBlogTitle("");
      setBlogImage("");
    },
  });

  if (isLoading) return;

  const blog = data;

  const submit = () => {
    mutation.mutate();
  };

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
          defaultValue={blog.title}
          onChange={(e) => setBlogTitle(e.target.value)}
        />
        <TextField
          id="filled-basic"
          label="image url"
          variant="filled"
          sx={{ mb: 4 }}
          defaultValue={blog.imgurl}
          onChange={(e) => setBlogImage(e.target.value)}
        />
        <Editor
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue={blog.content}
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

export default EditBlog;
