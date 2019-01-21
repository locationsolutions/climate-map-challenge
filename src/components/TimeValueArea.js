import React from "react";
import { array, string } from "prop-types";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const defineLabel = type => {
  switch (type) {
    case "t":
      return "degC";
    case "r_1h":
      return "mm";
    default:
      return "cm";
  }
};

const TimeValueArea = ({ data, type }) => (
  <ResponsiveContainer width="100%" height={250}>
    <AreaChart
      data={data}
      margin={{ top: 45, right: 30, left: 20, bottom: 20 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" tickFormatter={value => value.substr(0, 2)} />
      <YAxis
        label={{ value: defineLabel(type), angle: -90, position: "insideLeft" }}
      />
      <Tooltip formatter={value => value.toFixed(type === "r_1h" ? 1 : 0)} />
      <Area type="monotone" dataKey={type} stroke="#8884d8" fill="#8884d8" />
    </AreaChart>
  </ResponsiveContainer>
);

export default TimeValueArea;

TimeValueArea.propTypes = {
  data: array.isRequired,
  type: string.isRequired
};
