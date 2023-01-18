import React from "react";
import { CircleMarker, Popup } from "react-leaflet";

function CustomCircleMarker(observation) {
  let marker = (
    <CircleMarker
      center={[observation.loc.position.lat, observation.loc.position.lon]}
      radius={observation.loc.radius}
      color={"hsl(" + observation.loc.color + ",100%,50%)"}
      stroke={false}
      key={observation.loc.info.id}
    >
      <Popup>
        <p>Observation point: {observation.loc.info.name}</p>
        <p>Region: {observation.loc.info.region}</p>
        <p>
          {observation.loc.data.snowdepth.property.label + " (cm)"}:{" "}
          {observation.loc.data.snowdepth.timeValuePairs[0].value ||
            "data not available"}
        </p>
      </Popup>
    </CircleMarker>
  );
  return marker;
}

export default CustomCircleMarker;
