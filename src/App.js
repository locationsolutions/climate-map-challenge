import React, { useEffect, useState, useRef } from "react";
import Metolib from "@fmidev/metolib";
import { Map, TileLayer, LayersControl, LayerGroup } from "react-leaflet";
import styled from "styled-components";

// Styles
import "./App.css";
import "./Infobox.css";

// Custom elements
import CustomCircleMarker from "./CustomCircleMarker.js";
import CustomRectangleMarker from "./CustomRectangleMarker.js";
import CustomIconMarker from "./CustomIconMarker.js";
import TimelineControls from "./TimelineControls";

const MapContainer = styled(Map)`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0px;
  left: 0px;
`;

function App() {
  const [observationLocations, setObservationLocations] = useState([]);

  useEffect(function fetchObservationLocations() {
    const connection = new Metolib.WfsConnection();
    if (connection.connect( "http://opendata.fmi.fi/wfs", "fmi::observations::weather::cities::multipointcoverage" )) {
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

  // Controls and layers
  const { Overlay } = LayersControl;
  const mapRef = useRef();
  const precipitationOverlay = useRef();
  const snowdepthOverlay = useRef();
  const temperatureOverlay = useRef();
  let [v, setDataIndex] = useState(0);

  const position = [65, 26];
  const map = (
    <>
      <MapContainer center={position} zoom={6} ref={mapRef}>
        <TimelineControls
          observationData={observationLocations}
          getCurrentDataIndex={setDataIndex}
        />
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          subdomains="abcd"
          maxZoom={19}
        />
        <LayersControl position="topleft">
          <Overlay name="Rainfall" checked>
            <LayerGroup id="rainfall" ref={precipitationOverlay}>
              {observationLocations.map((loc) => (
                <CustomRectangleMarker loc={loc} v={v} key={loc.info.id} />
              ))}
            </LayerGroup>
          </Overlay>

          <Overlay name="Snowdepth" checked>
            <LayerGroup id="snowdepth" ref={snowdepthOverlay}>
              {observationLocations.map((loc) => (
                <CustomCircleMarker loc={loc} v={v} key={loc.info.id} />
              ))}
            </LayerGroup>
          </Overlay>

          <Overlay name="Temperatures" checked>
            <LayerGroup id="temperature" ref={temperatureOverlay}>
              {observationLocations.map((loc) => (
                <CustomIconMarker loc={loc} v={v} key={loc.info.id} />
              ))}
            </LayerGroup>
          </Overlay>
        </LayersControl>
      </MapContainer>
      ;
    </>
  );
  return <div className="App">{map}</div>;
}

export default App;
