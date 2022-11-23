import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../../React/blogtor/src/blogSlicer";
import { getCookie } from "cookies-next";
import { useMutation } from "react-query";
import axios from "axios";
import store from "../../../React/blogtor/src/store";
import { Provider } from "react-redux";

export default function Layout({ children }) {
  const dispatch = useDispatch();
  const token = getCookie("ut");

  const mutation = useMutation({
    mutationFn: async () => {
      return await axios.post(
        "http://localhost:4000/user/me",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            auth: `ut ${token}`,
          },
        }
      );
    },
    onSuccess: (res) => {
      dispatch(setCurrentUser(res.data));
    },
    onError: (err) => {
      console.log(err);
    },
  });

  useEffect(() => {
    mutation.mutate();
  }, []);

  return (
    <>
      <Provider store={store}>
        <main>{children}</main>
      </Provider>
    </>
  );
}
