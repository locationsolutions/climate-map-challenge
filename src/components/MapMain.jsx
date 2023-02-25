import React from "react";
import { Map, Marker, TileLayer, Popup } from "react-leaflet";
import styled from "styled-components";
import L from "leaflet";
import mapIcon from "../assets/img/marker-icon.png";
import mapIconx2 from "../assets/img/marker-icon-2x.png";

// Ugly hack to fix Leaflet icons with leaflet loaders
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// TODO: move these somewhere else...
const customIcon = L.icon({
  iconRetinaUrl: mapIconx2,
  iconUrl: mapIcon,
  iconSize: [25, 41],
  iconAnchor: [0, 41],
  popupAnchor: [12, -20],
});

const MapContainer = styled(Map)`
  width: calc(100vw - 500px);
  height: 100vh;
  position: absolute;
  top: 0px;
  left: 500px;
`;

// TODO: change map style according to the time of day
// const mapStyleDark =
//   "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
const mapStyleLight =
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

const position = [65, 26];

function MapMain({ setSelectedLocation, observationLocations }) {
  return (
    <MapContainer center={position} zoom={6}>
      <TileLayer
        url={mapStyleLight}
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        subdomains="abcd"
        maxZoom={19}
      />
      {observationLocations.map((loc) => (
        <Marker
          position={[loc.position.lat, loc.position.lon]}
          key={loc.info.id}
          icon={customIcon}
          onClick={() => setSelectedLocation(loc.info.id)}
        >
          <Popup autoPan={true}>
            {
              <span>
                <h3>{loc.info.name}</h3>
                <span>{loc.info.position}</span>
                <p />
                <span>
                  double click to open info or
                  <br /> click here:{" "}
                </span>
                <div
                  className="btn btn-marker"
                  onClick={() => setSelectedLocation(loc.info.id)}
                >
                  Show info
                </div>
              </span>
            }
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapMain;
