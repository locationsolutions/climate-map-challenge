import React from "react";
import { Rectangle, Popup } from "react-leaflet";

/**
 * 
 * @param {*} props | .loc  | Location info
 * @param {*} props | .v    | Dataset index which we are currently on
 * @param {*} props | .key  | Unique key for the component
 * @returns react-leaflet Rectangle with popup
 */
const CustomRectangleMarker = (props) => {
  // Latitude and longitude setup
  const latitude = props.loc.position.lat;
  const longitude = props.loc.position.lon;
  const latlon = [latitude, longitude - 0.22];
  const latlonCenter = [latitude, longitude];

  // Visualization variables
  const realRainfallAmount =
    props.loc.data.r_1h.timeValuePairs[props.v].value || 0;
  const rainfallAmount = realRainfallAmount < 1.1 ? realRainfallAmount : 1.1;
  const rectangleColor = 180 + realRainfallAmount * 10;
  const rectangleHeight = [latitude + rainfallAmount, longitude + 0.3];
  const rectangle = [latlon, rectangleHeight];

  /**
   * Custom marker definitions
   */
  let marker = (
    <Rectangle
      center={latlonCenter}
      color={"hsl(" + rectangleColor + ",100%,50%)"}
      stroke={false}
      bounds={rectangle}
      key={props.loc.info.id}
    >
      <Popup>
        <p>Observation point: {props.loc.info.name}</p>
        <p>Region: {props.loc.info.region}</p>
        <p>
          {props.loc.data.r_1h.property.label + " (mm)"}:{" "}
          {props.loc.data.r_1h.timeValuePairs[props.v].value ||
            "data not available"}
        </p>
      </Popup>
    </Rectangle>
  );
  return marker;
};

export default CustomRectangleMarker;
