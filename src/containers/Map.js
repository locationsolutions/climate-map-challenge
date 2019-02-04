import React, { useState } from "react";
import { arrayOf, shape, number, string, func } from "prop-types";
import {
  Map as LeafletMap,
  Marker,
  TileLayer,
  Popup,
  LayersControl,
  CircleMarker,
  Tooltip
} from "react-leaflet";
import { ReactLeafletSearch } from "react-leaflet-search";
import L from "leaflet";
import styled from "styled-components";

import {
  attribution,
  layerOptions,
  defaultCoordinate,
  iconUrl,
  defaultLayer
} from "../var";
import "../style/map.css";

// Ugly hack to fix Leaflet icons with leaflet loaders
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

const MapContainer = styled(LeafletMap)`
  height: 120vh;
`;

const Map = ({ observeLocations, selectedLocation, setSelectedLocation }) => {
  const [latlng, setLatLng] = useState(defaultCoordinate);

  const icon = new L.Icon.Default();

  const clickIcon = new L.Icon.Default({ iconUrl, className: "blinking" });

  const layers = layerOptions.map(({ name, url }, i) => (
    <LayersControl.BaseLayer
      key={i}
      name={name}
      checked={name === defaultLayer}
    >
      <TileLayer attribution={attribution} url={url} maxZoom={19} />
    </LayersControl.BaseLayer>
  ));

  const markers = observeLocations
    .sort((a, b) => (a.info.region < b.info.region ? -1 : 1))
    .map(({ position: { lat, lon }, info: { id, region } }) => (
      <LayersControl.Overlay key={id} name={region} checked={true}>
        <Marker
          key={id}
          icon={selectedLocation === id ? clickIcon : icon}
          position={[lat, lon]}
          onClick={e => setSelectedLocation(id)}
          onMouseOver={e => e.target.openPopup()}
          onMouseOut={e => e.target.closePopup()}
          popupopen={true}
        >
          <Popup>{region}</Popup>
        </Marker>
      </LayersControl.Overlay>
    ));

  const clickedCircle = (
    <CircleMarker center={latlng} radius={5} opacity={0.1}>
      <Tooltip permanent={latlng.lat === 64 ? false : true}>
        <span>{latlng.lat.toFixed(3)} </span>|
        <span> {latlng.lng.toFixed(3)}</span>
      </Tooltip>
    </CircleMarker>
  );

  return (
    <MapContainer
      center={latlng}
      zoom={5.4}
      touchZoom={true}
      onClick={e => setLatLng(e.latlng)}
    >
      <LayersControl position="topright">
        {layers}
        <ReactLeafletSearch position="topright" showMarker={false} />
        {markers}
      </LayersControl>
      {clickedCircle}
    </MapContainer>
  );
};

export default Map;

Map.propTypes = {
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
  selectedLocation: string,
  setSelectedLocation: func.isRequired
};
