import React from 'react';
import { Map, TileLayer } from "react-leaflet";
import styled from "styled-components";

// in the end it might be a bad thing to make the map its own component...
// it's logical, but it makes App.js less clear at a glance. oh well.
function WeatherMap({center, zoom, markers, className}) {

  return (
    <Map center={center} markers={markers} zoom={zoom} className={className}>  
      <TileLayer
        url='https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        subdomains='abcd'
        maxZoom={19}
      />
      {markers}
    </Map> 
  );

} // WeatherMap

export default styled(WeatherMap)`
  width: calc(100vw - 300px);
  height: 100vh;
  position: absolute;
  top: 0px;
  left: 300px;
`;