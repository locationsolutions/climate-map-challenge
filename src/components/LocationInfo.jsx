import React, { useRef, useState } from "react";
import convertLocationDataToObject from "../utils/convertLocationDataToObject";
import "./LocationInfo.css";
import WeatherData from "./WeatherData";

function LocationInfo({ loc }) {
  const toggleDataInput = useRef(null);
  const [showElement, setShowElement] = useState(false);

  const locationObject = convertLocationDataToObject(loc);
  return (
    <div className="container">
      <h2>{loc.info.name}</h2>

      <WeatherData weatherData={locationObject.weatherData} />

      <p />

      <div
        id="toggle-data-as-json"
        className={showElement ? "active" : ""}
        ref={toggleDataInput}
        onClick={() => setShowElement(!showElement)}
      >
        {showElement ? "Hide raw data" : "Show raw data"}
      </div>
      <div
        id="data-as-json"
        style={{ display: showElement ? "block" : "none" }}
      >
        <span className="data">{JSON.stringify(locationObject, null, 4)}</span>
      </div>

      {/* <pre>{loc && JSON.stringify(loc.info, null, 4)}</pre> */}
    </div>
  );
}

export default LocationInfo;
