import React, { useEffect, useState, useRef } from "react";
import Metolib from "@fmidev/metolib";
import "./App.css";
import {
  Map,
  Marker,
  TileLayer,
  Popup,
  LayersControl,
  LayerGroup,
} from "react-leaflet";
import styled from "styled-components";
import L from "leaflet";

import CustomCircleMarker from "./CustomCircleMarker.js";
import CustomRectangleMarker from "./CustomRectangleMarker.js";

const MapContainer = styled(Map)`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0px;
  left: 0px;
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
              console.log(loc);
              const [lat, lon] = loc.info.position.map(parseFloat);
              const radius = loc.data.snowdepth.timeValuePairs[0].value || 5;
              const color =
                loc.data.snowdepth.timeValuePairs[0].value + 160 || 160;
              return {
                ...loc,
                color: color,
                radius: radius,
                position: { lat, lon },
              };
            })
          );

          connection.disconnect();
        },
      });
    }
  }, []);

  const { Overlay } = LayersControl;
  const mapRef = useRef();
  const precipitationOverlay = useRef();
  const snowdepthOverlay = useRef();
  const temperatureOverlay = useRef();
  const v = 0;
  const position = [65, 26];
  const map = <>
      <MapContainer center={position} zoom={6} ref={mapRef}>
        <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>' subdomains="abcd" maxZoom={19} />
        <LayersControl position="topleft">
          <Overlay name="Rainfall" checked>
            <LayerGroup id="rainfall" ref={precipitationOverlay}>
              {observationLocations.map((loc) => (
                <CustomRectangleMarker loc={loc} v={v} key={loc.info.id} />
              ))}
            </LayerGroup>
          </Overlay>

          <Overlay name="Snowdepth">
            <LayerGroup id="snowdepth" ref={snowdepthOverlay}>
              {observationLocations.map((loc) => (
                <CustomCircleMarker loc={loc} v={v} key={loc.info.id} />
              ))}
            </LayerGroup>
          </Overlay>

          <Overlay name="Temperatures" checked>
            <LayerGroup id="temperature" ref={temperatureOverlay}>
              {observationLocations.map((loc) => (
                <Marker
                  position={[loc.position.lat, loc.position.lon]}
                  key={loc.info.id}
                >
                  <Popup>
                    <p>Observation point: {loc.info.name}</p>
                    <p>Region: {loc.info.region}</p>
                    {loc.data.t.property.label}:{" "}
                    {loc.data.t.timeValuePairs[v].value ||
                      "data not available"}
                  </Popup>
                </Marker>
              ))}
            </LayerGroup>
          </Overlay>
        </LayersControl>
      </MapContainer>;
    </>;
  return <div className="App">{map}</div>;
}

export default App;
