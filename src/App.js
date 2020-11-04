import React, {useEffect, useState} from 'react';
import Metolib from '@fmidev/metolib';
import './App.css';
import {Map, Marker, TileLayer, Popup} from "react-leaflet";
import styled from "styled-components";
import L from "leaflet";
import Sidebar from './Sidebar';
import getSelectedLocatoinId from './locationGetter';
import Chart from "chart.js";
import {Line} from 'react-chartjs-2';
import {popupContent, popupHead, okText, loadingPopup} from "./PopupStyles";
import idwLayer from "C:/Users/tipe_/Documents/Projekteja/Koodaus/CGI_climate/climate-map-challenge/node_modules/leaflet.idw/src/leaflet-idw.js"


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
  var timeList2 = null;
  var valListT = null;
  var valListSnow = null;

  var data = null;
  var options = null;
  const [loading, setLoading] = useState(true);

  if (selectedLocation) {
    clickedData = clickedLocation.data
    //console.log(JSON.stringify(clickedData));

    timeList2=  clickedData.t.timeValuePairs.map(row=> ''+ new Date(row.time));
    valListT = clickedData.t.timeValuePairs.map(row=> row.value);
    valListSnow = clickedData.snowdepth.timeValuePairs.map(row=> row.value);

    console.log(JSON.stringify(valListT.length));
    // create line chart
    //labels: timeList,
    data = {
      labels: timeList2,
      datasets: [
        {
          label: 'Temperature: ',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(72,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: valListT
        },
        {
          label: 'Snowdepth: ',
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(72,192,192,0.4)',
          borderColor: 'rgba(75,0,0,1)',
          borderCapStyle: 'butt',
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,0,0,1)',
          pointBackgroundColor: '#fff',
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,0,0,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: valListSnow
        }

      ]
    };

    options = {
      scales: {
        xAxes: [
          {
            type: "time",
            labels: timeList2,
            time: {
              unit: 'day'
            }
          }
        ],
        yAxes: [
          {
            ticks: {
              min: -12,
              max: 15
            }
          }
        ]
      }
    }
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
          setLoading(false);
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
      ))

      }


      {selectedLocation && (
        <Popup classname = "graphPopup"
          position = {[clickedLocation.position.lon, clickedLocation.position.lat]}
          maxWidth= "800px"
          onClose= {()=> {
            setSelectedLocation(null);
          }}

        >
          <div style = {popupHead}>
            <h2>{"Station: "+ clickedLocation.info.name }</h2>
          </div>

          <div style = {popupContent}>
            <Line
              data={data}
              height={400}
              width={500}
              options = {options}
            />
          </div>
        </Popup>
      )}

      {loading &&(
        <Popup
          classname = "loadingPopup"
          position = {position}
          maxWidth= "800px"

        >
          <div style = {loadingPopup}>
            <h2>{"Loading Data..."}</h2>
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
