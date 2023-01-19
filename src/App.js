import React, { useEffect, useState } from "react";
import Metolib from "@fmidev/metolib";
import "./App.css";
import { Map, Marker, TileLayer, Popup } from "react-leaflet";
import styled from "styled-components";
import L from "leaflet";
import Sidebar from "./components/Sidebar";
import mapIcon from "./assets/img/marker-icon.png";
import mapIconx2 from "./assets/img/marker-icon-2x.png";

const MapContainer = styled(Map)`
  width: calc(100vw - 500px);
  height: 100vh;
  position: absolute;
  top: 0px;
  left: 500px;
`;

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

function App() {
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("Loading...");

  const [observationLocations, setObservationLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(function fetchObservationLocations() {
    const connection = new Metolib.WfsConnection();
    if (
      connection.connect(
        "http://opendata.fmi.fi/wfs",
        "fmi::observations::weather::cities::multipointcoverage"
      )
    ) {
      connection.getData({
        begin: Date.now() - 60e3 * 60 * 24 * 6,
        end: Date.now(),
        requestParameter: "t,snowdepth,r_1h",
        timestep: 60 * 60 * 1000,
        bbox: "20.6455928891, 59.846373196, 31.5160921567, 70.1641930203",
        callback: (data, errors) => {
          if (errors.length > 0) {
            errors.forEach((err) => {
              console.error("FMI API error: " + err.errorText);
            });
            setLoadingText("Error loading...");
            return;
          }

          setObservationLocations(
            data.locations.map((loc) => {
              const [lat, lon] = loc.info.position.map(parseFloat);
              return { ...loc, position: { lat, lon } };
            })
          );

          connection.disconnect();
          setLoading(false);
        },
      });
    }
  }, []);

  // TODO: change map style according to the time of day
  // const mapStyleDark =
  //   "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
  const mapStyleLight =
    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

  const position = [65, 26];
  const map = (
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

  return (
    <div className="App">
      {loading ? (
        <div className="loader">
          <span>
            {loadingText.includes("Error") ? (
              <p className="error">{loadingText}</p>
            ) : (
              <p>{loadingText}</p>
            )}
          </span>
        </div>
      ) : null}
      <Sidebar
        selectedLocationId={selectedLocation}
        observationLocations={observationLocations}
      />
      {map}
    </div>
  );
}

export default App;
