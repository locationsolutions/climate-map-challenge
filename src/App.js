import React, {useEffect, useState} from 'react';
import Metolib from '@fmidev/metolib';
import './App.css';
import {Map, Marker, TileLayer, Popup, LayersControl,
        Circle, LayerGroup, Polyline} from "react-leaflet";
import styled from "styled-components";
import L from "leaflet";
import Sidebar from './Sidebar';

// Santeri Kilpeläinen
// kilpelainen.santeri@gmail.com

// constructing layers for Overlay control
const {BaseLayer, Overlay} = LayersControl;

const MapContainer = styled(Map)`
    width: calc(100vw - 300px);
    height: 100vh;
    position:absolute;
    top:0px;
    left:300px;
`;


// Ugly hack to fix Leaflet icons with leaflet loaders
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});



function App() {
  const [observationLocations, setObservationLocations] = useState([]);

  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(function fetchObservationLocations() {
    const connection = new Metolib.WfsConnection();
    if (connection.connect('http://opendata.fmi.fi/wfs', 'fmi::observations::weather::cities::multipointcoverage')) {
      connection.getData({
        begin: Date.now() - 60e3 * 60 * 24,
        end: Date.now(),
        requestParameter: "t,snowdepth,r_1h",
        timestep: 60 * 60 * 1000,
        bbox: "20.6455928891, 59.846373196, 31.5160921567, 70.1641930203",
        callback: (data, errors) => {
          if (errors.length > 0) {

            errors.forEach(err => {
              console.error('FMI API error: ' + err.errorText);
            });
            return;
          }

          setObservationLocations(data.locations
            .map(loc => {
              const [lon, lat] = loc.info.position.map(parseFloat);
              return {...loc, position: {lat, lon}}
            })
          );

          connection.disconnect();
        }
      });
    }
  }, []);

  //Polyline Randomizer

  const locArrMax = observationLocations.length - 1;
  const polylineStartPoint = observationLocations[Math.round(Math.random() * locArrMax)];


  const position = [65, 26];
  const map = (
    <MapContainer center={position} zoom={6}>
      <LayersControl position ="topright">
        <BaseLayer checked name="Basemap">
          <TileLayer
            url='https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
            subdomains='abcd'
            maxZoom={19}
          />
        </BaseLayer>

        <Overlay checked name="Markers for Locations">
            <LayerGroup>
        {observationLocations.map(loc => <Marker position={[loc.position.lon, loc.position.lat]}
                                                 key={loc.info.id} onClick={() => setSelectedLocation(loc.info.id)}>

        {/* // Popup when clicking marker and giving info from database, data from nearest hour */}
                                             <Popup>
                                             <span> <b>{[loc.info.name]}</b><br />
                                                   WEATHER: {loc && JSON.stringify(loc.data.t.timeValuePairs[24].value)}c<br />
                                                   SNOW: {loc && JSON.stringify(loc.data.snowdepth.timeValuePairs[24].value)}cm</span>
                                             </Popup>
                                        </Marker>
      )};
          </LayerGroup>
      </Overlay>

      <Overlay name="Circles for Snowdepth">
          <LayerGroup>
          {observationLocations.map(loc => <Circle center={[loc.position.lon, loc.position.lat]
                                                  } key={loc.info.id}
            color="white"
            radius={loc && Math.abs(JSON.stringify(loc.data.snowdepth.timeValuePairs[0].value))^20000}
            fillColor="grey"
            stroke={true}
            />

          )};
          </LayerGroup>
      </Overlay>

      {/* // Balloon by temps, not really working correcty because the scaling */}
      <Overlay name="Circles for Temps">
            <LayerGroup>
              {observationLocations.map(loc => <Circle center={[loc.position.lon, loc.position.lat]
              } key={loc.info.id}
              color="grey"
              radius={loc && (Math.abs(loc.data.t.timeValuePairs[0].value || 2))^20000}
              fillColor="white"
              fillOpacity={0.65}
              fillRule="nonzero"
              stroke={true}
              />
              )};

            </LayerGroup>
        </Overlay>

        {/* Polylines go to randomly decided place, target changes when clicking on some marker */}
        <Overlay name ="Polylines to Random() target">
          <LayerGroup>
              {
                observationLocations.map(point => <Polyline positions={[
                                          [polylineStartPoint.position.lon, polylineStartPoint.position.lat],
                                          [point.position.lon, point.position.lat]]
                                        } key={point.info.id} color="lime"
                    />
                )};
          </LayerGroup>
        </Overlay>

  </LayersControl>
</MapContainer>
  );

  return (
    <div className="App">
      <Sidebar selectedLocationId={selectedLocation} observationLocations={observationLocations}/>
      {map}
    </div>
    );
}
export default App;
