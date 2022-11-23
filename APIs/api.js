import axios from "axios";
import { getCookie } from "cookies-next";

export async function GetAllUsers() {
  const { data } = await axios.get("http://localhost:4000/user/");
  return data;
}

export async function GetSingleUser(id) {
  const { data } = await axios.get(
    `http://localhost:4000/user/singleUser/${id}`
  );
  return data;
}

export async function GetTopWriters() {
  const { data } = await axios.get("http://localhost:4000/user/top-users");
  return data;
}

export async function GetAllBlogs() {
  const { data } = await axios.get("http://localhost:4000/blog");
  return data;
}

export async function GetSingleBlog(id) {
  const { data } = await axios.get(
    `http://localhost:4000/blog/single-blog/${id}`
  );
  return data;
}

export async function GetSpeceficUsersBlog(id) {
  const { data } = await axios.post("http://localhost:4000/blog/by-user", {
    _id: id,
  });
  return data;
}

export async function GetTopBlogs() {
  const { data } = await axios.get("http://localhost:4000/blog/top-blogs");
  return data;
}

export async function GetMyBlogs() {
  const token = getCookie("ut");
  const { data } = await axios.get("http://localhost:4000/blog/my-blogs", {
    headers: {
      "Content-Type": "application/json",
      auth: `ut ${token}`,
    },
  });
  return data;
}
