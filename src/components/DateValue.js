import React from "react";
import { array, string } from "prop-types";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  Line,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

import defineLabel from "../util/defineLabel";

const DateValue = ({ data = [], type }) => (
  <ResponsiveContainer width="100%" height={350}>
    <ComposedChart
      layout="vertical"
      width={600}
      height={400}
      data={data}
      margin={{ top: 30, right: 30, bottom: 20, left: 20 }}
    >
      <CartesianGrid stroke="#f5f5f5" />
      <XAxis type="number" />
      <YAxis
        dataKey="date"
        type="category"
        label={{
          value: "Day",
          angle: -90,
          position: "insideLeft"
        }}
      />
      <Tooltip
        formatter={value =>
          `${value.toFixed(type === "r_1h" ? 1 : 0)} ${defineLabel(type).unit}`
        }
      />
      <Legend />
      <Bar dataKey="min" stackId="a" fill="#8884d8" />
      <Bar dataKey="max" stackId="a" fill="#82ca9d" />
      <Line dataKey="average" stroke="#17becf" />
    </ComposedChart>
  </ResponsiveContainer>
);

export default DateValue;

DateValue.propTypes = {
  data: array,
  type: string.isRequired
};
