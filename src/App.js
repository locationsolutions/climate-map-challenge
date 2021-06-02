import React, {useEffect, useState} from 'react';
import Metolib from '@fmidev/metolib';
import './App.css';
import {Map, Marker, TileLayer, Popup} from "react-leaflet";
import styled from "styled-components";
import L from "leaflet";
import Sidebar from './Sidebar';
import markerIcon from "leaflet/dist/images/marker-icon.png"
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

const MapContainer = styled(Map)`
    width: calc(100vw - 300px);
    height: 100vh;
    position:absolute;
    top:0px;
    left:300px;
`;


// Ugly hack to fix Leaflet icons with leaflet loaders
/*delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});*/

//A prettier hack for the code above?
var myIcon = L.icon({
  iconUrl: markerIcon,
  iconSize: [24,35],
  iconAnchor: [0,0],
  popupAnchor: [10, 0],
  shadowUrl: markerShadow,
  shadowSize: [24, 24],
  shadowAnchor: [0, 0],
  iconRetinaUrl: markerIcon2x
});




function App() {
  const [observationLocations, setObservationLocations] = useState([]);

  const [selectedLocation, setSelectedLocation] = useState(null);


        


  useEffect(function fetchObservationLocations() {
    const connection = new Metolib.WfsConnection();

    if (connection.connect('http://opendata.fmi.fi/wfs', 'fmi::observations::weather::cities::multipointcoverage')) {
      
      connection.getData({
      
        begin: Date.now() - 60e3 * 60 * 24 * 6,
        end: Date.now(),
        requestParameter: "t,snowdepth,r_1h",
        timestep: 60 * 60 * 1000,
        
        /*These coordinates needed to switch places too */
        bbox: "59.846373196, 20.6455928891, 70.1641930203, 31.5160921567",
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

  

  const [position, setPosition] = useState([65, 26]);
  const [zoom, setZoom] = useState(4.5)

  const clickMarker = (loc) => {
    
    setSelectedLocation(loc.info.id)
    setZoom(6)

    setPosition([loc.position.lon, loc.position.lat])
    
    
    
  }
  
  const map = (
    <MapContainer center={position} zoom={zoom}>
    
      <TileLayer

        /*dark_all might not be the most user friednly basemap, maybe use voyager instead?
        https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png --> https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png
        */
        
        

        url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png'
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        subdomains='abcd'
        maxZoom={19}
      />

      {/*loc.position.lat, loc.position.lon --> loc.position.lon, loc.position.lat!!!
      longitude first and latitude after!! */}

      {observationLocations.map(loc => <Marker icon={myIcon} position={[loc.position.lon, loc.position.lat]}
                                               key={loc.info.id}  onClick={() => clickMarker(loc)}>
      <Popup>{loc.info.name}
        <p>
        Lämpötila : {loc.data.t.timeValuePairs[0].value}°​C
        </p>
        <p >
          
          Sademäärä : {loc.data.r_1h.timeValuePairs[0].value ? loc.data.r_1h.timeValuePairs[0].value : 0} mm
        </p>
              
      
      </Popup>                            
                                                 
      </Marker>)}
      
    </MapContainer>
  );


  

  return (
    
    <div>
      
      <Sidebar selectedLocationId={selectedLocation} observationLocations={observationLocations}/>
      
      {map}
      
    </div>
  );

}

export default App;