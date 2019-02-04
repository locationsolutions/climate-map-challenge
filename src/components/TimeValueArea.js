import React from "react";
import { string, array } from "prop-types";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import defineLabel from "../util/defineLabel";

const TimeValueArea = ({ data = [], type }) => {
  const { unit, name } = defineLabel(type);
  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart
        data={data}
        margin={{ top: 40, right: 30, left: 20, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          tickFormatter={value => value.substr(0, value.indexOf("/"))}
        />
        <YAxis
          label={{
            value: unit,
            angle: -90,
            position: "insideLeft"
          }}
        />
        <Tooltip formatter={value => value.toFixed(type === "r_1h" ? 1 : 0)} />
        <Area type="monotone" dataKey={name} stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default TimeValueArea;

TimeValueArea.propTypes = {
  data: array,
  type: string.isRequired
};
