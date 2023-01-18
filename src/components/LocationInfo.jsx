import React, { useRef, useState } from "react";
import convertLocationDataToObject from "../utils/convertLocationDataToObject";
import "./LocationInfo.css";

function LocationInfo({ loc }) {
  const toggleDataInput = useRef(null);
  const [showElement, setShowElement] = useState(true);

  console.log("DATA:\n", loc);

  const locationObject = convertLocationDataToObject(loc);
  return (
    <div className="container">
      <h2>{loc.info.name}</h2>

      <div
        id="toggle-data-as-json"
        className={showElement ? "active" : ""}
        ref={toggleDataInput}
        onClick={() => setShowElement(!showElement)}
      >
        {showElement ? "Hide data" : "Show data"}
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
