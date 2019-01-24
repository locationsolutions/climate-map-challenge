import React from 'react';
import tempToHexColor from '../utils/TempToHexColor';
import Temperature from './Temperature';
import LocationInfo from './LocationInfo';
import styled from "styled-components";

// Ideally, the Sidebar would receive its render items from outside, but I ran out of time to implement it.
function Sidebar({selectedLocationId, observations, className}) {

  const obs = observations.get(selectedLocationId);

  // not sure if this pattern is kosher, but it seems to work
  if (!obs) return null;

  const temps = obs.temps.map(temp => {

    return <Temperature timeStamp={temp.time} temp={temp.value} bgColor={tempToHexColor(temp.value)} className="temperature" key={temp.time} />;
  });
    
  return <div className={className}>
    <LocationInfo position={obs.position} placeName={obs.placeName} className="location-info"/>
    {temps}
  </div>;
}

export default styled(Sidebar)`
  width: 300px;
  height: 100vh;
`;