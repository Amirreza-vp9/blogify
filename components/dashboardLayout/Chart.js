import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { useMutation } from "react-query";
import { GetSpeceficUsersBlog } from "../../APIs/api";
import moment from "moment";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";
import Title from "./Title";

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

export default function Chart() {
  const theme = useTheme();
  const currentUser = useSelector((state) => state.currentUser.thisUser);
  const id = currentUser._id;
  const mutation = useMutation({
    mutationFn: (id) => GetSpeceficUsersBlog(id),
  });

  React.useEffect(() => {
    mutation.mutate(id);
  }, []);

  if (mutation.status !== "success") return <>loading</>;

  const data = mutation.data.map((item, i) =>
    createData(moment(item.createdAt).utc().format("YYYY-MM-DD"), i)
  );
  return (
    <React.Fragment>
      <Title>Today</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: "middle",
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              BLOGS
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
