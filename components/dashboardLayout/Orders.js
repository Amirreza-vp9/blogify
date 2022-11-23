import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { useSelector } from "react-redux";
import { useMutation } from "react-query";
import { GetSpeceficUsersBlog } from "../../APIs/api";
import moment from "moment";

function createData(id, date, title, score) {
  return { id, date, title, score };
}

export default function Orders() {
  const currentUser = useSelector((state) => state.currentUser.thisUser);
  const id = currentUser._id;
  const mutation = useMutation({
    mutationFn: (id) => GetSpeceficUsersBlog(id),
  });

  React.useEffect(() => {
    mutation.mutate(id);
  }, []);

  if (mutation.status !== "success") return <>loading</>;

  const rows = mutation.data.map((item, i) =>
    createData(
      item._id,
      moment(item.createdAt).utc().format("YYYY-MM-DD"),
      item.title,
      item.averageScore
    )
  );

  return (
    <React.Fragment>
      <Title>Recent Blogs</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Title</TableCell>
            <TableCell align="right">Average Rate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell align="right">{`${row.score}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
