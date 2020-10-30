import React, {useEffect, useState} from 'react';
import Metolib from '@fmidev/metolib';
import './App.css';
import {Map, Marker, TileLayer, Popup} from "react-leaflet";
import styled from "styled-components";
import L from "leaflet";
import Sidebar from './Sidebar';
import getSelectedLocatoinId from './locationGetter';
import Chart from "chart.js";


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

  const clickedLocation = observationLocations.find(loc=> loc.info.id === selectedLocation);

  var clickedData = null;
  if (selectedLocation != null) {
    clickedData = clickedLocation.data.t.timeValuePairs
    console.log(JSON.stringify(clickedData));
    // create line chart

  }



  useEffect(function fetchObservationLocations() {
    const connection = new Metolib.WfsConnection();
    if (connection.connect('http://opendata.fmi.fi/wfs', 'fmi::observations::weather::cities::multipointcoverage')) {
      connection.getData({
        begin: Date.now() - 60e3 * 60 * 24 * 6,
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

  const position = [65, 26];
  const map = (
    <MapContainer center={position} zoom={6}>
      <TileLayer
        url='https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        subdomains='abcd'
        maxZoom={19}
      />

      {observationLocations.map(loc => (
        <Marker position={[loc.position.lon, loc.position.lat]}
                onClick={() => setSelectedLocation(loc.info.id)}
                key={loc.info.id}>
        </Marker>
      ))}


      {selectedLocation && (
        <Popup
          position = {[clickedLocation.position.lon, clickedLocation.position.lat]}
          onClose= {()=> {
            setSelectedLocation(null);
          }}
        >
          <div>
            <h2>{ clickedLocation.info.name }</h2>
            <p>{
                // insert line chart
                "Position: " + JSON.stringify(clickedLocation.info.position, null, 4)

              }
            </p>
          </div>
        </Popup>
      )}
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
