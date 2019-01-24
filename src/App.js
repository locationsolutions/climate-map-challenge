import React, {useEffect, useState} from 'react';
import Metolib from '@fmidev/metolib';
import './App.css';
import { Marker } from "react-leaflet";
import L from "leaflet";
import Sidebar from './components/Sidebar';
import WeatherMap from './components/WeatherMap';

// Ugly hack to fix Leaflet icons with leaflet loaders
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const DEFAULT_ZOOM = 6;
const MAP_CENTER = [65, 26];

function App() {

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [observations, setObservations] = useState(new Map());

  useEffect(function fetchObservationLocations() {

    const connection = new Metolib.WfsConnection();
    if (connection.connect('http://opendata.fmi.fi/wfs', 'fmi::observations::weather::cities::multipointcoverage')) {
      connection.getData({
        begin: Date.now() - 60e3 * 60 * 24 * 6,
        end: Date.now(),
        requestParameter: "t",
        timestep: 60 * 60 * 1000,
        bbox: "20.6455928891, 59.846373196, 31.5160921567, 70.1641930203",
        callback: (data, errors) => {
          if (errors.length > 0) {

            errors.forEach(err => {
              console.error('FMI API error: ' + err.errorText);
            });
            return;
          }

          const obsMap = new Map();
          data.locations.forEach(loc => {

            const [lat, lon] = loc.info.position.map(parseFloat);
            const pos = { lat: lat, lon: lon};

            const placeName = loc.info.name;
            const temps = loc.data.t.timeValuePairs;

            obsMap.set(loc.info.id, { position: pos, placeName: placeName, temps: temps });
          }); // forEach

          setObservations(obsMap);

          connection.disconnect();
        } // callback
      }); // getData
    } // outer if
  }, []); // useEffect / fetchObservationLocations

  // it needs to be an array to work with React's syntax...
  const markers = [];
  observations.forEach( (obs, key) => {

    markers.push(
      <Marker 
        position={[obs.position.lat, obs.position.lon]}
        key={key} 
        onClick={() => setSelectedLocation(key)}>
      </Marker>);
  });

  return (
    <div className="App">
      <Sidebar selectedLocationId={selectedLocation} observations={observations} className="sidebar"/>
      <WeatherMap center={MAP_CENTER} markers={markers} zoom={DEFAULT_ZOOM} className="weather-map" />
    </div>
  );

} // App

export default App;