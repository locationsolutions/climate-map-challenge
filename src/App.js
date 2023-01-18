import React, { useEffect, useState } from "react";
import Metolib from "@fmidev/metolib";
import "./App.css";
import { Map, Marker, TileLayer, Popup } from "react-leaflet";
import styled from "styled-components";
import L from "leaflet";
import Sidebar from "./components/Sidebar";

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

function App() {
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
            return;
          }

          setObservationLocations(
            data.locations.map((loc) => {
              const [lat, lon] = loc.info.position.map(parseFloat);
              return { ...loc, position: { lat, lon } };
            })
          );

          connection.disconnect();
        },
      });
    }
  }, []);

  const position = [65, 26];
  const map = (
    <MapContainer center={position} zoom={6}>
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        subdomains="abcd"
        maxZoom={19}
      />
      {observationLocations.map((loc) => (
        <Marker
          position={[loc.position.lat, loc.position.lon]}
          key={loc.info.id}
          onClick={() => setSelectedLocation(loc.info.id)}
        >
          <Popup autoPan={true}>
            {
              <span>
                <h3>{loc.info.name}</h3>
                <span>{loc.info.position}</span>
                <p />
                <span>
                  double click to open info or<br /> click here:{" "}
                </span>
                <button onClick={() => setSelectedLocation(loc.info.id)}>
                  Show info
                </button>
              </span>
            }
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );

  return (
    <div className="App">
      <Sidebar
        selectedLocationId={selectedLocation}
        observationLocations={observationLocations}
      />
      {map}
    </div>
  );
}

export default App;
