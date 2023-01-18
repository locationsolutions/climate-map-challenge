import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Custom icon setup
const iconSun = new L.Icon({
  iconUrl: require("./assets/icons/sun.svg"),
  iconRetinaUrl: require("./assets/icons/sun.svg"),
  iconSize: new L.Point(27, 27),
  shadowSize: new L.Point(0, 0),
  iconAnchor: new L.Point(12.5, 12.5),
  popupAnchor: new L.Point(4, -12.5),
  className: "leaflet-div-icon",
});

const iconSnow = new L.Icon({
  iconUrl: require("./assets/icons/snow.svg"),
  iconRetinaUrl: require("./assets/icons/snow.svg"),
  iconSize: new L.Point(27, 27),
  shadowSize: new L.Point(0, 0),
  iconAnchor: new L.Point(12.5, 12.5),
  popupAnchor: new L.Point(4, -12.5),
  className: "leaflet-div-icon",
});

/**
 *
 * @param {*} props | .loc  | Location info
 * @param {*} props | .v    | Dataset index which we are currently on
 * @param {*} props | .key  | Unique key for the component
 * @returns react-leaflet Marker with popup
 */
const CustomIconMarker = (props) => {
  let icon = iconSun;
  if (
    props.loc.data.t.timeValuePairs[props.v].value &&
    props.loc.data.t.timeValuePairs[props.v].value < 0
  ) {
    icon = iconSnow;
  }

  /**
   * Customer marker definitions
   */
  let marker = (
    <Marker
      position={[props.loc.position.lat, props.loc.position.lon]}
      key={props.loc.info.id}
      icon={icon}
    >
      <Popup>
        <p>Observation point: {props.loc.info.name}</p>
        <p>Region: {props.loc.info.region}</p>
        {props.loc.data.t.property.label + " (°C)"}:{" "}
        {props.loc.data.t.timeValuePairs[props.v].value || "data not available"}
      </Popup>
    </Marker>
  );

  return marker;
};

export default CustomIconMarker;
