import React from 'react';
import styled from "styled-components";

function LocationInfo({position, placeName, className}) {

  return (<div className={className}>
    <p>{position.lat + ", " + position.lon}</p>
    <p>{placeName}</p>
  </div>);
}

export default styled(LocationInfo)`
  width: 280px;
  height: 70px;
  background: #FFC4F2;
  text-align: center;
  border-radius: 5px;
  margin: 10px;
`;