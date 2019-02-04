import React from "react";
import "../style/info.css";

const Info = ({ data }) => {
  const { info = {}, position = {} } = data || {};
  const { name, region } = info;
  const { lat, lon } = position;
  return (
    <div>
      <div className="info">
        <p style={{ textTransform: "uppercase" }}>
          {!name ? <span>Name: </span> : name}
        </p>
        <p>
          <span>Region: </span>
          <span>{region}</span>
        </p>
        <p>
          <span>Latitude: </span>
          <span>{lat}</span>
        </p>
        <p>
          <span>Longtitude: </span>
          <span>{lon}</span>
        </p>
      </div>
      {!region ? <pre>*Choose location from Map</pre> : null}
    </div>
  );
};
export default Info;
