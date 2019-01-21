import React, { useState } from "react";
import { defaultType } from "../var";

const Form = ({ submit }) => {
  const [type, setType] = useState(defaultType);

  const handleChange = e => {
    submit(e.target.value);
    setType(e.target.value);
  };

  return (
    <select value={type} onChange={handleChange}>
      <option value="t">Temperature</option>
      <option value="snowdepth">Snowdepth</option>
      <option value="r_1h">Precipitation</option>
    </select>
  );
};

export default Form;
