import React from "react";
import mapArrayToAverages from "../utils/mapArrayToAverages";

function LocationInfo({ loc }) {
  console.log("DATA:\n", loc);
  return (
    <div className="container">
      <h2>{loc.info.name}</h2>
      <span />
      <pre>{loc && JSON.stringify(loc.info, null, 4)}</pre>
    </div>
  );
}

export default LocationInfo;
