import React, { useState, useEffect } from "react";
import { number, arrayOf, oneOfType, object, shape, string } from "prop-types";
import styled from "styled-components";

import TimeValueArea from "../components/TimeValueArea";
import DateValue from "../components/DateValue";
import Form from "./Form";
import Info from "../components/Info";

import handleChartSetter from "../util/handleChartSetter";

function Sidebar({
  selectedLocation,
  observeLocations,
  className,
  clearSelectedLocation
}) {
  const [chartData, setChartData] = useState({
    data: [],
    composedData: [],
    selectedLocInfo: {},
    type: ""
  });

  useEffect(
    () => {
      const { type } = chartData;
      handleChartSetter(observeLocations, selectedLocation, type, setChartData);
    },
    [observeLocations, selectedLocation]
  );

  const handleType = type =>
    handleChartSetter(observeLocations, selectedLocation, type, setChartData);

  const reset = () => clearSelectedLocation();

  const { data, composedData, type, selectedLocInfo } = chartData;

  return (
    <div className={className}>
      <Form
        submit={handleType}
        selectedLocation={selectedLocation}
        handleClick={reset}
      />
      <Info data={selectedLocInfo} />
      <TimeValueArea data={data} type={type} />
      <DateValue data={composedData} type={type} />
    </div>
  );
}

export default styled(Sidebar)`
  & > div:first-child {
    display: flex;
    justify-content: space-between;
  }
`;

Sidebar.propTypes = {
  selectedLocation: oneOfType([string, object]),
  observeLocations: arrayOf(
    shape({
      position: shape({
        lat: number.isRequired,
        lon: number.isRequired
      }),
      info: shape({
        id: string.isRequired,
        region: string.isRequired
      })
    }).isRequired
  ),
  className: string.isRequired
};
