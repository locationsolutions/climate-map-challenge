import React from "react";
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

const DateValue = ({ data, type }) => {
  return (
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
        <YAxis dataKey="date" type="category" />
        <Tooltip formatter={value => value.toFixed(type === "r_1h" ? 1 : 0)} />
        <Legend />
        <Bar dataKey="min" stackId="a" fill="#8884d8" />
        <Bar dataKey="max" stackId="a" fill="#82ca9d" />
        <Line dataKey="average" stroke="#17becf" />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default DateValue;
