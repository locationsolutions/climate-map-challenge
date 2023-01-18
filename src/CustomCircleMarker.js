import React from "react";
import { CircleMarker, Popup } from "react-leaflet";

/**
 * 
 * @param {*} props | .loc  | Location info
 * @param {*} props | .v    | Dataset index which we are currently on
 * @param {*} props | .key  | Unique key for the component
 * @returns react-leaflet Circlemarker with popup
 */
const CustomCircleMarker = (props) => {
  const radius = props.loc.data.snowdepth.timeValuePairs[props.v].value || 5;
  const color =
    props.loc.data.snowdepth.timeValuePairs[props.v].value + 160 || 160;

  /**
   * Custom marker definitions
   */
  let marker = <CircleMarker center={[props.loc.position.lat, props.loc.position.lon]} radius={radius} color={"hsl(" + color + ",100%,50%)"} stroke={false} key={props.loc.info.id}>
      <Popup>
        <p>Observation point: {props.loc.info.name}</p>
        <p>Region: {props.loc.info.region}</p>
        <p>
          {props.loc.data.snowdepth.property.label + " (cm)"}: {props.loc.data.snowdepth.timeValuePairs[props.v].value || "data not available"}
        </p>
      </Popup>
    </CircleMarker>;
  return marker;
};

export default CustomCircleMarker;
