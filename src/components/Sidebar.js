import React, { useState, useEffect } from "react";
import { number, arrayOf, oneOfType, object, shape, string } from "prop-types";
import styled from "styled-components";
import TimeValueArea from "./TimeValueArea";
import DateValue from "./DateValue";
import constructAreaChartData from "../util/constructAreaChartData";
import handleChartSetter from "../util/handleChartSetter";
import Form from "../containers/Form";
import { faGlobeEurope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../style/sidebar.css";

function Sidebar({
  selectedLocation,
  observeLocations,
  className,
  clearSelectedLocation
}) {
  const [chartData, setChartData] = useState({
    data: [],
    composedData: [],
    type: ""
  });

  useEffect(() => {
    const { type } = chartData;
    handleChartSetter(observeLocations, selectedLocation, type, setChartData);
  }, [observeLocations, selectedLocation]);

  const handleType = type =>
    handleChartSetter(observeLocations, selectedLocation, type, setChartData);

  const setData = () => {
    const data = constructAreaChartData(observeLocations, type);
    clearSelectedLocation();
    setChartData({ data, type });
  };

  const { data, composedData, type } = chartData;

  return (
    <div className={className}>
      <div>
        <button disabled={!selectedLocation} onClick={setData}>
          <FontAwesomeIcon icon={faGlobeEurope} />
          All Regions
        </button>
        <Form submit={handleType} />
      </div>
      <TimeValueArea data={data} type={type} />
      <DateValue data={composedData} type={type} />
    </div>
  );
}

export default styled(Sidebar)`
  // width: 50%;
  height: 100vh;
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
