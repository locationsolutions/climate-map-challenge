import React from "react"
import {Map, Marker, TileLayer, Popup} from "react-leaflet"
import "leaflet.idw/src/leaflet-idw"
import styled from "styled-components";
import {Line} from 'react-chartjs-2';
import {popupContent, popupHead, loadingPopup} from "./PopupStyles";
import HeatmapLayer from 'react-leaflet-heatmap-layer';

// The map functionality. Contains TileLayer, HeatMap, Markers, Popups and weather charts.

const MapContainer = styled(Map)`
    width: calc(100vw - 300px);
    height: 100vh;
    position:absolute;
    top:0px;
    left:300px;
`;

function WeatherMap(props){

  var heatPoints = null;

// Insert datapoints from the time set by slider to heatPoints to create HeatMapLayer

    heatPoints = props.observationLocations.map(loc =>{
      const pair = loc.data.t.timeValuePairs.find(pair => pair.time === props.thisDate)
      if(pair){
        return [loc.position.lat,loc.position.lon,pair.value]
      } else {
        return [loc.position.lat,loc.position.lon,5]
      }
    })


  const map = (
    <MapContainer center={props.position} zoom={6}>
      <TileLayer
        url='https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        subdomains='abcd'
        maxZoom={19}
      />

      <HeatmapLayer
            fitBoundsOnLoad
            fitBoundsOnUpdate
            points={heatPoints}
            longitudeExtractor={m => m[0]}
            latitudeExtractor={m => m[1]}
            max={60}
            maxZoom={10}
            radius={100}
            blur={50}
            minOpacity={0.15}
            intensityExtractor={m => parseFloat(m[2])*2} />


      {props.observationLocations.map(loc => (
          <Marker position={[loc.position.lon, loc.position.lat]}
                  onClick={() => props.setSelectedLocation(loc.info.id)}
                  key={loc.info.id}>
          </Marker>
        ))
      }


    {props.selectedLocation && (
      <Popup classname = "graphPopup"
        position = {[props.clickedLocation.position.lon, props.clickedLocation.position.lat]}
        maxWidth= "800px"
        onClose= {()=> {
          props.setSelectedLocation(null);
        }}

      >
        <div style = {popupHead}>
          <h2>{"Station: "+ props.clickedLocation.info.name }</h2>
        </div>

        <div style = {popupContent}>
          <Line
            data={props.data}
            height={400}
            width={500}
            options = {props.options}
          />
        </div>
      </Popup>
    )}

    {props.loading &&(
      <Popup
        classname = "loadingPopup"
        position = {props.position}
        maxWidth= "800px"

      >
        <div style = {loadingPopup}>
          <h2>{"Loading Data..."}</h2>
        </div>
      </Popup>
    )}

    </MapContainer>

  )


return map
}
export default WeatherMap;
