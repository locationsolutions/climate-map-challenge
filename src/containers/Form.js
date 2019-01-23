import React, { useState } from "react";
import { defaultType } from "../var";
import { faGlobeEurope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const Button = styled.button`
  background: white;
  border: none;
  cursor: pointer;
  font-size: 1.5em;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.8;
  }
`;

const Form = ({ submit, selectedLocation, handleClick }) => {
  const [type, setType] = useState(defaultType);

  const handleChange = e => {
    submit(e.target.value);
    setType(e.target.value);
  };

  return (
    <div>
      <Button disabled={!selectedLocation} onClick={handleClick}>
        <FontAwesomeIcon icon={faGlobeEurope} />
        All Regions
      </Button>
      <select value={type} onChange={handleChange}>
        <option value="t">Temperature</option>
        <option value="snowdepth">Snowdepth</option>
        <option value="r_1h">Precipitation</option>
      </select>
    </div>
  );
};

export default Form;
